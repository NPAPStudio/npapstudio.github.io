interface StoreConfig {
  name: string;
  keyPath: string;
  indexes?: { name: string; keyPath: string; options?: IDBIndexParameters }[];
  options?: IDBObjectStoreParameters;
  defaultValues?: { [key: string]: any }; // 新增字段，用于存储字段的默认值
}

interface IDBConfig {
  dbName: string;
  version: number;
  stores: StoreConfig[];
}

class IndexedDBService<T> {
  private db: IDBDatabase | null = null;
  private dbName: string;
  private version: number;
  private stores: StoreConfig[];
  private _initPromise: Promise<void>; // 新增属性，用于跟踪数据库初始化

  constructor(config: IDBConfig) {
    this.dbName = config.dbName;
    this.version = config.version;
    this.stores = config.stores;
    this._initPromise = this.initDB(); // 初始化数据库并返回Promise
  }

  private initDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = (event) => {
        const db = request.result;

        this.stores.forEach((store) => {
          let objectStore: IDBObjectStore;




          if (!db.objectStoreNames.contains(store.name)) {
            objectStore = db.createObjectStore(store.name, {
              keyPath: store.keyPath,
              ...store.options,
            });

            // 创建索引
            store.indexes?.forEach((index) => {
              objectStore.createIndex(index.name, index.keyPath, index.options);
            });
          } else {
            objectStore = request.transaction!.objectStore(store.name);            
            // 如果已经存在对象存储，开始更新默认值
            if (store.defaultValues) {
              this.updateExistingDataWithDefaults(store.name, store.defaultValues, objectStore);
            }

            this.updateIndexes(store, objectStore);
          }
        });
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve(); // 数据库初始化成功
      };

      request.onerror = (event) => {
        console.error('Database error:', (event.target as IDBRequest).error);
        reject((event.target as IDBRequest).error); // 数据库初始化失败
      };
    });
  }

  // 检查并更新现有表的索引
  private updateIndexes(store: StoreConfig, objectStore: IDBObjectStore) {
    const existingIndexes = Array.from(objectStore.indexNames);

    // 遍历配置中的索引，检查是否已经存在
    store.indexes?.forEach((index) => {
      if (!existingIndexes.includes(index.name)) {
        // 如果索引不存在，创建新索引
        objectStore.createIndex(index.name, index.keyPath, index.options);
        console.log(`Created new index ${index.name} on store ${store.name}`);
      }
    });
  }

  private async updateExistingDataWithDefaults(storeName: string, defaultValues: { [key: string]: any }, objectStore: IDBObjectStore) {
    const transaction = objectStore.transaction;
    const cursorRequest = objectStore.openCursor();

    cursorRequest.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result;
      if (cursor) {
        let needUpdate = false;
        const updatedData = cursor.value;

        // 检查每个默认值字段，如果该字段不存在或为 undefined，则设置默认值
        for (const key in defaultValues) {
          if (updatedData[key] === undefined) {
            updatedData[key] = defaultValues[key];
            needUpdate = true;
          }
        }

        // 如果有更新，则更新数据
        if (needUpdate) {
          cursor.update(updatedData);
        }

        cursor.continue();
      }
    };

    cursorRequest.onerror = () => {
      console.error('Cursor error when updating default values.');
    };
  }

  private waitForDb(): Promise<void> {
    return this._initPromise; // 返回Promise，等待数据库初始化完成
  }

  public async addData(storeName: string, data: T): Promise<IDBValidKey> {
    await this.waitForDb(); // 确保数据库已初始化

    const transaction = this.db!.transaction(storeName, 'readwrite');
    const objectStore = transaction.objectStore(storeName);

    const dataDefaultValues = this.stores.find((store) => store.name === storeName)?.defaultValues;

    // 如果有默认值，遍历并设置到数据中
    if (dataDefaultValues && data !== null) {
      Object.entries(dataDefaultValues).forEach(([key, value]) => {
        if ((data as any)[key] === undefined) {
          (data as any)[key] = value;
        }
      });
    }

    const request = objectStore.add(data);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        // 返回插入对象的 ID
        resolve(request.result as IDBValidKey); // 使用类型断言确保类型正确
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }


  public async getData(
    storeName: string,
    id: string | number,
  ): Promise<T | null> {
    await this.waitForDb(); // 确保数据库已初始化

    const transaction = this.db!.transaction(storeName, 'readonly');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.get(id);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result ?? null);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }


  public async importData(
    data: { storeName: string; data: T[] }[],
  ): Promise<void> {
    await this.waitForDb(); // 确保数据库已初始化

    for (let i = 0; i < data.length; i++) {
      const { storeName, data: storeData } = data[i];
      const transaction = this.db!.transaction(storeName, 'readwrite');
      const objectStore = transaction.objectStore(storeName);

      // 获取与 storeName 对应的默认值
      const dataDefaultValues = this.stores.find((store) => store.name === storeName)?.defaultValues;

      for (let j = 0; j < storeData.length; j++) {
        const dataItem = storeData[j];

        // 设置默认值
        if (dataDefaultValues && typeof dataItem === 'object' && dataItem !== null) {
          Object.entries(dataDefaultValues).forEach(([key, value]) => {
            if ((dataItem as any)[key] === undefined) {
              (dataItem as any)[key] = value;
            }
          });
        }

        // 获取 keyPath 并检查类型
        const keyPath = objectStore.keyPath;

        let keyValue: any;
        if (typeof keyPath === 'string') {
          keyValue = (dataItem as any)[keyPath];
        } else if (Array.isArray(keyPath)) {
          // 如果 keyPath 是数组，则生成复合主键值 (需要根据实际业务需求调整)
          keyValue = keyPath.map(kp => (dataItem as any)[kp]);
        } else {
          throw new Error(`Invalid keyPath for store ${storeName}`);
        }

        // 首先尝试获取现有数据（通过主键）
        const getRequest = objectStore.get(keyValue);

        await new Promise<void>((resolve, reject) => {
          getRequest.onsuccess = () => {
            const existingData = getRequest.result;

            if (existingData) {
              // 如果数据存在，执行更新
              const updateRequest = objectStore.put(dataItem);
              updateRequest.onsuccess = () => {
                resolve();
              };
              updateRequest.onerror = () => {
                reject(updateRequest.error);
              };
            } else {
              // 如果数据不存在，执行新增
              const addRequest = objectStore.add(dataItem);
              addRequest.onsuccess = () => {
                resolve();
              };
              addRequest.onerror = () => {
                reject(addRequest.error);
              };
            }
          };

          getRequest.onerror = () => {
            reject(getRequest.error);
          };
        });
      }
    }
  }




  public async exportData() {
    const data = [];
    await this.waitForDb(); // 确保数据库已初始化
    for (let i = 0; i < this.stores.length; i++) {
      const store = this.stores[i];
      data.push({
        storeName: store.name,
        data: await this.getAllData(store.name),
      });
    }
    return data;
  }

  public async getAllData(storeName: string): Promise<T[]> {
    await this.waitForDb(); // 确保数据库已初始化

    const transaction = this.db!.transaction(storeName, 'readonly');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  public async getDataByIndex(
    storeName: string,
    indexName: string,
    indexValue: any,
  ): Promise<T | null> {
    await this.waitForDb(); // 确保数据库已初始化

    const transaction = this.db!.transaction(storeName, 'readonly');
    const objectStore = transaction.objectStore(storeName);
    const index = objectStore.index(indexName);
    const request = index.get(indexValue);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result ?? null);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  public async getAllDataByIndex(
    storeName: string,
    indexName: string,
    indexValue: any,
  ): Promise<T[]> {
    await this.waitForDb(); // 确保数据库已初始化

    const transaction = this.db!.transaction(storeName, 'readonly');
    const objectStore = transaction.objectStore(storeName);
    const index = objectStore.index(indexName);
    const request = index.openCursor(IDBKeyRange.only(indexValue));
    const results: T[] = [];

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          results.push(cursor.value);
          cursor.continue(); // 继续下一个结果
        } else {
          resolve(results); // 遍历结束
        }
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  public async updateData(storeName: string, data: T): Promise<void> {
    await this.waitForDb(); // 确保数据库已初始化

    const transaction = this.db!.transaction(storeName, 'readwrite');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.put(data);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  public async deleteData(
    storeName: string,
    id: string | number,
  ): Promise<void> {
    await this.waitForDb(); // 确保数据库已初始化

    const transaction = this.db!.transaction(storeName, 'readwrite');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.delete(id);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  public async deleteDataByIndex(
    storeName: string,
    indexName: string,
    indexValue: any,
  ): Promise<void> {
    await this.waitForDb(); // 确保数据库已初始化

    const transaction = this.db!.transaction(storeName, 'readwrite');
    const objectStore = transaction.objectStore(storeName);
    const index = objectStore.index(indexName);
    const request = index.openCursor(IDBKeyRange.only(indexValue));

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          cursor.delete();
          cursor.continue(); // 继续下一个结果
        } else {
          resolve(); // 遍历结束
        }
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }
}

export default IndexedDBService;

interface StoreConfig {
  name: string;
  keyPath: string;
  autoIncrement?: boolean;
  indexes?: { name: string; keyPath: string; options?: IDBIndexParameters }[];
  options?: IDBObjectStoreParameters;
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

      request.onupgradeneeded = () => {
        const db = request.result;

        this.stores.forEach((store) => {
          if (!db.objectStoreNames.contains(store.name)) {
            const objectStore = db.createObjectStore(store.name, {
              keyPath: store.keyPath,
              autoIncrement: store.autoIncrement,
              ...store.options,
            });

            // 创建索引
            store.indexes?.forEach((index) => {
              objectStore.createIndex(index.name, index.keyPath, index.options);
            });
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

  private waitForDb(): Promise<void> {
    return this._initPromise; // 返回Promise，等待数据库初始化完成
  }

  public async addData(storeName: string, data: T): Promise<IDBValidKey> {
    await this.waitForDb(); // 确保数据库已初始化

    const transaction = this.db!.transaction(storeName, 'readwrite');
    const objectStore = transaction.objectStore(storeName);
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

      for (let j = 0; j < storeData.length; j++) {
        const request = objectStore.add(storeData[j]);
        await new Promise((resolve, reject) => {
          request.onsuccess = () => {
            resolve(true);
          };

          request.onerror = () => {
            reject(request.error);
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

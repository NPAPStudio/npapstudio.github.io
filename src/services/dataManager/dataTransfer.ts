import { db } from './';

class LocalDataTransfer {
  async import(data: { db: any; localStorage: { [x: string]: string } }) {
    await db.importData(data.db);
    localStorage.clear();

    Object.keys(data.localStorage).forEach((key) => {
      localStorage.setItem(key, data.localStorage[key]);
    });

    return true;
  }

  async export() {
    const data = {
      db: await db.exportData(),
      localStorage: localStorage,
    };
    const blob = new Blob([JSON.stringify(data, null, 4)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gpt_playground_export_${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return data;
  }
}

export default LocalDataTransfer;

export const Local = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};
export const Session = {
  set(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  remove(key) {
    sessionStorage.removeItem(key);
  },
  clear() {
    sessionStorage.clear();
  },
};

class MyStorage {
  StorageName: string;
  StorageVal: object;
  constructor(StorageName = '__MyStorage__') {
    this.StorageName = StorageName;
    this.StorageVal = {};
    Local.set(this.StorageName, Local.get(this.StorageName) || this.StorageVal);
  }
  set(key, value) {
    this.StorageVal[key] = value;
    Local.set(this.StorageName, this.StorageVal);
  }
  get(key) {
    return Local.get(this.StorageName)[key];
  }
  remove(key) {
    delete this.StorageVal[key];
    Local.set(this.StorageName, this.StorageVal);
  }
  clear() {
    Local.clear();
  }
}

export const __MyStorage__ = new MyStorage();

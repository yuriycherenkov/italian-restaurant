interface IArguments {
  name: string;
  data: any;
}

export class Persister {
  storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  persistItem({ name, data }: IArguments) {
    this.storage.setItem(name, JSON.stringify(data));
  }

  deletePersistedItem(name: IArguments['name']) {
    this.storage.removeItem(name);
  }

  getPersistedItem(name: IArguments['name']) {
    const item = this.storage.getItem(name);
    try {
      return item ? JSON.parse(item) : null;
    } catch (err) {
      return item;
    }
  }

  clear() {
    this.storage.clear();
  }
}

export const localStoragePersister = new Persister(window.localStorage);

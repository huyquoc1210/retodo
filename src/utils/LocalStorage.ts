export type StorageKey = 'settings' | 'accessToken' | 'refreshToken';

// Namespace
class Utils {
  public get(key: StorageKey, defaultValue: any = null) {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.log(error);
      return defaultValue;
    }
  }

  public set(key: StorageKey, value: any) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }

  public remove(key: StorageKey) {
    window.localStorage.removeItem(key);
  }

  public clear() {
    window.localStorage.clear();
  }
}

const LocalStorage = new Utils();
export default LocalStorage;

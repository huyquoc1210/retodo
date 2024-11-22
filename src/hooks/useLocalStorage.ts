import { useEffect, useState } from 'react';
import type { StorageKey } from 'utils/LocalStorage';
import LocalStorage from 'utils/LocalStorage';

const useLocalStorage = <T>(key: StorageKey, initialState: T | (() => T)) => {
  const [state, setState] = useState<T>(() => {
    const value =
      initialState instanceof Function ? initialState() : initialState;

    const storedvalue = LocalStorage.get(key);

    if (storedvalue) {
      return storedvalue;
    } else {
      value && LocalStorage.set(key, value);
      return value;
    }
  });

  useEffect(() => {
    LocalStorage.set(key, state);
  }, [key, state]);

  return [state, setState] as const;
};

export default useLocalStorage;

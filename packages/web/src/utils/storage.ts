const storage = (storageType: 'local' | 'session') => {
  const _storage = storageType === 'local' ? window.localStorage : window.sessionStorage;

  const setItem = <T>(key: string, value: T) => {
    _storage.setItem(key, JSON.stringify(value));
  };

  const getItem = <T>(key: string, defaultValue: T): T | null => {
    try {
      const storedValue = _storage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (err) {
      return defaultValue;
    }
  };

  const removeItem = (key: string) => {
    _storage.removeItem(key);
  };

  return { setItem, getItem, removeItem };
};

export default storage;

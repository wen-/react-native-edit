import { AsyncStorage } from 'react-native';

const Store = {
  has: async name => {
    try {
      const res = await AsyncStorage.getItem(name);
      return res != null;
    } catch (e) {
      console.log('storage has err:', e);
      return false;
    }
  },
  get: async name => {
    try {
      const res = await AsyncStorage.getItem(name);
      return res ? JSON.parse(res) : null;
    } catch (e) {
      console.log('storage get err:', e);
      return null;
    }
  },
  set: async (name, val) => {
    try {
      const store = JSON.stringify(val);
      await AsyncStorage.setItem(name, store);
    } catch (e) {
      console.log('storage set err:', e);
    }
  },
  adddate: async (name, val) => {
    try {
      const res = await AsyncStorage.getItem(name);
      const store = res ? (Array.isArray(JSON.parse(res))?JSON.parse(res):[JSON.parse(res)]): [];
      store.push(val);
      await AsyncStorage.setItem(name, JSON.stringify(store));
    } catch (e) {
      console.log('storage update err:', e);
    }
  },
  update: async (name, val) => {
    try {
      const res = await AsyncStorage.getItem(name);
      const store = res ? JSON.parse(res): {};
      await AsyncStorage.setItem(name, JSON.stringify({ ...store, ...val}));
    } catch (e) {
      console.log('storage update err:', e);
    }
  },
  del: async name => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (e) {
      console.log('storage del err:', e);
    }
  },
  clear: async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log('storage clear err:', e);
    }
  }
};

global.Store = Store;

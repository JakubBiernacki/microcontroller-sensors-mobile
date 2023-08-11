import AsyncStorage from '@react-native-async-storage/async-storage'

export default class LocalStorage {
  constructor(public key: string) {}

  async save(value: string | object) {
    try {
      if (typeof value === 'object') {
        value = JSON.stringify(value)
      }

      await AsyncStorage.setItem(this.key, value)
    } catch (e) {
      console.error(e)
    }
  }

  async read(): Promise<Record<any, any> | Array<any> | any> {
    try {
      let value = await AsyncStorage.getItem(this.key)

      if (value === null) {
        return value
      }

      try {
        value = JSON.parse(value)
      } catch (e) {}
      return value
    } catch (e) {
      console.error(e)
    }
  }

  async clear() {
    try {
      await AsyncStorage.removeItem(this.key)
    } catch (e) {
      // remove error
    }
  }
}

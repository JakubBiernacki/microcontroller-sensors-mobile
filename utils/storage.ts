import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeDataString = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

export const storeDataObject = async (
  key: string,
  value: Record<any, any> | Array<any>,
) => {
  try {
    const jsonValue = JSON.stringify(value);
    await storeDataString(key, jsonValue);
  } catch (e) {
    console.error(e);
  }
};

export const getDataStringFromStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.error(e);
  }
};

export const getDataObjectFromStorage = async (
  key: string,
): Promise<Record<any, any> | Array<any> | null> => {
  try {
    const jsonValue = await getDataStringFromStorage(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getDataArrayFromStorage = async (
  key: string,
): Promise<Array<any> | []> => {
  try {
    const data = await getDataObjectFromStorage(key);
    if (data instanceof Array) {
      return data;
    }
    return [];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
  }

  console.log('Done.');
};

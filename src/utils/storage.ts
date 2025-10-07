// src/utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveJSON<T>(key: string, value: T) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function loadJSON<T>(key: string): Promise<T | null> {
  const s = await AsyncStorage.getItem(key);
  if (!s) return null;
  try {
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
}

export async function removeItem(key: string) {
  await AsyncStorage.removeItem(key);
}

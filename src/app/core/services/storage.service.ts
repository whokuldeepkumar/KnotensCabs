import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  setItem<T>(key: string, value: T, isSession = false): void {
    try {
      const storage = isSession ? sessionStorage : localStorage;
      storage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error saving to storage:', e);
    }
  }

  getItem<T>(key: string, isSession = false): T | null {
    try {
      const storage = isSession ? sessionStorage : localStorage;
      const data = storage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error reading from storage:', e);
      return null;
    }
  }

  removeItem(key: string, isSession = false): void {
    const storage = isSession ? sessionStorage : localStorage;
    storage.removeItem(key);
  }

  clear(isSession = false): void {
    const storage = isSession ? sessionStorage : localStorage;
    storage.clear();
  }
}

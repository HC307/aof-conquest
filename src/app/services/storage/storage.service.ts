import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly STORAGE_KEY = 'aof-conquest-state';

  saveState(state: any): void {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(this.STORAGE_KEY, serializedState);
    } catch (error) {
      console.error('Error saving state to localStorage:', error);
    }
  }

  loadState(): any {
    try {
      const serializedState = localStorage.getItem(this.STORAGE_KEY);
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (error) {
      console.error('Error loading state from localStorage:', error);
      return undefined;
    }
  }

  clearState(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing state from localStorage:', error);
    }
  }
}
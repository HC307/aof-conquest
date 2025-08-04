import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save state to localStorage', () => {
    const testState = { test: 'data' };
    service.saveState(testState);
    
    const stored = localStorage.getItem('aof-conquest-state');
    expect(stored).toBe(JSON.stringify(testState));
  });

  it('should load state from localStorage', () => {
    const testState = { test: 'data' };
    localStorage.setItem('aof-conquest-state', JSON.stringify(testState));
    
    const loaded = service.loadState();
    expect(loaded).toEqual(testState);
  });

  it('should return undefined when no state exists', () => {
    const loaded = service.loadState();
    expect(loaded).toBeUndefined();
  });

  it('should clear state from localStorage', () => {
    localStorage.setItem('aof-conquest-state', 'test');
    service.clearState();
    
    const stored = localStorage.getItem('aof-conquest-state');
    expect(stored).toBeNull();
  });
});
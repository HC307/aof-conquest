# Services

This document describes the services available in AOF Conquest.

## Core Services

### StorageService

Handles browser localStorage operations for state persistence.

**Location:** `/src/app/services/storage/storage.service.ts`

**Methods:**
```typescript
class StorageService {
  saveState(state: any): void    // Save state to localStorage
  loadState(): any               // Load state from localStorage
  clearState(): void             // Clear saved state
}
```

**Usage:**
```typescript
constructor(private storageService: StorageService) {}

// Save current state
this.storageService.saveState(currentState);

// Load saved state
const savedState = this.storageService.loadState();

// Clear storage
this.storageService.clearState();
```

**Storage Key:** `aof-conquest-state`

### RandomGeneratorService

Provides random generation utilities for game content.

**Location:** `/src/app/services/random-generator/random-generator.service.ts`

**Features:**
- Random number generation
- Weighted random selection
- Seed-based generation (if implemented)

**Methods:**
```typescript
class RandomGeneratorService {
  // Random generation methods
  getRandomInt(min: number, max: number): number
  getRandomElement<T>(array: T[]): T
  // Additional methods as implemented
}
```

## Service Patterns

### Singleton Services

All services use Angular's `providedIn: 'root'` pattern:

```typescript
@Injectable({
  providedIn: 'root'
})
export class ServiceName {
  // Service implementation
}
```

This ensures:
- Single instance across the app
- Tree-shakeable
- No need to add to providers array

### Dependency Injection

Services are injected via constructor:

```typescript
constructor(
  private storageService: StorageService,
  private randomGenerator: RandomGeneratorService
) {}
```

## State Management Services

While not traditional services, NgRx provides service-like functionality:

### Store Service
```typescript
constructor(private store: Store<AppState>) {}

// Dispatch actions
this.store.dispatch(someAction());

// Select state
this.data$ = this.store.select(selectData);
```

### Actions as Service Methods
Actions act as service methods for state updates:
```typescript
// Instead of service.updateTile(tile)
this.store.dispatch(updateTile({ tile }));
```

## Creating New Services

### 1. Generate Service
```bash
ng generate service services/service-name
```

### 2. Service Structure
```typescript
@Injectable({
  providedIn: 'root'
})
export class NewService {
  constructor(
    // Inject dependencies
  ) {}
  
  // Public methods
  public doSomething(): void {
    // Implementation
  }
  
  // Private helpers
  private helperMethod(): void {
    // Implementation
  }
}
```

### 3. Testing Services
```typescript
describe('NewService', () => {
  let service: NewService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewService);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  // Additional tests
});
```

## Service Best Practices

### 1. Single Responsibility
Each service should have one clear purpose:
- ✅ StorageService handles only storage
- ✅ RandomGeneratorService handles only randomization
- ❌ UtilityService with mixed responsibilities

### 2. Stateless Design
Services should generally be stateless:
```typescript
// Good - stateless
getRandomNumber(): number {
  return Math.random();
}

// Avoid - stateful
private lastNumber: number;
getNextNumber(): number {
  return ++this.lastNumber;
}
```

### 3. Observable Patterns
When services need to emit values over time:
```typescript
private dataSubject = new BehaviorSubject<Data>(initialData);
public data$ = this.dataSubject.asObservable();

updateData(newData: Data): void {
  this.dataSubject.next(newData);
}
```

### 4. Error Handling
Services should handle errors gracefully:
```typescript
loadData(): Observable<Data> {
  return this.http.get<Data>(url).pipe(
    catchError(error => {
      console.error('Error loading data:', error);
      return of(defaultData);
    })
  );
}
```

## Integration with Components

### Smart Components
Inject services and coordinate operations:
```typescript
export class SmartComponent {
  constructor(
    private store: Store<AppState>,
    private storageService: StorageService
  ) {}
  
  saveProgress(): void {
    const state = this.store.selectSnapshot(s => s);
    this.storageService.saveState(state);
  }
}
```

### Dumb Components
Receive data via inputs, no service dependencies:
```typescript
export class DumbComponent {
  @Input() data: Data;
  // No service injections
}
```

## Future Service Opportunities

Potential services that could be added:

1. **ValidationService**
   - Form validation rules
   - Entity validation
   - Business rule validation

2. **ExportService**
   - Export game data
   - Generate reports
   - Create backups

3. **NotificationService**
   - User notifications
   - Toast messages
   - Alert dialogs

4. **AnalyticsService**
   - Track user interactions
   - Feature usage metrics
   - Performance monitoring

5. **ConfigurationService**
   - App configuration
   - Feature flags
   - User preferences
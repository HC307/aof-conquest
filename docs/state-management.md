# State Management

AOF Conquest uses NgRx for predictable state management. This document covers the store structure, data flow, and state persistence.

## Store Structure

### Global State Shape

```typescript
interface AppState {
  generators: GeneratorsState;
  constructions: ConstructionState;
  tiles: TileState;
  tileFeatures: TileFeatureState;
  trophies: TrophyState;
  rules: RuleState;
  randomEncounters: RandomEncounterState;
  chronicles: ChronicleState;
  campaigns: CampaignState;
  factions: FactionState;
}
```

### Entity States

Each entity type follows the NgRx Entity pattern:

```typescript
interface EntityState<T> {
  ids: string[];
  entities: { [id: string]: T };
}
```

Example for Tiles:
```typescript
interface TileState extends EntityState<Tile> {
  selectedTileId: string | null;
}
```

Example for Factions:
```typescript
interface FactionState extends EntityState<Faction> {
  selectedFactionId: string | null;
}
```

## Key Files and Their Purposes

### 1. Reducers (`*-entities.reducers.ts`)
Handle state mutations in response to actions:

```typescript
// Example: tile-entities.reducers.ts
export const tileEntitiesReducer = createReducer(
  initialTileState,
  // Reducer logic here
);
```

### 2. Selectors (`*.selectors.ts`)
Provide efficient data queries:

```typescript
// Example: tile.selectors.ts
export const selectAllTiles = createSelector(
  selectTileState,
  tileAdapter.getSelectors().selectAll
);
```

### 3. Entity Adapters (`*Adapter.ts`)
Provide CRUD operations for entity collections:

```typescript
// Example: tileAdapter.ts
export const tileAdapter: EntityAdapter<Tile> = 
  createEntityAdapter<Tile>({
    selectId: (tile: Tile) => tile.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name)
  });
```

### 4. State Interfaces (`*.state.ts`)
Define the shape of each feature state:

```typescript
// Example: tile.state.ts
export interface TileState extends TileEntityState {
  selectedTileId: string | null;
}
```

## Data Flow

```
Component → Action → Reducer → State → Selector → Component
```

1. **Component** dispatches an action
2. **Reducer** processes the action and updates state
3. **State** is updated immutably
4. **Selectors** compute derived data
5. **Component** receives updated data via observables

## State Persistence

The application automatically persists state to localStorage using a meta-reducer.

### How It Works

1. **Storage Meta-Reducer** (`storage.meta-reducer.ts`):
   - Intercepts all actions
   - Saves state to localStorage after each action
   - Loads saved state on app initialization
   - Merges saved state with initial state on startup

2. **Storage Key**: `aof-conquest-state`

3. **Persistence Flow**:
   ```
   App Start → Load State from localStorage → Merge with Initial State
   Action → Update State → Save to localStorage
   ```

### Implementation Details

The meta-reducer is configured in `app.config.ts`:
```typescript
provideStore(reducers, {
  metaReducers: [storageMetaReducer]
})
```

The `storageMetaReducer` function:
- Loads state from localStorage on first run
- Saves state after every action
- Handles errors gracefully with console logging

### Storage Service

The `StorageService` provides methods for manual storage operations:

```typescript
class StorageService {
  saveState(state: any): void      // Save state to localStorage
  loadState(): any                 // Load state from localStorage  
  clearState(): void               // Remove state from localStorage
}
```

### Storage Info Component

A utility component is available to monitor storage:
```typescript
<app-storage-info></app-storage-info>
```

This component displays:
- Current storage status
- Storage size in characters
- Option to clear storage

## State Initialization

State is initialized from multiple sources in order:

1. **Initial State**: Defined in reducers
2. **Static Data**: Loaded from collection files
3. **Persisted State**: Loaded from localStorage

Example initialization:
```typescript
// In collection files
export const TILES_COLLECTION: TileEntityState = {
  ids: ['tile1', 'tile2'],
  entities: {
    'tile1': { id: 'tile1', name: 'Forest', ... },
    'tile2': { id: 'tile2', name: 'Mountain', ... }
  }
};
```

## Best Practices

### 1. Immutability
Always return new state objects:
```typescript
// Good
return { ...state, loading: true };

// Bad
state.loading = true;
return state;
```

### 2. Normalized State
Store entities in a normalized format using Entity adapters.

### 3. Selector Composition
Build complex selectors from simple ones:
```typescript
export const selectTilesByType = (type: TileType) =>
  createSelector(
    selectAllTiles,
    tiles => tiles.filter(tile => tile.type === type)
  );
```

### 4. Action Hygiene
- Use action creators
- Follow naming convention: `[Source] Event`
- Keep actions focused on a single purpose

## Common Patterns

### Loading Entity Collections
```typescript
// Initial state includes static data
export const initialTileState: TileState = {
  ...tileAdapter.getInitialState(),
  ...TILES_COLLECTION
};
```

### Selecting Entities
```typescript
// In component
tiles$ = this.store.select(TileSelectors.selectAllTiles);
```

### Managing Selection State
```typescript
// Faction selection example
// Action to select a faction
this.store.dispatch(factionActions.selectFaction({ id: faction.id }));

// Selector to get selected faction
selectedFaction$ = this.store.select(selectSelectedFaction);
selectedFactionId$ = this.store.select(selectSelectedFactionId);

// Auto-clear selection when entity is removed
on(factionActions.remove, (state, { id }) => {
  const newState = factionAdapter.removeOne(id, state);
  return {
    ...newState,
    selectedFactionId: state.selectedFactionId === id ? null : state.selectedFactionId
  };
})
```

### Filtering Entities
```typescript
// Selector with filter
export const selectConstructionsByTileType = (tileType: TileType) =>
  createSelector(
    selectAllConstructions,
    constructions => constructions.filter(c => c.tiles.includes(tileType))
  );
```

## Debugging

### Redux DevTools
The app includes Redux DevTools integration:
- View state tree
- Time-travel debugging
- Action history
- State diffs

### Logging State Changes
State changes are automatically logged in development mode through the Redux DevTools.
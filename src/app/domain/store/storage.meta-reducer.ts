import { ActionReducer, MetaReducer } from '@ngrx/store';
import { AppState } from './app.state';

const STORAGE_KEY = 'aof-conquest-state';

function saveState(state: any): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }
}

function loadState(): any {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    return undefined;
  }
}

export function storageMetaReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  let onInit = true;

  return function(state: AppState | undefined, action: any): AppState {
    const nextState = reducer(state, action);

    if (onInit) {
      onInit = false;
      const savedState = loadState();
      if (savedState) {
        // Intelligently merge saved state with initial state
        const mergedState: any = {};
        
        // Iterate through each state key
        Object.keys(nextState).forEach(key => {
          const initialStateSlice = (nextState as any)[key];
          const savedStateSlice = savedState[key];
          
          // If both have entities (entity state pattern), merge them
          if (initialStateSlice?.entities && savedStateSlice?.entities) {
            // Start with all initial entities
            const mergedEntities = { ...initialStateSlice.entities };
            const mergedIds = [...initialStateSlice.ids];
            
            // Add saved entities, checking for user-created or missing entities
            Object.entries(savedStateSlice.entities).forEach(([id, entity]: [string, any]) => {
              // Add if it's user-created or if it doesn't exist in initial state
              if (entity.isUserCreated || !initialStateSlice.entities[id]) {
                mergedEntities[id] = entity;
                if (!mergedIds.includes(id)) {
                  mergedIds.push(id);
                }
              }
            });
            
            mergedState[key] = {
              ...savedStateSlice,
              entities: mergedEntities,
              ids: mergedIds
            };
          } else {
            // For non-entity states, prefer saved state
            mergedState[key] = savedStateSlice || initialStateSlice;
          }
        });
        
        return mergedState as AppState;
      }
    }

    // Save state after each action
    saveState(nextState);
    return nextState;
  };
}
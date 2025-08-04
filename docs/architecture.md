# Architecture Overview

AOF Conquest follows a modular, component-based architecture built on Angular 19 with NgRx for state management.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                   User Interface                     │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │   Shell     │  │   Features   │  │ Components │ │
│  │ Navigation  │  │  Compendium  │  │   Shared   │ │
│  └─────────────┘  └──────────────┘  └────────────┘ │
└─────────────────────────┬───────────────────────────┘
                          │
┌─────────────────────────┴───────────────────────────┐
│                  State Management                    │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │    Store    │  │   Reducers   │  │ Selectors  │ │
│  │   (NgRx)    │  │              │  │            │ │
│  └─────────────┘  └──────────────┘  └────────────┘ │
└─────────────────────────┬───────────────────────────┘
                          │
┌─────────────────────────┴───────────────────────────┐
│                  Domain Layer                        │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │   Models    │  │     Data     │  │  Services  │ │
│  │ Interfaces  │  │ Collections  │  │            │ │
│  └─────────────┘  └──────────────┘  └────────────┘ │
└─────────────────────────────────────────────────────┘
```

## Core Principles

### 1. Separation of Concerns
- **Presentation Layer**: Components handle UI and user interactions
- **State Layer**: NgRx manages application state
- **Domain Layer**: Business logic and data models

### 2. Unidirectional Data Flow
- Components dispatch actions
- Reducers update state
- Selectors provide data to components
- Effects handle side effects (if needed)

### 3. Module Organization

#### Domain Module (`/domain`)
- **data/**: Static data collections for each entity type
- **model/**: TypeScript interfaces and enums
- **store/**: NgRx state management files

#### Features Module (`/features`)
- **compendium/**: Entity browsing and viewing
- **generators/**: Random content generation
- **home/**: Landing page
- **rules/**: Game rules display
- **shell/**: Application shell with navigation

#### Components Module (`/components`)
Shared, reusable UI components:
- Display components (tile-display, trophy-display, etc.)
- Form components (text-field, dropdown-select)
- Layout components (panel, scroll-view, card)

### 4. State Structure

The application state is organized by entity type:
```typescript
AppState {
  generators: GeneratorsState
  constructions: ConstructionState
  tiles: TileState
  tileFeatures: TileFeatureState
  trophies: TrophyState
  rules: RuleState
  randomEncounters: RandomEncounterState
  chronicles: ChronicleState
}
```

Each entity state uses NgRx Entity for normalized storage.

### 5. Routing Strategy

The app uses a hierarchical routing structure:
- `/home` - Landing page
- `/rules` - Rules reference
- `/compendium` - Parent route
  - `/compendium/tiles`
  - `/compendium/construction`
  - `/compendium/trophies`
  - `/compendium/random-encounters`
  - `/compendium/tile-features`
- `/generators` - Generation tools

### 6. Component Architecture

Components follow Angular's standalone component pattern:
```typescript
@Component({
  selector: 'app-component-name',
  standalone: true,
  imports: [CommonModule, ...],
  templateUrl: './component-name.component.html',
  styleUrls: ['./component-name.component.scss']
})
```

### 7. Data Persistence

The application implements browser-based persistence using:
- localStorage for state storage
- Meta-reducer for automatic save/load
- Persistence across browser sessions

## Design Patterns

### Entity Adapter Pattern
Uses NgRx Entity for managing collections of entities with built-in CRUD operations.

### Smart/Dumb Components
- **Smart Components**: Connected to store, handle business logic
- **Dumb Components**: Pure presentation, receive data via inputs

### Facade Pattern
Services act as facades to complex state operations, providing simple APIs to components.

## Performance Considerations

1. **OnPush Change Detection**: Components use OnPush strategy where applicable
2. **Lazy Loading**: Feature modules can be lazy-loaded
3. **State Normalization**: Entity adapter ensures normalized state structure
4. **Memoized Selectors**: NgRx selectors are memoized for performance
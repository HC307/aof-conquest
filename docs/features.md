# Features and Routing

This document describes the feature modules and routing structure of AOF Conquest.

## Feature Modules

### 1. Shell Feature

The application shell provides the main layout structure.

**Components:**
- `ShellComponent` - Main layout container
- `HeaderComponent` - Top navigation bar
- `SideNavComponent` - Side navigation menu
- `FooterComponent` - Footer information
- `ContentComponent` - Content wrapper

**Route:** Base route (`/`)

**Key Features:**
- Responsive navigation
- Route outlet for feature content
- Consistent layout across app

### 2. Home Feature

Landing page and application entry point.

**Component:** `HomeComponent`

**Route:** `/home`

**Features:**
- Welcome message
- Quick links to main features
- Application overview

### 3. Chronicler Feature

Campaign management tool for tracking conquest campaigns.

**Component:** `ChroniclerComponent` (main list)
**Component:** `ChronicleDetailComponent` (detail view)

**Routes:**
```
/chronicler           - Campaign list
/chronicler/:id       - Campaign detail view
```

**Features:**
- Create new campaigns with metadata
- List all campaigns with status indicators
- Navigate to detailed campaign views
- Edit campaign properties (user-created only)
- Delete campaigns (user-created only)
- Manage campaign status (Active, Paused, Completed)
- Track turn progression
- Persistent storage in browser localStorage

**Campaign Properties:**
- `id`: Unique identifier
- `name`: Campaign name
- `description`: Optional description
- `flavour`: Optional flavour text
- `keywords`: Associated keywords
- `createdDate`: Creation timestamp
- `lastModified`: Last update timestamp
- `playerCount`: Number of players
- `currentTurn`: Current turn number
- `status`: Campaign status
- `userCreated`: Flag for user-created campaigns

#### Faction Management

Within campaign detail view, users can manage factions with full hierarchical support:

**Faction Structure:**
```
Faction
├── Warband
│   ├── Unit
│   │   ├── Ability
│   │   ├── Ability
│   │   └── ...
│   ├── Unit
│   └── ...
├── Warband
└── ...
```

**Features:**
- Create, edit, and delete factions
- Track selected faction in NgRx state
- Visual selection indicator in faction list
- Manage warbands within factions
- Manage units within warbands
- Manage abilities within units
- Expandable/collapsible hierarchy view
- Inline editing at all levels
- Count badges for child elements
- All operations on single page

### 4. Rules Feature

Displays game rules and mechanics.

**Component:** `RulesComponent`

**Route:** `/rules`

**Features:**
- Rule browsing
- Search functionality
- Categorized rule display

### 4. Compendium Feature

Comprehensive browser for all game entities.

**Component:** `CompendiumComponent` (parent)

**Routes:**
```
/compendium
├── /tiles              - TileCompendiumComponent
├── /construction       - ConstructionCompendiumComponent
├── /trophies          - TrophyCompendiumComponent
├── /random-encounters  - RandomEncounterCompendiumComponent
└── /tile-features     - TileFeatureCompendiumComponent
```

**Features:**
- Entity browsing
- Filtering and search
- Detailed entity views
- Sub-navigation

#### Compendium Sub-Features

All compendium sub-features now use the `GenericCompendiumComponent` with specific configurations:

**Tile Compendium** (`TileCompendiumComponent`)
- Browse all tile types
- Uses `TileDisplayComponent` for rendering
- Selector: `TileEntitiesSelectors.filtered()`

**Construction Compendium** (`ConstructionCompendiumComponent`)
- List all constructions
- Uses `ConstructionDisplayComponent` for rendering
- Selector: `ConstructionEntitiesSelectors.filtered()`

**Trophy Compendium** (`TrophyCompendiumComponent`)
- Achievement gallery
- Uses `TrophyDisplayComponent` for rendering
- Selector: `TrophyEntitiesSelectors.filtered()`

**Random Encounter Compendium** (`RandomEncounterCompendiumComponent`)
- Event browser
- Uses `RandomEncounterDisplayComponent` for rendering
- Selector: `RandomEncounterEntitiesSelectors.filtered()`

**Tile Feature Compendium** (`TileFeatureCompendiumComponent`)
- Special feature catalog
- Uses `TileFeatureDisplayComponent` for rendering
- Selector: `TileFeatureEntitiesSelectors.filtered()`

Each compendium component is now a thin wrapper that provides configuration to the generic component:
```typescript
export class TileCompendiumComponent {
  compendiumConfig: CompendiumConfig<Tile> = {
    title: 'Tiles',
    entityName: 'tile',
    displayComponent: TileDisplayComponent,
    selector: (filter) => this.store.select(TileEntitiesSelectors.filtered(filter)),
    emptyMessage: 'Select a tile.'
  };
}
```

### 5. Generators Feature

Tools for generating random game content.

**Component:** `GeneratorsComponent`

**Route:** `/generators`

**Sub-components:**
- `TileGeneratorComponent` - Random tile generation

**State Management:**
```typescript
interface GeneratorsState {
  tileGeneratorConfig: TileGeneratorConfig;
}
```

**Features:**
- Configurable generation parameters
- Real-time preview
- Save generated content
- Export functionality

### 6. Configuration Feature

User content management and settings.

**Component:** `ConfigurationComponent`

**Route:** `/configuration`

**Features:**
- Bulk delete operations for all user-created content
- Storage information display
- Confirmation dialogs for destructive actions
- Entity type management (tiles, constructions, trophies, etc.)

## Routing Configuration

### Route Structure

```typescript
export const routes: Routes = [
  {
    title: 'Home',
    path: 'home',
    component: HomeComponent,
  },
  {
    title: 'Rules',
    path: 'rules',
    component: RulesComponent,
  },
  {
    title: 'Chronicler',
    path: 'chronicler',
    component: ChroniclerComponent,
  },
  {
    title: 'Chronicle Detail',
    path: 'chronicler/:id',
    component: ChronicleDetailComponent,
  },
  {
    title: 'Compendium',
    path: 'compendium',
    component: CompendiumComponent,
    children: [
      {
        path: 'tiles',
        title: 'Tiles',
        component: TileCompendiumComponent,
      },
      // ... other child routes
    ],
  },
  {
    title: 'Generators',
    path: 'generators',
    component: GeneratorsComponent,
  },
  {
    title: 'Configuration',
    path: 'configuration',
    component: ConfigurationComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
```

### Navigation Flow

```
Application Start
    ↓
Shell Component
    ↓
Home (default)
    ↓
User Navigation → Feature Routes
```

## Feature Patterns

### 1. Feature Module Structure
```
feature/
├── components/          # Feature-specific components
├── state/              # Feature state (if needed)
├── feature.component.ts # Main feature component
├── feature.component.html
├── feature.component.scss
└── feature.component.spec.ts
```

### 2. State Integration
Features connect to the global store:

```typescript
export class FeatureComponent {
  data$ = this.store.select(selectFeatureData);
  
  constructor(private store: Store<AppState>) {}
}
```

### 3. Route Guards
Currently no route guards implemented, but structure supports adding:
- Authentication guards
- Feature flag guards
- Data preloading guards

## Navigation Components

### Side Navigation
Dynamic menu generation based on routes:

```typescript
navigationItems = [
  { path: '/home', label: 'Home', icon: 'home' },
  { path: '/rules', label: 'Rules', icon: 'book' },
  { path: '/chronicler', label: 'Chronicler', icon: 'journal' },
  { path: '/compendium', label: 'Compendium', icon: 'library' },
  { path: '/generators', label: 'Generators', icon: 'casino' },
  { path: '/configuration', label: 'Configuration', icon: 'settings' }
];
```

### Breadcrumbs
Compendium feature includes sub-navigation:

```html
<nav class="compendium-nav">
  <a routerLink="tiles">Tiles</a>
  <a routerLink="construction">Constructions</a>
  <!-- etc -->
</nav>
```

## Adding New Features

### 1. Create Feature Structure
```bash
ng generate component features/new-feature
```

### 2. Add Route Configuration
```typescript
{
  path: 'new-feature',
  title: 'New Feature',
  component: NewFeatureComponent
}
```

### 3. Update Navigation
Add to side navigation configuration.

### 4. Add State (if needed)
- Create state interface
- Add to AppState
- Create reducer and selectors

## Feature Communication

### Via Store
Features communicate through shared state:

```typescript
// Feature A dispatches action
this.store.dispatch(updateData({ data }));

// Feature B subscribes to changes
this.data$ = this.store.select(selectData);
```

### Via Services
Shared services for cross-feature functionality:

```typescript
@Injectable({ providedIn: 'root' })
export class SharedService {
  // Shared logic
}
```

## Performance Considerations

### Lazy Loading
Features can be converted to lazy-loaded modules:

```typescript
{
  path: 'feature',
  loadChildren: () => import('./feature/feature.module')
    .then(m => m.FeatureModule)
}
```

### Preloading Strategies
- Preload all modules
- Selective preloading
- Custom preloading strategy

## Testing Features

Each feature should include:

1. **Component Tests**
   - Rendering tests
   - User interaction tests
   - Route navigation tests

2. **Integration Tests**
   - State integration
   - Service integration
   - Cross-feature workflows

3. **E2E Tests** (if implemented)
   - Complete user journeys
   - Navigation flows
   - Data persistence
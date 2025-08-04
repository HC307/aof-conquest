# Components Guide

This document describes the shared UI components available in AOF Conquest.

## Component Categories

### Display Components

Components for displaying game entities and data.

#### TileDisplay
Displays tile information with visual representation.

```typescript
@Component({
  selector: 'app-tile-display',
  standalone: true
})
```

**Usage:**
```html
<app-tile-display [tile]="tileData"></app-tile-display>
```

#### ConstructionDisplay
Shows construction details including cost and requirements.

```typescript
@Component({
  selector: 'app-construction-display',
  standalone: true
})
```

#### TrophyDisplay
Renders trophy/achievement information.

```typescript
@Component({
  selector: 'app-trophy-display',
  standalone: true
})
```

#### RandomEncounterDisplay
Displays random encounter details.

```typescript
@Component({
  selector: 'app-random-encounter-display',
  standalone: true
})
```

#### TileFeatureDisplay
Shows special tile features and their effects.

```typescript
@Component({
  selector: 'app-tile-feature-display',
  standalone: true
})
```

#### RuleDisplay
Formats and displays game rules.

```typescript
@Component({
  selector: 'app-rule-display',
  standalone: true
})
```

#### LootDisplay
Shows loot rewards and drops.

```typescript
@Component({
  selector: 'app-loot-display',
  standalone: true
})
```

#### RarityDisplay
Visual indicator for item rarity levels.

```typescript
@Component({
  selector: 'app-rarity-display',
  standalone: true
})
```

**Props:**
- `rarity: Rarity` - The rarity level to display

### Form Components

Interactive components for user input.

#### TextField
Standard text input component.

```typescript
@Component({
  selector: 'app-text-field',
  standalone: true
})
```

**Features:**
- Label support
- Validation
- Error messages
- Placeholder text

#### DropdownSelect
Select dropdown component.

```typescript
@Component({
  selector: 'app-dropdown-select',
  standalone: true
})
```

**Features:**
- Option list
- Default selection
- Change events
- Custom styling

#### ToggleList
Multi-select toggle list component.

```typescript
@Component({
  selector: 'app-toggle-list',
  standalone: true
})
```

**Input Interface:**
```typescript
interface ToggleListInput {
  items: any[];
  selectedItems: any[];
  displayProperty: string;
}
```

### Layout Components

Components for structuring UI layouts.

#### Panel
Container component with styled borders.

```typescript
@Component({
  selector: 'app-panel',
  standalone: true
})
```

**Usage:**
```html
<app-panel>
  <h2>Panel Title</h2>
  <p>Panel content goes here</p>
</app-panel>
```

#### Card
Card layout component for content grouping.

```typescript
@Component({
  selector: 'app-card',
  standalone: true
})
```

**Features:**
- Header slot
- Content area
- Footer slot
- Shadow effects

#### ScrollView
Scrollable container with custom scrollbar.

```typescript
@Component({
  selector: 'app-scroll-view',
  standalone: true
})
```

**Features:**
- Vertical scrolling
- Custom scrollbar styling
- Smooth scrolling
- Height constraints

### Navigation Components

#### NavLink
Navigation link component for routing.

```typescript
@Component({
  selector: 'app-nav-link',
  standalone: true
})
```

**Features:**
- Router integration
- Active state styling
- Accessibility support

#### TileLink (tile.component.ts)
Specialized navigation for tile entities.

```typescript
@Component({
  selector: 'app-tile-link',
  standalone: true
})
```

### Data Management Components

#### GenericCompendium
Reusable component for browsing and displaying entity collections.

```typescript
@Component({
  selector: 'app-generic-compendium',
  standalone: true
})
```

**Location:** `/src/app/components/generic-compendium/generic-compendium.component.ts`

**Configuration Interface:**
```typescript
interface CompendiumConfig<T extends BaseEntity> {
  title: string;
  entityName: string;
  displayComponent: Type<any>;
  selector: (filter: string) => Observable<T[]>;
  emptyMessage: string;
  canAdd?: boolean;
  createNew?: () => Partial<T>;
  onAdd?: (entity: T) => void;
}
```

**Features:**
- Generic entity browsing
- Filter/search functionality
- Dynamic component rendering
- Automatic state management
- Type-safe configuration
- Optional "Add New" functionality
- Entity creation dialog

**Usage Example:**
```typescript
compendiumConfig: CompendiumConfig<Tile> = {
  title: 'Tiles',
  entityName: 'tile',
  displayComponent: TileDisplayComponent,
  selector: (filter) => this.store.select(TileSelectors.filtered(filter)),
  emptyMessage: 'Select a tile.',
  canAdd: true,
  createNew: () => ({ name: '', type: TileType.GRASSLANDS }),
  onAdd: (tile) => this.store.dispatch(tileActions.add({ tile }))
};

// In template
<app-generic-compendium [config]="compendiumConfig"></app-generic-compendium>
```

#### EntityForm
Inline form component for creating/editing entities.

```typescript
@Component({
  selector: 'app-entity-form',
  standalone: true
})
```

**Location:** `/src/app/components/entity-form/entity-form.component.ts`

**Features:**
- Generic entity form displayed inline
- Name and description fields
- Form validation
- Cancel/Save actions
- Content projection for additional fields
- Integrated with generic compendium

**Props:**
- `entityName: string` - Entity type name for display
- `initialData: Partial<T>` - Initial form data

**Events:**
- `save: EventEmitter<Partial<T>>` - Emitted on save with form data
- `cancel: EventEmitter<void>` - Emitted on cancel

**Usage:**
When "Add New" is clicked in a compendium, the form appears in the display area instead of the selected entity.

### Utility Components

#### Button
Styled button component.

```typescript
@Component({
  selector: 'app-button',
  standalone: true
})
```

**Variants:**
- Primary
- Secondary
- Danger
- Success

#### StorageInfo
Displays localStorage status and provides storage management.

```typescript
@Component({
  selector: 'app-storage-info',
  standalone: true
})
```

**Location:** `/src/app/components/storage-info/storage-info.component.ts`

**Features:**
- Storage status (Active/Empty)
- Storage size display in characters
- Clear storage option with confirmation
- Real-time updates
- Auto-refresh on storage changes

**Usage:**
```html
<app-storage-info></app-storage-info>
```

**Methods:**
- `checkStorage()`: Updates storage status
- `clearStorage()`: Clears localStorage with confirmation

## Component Patterns

### Standalone Components
All components use Angular's standalone component pattern:

```typescript
@Component({
  selector: 'app-component-name',
  standalone: true,
  imports: [CommonModule, ...otherModules],
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
```

### Input/Output Pattern
Components communicate via inputs and outputs:

```typescript
export class ExampleComponent {
  @Input() data: any;
  @Output() dataChange = new EventEmitter<any>();
}
```

### Content Projection
Many components support content projection:

```html
<app-panel>
  <ng-content></ng-content>
</app-panel>
```

## Styling

### SCSS Structure
Each component has its own SCSS file following BEM conventions:

```scss
.component-name {
  &__element {
    // Element styles
  }
  
  &--modifier {
    // Modifier styles
  }
}
```

### Style Configuration
Global style variables are defined in:
- `src/app/styles/config/_spaces.scss` - Spacing system
- `src/app/styles/config/_typography.scss` - Typography settings
- `src/app/styles/config/_config.scss` - General configuration

## Best Practices

### 1. Component Responsibilities
- Keep components focused on presentation
- Delegate business logic to services
- Use smart/dumb component pattern

### 2. Accessibility
- Include ARIA labels
- Support keyboard navigation
- Maintain proper contrast ratios

### 3. Performance
- Use OnPush change detection where possible
- Minimize DOM manipulation
- Implement trackBy for lists

### 4. Testing
Each component should have:
- Unit tests (`.spec.ts`)
- Input/output testing
- User interaction testing

## Creating New Components

1. Use Angular CLI: `ng generate component component-name`
2. Make it standalone
3. Place in appropriate directory:
   - `/components` for shared components
   - `/features/[feature]/components` for feature-specific
4. Add appropriate inputs/outputs
5. Write tests
6. Document usage

## Component Communication

### Parent to Child
Via `@Input()` properties:
```html
<app-child [data]="parentData"></app-child>
```

### Child to Parent
Via `@Output()` events:
```html
<app-child (dataChange)="onDataChange($event)"></app-child>
```

### Cross-Component
Via services or state management:
```typescript
constructor(private store: Store<AppState>) {
  this.data$ = this.store.select(selectData);
}
```
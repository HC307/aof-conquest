# Domain Models

This document describes the core data models and interfaces used throughout AOF Conquest.

## Base Entity

All domain entities extend the `BaseEntity` interface:

```typescript
interface BaseEntity {
  id: string;
  name: string;
  description?: string;
  keywords?: KeywordEnum[];
  flavour?: string;
}
```

## Core Entities

### 1. Tile

Represents a game board tile or location.

```typescript
interface Tile extends BaseEntity {
  type: TileType;
}
```

**TileType** values:
- Various tile types representing different terrains or locations

### 2. Construction

Represents buildable structures.

```typescript
interface Construction extends BaseEntity {
  constructionCost: Price;
  tiles: TileType[];  // Valid tile types for placement
}
```

### 3. Trophy

Represents achievements or collectibles.

```typescript
interface Trophy extends BaseEntity {
  // Inherits all BaseEntity properties
}
```

### 4. TileFeature

Special features that can appear on tiles.

```typescript
interface TileFeature extends BaseEntity {
  // Additional properties specific to tile features
}
```

### 5. RandomEncounter

Random events that can occur during gameplay.

```typescript
interface RandomEncounter extends BaseEntity {
  // Properties defining encounter mechanics
}
```

### 6. Rule

Game rules and mechanics.

```typescript
interface Rule extends BaseEntity {
  // Rule-specific properties
}
```

### 7. Chronicle

Historical records or story elements.

```typescript
interface Chronicle extends BaseEntity {
  // Chronicle-specific properties
}
```

## Supporting Types

### Price

Represents costs in the game economy.

```typescript
interface Price {
  amount: number;
  currency: Currency;
}
```

### Currency Enum

```typescript
enum Currency {
  // Various currency types used in the game
}
```

### Rarity Enum

```typescript
enum Rarity {
  COMMON = 'Common',
  UNCOMMON = 'Uncommon',
  RARE = 'Rare',
  EPIC = 'Epic',
  LEGENDARY = 'Legendary'
}
```

### Faction Enum

```typescript
enum Faction {
  // Various faction identifiers
}
```

### Keyword Enum

Keywords are used for categorization and searching:

```typescript
enum KeywordEnum {
  // Various keywords for tagging entities
}
```

## Loot System

The loot system defines rewards and drops:

```typescript
class Loot {
  // Properties defining loot tables and rewards
}
```

## Tile Prompts

Special interfaces for tile generation:

```typescript
interface TilePrompt {
  // Properties for generating tile content
}
```

Related prompt types:
- Tile encounter prompts
- Tile location prompts
- Tile loot prompts

## Data Collections

Static data is organized in collection files:

### Collection Structure

Each entity type has a collection file that exports:

```typescript
export const ENTITY_COLLECTION: EntityState = {
  ids: ['id1', 'id2', ...],
  entities: {
    'id1': { /* entity data */ },
    'id2': { /* entity data */ },
    // ...
  }
};
```

### Collection Files

- `constructions.collection.ts`
- `random-encounters.collection.ts`
- `rules.collection.ts`
- `tile-features.collection.ts`
- `tiles.collection.ts`
- `trophy.collection.ts`

## Entity Relationships

### Tile ↔ Construction
- Constructions specify which tile types they can be built on
- Tiles can host constructions

### Tile ↔ TileFeature
- Tiles can have special features
- Features modify tile behavior

### Entity ↔ Keywords
- All entities can have keywords for categorization
- Keywords enable filtering and searching

## Usage Examples

### Creating a New Tile
```typescript
const forestTile: Tile = {
  id: 'forest_01',
  name: 'Dense Forest',
  description: 'A thick forest with towering trees',
  type: TileType.FOREST,
  keywords: [KeywordEnum.NATURE, KeywordEnum.DIFFICULT_TERRAIN],
  flavour: 'The ancient trees whisper secrets...'
};
```

### Creating a Construction
```typescript
const watchtower: Construction = {
  id: 'watchtower_01',
  name: 'Wooden Watchtower',
  description: 'Provides vision over surrounding areas',
  constructionCost: {
    amount: 100,
    currency: Currency.GOLD
  },
  tiles: [TileType.PLAINS, TileType.HILLS],
  keywords: [KeywordEnum.DEFENSIVE, KeywordEnum.VISION]
};
```

## Best Practices

1. **Always extend BaseEntity** for new entity types
2. **Use enums** for fixed value sets (Currency, Rarity, etc.)
3. **Keep entities normalized** in state (use ID references)
4. **Use keywords** for flexible categorization
5. **Document special behaviors** in description fields

## Adding New Entity Types

1. Create interface extending `BaseEntity`
2. Add to `AppState` interface
3. Create state, reducer, selectors, and adapter
4. Add static data collection
5. Update relevant UI components
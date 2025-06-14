import { TileEntityState } from '../../store/tiles/tile.state';
import { TileType } from '../../model/tileType';

export const TileCollection: TileEntityState = {
  ids: [
    'beach',
    'broken-lands',
    'dead-forest',
    'desert',
    'cactus-desert',
    'farmland',
    'forest',
    'fungal-forest',
    'grasslands',
    'hills',
    'jungle',
    'mountain',
    'needle-forest',
    'ocean',
    'savannah',
    'sea',
    'shoal',
    'snow',
    'swamp',
  ],
  entities: {
    beach: {
      id: 'beach',
      name: TileType.BEACH,
      type: TileType.BEACH,
      description: 'A Beach',
    },
    'broken-lands': {
      id: 'broken-lands',
      name: TileType.BROKEN_LANDS,
      type: TileType.BROKEN_LANDS,
      description: 'A broken and ravaged landscape.',
    },
    'dead-forest': {
      id: 'dead-forest',
      name: TileType.DEAD_FOREST,
      type: TileType.DEAD_FOREST,
      description: 'A desolate forest.',
    },
    desert: {
      id: 'desert',
      name: TileType.DESERT,
      type: TileType.DESERT,
      description: 'A blazing desert.',
    },
    'cactus-desert': {
      id: 'cactus-desert',
      name: TileType.DESERT_CACTUS,
      type: TileType.DESERT_CACTUS,
      description: 'A prickly desert.',
    },
    farmland: {
      id: 'farmland',
      name: TileType.FARMLAND,
      type: TileType.FARMLAND,
      description: 'A worked farmland.',
    },
    forest: {
      id: 'forest',
      name: TileType.FOREST,
      type: TileType.FOREST,
      description: 'A lush forest',
    },
    'fungal-forest': {
      id: 'fungal-forest',
      name: TileType.FUNGAL_FOREST,
      type: TileType.FUNGAL_FOREST,
      description: 'A dank mushroom spread.',
    },
    grasslands: {
      id: 'grasslands',
      name: TileType.GRASSLANDS,
      type: TileType.GRASSLANDS,
      description: 'A grassy area',
    },
    hills: {
      id: 'hills',
      name: TileType.HILLS,
      type: TileType.HILLS,
      description: 'A serene hill.',
    },
    jungle: {
      id: 'jungle',
      name: TileType.JUNGLE,
      type: TileType.JUNGLE,
      description: 'A jungle.',
    },
    mountain: {
      id: 'mountain',
      name: TileType.MOUNTAIN,
      type: TileType.MOUNTAIN,
      description: 'A mighty mountain.',
    },
    'needle-forest': {
      id: 'needle-forest',
      name: TileType.NEEDLE_FOREST,
      type: TileType.NEEDLE_FOREST,
      description: 'A needly forest.',
    },
    ocean: {
      id: 'ocean',
      name: TileType.OCEAN,
      type: TileType.OCEAN,
      description: 'A vast ocean.',
    },
    savannah: {
      id: 'savannah',
      name: TileType.SAVANNAH,
      type: TileType.SAVANNAH,
      description: 'A vast savannah.',
    },
    sea: {
      id: 'sea',
      name: TileType.SEA,
      type: TileType.SEA,
      description: 'A roiling sea.',
    },
    shoal: {
      id: 'shoal',
      name: TileType.SHOAL,
      type: TileType.SHOAL,
      description: 'A shoaling shoal.',
    },
    snow: {
      id: 'snow',
      name: TileType.SNOW,
      type: TileType.SNOW,
      description: 'A snowy landscape.',
    },
    swamp: {
      id: 'swamp',
      name: TileType.SWAMP,
      type: TileType.SWAMP,
      description: 'A ogres swamp.',
    },
  },
};

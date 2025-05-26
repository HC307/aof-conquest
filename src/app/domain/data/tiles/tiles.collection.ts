import {TileEntityState} from '../../store/compendium/tiles/tile.state';
import {TileType} from '../../model/tileType';

export const TileCollection: TileEntityState = {
  ids: [
    'beach',
    'grasslands'
  ],
  entities: {
    'beach': {
      id: 'beach',
      name: TileType.BEACH,
      type: TileType.BEACH,
      description: 'A Beach',
    },
    'grasslands': {
      id: 'grasslands',
      name: TileType.GRASSLANDS,
      type: TileType.GRASSLANDS,
      description: 'A grassy area',
    },
  },
};

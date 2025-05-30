import { Rarity } from '../../model/rarity.enum';
import { TileType } from '../../model/tileType';
import { TileFeatureEntityState } from '../../store/tile-features/tile-feature.state';

export const TileFeatureCollection: TileFeatureEntityState = {
  ids: [
    'herd',
    'herd+',
    'herd++',
    'ore',
    'ore+',
    'ore++',
    'flounts',
    'flounts+',
    'flounts++',
  ],
  entities: {
    herd: {
      id: 'herd',
      name: 'Herd of Mounts',
      flavour: 'The plains tremble beneath a thousand thundering hooves.',
      description: 'Allows the construction of Stables.',
      tiles: [TileType.ANY],
      rarity: Rarity.Common,
    },
    'herd+': {
      id: 'herd+',
      name: 'Herd of Advanced Mounts',
      flavour:
        'These steeds are bred for war, swift as wind and fierce as fire.',
      description: 'Allows the construction of Advanced Stables.',
      tiles: [TileType.ANY],
      rarity: Rarity.Uncommon,
    },
    'herd++': {
      id: 'herd++',
      name: 'Herd of Expert Mounts',
      flavour:
        'Legends speak of riders and mounts so attuned they move as one.',
      description: 'Allows the construction of Advanced Stables.',
      rarity: Rarity.Rare,
      tiles: [TileType.ANY],
    },
    ore: {
      id: 'ore',
      name: 'Ore Vein',
      flavour: 'Veins of raw metal gleam beneath the earth like dragon hoards.',
      description: 'Allows the construction of Smithies.',
      rarity: Rarity.Common,
      tiles: [TileType.ANY],
    },
    'ore+': {
      id: 'ore+',
      name: 'Rich Ore Vein',
      flavour: 'Metal so pure it sings when struck by a hammer.',
      description: 'Allows the construction of Advanced Smithies.',
      rarity: Rarity.Uncommon,
      tiles: [TileType.ANY],
    },
    'ore++': {
      id: 'ore++',
      name: 'Manifold Ore Vein',
      flavour: 'A trove of enchanted minerals older than empires.',
      description: 'Allows the construction of Expert Smithies.',
      rarity: Rarity.Rare,
      tiles: [TileType.ANY],
    },
    flounts: {
      id: 'flounts',
      name: 'Flock of Flying Mounts',
      flavour:
        'Feathers glint in the sun as the skies fill with graceful wings.',
      description: 'Allows the construction of Aeries.',
      rarity: Rarity.Common,
      tiles: [TileType.ANY],
    },
    'flounts+': {
      id: 'flounts+',
      name: 'Flock of Advanced Flying Mounts',
      flavour: 'Riders whisper to their beasts above the clouds.',
      description: 'Allows the construction of Advanced Aeries.',
      rarity: Rarity.Uncommon,
      tiles: [TileType.ANY],
    },
    'flounts++': {
      id: 'flounts++',
      name: 'Flock of Expert Flying Mounts',
      flavour: 'Born in thunder and tempest, these creatures know no master.',
      description: 'Allows the construction of Expert Aeries.',
      rarity: Rarity.Rare,
      tiles: [TileType.ANY],
    },
  },
};

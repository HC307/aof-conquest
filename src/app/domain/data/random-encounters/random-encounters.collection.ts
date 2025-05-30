import {RandomEncounterEntityState} from '../../store/random-encounter/random-encounter.state';
import {TileType} from '../../model/tileType';
import {Rarity} from '../../model/rarity.enum';
import {Faction} from '../../model/faction.enum';

export const RandomEncountersCollection: RandomEncounterEntityState = {
  ids: ['bandits50'],
  entities: {
    'bandits50': {
      id: 'bandits50',
      name: 'Band of Bandits',
      description: 'A group of beastmen bandits.',
      reward: {
        points: 15,
        item: Rarity.Common,
      },
      flavour: 'A rough-looking group of bandits stands in the way, brandishing weapons and demanding a toll to let you pass.',
      tiles: [TileType.ANY],
      faction: Faction.Beastmen,
      points: 50,
      roster: [
        'Waheni Hunters [3] Q5+ D5+ | 20pts | Strider + 3x Hand Weapon (A1)',
        'Waheni Hunters [3] Q5+ D5+ | 30pts | Strider + 3x Spear (A1, Counter)'],
    },
  },
};

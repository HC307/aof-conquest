import { Rarity } from '../../model/rarity.enum';
import { TrophyEntityState } from '../../store/compendium/trophies/trophy.state';

export const TrophyCollection: TrophyEntityState = {
  ids: ['arcane', 'mount+++'],
  entities: {
    arcane: {
      id: 'arcane',
      name: 'Arcane Artefact',
      flavour: 'Who up pondering their orb?',
      description: 'Enables the building of Magic Schools.',
      rarity: Rarity.Rare,
    },
    'mount+++': {
      id: 'mount+++',
      name: 'Legendary Mount',
      description: 'Allows the purchase of one mount of any cost.',
      rarity: Rarity.Epic,
    },
  },
};

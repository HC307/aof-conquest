import { TrophyEntityState } from '../../store/compendium/trophies/trophy.state';

export const TrophyCollection: TrophyEntityState = {
  ids: ['arcane', 'mount+++'],
  entities: {
    arcane: {
      id: 'arcane',
      name: 'Arcane Artefact',
      description: 'Enables the building of Magic Schools.',
    },
    'mount+++': {
      id: 'mount+++',
      name: 'Legendary Mount',
      description: 'Allows the purchase of one mount of any cost.',
    },
  },
};

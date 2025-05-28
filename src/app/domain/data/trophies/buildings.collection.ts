import {TrophyEntityState} from '../../store/compendium/trophies/trophy.state';

export const TrophyCollection: TrophyEntityState = {
  ids: [
    'arcane',
    'mount',
    'greatmount',
    'legendarymount'
  ],
  entities: {
    'arcane': {
      id: 'arcane',
      name: 'Arcane Artefact',
      description: 'Enables the building of Magic Schools.',
    },
    'mount': {
      id: 'mount',
      name: 'Mount',
      description: 'Enables the purchase of mounts worth 10 pts. or less.',
    },
    'greatmount': {
      id: 'greatmount',
      name: 'Great Mount',
      description: 'A great mount. Enables the purchase of mounts worth 25 pts. or more.',
    },
    'legendarymount': {
      id: 'legendarymount',
      name: 'Legendary Mount',
      description: 'A legendary mount. Enables the purchase of mounts worth any amount of points.',
    }
  },
};

import {BuildingEntityState} from '../../store/compendium/buildings/building.state';
import {Currency} from '../../model/currency';

export const BuildingCollection: BuildingEntityState = {
  ids: [
    'smithy',
    'smithy+',
    'smithy++',
  ],
  entities: {
    'smithy': {
      id: 'smithy',
      name: 'Smithy',
      description: 'Enables the production of 5 pts. Melee-Weapon Upgrades.',
      buildingPrice: {
        currency: Currency.Points,
        value: 15,
      },
    },
    'smithy+': {
      id: 'smithy+',
      name: 'Advanced Smithy',
      description: 'Enables the production of 10 pts. Melee Upgrades.',
      buildingPrice: {
        currency: Currency.Points,
        value: 20,
      },
    },
    'smithy++': {
      id: 'smithy++',
      name: 'Master Smithy',
      description: 'Enables the production of 15 pts. and higher Melee Upgrades.',
      buildingPrice: {
        currency: Currency.Points,
        value: 40,
      },
    },
  },
};

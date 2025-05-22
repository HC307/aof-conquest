import {BuildingEntityState} from '../../store/compendium/building.state';
import {Currency} from '../../model/currency';

export const BuildingCollection: BuildingEntityState = {
  ids: [
    'smithy',
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
  },
};

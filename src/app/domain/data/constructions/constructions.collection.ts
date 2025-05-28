import { ConstructionEntityState } from '../../store/compendium/constructions/construction.state';
import { CurrencyEnum } from '../../model/currency.enum';

export const ConstructionCollection: ConstructionEntityState = {
  ids: ['smithy', 'smithy+', 'smithy++'],
  entities: {
    smithy: {
      id: 'smithy',
      name: 'Smithy',
      description: 'Enables the production of 5 pts. Melee-Weapon Upgrades.',
      constructionCost: {
        currency: CurrencyEnum.Points,
        value: 15,
      },
    },
    'smithy+': {
      id: 'smithy+',
      name: 'Advanced Smithy',
      description: 'Enables the production of 10 pts. Melee Upgrades.',
      constructionCost: {
        currency: CurrencyEnum.Points,
        value: 20,
      },
    },
    'smithy++': {
      id: 'smithy++',
      name: 'Master Smithy',
      description:
        'Enables the production of 15 pts. and higher Melee Upgrades.',
      constructionCost: {
        currency: CurrencyEnum.Points,
        value: 40,
      },
    },
  },
};

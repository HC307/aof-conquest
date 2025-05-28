import { ConstructionEntityState } from '../../store/compendium/constructions/construction.state';
import { CurrencyEnum } from '../../model/currency.enum';

export const ConstructionCollection: ConstructionEntityState = {
  ids: [
    'fortress',
    'smithy',
    'smithy+',
    'smithy++',
    'magic',
    'magic+',
    'magic++',
    'aerie',
  ],
  entities: {
    fortress: {
      id: 'fortress',
      name: 'Fortress',
      description:
        'Enables the recruitment of one Hero. Units defending a fortress gain +1 on any Roll to Block.',
      constructionCost: {
        currency: CurrencyEnum.Actions,
        value: 9,
      },
    },
    smithy: {
      id: 'smithy',
      name: 'Smithy',
      description: 'Enables the production of 5 pts. Weapon Upgrades.',
      constructionCost: {
        currency: CurrencyEnum.Actions,
        value: 2,
      },
    },
    'smithy+': {
      id: 'smithy+',
      name: 'Advanced Smithy',
      description: 'Enables the production of up to 10 pts. Weapon Upgrades.',
      constructionCost: {
        currency: CurrencyEnum.Actions,
        value: 2,
      },
    },
    'smithy++': {
      id: 'smithy++',
      name: 'Expert Smithy',
      description: 'Enables the production of any Weapon Upgrade.',
      constructionCost: {
        currency: CurrencyEnum.Actions,
        value: 2,
      },
    },
    magic: {
      id: 'magic',
      name: 'Magic Academy',
      constructionCost: {
        currency: CurrencyEnum.Actions,
        value: 4,
      },
      description:
        'Enables the Recruitment if Units with and Upgrades granting Sorcerer(1).',
    },
    'magic+': {
      id: 'magic+',
      name: 'Advanced Magic Academy',
      constructionCost: {
        currency: CurrencyEnum.Actions,
        value: 4,
      },
      description:
        'Enables the Recruitment if Units with and Upgrades granting up to Sorcerer(2).',
    },
    'magic++': {
      id: 'magic++',
      name: 'Expert Magic Academy',
      constructionCost: {
        currency: CurrencyEnum.Actions,
        value: 4,
      },
      description:
        'Enables the Recruitment if Units with and Upgrades granting up to Sorcerer(3).',
    },
    aerie: {
      id: 'aerie',
      name: 'Aerie',
      constructionCost: {
        currency: CurrencyEnum.Actions,
        value: 3,
      },
      description:
        'Allows the recruitment of Flying Units and the purchase of flying mounts.',
    },
  },
};

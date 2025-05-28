import { RuleEntityState } from '../../store/rules/rules.state';

export const RuleCollection: RuleEntityState = {
  ids: ['flee', 'trade'],
  entities: {
    flee: {
      id: 'flee',
      name: 'Flee',
      description:
        "If you try to flee, make a quality check using your army commander's or hero's quality. If you succeed, your army flees. If you fail you are forced into a skirmish and the attacker gains the initiative in the first turn.",
    },
    trade: {
      id: 'trade',
      name: 'Trading',
      description: 'Armies can trade if they are on the same Tile.',
    },
  },
};

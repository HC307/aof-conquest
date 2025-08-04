import { RuleEntityState } from '../../store/rules/rules.state';

export const RuleCollection: RuleEntityState = {
  ids: ['flee', 'trade', 'tile-exploration'],
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
    'tile-exploration': {
      id: 'tile-exploration',
      name: 'Tile Exploration',
      description: 'When exploring a new tile, roll 1d6 to determine what you discover:\n\n• 1-2: Nothing - The land is barren and empty. You find nothing of interest.\n\n• 3-4: Location/Feature - You discover a notable location or terrain feature. This could be a place to build (Mount Stable, Quarry, etc.) or a natural landmark that provides benefits.\n\n• 5: Loot - You find valuable items, abandoned supplies, or hidden treasures. This might include coins, artifacts, or other useful resources.\n\n• 6: Random Encounter - You stumble upon other inhabitants of the land. This could be hostile forces requiring combat, friendly traders, or mysterious beings.\n\nThe type of discovery may be influenced by the terrain type of the tile you are exploring.',
    },
  },
};

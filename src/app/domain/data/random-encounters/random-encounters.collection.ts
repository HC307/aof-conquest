import { RandomEncounterEntityState } from '../../store/random-encounter/random-encounter.state';
import { Rarity } from '../../model/rarity.enum';
import { Army } from '../../model/faction.enum';

export const RandomEncountersCollection: RandomEncounterEntityState = {
  ids: [
    'beastmen50',
    'beastmen75',
    'beastmen100',
    'orcs50',
    'highelves50',
    'goblins75',
    'volcanodwarfs75',
  ],
  entities: {
    beastmen50: {
      id: 'beastmen50',
      name: 'Band of Bandits',
      description: 'A group of beastmen bandits.',
      reward: {
        points: 15,
        item: Rarity.Common,
      },
      flavour:
        'A rough-looking group of bandits stands in the way, brandishing weapons and demanding a toll to let you pass.',
      faction: Army.Beastmen,
      points: 50,
      roster: [
        'Waheni Hunters [3] Q5+ D5+ | 20pts | Strider + 3x Hand Weapon (A1)',
        'Waheni Hunters [3] Q5+ D5+ | 30pts | Strider + 3x Spear (A1, Counter)',
      ],
    },
    beastmen75: {
      id: 'beastmen75',
      name: 'Big Band of Bandits',
      description: 'A group of beastmen bandits.',
      reward: {
        points: 15,
        item: Rarity.Common,
      },
      flavour:
        'A rough-looking group of bandits stands in the way, brandishing weapons and demanding a toll to let you pass.',
      faction: Army.Beastmen,
      points: 75,
      roster: [
        'Ndoli Elite [1] Q3+ D3+ | 30pts | Furious, Headtaker, Sergeant + Heavy Halberd (A1, Rending, AP(1))',
        'Hapari Harpies [3] Q5+ D5+ | 45pts | Flying Scout + 3x Heavy Claws (A2, AP(1))',
      ],
    },
    beastmen100: {
      id: 'beastmen100',
      name: 'Bigger Band of Bandits',
      description: 'A group of beastmen bandits.',
      reward: {
        points: 15,
        item: Rarity.Common,
      },
      flavour:
        'A rough-looking group of bandits stands in the way, brandishing weapons and demanding a toll to let you pass.',
      faction: Army.Beastmen,
      points: 100,
      roster: ['TODO'],
    },
    orcs50: {
      id: 'orcs50',
      name: 'Orc Raiders',
      description: 'A group of orc raiders.',
      reward: {
        points: 20,
        item: Rarity.Uncommon,
      },
      flavour:
        'A band of orc raiders blocks your path, their eyes gleaming with the promise of a fight.',
      faction: Army.Orcs,
      points: 50,
      roster: [
        '2x Wild Boar Rider [1] Q5+ D6+ | 15pts | Devour, Fast, Frenzy, Scout, Strider + Lance (A1, Lance)',
        'Orcs [3] Q5+ D5+ | 20pts | Furious + 3x Hand Weapon (A1)',
      ],
    },
    highelves50: {
      id: 'highelves50',
      name: 'High Elf Patrol',
      description: 'A group of high elf patrols.',
      reward: {
        points: 20,
        item: Rarity.Uncommon,
      },
      flavour:
        'A group of high elves stands in your way, their eyes scanning the horizon for threats.',
      faction: Army.HighElves,
      points: 50,
      roster: [
        'Weapon Master [1] Q3+ D4+ | 25pts | 1x Spell Master(Caster(+1)) + Great Weapon (A1, AP(2))',
        'Weapon Master [1] Q3+ D4+ | 25pts | 1x Spell Master(Caster(+1)) + Dual Hand Weapons (A2)',
      ],
    },
    goblins75: {
      id: 'goblins75',
      name: 'Goblin Ambush',
      description: 'A group of goblins lying in ambush.',
      reward: {
        points: 20,
        item: Rarity.Uncommon,
      },
      flavour:
        'A group of goblins jumps out from behind the bushes, brandishing their weapons and shouting insults.',
      faction: Army.Goblins,
      points: 75,
      roster: [
        'Goblin Leader [1] Q5+ D5+ | 45pts | Hero, Tough(3), 1x Shaman(Caster(2)) + Hand Weapon (A3)',
        'Shooters [3] Q5+ D6+ | 30pts | Forest-Clan(Strider) + 3x Shortbow (18", A1), 3x Hand Weapon (A1)',
      ],
    },
    volcanodwarfs75: {
      id: 'volcanodwarfs75',
      name: 'Volcano Dwarf Raiders',
      description: 'A group of volcanic dwarf raiders.',
      reward: {
        points: 20,
        item: Rarity.Uncommon,
      },
      flavour:
        'A group of volcanic dwarfs emerges from the shadows, their eyes glowing with the heat of the volcano.',
      faction: Army.VolcanicDwarfs,
      points: 75,
      roster: [
        'Volcanic Leader [1] Q4+ D5+ | 30pts | Fearless, Furious, Hero, Slow, Tough(3) +Hand Weapon (A3)',
        'Volcanic Berserker [1] Q4+ D5+ | 20pts | Fearless, Furious, Slayer, Slow + Dual Hand Weapon (A2)',
        'Shield Berserkers [3] Q4+ D5+ | 25pts | Fearless, Furious, Slow + 3x Hand Weapon (A1)',
      ],
    },
  },
};

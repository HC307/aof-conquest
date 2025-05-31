import { BaseEntity } from '../base-entity.interface';
import { Construction } from '../construction.interface';
import { Army } from '../faction.enum';
import { Rarity } from '../rarity.enum';

export interface Chronicle {
  id: string;
  name: string;
  factions: FactionChronicle[];
}

export interface FactionChronicle {
  name: string;
  faction: Army;
  warbands: Warband[];
  constructions: Construction[];
}

export interface Warband {
  commander: string;
  inventory: InventoryEntry[];
  roster: string[];
}

export interface InventoryEntry {
  item: Item;
  amount: number;
}

export interface Item extends BaseEntity {
  rarity: Rarity;
}

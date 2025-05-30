import {BaseEntity} from './base-entity.interface';
import {TileType} from './tileType';
import {Loot} from './loot';
import { Faction } from './faction.enum';

export interface RandomEncounter extends BaseEntity{
    points: number;
    roster: string[];
    tiles: TileType[];
    reward?: Loot;
    faction: Faction;
}

import {BaseEntity} from './base-entity.interface';

export interface Faction extends BaseEntity {
  campaignId?: string;
  warbands: Warband[];
}

export interface Warband extends BaseEntity {
  units: Unit[],
}

export interface Unit extends BaseEntity {
  abilities: UnitAbility[];
  pointCost?: number;
}

export interface UnitAbility extends BaseEntity {

}

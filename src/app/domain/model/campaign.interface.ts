import {BaseEntity} from './base-entity.interface';
import {Faction} from './faction.interface';

export interface Campaign extends BaseEntity {
  id: string;
  name: string;
  createdDate: Date;
  lastModified: Date;
  playerCount: number;
  currentTurn: number;
  status: CampaignStatus;
  factions?: Faction[];
}

export enum CampaignStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed'
}

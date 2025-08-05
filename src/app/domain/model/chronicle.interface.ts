import { BaseEntity } from './base-entity.interface';

export interface Chronicle extends BaseEntity {
  id: string;
  name: string;
  createdDate: Date;
  lastModified: Date;
  playerCount: number;
  currentTurn: number;
  status: ChronicleStatus;
  userCreated?: boolean;
}

export enum ChronicleStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  PAUSED = 'paused'
}

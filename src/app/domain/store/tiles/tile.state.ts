import { EntityState } from '@ngrx/entity';
import { Tile } from '../../model/tile.interface';

export type TileEntityState = EntityState<Tile> & { ids: string[] };

export interface TileState extends EntityState<Tile> {}

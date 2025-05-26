import {EntityState} from '@ngrx/entity';
import {Tile} from '../../../model/type.type';

export type TileEntityState = EntityState<Tile> & { ids: string[] };

export interface TileState extends EntityState<Tile> {
}

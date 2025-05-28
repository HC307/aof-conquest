import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {Tile} from '../../../model/tile.interface';

export const tileAdapter: EntityAdapter<Tile> = createEntityAdapter<Tile>();

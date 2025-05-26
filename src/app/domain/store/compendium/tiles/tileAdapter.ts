import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {Tile} from '../../../model/type.type';

export const tileAdapter: EntityAdapter<Tile> = createEntityAdapter<Tile>();

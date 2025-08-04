import { createAction, props } from '@ngrx/store';
import { Tile } from '../../model/tile.interface';

export const tileActions = {
  add: createAction('[Tile] Add Tile', props<{ tile: Tile }>()),
  update: createAction('[Tile] Update Tile', props<{ tile: Partial<Tile> & { id: string } }>()),
  remove: createAction('[Tile] Remove Tile', props<{ id: string }>()),
};
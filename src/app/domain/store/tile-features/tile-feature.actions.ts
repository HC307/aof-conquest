import { createAction, props } from '@ngrx/store';
import { TileFeature } from '../../model/tile-feature.interface';

export const tileFeatureActions = {
  add: createAction('[TileFeature] Add Tile Feature', props<{ tileFeature: TileFeature }>()),
  update: createAction('[TileFeature] Update Tile Feature', props<{ tileFeature: Partial<TileFeature> & { id: string } }>()),
  remove: createAction('[TileFeature] Remove Tile Feature', props<{ id: string }>()),
};
import { EntityState } from '@ngrx/entity';
import { TileFeature } from '../../model/tile-feature.interface';

export type TileFeatureEntityState = EntityState<TileFeature> & {
  ids: string[];
};

export interface TileFeatureState extends EntityState<TileFeature> {}

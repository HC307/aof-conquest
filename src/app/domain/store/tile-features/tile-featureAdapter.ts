import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { TileFeature } from '../../model/tile-feature.interface';

export const tileFeatureAdapter: EntityAdapter<TileFeature> =
  createEntityAdapter<TileFeature>();

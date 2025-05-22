import {GeneratorsState} from '../../features/generators/state/generators.state';
import {BuildingState} from './compendium/building.state';

export interface AppState {
  generators: GeneratorsState,
  buildings: BuildingState,
}

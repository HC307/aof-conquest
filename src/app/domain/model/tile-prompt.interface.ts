import {TileType} from './tileType';

export interface TilePrompt {
  //If type is empty, its available for all tiles
  tiles?: TileType[],
  prompt: string,
}

import {TileType} from './tileType';

export type TilePrompt = {
  //If type is empty, its available for all tiles
  tiles?: TileType[],
  prompt: string,
}

import {TileType} from './tile.type';

export type TilePrompt = {
  //If type is empty, its available for all tiles
  tiles?: TileType[],
  prompt: string,
}

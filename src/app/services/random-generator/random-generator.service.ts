import { Injectable } from '@angular/core';
import { TileType } from '../../domain/model/tileType';
import { TileLocationPrompts } from '../../domain/data/tiles/tile-location.prompts';
import _ from 'lodash';
import { TilePrompts } from '../../domain/data/tiles/tile.prompts';
import { TileGeneratorConfig } from '../../features/generators/tile-generator/tile-generator.config';

@Injectable({
  providedIn: 'root',
})
export class RandomGeneratorService {
  constructor() {}

  //#region Tile Prompts

  generateTilePrompt(
    conf: TileGeneratorConfig,
    option1?: string,
    option2?: string
  ): string {
    let r = '';

    r += this.roll(conf.locationPct)
      ? this.generateTileLocationPrompt(option1, option2)
      : '';
    r += this.roll(conf.lootPct)
      ? this.generateTileLootPrompt(option1, option2)
      : '';
    r += this.roll(conf.encounterPct)
      ? this.generateTileEncounterPrompt(option1, option2)
      : '';

    return r == '' ? TilePrompts.empty : r;
  }

  generateTileLocationPrompt(option1?: string, option2?: string): string {
    let type1 = this.findTileType(option1);
    let type2 = this.findTileType(option2);

    let filteredPrompts = TileLocationPrompts.filter(
      (prompt) =>
        prompt.tiles?.includes(type1) ||
        prompt.tiles?.includes(type2) ||
        prompt.tiles?.includes(TileType.ANY)
    );

    return this.RandomSelect(filteredPrompts)?.prompt || '';
  }

  generateTileLootPrompt(option1?: string, option2?: string): string {
    let type1 = this.findTileType(option1);
    let type2 = this.findTileType(option2);

    let filteredPrompts = TilePrompts.loot.filter(
      (prompt) =>
        prompt.tiles?.includes(type1) ||
        prompt.tiles?.includes(type2) ||
        prompt.tiles?.includes(TileType.ANY)
    );

    return this.RandomSelect(filteredPrompts)?.prompt || '';
  }

  generateTileEncounterPrompt(option1?: string, option2?: string): string {
    let type1 = this.findTileType(option1);
    let type2 = this.findTileType(option2);

    let filteredPrompts = TilePrompts.encounters.filter(
      (prompt) =>
        prompt.tiles?.includes(type1) ||
        prompt.tiles?.includes(type2) ||
        prompt.tiles?.includes(TileType.ANY)
    );

    return this.RandomSelect(filteredPrompts)?.prompt || '';
  }

  //#endregion Tile Prompts

  //#region Util

  private roll(chance: number) {
    return _.random(0, 100) < chance;
  }

  private findTileType(value: string | undefined): TileType {
    return (
      Object.values(TileType).find((tileType) => tileType === value) ||
      TileType.NONE
    );
  }

  private RandomSelect<T>(values: T[]): T | undefined {
    if (values.length == 0) {
      return undefined;
    }

    return values[_.random(0, values.length - 1)];
  }

  //#endregion Util
}

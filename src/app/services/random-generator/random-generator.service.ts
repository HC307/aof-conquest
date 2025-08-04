import { Injectable, inject } from '@angular/core';
import { TileType } from '../../domain/model/tileType';
import { TileLocationPrompts } from '../../domain/data/tiles/tile-location.prompts';
import { TilePrompts } from '../../domain/data/tiles/tile.prompts';
import { TileGeneratorConfig } from '../../features/generators/tile-generator/tile-generator.config';
import { Store } from '@ngrx/store';
import { AppState } from '../../domain/store/app.state';
import { TileEntitiesSelectors } from '../../domain/store/tiles/tile.selectors';
import { firstValueFrom } from 'rxjs';
import { Tile } from '../../domain/model/tile.interface';

@Injectable({
  providedIn: 'root',
})
export class RandomGeneratorService {
  private readonly store = inject(Store<AppState>);
  
  constructor() {}

  //#region Tile Prompts

  /**
   * Generates a random tile prompt based on configuration
   * @param conf - The tile generator configuration
   * @param option1 - First tile type option
   * @param option2 - Second tile type option
   * @returns A generated prompt string
   */
  async generateTilePrompt(
    conf: TileGeneratorConfig,
    option1?: string,
    option2?: string
  ): Promise<string> {
    let result = '';

    if (this.roll(conf.locationPct)) {
      result += await this.generateTileLocationPrompt(option1, option2);
    }
    
    if (this.roll(conf.lootPct)) {
      result += await this.generateTileLootPrompt(option1, option2);
    }
    
    if (this.roll(conf.encounterPct)) {
      result += await this.generateTileEncounterPrompt(option1, option2);
    }

    return result === '' ? TilePrompts.empty : result;
  }

  /**
   * Generates a tile location prompt
   * @param option1 - First tile type option
   * @param option2 - Second tile type option
   * @returns A location prompt string
   */
  async generateTileLocationPrompt(option1?: string, option2?: string): Promise<string> {
    const type1 = await this.findTileType(option1);
    const type2 = await this.findTileType(option2);

    const filteredPrompts = TileLocationPrompts.filter(
      (prompt) =>
        prompt.tiles?.includes(type1) ||
        prompt.tiles?.includes(type2) ||
        prompt.tiles?.includes(TileType.ANY)
    );

    return this.randomSelect(filteredPrompts)?.prompt || '';
  }

  /**
   * Generates a tile loot prompt
   * @param option1 - First tile type option
   * @param option2 - Second tile type option
   * @returns A loot prompt string
   */
  async generateTileLootPrompt(option1?: string, option2?: string): Promise<string> {
    const type1 = await this.findTileType(option1);
    const type2 = await this.findTileType(option2);

    const filteredPrompts = TilePrompts.loot.filter(
      (prompt) =>
        prompt.tiles?.includes(type1) ||
        prompt.tiles?.includes(type2) ||
        prompt.tiles?.includes(TileType.ANY)
    );

    return this.randomSelect(filteredPrompts)?.prompt || '';
  }

  /**
   * Generates a tile encounter prompt
   * @param option1 - First tile type option
   * @param option2 - Second tile type option
   * @returns An encounter prompt string
   */
  async generateTileEncounterPrompt(option1?: string, option2?: string): Promise<string> {
    const type1 = await this.findTileType(option1);
    const type2 = await this.findTileType(option2);

    const filteredPrompts = TilePrompts.encounters.filter(
      (prompt) =>
        prompt.tiles?.includes(type1) ||
        prompt.tiles?.includes(type2) ||
        prompt.tiles?.includes(TileType.ANY)
    );

    return this.randomSelect(filteredPrompts)?.prompt || '';
  }

  //#endregion Tile Prompts

  //#region Util

  /**
   * Rolls a percentage chance
   * @param chance - The percentage chance (0-100)
   * @returns true if the roll succeeds
   */
  private roll(chance: number): boolean {
    return Math.random() * 100 < chance;
  }

  /**
   * Finds a tile type from a string value, checking both enum values and custom tiles
   * @param value - The tile name to find
   * @returns The matching TileType or TileType.NONE if not found
   */
  private async findTileType(value: string | undefined): Promise<TileType> {
    if (!value) return TileType.NONE;
    
    // First check if it's a standard TileType enum value
    const enumType = Object.values(TileType).find((tileType) => tileType === value);
    if (enumType) return enumType;
    
    // Check if it's a custom tile
    try {
      const tiles = await firstValueFrom(this.store.select(TileEntitiesSelectors.all));
      const customTile = tiles.find(tile => tile.name === value);
      if (customTile) {
        // For custom tiles, we'll treat them as ANY type for prompt matching
        return TileType.ANY;
      }
    } catch (error) {
      console.error('Error fetching tiles from store:', error);
    }
    
    return TileType.NONE;
  }

  /**
   * Randomly selects an item from an array
   * @param values - Array of values to select from
   * @returns A random value or undefined if array is empty
   */
  private randomSelect<T>(values: T[]): T | undefined {
    if (values.length === 0) {
      return undefined;
    }

    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
  }

  //#endregion Util
}

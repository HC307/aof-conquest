import { Injectable, inject } from '@angular/core';
import { TileLocationPrompts } from '../../domain/data/tiles/tile-location.prompts';
import { TilePrompts } from '../../domain/data/tiles/tile.prompts';
import { TileGeneratorConfig } from '../../features/generators/tile-generator/tile-generator.config';
import { Store } from '@ngrx/store';
import { AppState } from '../../domain/store/app.state';
import { TileEntitiesSelectors } from '../../domain/store/tiles/tile.selectors';
import { TileFeatureEntitiesSelectors } from '../../domain/store/tile-features/tile-feature.selectors';
import { firstValueFrom } from 'rxjs';
import { Tile } from '../../domain/model/tile.interface';
import { TileFeature } from '../../domain/model/tile-feature.interface';

@Injectable({
  providedIn: 'root',
})
export class RandomGeneratorService {
  private readonly store = inject(Store<AppState>);
  
  constructor() {}

  //#region Tile Prompts

  /**
   * Generates a random tile prompt based on a d6 roll
   * Roll results:
   * - 1-2: Nothing happens
   * - 3-4: Location/feature is found
   * - 5: Loot is found
   * - 6: Random encounter
   * 
   * @param option1 - First tile type option
   * @param option2 - Second tile type option
   * @returns A generated prompt string
   */
  async generateTilePrompt(
    option1?: string,
    option2?: string
  ): Promise<string> {
    const d6Roll = this.rollD6();
    
    switch (d6Roll) {
      case 1:
      case 2:
        // Nothing happens
        return TilePrompts.empty;
      
      case 3:
      case 4:
        // Location/feature
        const locationPrompt = await this.generateTileLocationPrompt(option1, option2);
        return locationPrompt || TilePrompts.empty;
      
      case 5:
        // Loot
        const lootPrompt = await this.generateTileLootPrompt(option1, option2);
        return lootPrompt || TilePrompts.empty;
      
      case 6:
        // Random encounter
        const encounterPrompt = await this.generateTileEncounterPrompt(option1, option2);
        return encounterPrompt || TilePrompts.empty;
      
      default:
        // Should never happen, but just in case
        return TilePrompts.empty;
    }
  }

  /**
   * Generates a tile location prompt
   * @param option1 - First tile type option
   * @param option2 - Second tile type option
   * @returns A location prompt string
   */
  async generateTileLocationPrompt(option1?: string, option2?: string): Promise<string> {
    // Get the tiles and their features
    const tile1 = await this.getTileByName(option1);
    const tile2 = await this.getTileByName(option2);
    
    // Collect all available features from both tiles
    const availableFeatureIds = new Set<string>();
    if (tile1?.features) {
      tile1.features.forEach(f => availableFeatureIds.add(f));
    }
    if (tile2?.features) {
      tile2.features.forEach(f => availableFeatureIds.add(f));
    }
    
    // If no features available, use old system
    if (availableFeatureIds.size === 0) {
      const name1 = tile1?.name;
      const name2 = tile2?.name;
      
      const filteredPrompts = TileLocationPrompts.filter(
        (prompt) => {
          if (!prompt.tiles || prompt.tiles.length === 0) return true;
          return (name1 && prompt.tiles.includes(name1)) ||
                 (name2 && prompt.tiles.includes(name2)) ||
                 prompt.tiles.includes('Any');
        }
      );
      
      return this.randomSelect(filteredPrompts)?.prompt || '';
    }
    
    // Get the actual feature objects
    const features = await firstValueFrom(this.store.select(TileFeatureEntitiesSelectors.all));
    const availableFeatures = features.filter(f => availableFeatureIds.has(f.id));
    
    // Randomly select a feature
    const selectedFeature = this.randomSelect(availableFeatures);
    if (!selectedFeature) {
      return TilePrompts.empty;
    }
    
    // Generate a prompt about finding this feature
    return `You discovered a ${selectedFeature.name}! ${selectedFeature.description || ''}`;
  }

  /**
   * Generates a tile loot prompt
   * @param option1 - First tile type option
   * @param option2 - Second tile type option
   * @returns A loot prompt string
   */
  async generateTileLootPrompt(option1?: string, option2?: string): Promise<string> {
    const name1 = await this.validateTileType(option1);
    const name2 = await this.validateTileType(option2);

    const filteredPrompts = TilePrompts.loot.filter(
      (prompt) => {
        // If no specific tiles specified, prompt is for all tiles
        if (!prompt.tiles || prompt.tiles.length === 0) return true;
        
        // Check if either tile name matches
        return (name1 && prompt.tiles.includes(name1)) ||
               (name2 && prompt.tiles.includes(name2)) ||
               prompt.tiles.includes('Any');
      }
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
    const name1 = await this.validateTileType(option1);
    const name2 = await this.validateTileType(option2);

    const filteredPrompts = TilePrompts.encounters.filter(
      (prompt) => {
        // If no specific tiles specified, prompt is for all tiles
        if (!prompt.tiles || prompt.tiles.length === 0) return true;
        
        // Check if either tile name matches
        return (name1 && prompt.tiles.includes(name1)) ||
               (name2 && prompt.tiles.includes(name2)) ||
               prompt.tiles.includes('Any');
      }
    );

    return this.randomSelect(filteredPrompts)?.prompt || '';
  }

  //#endregion Tile Prompts

  //#region Util

  /**
   * Rolls a d6 (six-sided die)
   * @returns A number between 1 and 6 inclusive
   */
  private rollD6(): number {
    return Math.floor(Math.random() * 6) + 1;
  }

  /**
   * Rolls a percentage chance
   * @param chance - The percentage chance (0-100)
   * @returns true if the roll succeeds
   */
  private roll(chance: number): boolean {
    return Math.random() * 100 < chance;
  }

  /**
   * Validates if a tile exists in the system
   * @param value - The tile name to validate
   * @returns The tile name if valid, undefined otherwise
   */
  private async validateTileType(value: string | undefined): Promise<string | undefined> {
    if (!value) return undefined;
    
    try {
      const tiles = await firstValueFrom(this.store.select(TileEntitiesSelectors.all));
      const tile = tiles.find(t => t.name === value);
      return tile ? tile.name : undefined;
    } catch (error) {
      console.error('Error fetching tiles from store:', error);
      return undefined;
    }
  }

  /**
   * Gets a tile by name
   * @param name - The tile name to find
   * @returns The tile if found, undefined otherwise
   */
  private async getTileByName(name: string | undefined): Promise<Tile | undefined> {
    if (!name) return undefined;
    
    try {
      const tiles = await firstValueFrom(this.store.select(TileEntitiesSelectors.all));
      return tiles.find(t => t.name === name);
    } catch (error) {
      console.error('Error fetching tile from store:', error);
      return undefined;
    }
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

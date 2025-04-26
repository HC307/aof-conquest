export interface TileGeneratorConfig {
  locationPct: number; // Percentage of locations in the tile
  buildingPct: number; // Percentage of buildings in the tile
  lootPct: number; // Percentage of loot in the tile
  encounterPct: number; // Percentage of random encounters in the tile
}

export const initialTileGeneratorConfig: TileGeneratorConfig = {
  locationPct: 40,
  buildingPct: 30,
  lootPct: 20,
  encounterPct: 10,
};

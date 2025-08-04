import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RandomGeneratorService } from './random-generator.service';
import { AppState } from '../../domain/store/app.state';
import { TileType } from '../../domain/model/tileType';
import { TileGeneratorConfig } from '../../features/generators/tile-generator/tile-generator.config';
import { TilePrompts } from '../../domain/data/tiles/tile.prompts';
import { TileEntitiesSelectors } from '../../domain/store/tiles/tile.selectors';
import { Tile } from '../../domain/model/tile.interface';

describe('RandomGeneratorService', () => {
  let service: RandomGeneratorService;
  let store: MockStore<AppState>;
  const initialState = {
    tiles: {
      ids: ['grasslands', 'custom-tile-1'],
      entities: {
        'grasslands': { id: 'grasslands', name: 'Grasslands', type: TileType.GRASSLANDS },
        'custom-tile-1': { id: 'custom-tile-1', name: 'Custom Desert', description: 'A user-created desert' }
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RandomGeneratorService,
        provideMockStore({ initialState })
      ]
    });
    service = TestBed.inject(RandomGeneratorService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('generateTilePrompt', () => {
    it('should return empty prompt when all percentages are 0', async () => {
      const config: TileGeneratorConfig = {
        locationPct: 0,
        lootPct: 0,
        encounterPct: 0
      };

      const result = await service.generateTilePrompt(config, 'Grasslands');
      expect(result).toBe(TilePrompts.empty);
    });

    it('should generate prompts based on configuration percentages', async () => {
      // Mock Math.random to always return 0.1 (10%)
      spyOn(Math, 'random').and.returnValue(0.1);
      
      const config: TileGeneratorConfig = {
        locationPct: 50, // Should generate
        lootPct: 20,     // Should generate
        encounterPct: 5  // Should not generate
      };

      const result = await service.generateTilePrompt(config, 'Grasslands');
      expect(result).not.toBe(TilePrompts.empty);
    });
  });

  describe('findTileType', () => {
    it('should find standard TileType enum values', async () => {
      const findTileType = service['findTileType'].bind(service);
      
      const result = await findTileType('Grasslands');
      expect(result).toBe(TileType.GRASSLANDS);
    });

    it('should return TileType.ANY for custom tiles', async () => {
      const mockTiles: Tile[] = [
        { id: 'custom-1', name: 'Custom Desert', description: 'User created' }
      ];
      
      store.overrideSelector(TileEntitiesSelectors.all, mockTiles);
      store.refreshState();
      
      const findTileType = service['findTileType'].bind(service);
      const result = await findTileType('Custom Desert');
      expect(result).toBe(TileType.ANY);
    });

    it('should return TileType.NONE for undefined input', async () => {
      const findTileType = service['findTileType'].bind(service);
      
      const result = await findTileType(undefined);
      expect(result).toBe(TileType.NONE);
    });

    it('should return TileType.NONE for non-existent tiles', async () => {
      const findTileType = service['findTileType'].bind(service);
      
      const result = await findTileType('Non-existent Tile');
      expect(result).toBe(TileType.NONE);
    });
  });

  describe('roll', () => {
    it('should return true when random is less than chance', () => {
      spyOn(Math, 'random').and.returnValue(0.3); // 30%
      
      const roll = service['roll'].bind(service);
      expect(roll(50)).toBe(true); // 50% chance should succeed
    });

    it('should return false when random is greater than chance', () => {
      spyOn(Math, 'random').and.returnValue(0.7); // 70%
      
      const roll = service['roll'].bind(service);
      expect(roll(50)).toBe(false); // 50% chance should fail
    });
  });

  describe('randomSelect', () => {
    it('should return undefined for empty array', () => {
      const randomSelect = service['randomSelect'].bind(service);
      
      const result = randomSelect([]);
      expect(result).toBeUndefined();
    });

    it('should return the only element for single-element array', () => {
      const randomSelect = service['randomSelect'].bind(service);
      
      const result = randomSelect(['only']);
      expect(result).toBe('only');
    });

    it('should return an element from the array', () => {
      const randomSelect = service['randomSelect'].bind(service);
      const items = ['a', 'b', 'c', 'd'];
      
      const result = randomSelect(items);
      expect(items).toContain(result!);
    });
  });

  describe('generateTileLocationPrompt', () => {
    it('should filter prompts based on tile types', async () => {
      const result = await service.generateTileLocationPrompt('Grasslands', 'Hills');
      
      // Should return a prompt or empty string
      expect(typeof result).toBe('string');
    });

    it('should handle custom tiles by treating them as ANY type', async () => {
      const mockTiles: Tile[] = [
        { id: 'custom-1', name: 'Custom Desert', description: 'User created' }
      ];
      
      store.overrideSelector(TileEntitiesSelectors.all, mockTiles);
      store.refreshState();
      
      const result = await service.generateTileLocationPrompt('Custom Desert');
      expect(typeof result).toBe('string');
    });
  });

  describe('error handling', () => {
    it('should handle store errors gracefully', async () => {
      // Mock the store to throw an error
      store.overrideSelector(TileEntitiesSelectors.all, null as any);
      spyOn(console, 'error');
      
      const findTileType = service['findTileType'].bind(service);
      const result = await findTileType('Custom Tile');
      
      expect(result).toBe(TileType.NONE);
      expect(console.error).toHaveBeenCalled();
    });
  });
});
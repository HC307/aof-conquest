import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RandomGeneratorService } from './random-generator.service';
import { AppState } from '../../domain/store/app.state';
import { TilePrompts } from '../../domain/data/tiles/tile.prompts';
import { TileEntitiesSelectors } from '../../domain/store/tiles/tile.selectors';
import { TileFeatureEntitiesSelectors } from '../../domain/store/tile-features/tile-feature.selectors';
import { Tile } from '../../domain/model/tile.interface';
import { TileFeature } from '../../domain/model/tile-feature.interface';

describe('RandomGeneratorService', () => {
  let service: RandomGeneratorService;
  let store: MockStore<AppState>;
  const initialState = {
    tiles: {
      ids: ['grasslands', 'custom-tile-1'],
      entities: {
        'grasslands': { 
          id: 'grasslands', 
          name: 'Grasslands', 
          features: ['herd', 'ore'],
          isCustom: false 
        },
        'custom-tile-1': { 
          id: 'custom-tile-1', 
          name: 'Custom Desert', 
          description: 'A user-created desert',
          features: ['ruins'],
          isCustom: true 
        }
      }
    },
    tileFeatures: {
      ids: ['herd', 'ore', 'ruins'],
      entities: {
        'herd': { id: 'herd', name: 'Herd', description: 'A group of wild animals' },
        'ore': { id: 'ore', name: 'Ore', description: 'Valuable minerals' },
        'ruins': { id: 'ruins', name: 'Ruins', description: 'Ancient structures' }
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RandomGeneratorService,
        provideMockStore({ 
          initialState,
          selectors: [
            {
              selector: TileEntitiesSelectors.all,
              value: Object.values(initialState.tiles.entities)
            },
            {
              selector: TileFeatureEntitiesSelectors.all,
              value: Object.values(initialState.tileFeatures.entities)
            }
          ]
        })
      ]
    });
    service = TestBed.inject(RandomGeneratorService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('generateTilePrompt', () => {
    it('should return empty prompt for d6 rolls 1-2', async () => {
      // Mock rollD6 to return 1
      spyOn<any>(service, 'rollD6').and.returnValue(1);
      
      const result = await service.generateTilePrompt('Grasslands');
      expect(result).toBe(TilePrompts.empty);
      
      // Test roll 2
      (service as any).rollD6.and.returnValue(2);
      const result2 = await service.generateTilePrompt('Grasslands');
      expect(result2).toBe(TilePrompts.empty);
    });

    it('should generate location prompt for d6 rolls 3-4', async () => {
      // Mock rollD6 to return 3
      spyOn<any>(service, 'rollD6').and.returnValue(3);
      
      const result = await service.generateTilePrompt('Grasslands', 'Hills');
      expect(typeof result).toBe('string');
    });

    it('should generate loot prompt for d6 roll 5', async () => {
      // Mock rollD6 to return 5
      spyOn<any>(service, 'rollD6').and.returnValue(5);
      
      const result = await service.generateTilePrompt('Grasslands');
      expect(typeof result).toBe('string');
    });

    it('should generate encounter prompt for d6 roll 6', async () => {
      // Mock rollD6 to return 6
      spyOn<any>(service, 'rollD6').and.returnValue(6);
      
      const result = await service.generateTilePrompt('Grasslands');
      expect(typeof result).toBe('string');
    });
  });

  describe('validateTileType', () => {
    it('should validate standard tile names', async () => {
      const mockTiles: Tile[] = [
        { id: 'grasslands', name: 'Grasslands', isCustom: false }
      ];
      
      store.overrideSelector(TileEntitiesSelectors.all, mockTiles);
      store.refreshState();
      
      const validateTileType = service['validateTileType'].bind(service);
      const result = await validateTileType('Grasslands');
      expect(result).toBe('Grasslands');
    });

    it('should validate custom tiles', async () => {
      const mockTiles: Tile[] = [
        { id: 'custom-1', name: 'Custom Desert', description: 'User created', isCustom: true }
      ];
      
      store.overrideSelector(TileEntitiesSelectors.all, mockTiles);
      store.refreshState();
      
      const validateTileType = service['validateTileType'].bind(service);
      const result = await validateTileType('Custom Desert');
      expect(result).toBe('Custom Desert');
    });

    it('should return undefined for undefined input', async () => {
      const validateTileType = service['validateTileType'].bind(service);
      
      const result = await validateTileType(undefined);
      expect(result).toBeUndefined();
    });

    it('should return undefined for non-existent tiles', async () => {
      const validateTileType = service['validateTileType'].bind(service);
      
      const result = await validateTileType('Non-existent Tile');
      expect(result).toBeUndefined();
    });
  });

  describe('rollD6', () => {
    it('should return values between 1 and 6', () => {
      const rollD6 = service['rollD6'].bind(service);
      
      // Test multiple rolls
      for (let i = 0; i < 100; i++) {
        const result = rollD6();
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(6);
        expect(Number.isInteger(result)).toBe(true);
      }
    });

    it('should produce all possible values over many rolls', () => {
      const rollD6 = service['rollD6'].bind(service);
      const results = new Set<number>();
      
      // Roll many times to get all values
      for (let i = 0; i < 1000; i++) {
        results.add(rollD6());
      }
      
      // Should have gotten all 6 values
      expect(results.size).toBe(6);
      expect(results.has(1)).toBe(true);
      expect(results.has(2)).toBe(true);
      expect(results.has(3)).toBe(true);
      expect(results.has(4)).toBe(true);
      expect(results.has(5)).toBe(true);
      expect(results.has(6)).toBe(true);
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
    it('should use tile features when available', async () => {
      // Mock randomSelect to return a specific feature
      spyOn<any>(service, 'randomSelect').and.callFake((items: any[]) => {
        if (items.length > 0 && items[0].id === 'herd') {
          return items[0]; // Return herd feature
        }
        return items[0];
      });
      
      const result = await service.generateTileLocationPrompt('Grasslands');
      
      expect(result).toContain('You discovered a Herd!');
      expect(result).toContain('A group of wild animals');
    });

    it('should combine features from both tiles', async () => {
      const result = await service.generateTileLocationPrompt('Grasslands', 'Custom Desert');
      
      // Should have access to features from both tiles (herd, ore, ruins)
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should fallback to old system when no features available', async () => {
      // Create tiles without features
      const mockTiles: Tile[] = [
        { id: 'empty-tile', name: 'Empty Tile', isCustom: true }
      ];
      
      store.overrideSelector(TileEntitiesSelectors.all, mockTiles);
      store.refreshState();
      
      const result = await service.generateTileLocationPrompt('Empty Tile');
      expect(typeof result).toBe('string');
    });

    it('should handle custom tiles properly', async () => {
      const mockTiles: Tile[] = [
        { id: 'custom-1', name: 'Custom Desert', description: 'User created', isCustom: true }
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
      
      const validateTileType = service['validateTileType'].bind(service);
      const result = await validateTileType('Custom Tile');
      
      expect(result).toBeUndefined();
      expect(console.error).toHaveBeenCalled();
    });
  });
});
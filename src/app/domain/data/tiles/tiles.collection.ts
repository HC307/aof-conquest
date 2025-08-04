import { TileEntityState } from '../../store/tiles/tile.state';

export const TileCollection: TileEntityState = {
  ids: [
    'beach',
    'broken-lands',
    'dead-forest',
    'desert',
    'desert-cactus',
    'farmland',
    'forest',
    'fungal-forest',
    'grasslands',
    'hills',
    'jungle',
    'mountain',
    'needle-forest',
    'ocean',
    'savannah',
    'sea',
    'shoals',
    'snow',
    'swamp'
  ],
  entities: {
    beach: {
      id: 'beach',
      name: 'Beach',
      description: 'Sandy coastlines where land meets water, offering unique resources from both environments.',
      features: ['herd', 'ore', 'flounts'],
      isCustom: false
    },
    'broken-lands': {
      id: 'broken-lands',
      name: 'Broken Lands',
      description: 'Shattered terrain of jagged rocks and deep crevasses, difficult to traverse but rich in minerals.',
      features: ['ore', 'ore+', 'ore++', 'herd', 'flounts'],
      isCustom: false
    },
    'dead-forest': {
      id: 'dead-forest',
      name: 'Dead Forest',
      description: 'A haunting landscape of lifeless trees and ashen ground, where death has claimed all vegetation.',
      features: ['herd', 'ore', 'flounts'],
      isCustom: false
    },
    desert: {
      id: 'desert',
      name: 'Desert',
      description: 'Vast expanses of sand and scorching heat, where water is scarce and survival is challenging.',
      features: ['herd', 'ore', 'flounts'],
      isCustom: false
    },
    'desert-cactus': {
      id: 'desert-cactus',
      name: 'Cactus Desert',
      description: 'Desert regions dotted with hardy cacti, providing minimal shelter and resources.',
      features: ['herd', 'ore', 'flounts'],
      isCustom: false
    },
    farmland: {
      id: 'farmland',
      name: 'Farmland',
      description: 'Cultivated fields and pastures, ideal for agriculture and supporting settlements.',
      features: ['herd', 'herd+', 'herd++', 'ore', 'flounts'],
      isCustom: false
    },
    forest: {
      id: 'forest',
      name: 'Forest',
      description: 'Dense woodlands teeming with life, offering timber and game but limiting visibility.',
      features: ['flounts', 'flounts+', 'flounts++', 'herd', 'ore'],
      isCustom: false
    },
    'fungal-forest': {
      id: 'fungal-forest',
      name: 'Fungal Forest',
      description: 'An alien forest of giant mushrooms and spores, where strange fungi dominate the ecosystem.',
      features: ['flounts', 'flounts+', 'herd', 'ore'],
      isCustom: false
    },
    grasslands: {
      id: 'grasslands',
      name: 'Grasslands',
      description: 'Rolling plains of grass perfect for grazing, offering clear sightlines and easy travel.',
      features: ['herd', 'herd+', 'herd++', 'ore', 'flounts'],
      isCustom: false
    },
    hills: {
      id: 'hills',
      name: 'Hills',
      description: 'Elevated terrain providing defensive advantages and panoramic views of surrounding areas.',
      features: ['ore', 'ore+', 'herd', 'flounts'],
      isCustom: false
    },
    jungle: {
      id: 'jungle',
      name: 'Jungle',
      description: 'Thick tropical rainforest with dense canopy, abundant life, and hidden dangers.',
      features: ['flounts', 'flounts+', 'flounts++', 'herd', 'ore'],
      isCustom: false
    },
    mountain: {
      id: 'mountain',
      name: 'Mountain',
      description: 'Towering peaks and rocky slopes, impassable to most but rich in precious minerals.',
      features: ['ore', 'ore+', 'ore++', 'herd', 'flounts'],
      isCustom: false
    },
    'needle-forest': {
      id: 'needle-forest',
      name: 'Needle Forest',
      description: 'Coniferous forests of pine and fir, thriving in colder climates with acidic soil.',
      features: ['flounts', 'flounts+', 'herd', 'ore'],
      isCustom: false
    },
    ocean: {
      id: 'ocean',
      name: 'Ocean',
      description: 'Deep open waters far from land, navigable only by ship and full of marine mysteries.',
      features: ['flounts', 'herd', 'ore'],
      isCustom: false
    },
    savannah: {
      id: 'savannah',
      name: 'Savannah',
      description: 'Tropical grasslands with scattered trees, supporting large herds and predators.',
      features: ['herd', 'herd+', 'herd++', 'ore', 'flounts'],
      isCustom: false
    },
    sea: {
      id: 'sea',
      name: 'Sea',
      description: 'Coastal waters and inland seas, providing fishing opportunities and naval routes.',
      features: ['flounts', 'herd', 'ore'],
      isCustom: false
    },
    shoals: {
      id: 'shoals',
      name: 'Shoals',
      description: 'Shallow waters with hidden sandbanks, treacherous for large vessels but rich in shellfish.',
      features: ['flounts', 'herd', 'ore'],
      isCustom: false
    },
    snow: {
      id: 'snow',
      name: 'Snow',
      description: 'Frozen wastelands covered in perpetual snow, where cold is the eternal enemy.',
      features: ['herd', 'ore', 'flounts'],
      isCustom: false
    },
    swamp: {
      id: 'swamp',
      name: 'Swamp',
      description: 'Wetlands of stagnant water and thick vegetation, difficult to navigate and full of disease.',
      features: ['herd', 'ore', 'flounts'],
      isCustom: false
    },
  },
};

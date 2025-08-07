import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Faction } from '../../model/faction.interface';

export const factionActions = {
  add: createAction('[Faction] Add Faction', props<{ faction: Faction }>()),
  update: createAction('[Faction] Update Faction', props<{ faction: Partial<Faction> & { id: string } }>()),
  remove: createAction('[Faction] Remove Faction', props<{ id: string }>()),
  removeAllCustom: createAction('[Faction] Remove All Custom Factions'),
  selectFaction: createAction('[Faction] Select Faction', props<{ id: string | null }>()),
};

// Entity-style actions for compatibility
export const factionEntityActions = {
  addFaction: createAction('[Faction] Add Faction', props<{ faction: Faction }>()),
  addFactions: createAction('[Faction] Add Factions', props<{ factions: Faction[] }>()),
  updateFaction: createAction('[Faction] Update Faction', props<{ update: Update<Faction> }>()),
  removeFaction: createAction('[Faction] Remove Faction', props<{ id: string }>()),
  clearFactions: createAction('[Faction] Clear Factions'),
  setFactions: createAction('[Faction] Set Factions', props<{ factions: Faction[] }>()),
};
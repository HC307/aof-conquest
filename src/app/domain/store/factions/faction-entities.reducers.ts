import {createReducer, on} from '@ngrx/store';
import {factionAdapter} from './factionAdapter';
import {FactionState} from './faction.state';
import {factionEntityActions} from './faction.actions';

export const initialFactionState: FactionState =
  factionAdapter.getInitialState();

export const factionEntitiesReducer = createReducer(
  initialFactionState,
  on(factionEntityActions.addFaction, (state, { faction }) =>
    factionAdapter.addOne(faction, state)
  ),
  on(factionEntityActions.addFactions, (state, { factions }) =>
    factionAdapter.addMany(factions, state)
  ),
  on(factionEntityActions.updateFaction, (state, { update }) =>
    factionAdapter.updateOne(update, state)
  ),
  on(factionEntityActions.removeFaction, (state, { id }) =>
    factionAdapter.removeOne(id, state)
  ),
  on(factionEntityActions.clearFactions, state =>
    factionAdapter.removeAll(state)
  ),
  on(factionEntityActions.setFactions, (state, { factions }) =>
    factionAdapter.setAll(factions, state)
  )
);
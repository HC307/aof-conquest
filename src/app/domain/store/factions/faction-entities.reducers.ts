import {createReducer, on} from '@ngrx/store';
import {factionAdapter} from './factionAdapter';
import {FactionState} from './faction.state';
import {factionEntityActions, factionActions} from './faction.actions';

export const initialFactionState: FactionState =
  factionAdapter.getInitialState({
    selectedFactionId: null
  });

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
  ),
  on(factionActions.selectFaction, (state, { id }) => ({
    ...state,
    selectedFactionId: id
  })),
  on(factionActions.remove, (state, { id }) => {
    const newState = factionAdapter.removeOne(id, state);
    return {
      ...newState,
      selectedFactionId: state.selectedFactionId === id ? null : state.selectedFactionId
    };
  }),
  on(factionActions.removeAllCustom, (state) => {
    const customFactionIds = Object.values(state.entities)
      .filter(faction => faction?.isUserCreated)
      .map(faction => faction!.id);
    const newState = factionAdapter.removeMany(customFactionIds, state);
    return {
      ...newState,
      selectedFactionId: customFactionIds.includes(state.selectedFactionId || '') ? null : state.selectedFactionId
    };
  })
);
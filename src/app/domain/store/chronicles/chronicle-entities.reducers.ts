import {createReducer, on} from '@ngrx/store';
import {chronicleAdapter} from './chronicleAdapter';
import {ChronicleState} from './chronicles.state';
import {chronicleEntityActions} from './chronicle.actions';
import {Chronicle} from '../../model/chronicle.interface';

export const initialChronicleState: ChronicleState =
  chronicleAdapter.getInitialState();

export const chronicleEntitiesReducer = createReducer(
  initialChronicleState,
  on(chronicleEntityActions.addChronicle, (state, { chronicle }) =>
    chronicleAdapter.addOne(chronicle, state)
  ),
  on(chronicleEntityActions.addChronicles, (state, { chronicles }) =>
    chronicleAdapter.addMany(chronicles, state)
  ),
  on(chronicleEntityActions.updateChronicle, (state, { update }) =>
    chronicleAdapter.updateOne(update, state)
  ),
  on(chronicleEntityActions.removeChronicle, (state, { id }) =>
    chronicleAdapter.removeOne(id, state)
  ),
  on(chronicleEntityActions.clearChronicles, state =>
    chronicleAdapter.removeAll(state)
  ),
  on(chronicleEntityActions.setChronicles, (state, { chronicles }) =>
    chronicleAdapter.setAll(chronicles, state)
  )
);

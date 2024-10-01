import {InferActionsType} from '../store.types';

import {appInitialState} from './app.reducer';
import {appActions} from './app.actions';

export type AppInitialStateType = typeof appInitialState

export type AppActionsType = InferActionsType<typeof appActions>
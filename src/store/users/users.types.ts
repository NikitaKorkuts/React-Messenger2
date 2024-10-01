import {InferActionsType} from '../store.types';

import {usersInitialState} from './users.reducer';

import {usersActions} from './users.actions';

export type UsersInitialStateType = typeof usersInitialState
export type FilterType = typeof usersInitialState.filter
export type UsersActionsType = InferActionsType<typeof usersActions>;
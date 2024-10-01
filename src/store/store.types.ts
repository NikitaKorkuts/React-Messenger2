import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';

import {rootReducer} from './store';

export type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

// get type of actions object
export type InferActionsType<T> = T extends {[key: string]: (...arg: any[]) => infer U} ? U : never

export type BasicThunkActionType<A extends Action> = ThunkAction<Promise<void>, AppStateType, unknown, A>


import {AppActionsType, AppInitialStateType} from './app.types';
import {INITIALIZED_SUCCESS} from './app.consts';

export const appInitialState = {
    initialized: false,
};

export const appReducer = (state = appInitialState, action: AppActionsType): AppInitialStateType => {
    switch (action.type) {
    case INITIALIZED_SUCCESS:
        return {
            ...state, initialized: true,
        };
    default:
        return state;
    }
};
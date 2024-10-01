import {getAuthUserData} from '../auth/auth.actions';
import {BasicThunkActionType} from '../store.types';

import {INITIALIZED_SUCCESS} from './app.consts';
import {AppActionsType} from './app.types';

export const appActions = {
    initializedSuccess: () => ({type: INITIALIZED_SUCCESS} as const),
};

export const initializeApp = (): BasicThunkActionType<AppActionsType> => (dispatch) => {
    return Promise.all([
        dispatch(getAuthUserData()),
    ]).then(() => {
        dispatch(appActions.initializedSuccess());
    });
};
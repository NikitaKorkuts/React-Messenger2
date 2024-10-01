import {InferActionsType} from '../store.types';
import {PhotosType} from '../../types/types';

import {authInitialState} from './auth.reducer';
import {authActions} from './auth.actions';
import {SET_AUTH_USER_AVATAR} from './auth.consts';


export type authInitialStateType = typeof authInitialState

export type AuthActionsType = InferActionsType<typeof authActions>

export type SetAuthUserAvatarActionType = {
    type: typeof SET_AUTH_USER_AVATAR,
    photos: PhotosType
}
import {ProfileType} from '../profile/profile.types';

import {AuthActionsType, authInitialStateType} from './auth.types';
import {SET_AUTH_USER_AVATAR, SET_AUTH_USER_DATA, SET_AUTH_USER_PROFILE, SET_CAPTCHA_URL} from './auth.consts';

export const authInitialState = {
    userId: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    authUserProfile: null as ProfileType | null,
    captchaUrl: null as string | null, // if null, then captcha is not required
};

export const authReducer = (state = authInitialState, action: AuthActionsType): authInitialStateType => {
    switch (action.type) {
    case SET_AUTH_USER_DATA:
        return {
            ...state, ...action.payload,
        };
    case SET_AUTH_USER_PROFILE:
        return {
            ...state, authUserProfile: action.profile,
        };
    case SET_AUTH_USER_AVATAR:
        return {
            ...state, authUserProfile: {...state.authUserProfile, photos: action.photos},
        };
    case SET_CAPTCHA_URL:
        return {
            ...state, captchaUrl: action.captchaUrl,
        };
    default:
        return state;
    }
};
import {ProfileType} from '../profile/profile.types';
import {PhotosType} from '../../types/types';
import {BasicThunkActionType} from '../store.types';

import {authServices} from '../../services/auth/auth.services';
import {ResultCodeCaptcha, ResultCodesEnum} from '../../services/services.types';
import {profileServices} from '../../services/profile/profile.services';
import {LoginFormDataType, StatusObjType} from '../../components/screens/Login/login.types';

import {AuthActionsType} from './auth.types';
import {SET_AUTH_USER_AVATAR, SET_AUTH_USER_DATA, SET_AUTH_USER_PROFILE, SET_CAPTCHA_URL} from './auth.consts';


export const authActions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: SET_AUTH_USER_DATA,
        payload: {userId: userId, email: email, login: login, isAuth: isAuth},
    } as const),
    setAuthUserProfile: (profile: ProfileType | null) => ({
        type: SET_AUTH_USER_PROFILE,
        profile,
    } as const),
    setAuthUserAvatar: (photos: PhotosType) => ({
        type: SET_AUTH_USER_AVATAR,
        photos,
    } as const),
    setCaptchaUrl: (captchaUrl: string) => ({type: SET_CAPTCHA_URL, captchaUrl} as const),
};

export const getAuthUserData = (): BasicThunkActionType<AuthActionsType> => {
    return async (dispatch) => {
        const response = await authServices.me();
        if (response.resultCode === ResultCodesEnum.Success) {
            const {id, email, login} = response.data;
            dispatch(authActions.setAuthUserData(id, email, login, true));
            profileServices.getUserProfile(id).then(data => {
                dispatch(authActions.setAuthUserProfile(data));
            });
        }
    };
};

export const login = (
    loginFormData: LoginFormDataType,
    setFormSubmitStatus: (statusObj: StatusObjType) => void,
): BasicThunkActionType<AuthActionsType> => {
    return async (dispatch) => {
        const {email, password, rememberMe, captcha} = loginFormData;

        const response = await authServices.login(email, password, rememberMe, captcha);
        const errorMsg = response.messages.length > 0 ? response.messages[0] : 'Some error';

        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthUserData());
        } else if (response.resultCode === ResultCodesEnum.Error) {
            setFormSubmitStatus({error: errorMsg});
        } else if (response.resultCode === ResultCodeCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
            setFormSubmitStatus({error: errorMsg});
        }
    };
}
;

export const logout = (): BasicThunkActionType<AuthActionsType> => (dispatch) => {
    return authServices.logout()
        .then(response => {
            if (response.resultCode === ResultCodesEnum.Success) {
                dispatch(authActions.setAuthUserData(null, null, null, false));
                dispatch(authActions.setAuthUserProfile(null));
            }
        });
};


export const getCaptchaUrl = (): BasicThunkActionType<AuthActionsType> => async (dispatch) => {
    const response = await authServices.getCaptchaUrl();
    dispatch(authActions.setCaptchaUrl(response.url));
};
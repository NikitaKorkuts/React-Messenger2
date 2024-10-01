import {PhotosType} from '../../types/types';
import {profileServices} from '../../services/profile/profile.services';
import {authActions, getAuthUserData} from '../auth/auth.actions';
import {BasicThunkActionType} from '../store.types';
import {SetAuthUserAvatarActionType} from '../auth/auth.types';
import {ResultCodesEnum} from '../../services/services.types';
import {formErrorsObj} from '../../utils/formErrorsObj';

import {followServices} from '../../services/follow/follow.services';

import {ProfileType, ProfileActionsType} from './profile.types';
import {
    SET_IS_FRIEND,
    SET_PROFILE_UPDATING_STATUS,
    SET_USER_AVATAR, SET_USER_PROFILE,
    SET_USER_STATUS,
} from './profile.consts';

export const profileActions = {
    setUserStatus: (status: string | null) => ({
        type: SET_USER_STATUS,
        status: status,
    } as const),
    setUserAvatar: (photos: PhotosType) => ({
        type: SET_USER_AVATAR,
        photos: photos,
    } as const),
    setProfileUpdatingStatus: (profileUpdatingStatus: string) => ({
        type: SET_PROFILE_UPDATING_STATUS,
        profileUpdatingStatus,
    } as const),
    setUserProfile: (profile: ProfileType) => ({
        type: SET_USER_PROFILE,
        profile: profile,
    } as const),
    setIsFriend: (isFriend: boolean | null) => ({
        type: SET_IS_FRIEND,
        isFriend,
    } as const),
};

export const getUserProfile = (userId: number | null): BasicThunkActionType<ProfileActionsType> => {
    return async (dispatch) => {
        const response = await profileServices.getUserProfile(userId);
        dispatch(profileActions.setUserProfile(response));
    };
};

export const getUserStatus = (userId: number): BasicThunkActionType<ProfileActionsType> => {
    return async (dispatch) => {
        const response = await profileServices.getUserStatus(userId);
        dispatch(profileActions.setUserStatus(response));
    };
};

export const updateUserStatus = (status: string): BasicThunkActionType<ProfileActionsType> => {
    return async (dispatch) => {
        const response = await profileServices.updateUserStatus(status);
        if (response.resultCode === 0) {
            dispatch(profileActions.setUserStatus(status));
        }
    };
};

export const updateUserAvatar = (image: File):
    BasicThunkActionType<ProfileActionsType | SetAuthUserAvatarActionType> => {
    return async (dispatch) => {
        const response = await profileServices.setUserAvatar(image);
        if (response.resultCode === 0) {
            dispatch(profileActions.setUserAvatar(response.data.photos));
            dispatch(authActions.setAuthUserAvatar(response.data.photos));
        }
    };
};

export const updateProfile = (
    profile: ProfileType,
    setStatus: (status: object) => void,
    setErrors: (errors: object) => void,
): BasicThunkActionType<ProfileActionsType> => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const response = await profileServices.setUserProfile(profile);
        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(profileActions.setProfileUpdatingStatus('success'));
            dispatch(getUserProfile(userId));
            dispatch(getAuthUserData());
        } else if (response.resultCode === ResultCodesEnum.Error) {
            const errors = formErrorsObj(response.messages);
            if(errors._error) {
                setStatus({error: errors._error});
            }
            setErrors(errors);
            dispatch(profileActions.setProfileUpdatingStatus('error'));
            return Promise.reject(response.messages[0]);
        }
    };
};

export const getIsFriend = (id: number | null): BasicThunkActionType<ProfileActionsType> => {
    return async (dispatch) => {
        if(id) {
            const response = await followServices.getIsFriend(id);
            dispatch(profileActions.setIsFriend(response));
        } else {
            dispatch(profileActions.setIsFriend(null));
        }
    };
};
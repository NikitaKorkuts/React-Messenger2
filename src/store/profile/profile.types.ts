import {ContactsType, PhotosType} from '../../types/types';

import {InferActionsType} from '../store.types';

import {profileInitialState} from './profile.reducer';
import {profileActions} from './profile.actions';

export type ProfileInitialStateType = typeof profileInitialState

export type ProfileActionsType = InferActionsType<typeof profileActions>

export type ProfileType = {
    userId?: number | null
    lookingForAJob?: boolean | null
    lookingForAJobDescription?: string | null
    fullName?: string | null
    contacts?: ContactsType | null
    photos?: PhotosType,
    aboutMe?: string | null
}


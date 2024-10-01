import {ProfileType} from '../../../store/profile/profile.types';
import {FilterType} from '../../../store/users/users.types';

export type HeaderPropsType = {
    isAuth: boolean
    userId: number | null
    authUserProfile: ProfileType | null
    logout: () => void
    newMessagesCount: number
    subscribeLinkClickHandler: () => void
}

export type HeaderContainerPropsType = {
    isAuth: boolean
    userId: number | null
    authUserProfile: ProfileType | null
    logout: () => void
    getNewMessagesCount: () => void
    newMessagesCount: number
    setFilter: (filter: FilterType) => void
    requestUsers: (page: number, pageSize: number, filter: FilterType) => void
    pageSize: number
}
import {Nullable, UsersType} from '../../../types/types';
import {FilterType} from '../../../store/users/users.types';

export type UsersContainerPropsType = {
    isFetching: boolean
    users: UsersType[]
    totalUsersCount: number
    currentPage: number
    pageSize: number
    filter: FilterType
    requestUsers: (page: number,
                   pageSize: number,
                   filter: FilterType) => Promise<void>
    setCurrentPage: (page: number) => void
    isFollowingInProgress: Array<number>
    follow: (id: number) => Promise<void>
    unfollow: (id: number) => Promise<void>
}

export type UsersPropsType = {
    users: UsersType[]
    totalUsersCount: number
    currentPage: number
    pageSize: number
    filter: FilterType
    requestUsers: (page: number,
                   pageSize: number,
                   filter: FilterType) => Promise<void>
    setCurrentPage: (page: number) => void
    isFollowingInProgress: Array<number>
    follow: (id: number) => Promise<void>
    unfollow: (id: number) => Promise<void>
}

export type UserItemPropsType = {
    id: number
    imgUrl: string
    name: string
    key: number
    isFriend: boolean
    isFollowingInProgress: Array<number>
    follow: (id: number) => Promise<void>
    unfollow: (id: number) => Promise<void>
    status: Nullable<string>;
}

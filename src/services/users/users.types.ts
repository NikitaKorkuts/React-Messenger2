import {UsersType} from '../../types/types';

export type GetUsersResponseType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}
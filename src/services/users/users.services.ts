import {instance} from '../services';

import {GetUsersResponseType} from './users.types';

export const usersServices = {
    getUsers(page = 1, pageSize = 10, term: string = '', friend: boolean | null = null) {
        const friendParam = (friend !== null) ? `&friend=${friend}` : '';
        return instance
            .get<GetUsersResponseType>(`users?page=${page}&count=${pageSize}&term=${term}` + friendParam)
            .then(response => response.data);
    },
};
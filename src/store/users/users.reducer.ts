import {UsersType} from '../../types/types';
import {updateObjectInArray} from '../../utils/object-helpers';

import {UsersActionsType, UsersInitialStateType} from './users.types';
import {
    ADD_TO_FRIENDS,
    REMOVE_FROM_FRIENDS,
    SET_CURRENT_PAGE, SET_FILTER,
    SET_TOTAL_USERS_COUNT,
    SET_USERS,
    TOGGLE_IS_FETCHING, TOGGLE_IS_FOLLOWING_IN_PROGRESS,
} from './users.consts';

export const usersInitialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowingInProgress: [] as Array<number>, // array of users ids that is fetching right now
    filter: {
        term: '',
        friend: null as null | boolean,
    },
};

export const usersReducer = (state = usersInitialState, action: UsersActionsType): UsersInitialStateType => {
    switch (action.type) {
    case ADD_TO_FRIENDS:
        return {
            ...state,
            users: updateObjectInArray(state.users, action.id, 'id', {followed: true}),
        };
    case REMOVE_FROM_FRIENDS:
        return {
            ...state,
            users: updateObjectInArray(state.users, action.id, 'id', {followed: false}),
        };
    case SET_USERS:
        return {
            ...state,
            users: action.users,
        };
    case SET_CURRENT_PAGE:
        return {
            ...state,
            currentPage: action.page,
        };
    case SET_TOTAL_USERS_COUNT:
        return {
            ...state,
            totalUsersCount: action.count,
        };
    case TOGGLE_IS_FETCHING:
        return {
            ...state,
            isFetching: action.isFetching,
        };
    case TOGGLE_IS_FOLLOWING_IN_PROGRESS:
        return {
            ...state,
            isFollowingInProgress: action.isFetching
                ? [...state.isFollowingInProgress, action.userId]
                : state.isFollowingInProgress.filter(id => id !== action.userId),
        };
    case SET_FILTER:
        return {
            ...state,
            filter: action.filter,
        };
    default:
        return state;
    };
};
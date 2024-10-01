import {Dispatch} from 'redux';

import {followServices} from '../../services/follow/follow.services';
import {usersServices} from '../../services/users/users.services';
import {ResponseType, ResultCodesEnum} from '../../services/services.types';
import {BasicThunkActionType} from '../store.types';
import {UsersType} from '../../types/types';

import {FilterType, UsersActionsType} from './users.types';
import {
    ADD_TO_FRIENDS,
    REMOVE_FROM_FRIENDS,
    SET_CURRENT_PAGE,
    SET_FILTER,
    SET_TOTAL_USERS_COUNT,
    SET_USERS, TOGGLE_IS_FETCHING,
    TOGGLE_IS_FOLLOWING_IN_PROGRESS,
} from './users.consts';

export const usersActions = {
    addToFriends: (id: number) => ({type: ADD_TO_FRIENDS, id} as const),
    removeFromFriends: (id: number) => ({type: REMOVE_FROM_FRIENDS, id} as const),
    setUsers: (users: Array<UsersType>) => ({type: SET_USERS, users} as const),
    setCurrentPage: (page: number) => ({type: SET_CURRENT_PAGE, page} as const),
    setTotalUsersCount: (count: number) => ({type: SET_TOTAL_USERS_COUNT, count} as const),
    setFilter: (filter: FilterType) => ({type: SET_FILTER, filter} as const),
    setToggleIsFetching: (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const),
    setToggleIsFollowingInProgress: (isFetching: boolean, userId: number) => ({
        type: TOGGLE_IS_FOLLOWING_IN_PROGRESS,
        isFetching,
        userId,
    } as const),
};

export const requestUsers = (
    page: number,
    pageSize: number,
    filter: FilterType,
): BasicThunkActionType<UsersActionsType> => {
    return async (dispatch) => {
        dispatch(usersActions.setToggleIsFetching(true));
        dispatch(usersActions.setCurrentPage(page));
        dispatch(usersActions.setFilter(filter));
        const response = await usersServices.getUsers(page, pageSize, filter.term, filter.friend);
        dispatch(usersActions.setToggleIsFetching(false));
        dispatch(usersActions.setTotalUsersCount(response.totalCount));
        dispatch(usersActions.setUsers(response.items));
    };
};

const _followUnfollowFlow = async (
    dispatch: Dispatch<UsersActionsType>,
    userId: number,
    apiMethod: (id: number) => Promise<ResponseType>,
    actionCreator: (userId: number) => UsersActionsType,
) => {
    dispatch(usersActions.setToggleIsFollowingInProgress(true, userId));
    const data = await apiMethod(userId);
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(usersActions.setToggleIsFollowingInProgress(false, userId));
};

export const follow = (userId: number): BasicThunkActionType<UsersActionsType> => async (dispatch) => {
    await _followUnfollowFlow(
        dispatch,
        userId,
        followServices.follow.bind(followServices),
        usersActions.addToFriends,
    );
};

export const unfollow = (userId: number): BasicThunkActionType<UsersActionsType> => async (dispatch) => {
    await _followUnfollowFlow(
        dispatch,
        userId,
        followServices.unfollow.bind(followServices),
        usersActions.removeFromFriends,
    );
};
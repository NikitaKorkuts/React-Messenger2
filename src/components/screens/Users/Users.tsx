import React, {FC} from 'react';

import defaultAvatar from '../../../assets/images/defaultAvatar.png';
import {Pagination} from '../../shared/Pagination/Pagination';
import {FilterType} from '../../../store/users/users.types';

import {UsersPropsType} from './users.types';
import {UserItem} from './UserItem';
import {UsersSearchForm} from './UsersSearchForm/UsersSearchForm';
import s from './user.module.scss';

export const Users: FC<UsersPropsType> = ({
    users,
    requestUsers,
    filter,
    setCurrentPage,
    totalUsersCount,
    pageSize,
    currentPage,
    isFollowingInProgress,
    unfollow,
    follow,
}) => {

    const UserElements = (users).map(u => {
        return (
            <UserItem
                id={u.id}
                imgUrl={u.photos.small !== null ? u.photos.small : defaultAvatar}
                name={u.name}
                key={u.id}
                isFriend={u.followed}
                isFollowingInProgress={isFollowingInProgress}
                unfollow={unfollow}
                follow={follow}
                status={u.status}
            />);
    },
    );

    const onPageChanged = (page: number) => {
        setCurrentPage(page);
        requestUsers(page, pageSize, filter);
    };

    const onFilterChanged = (filter: FilterType) => {
        requestUsers(1, pageSize, filter);
    };

    return (
        <div>
            <UsersSearchForm
                onFilterChanged={onFilterChanged}
                filter={filter}
            />
            {totalUsersCount/pageSize > 1 && (
                <Pagination
                    totalItemsCount={totalUsersCount}
                    currentPage={currentPage}
                    onPageChanged={onPageChanged}
                    pageSize={pageSize}
                    filter={filter}
                />
            )}
            <div className={s.users}>
                {UserElements}
            </div>

        </div>
    );
};

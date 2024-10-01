import React, {FC} from 'react';
import {Link} from 'react-router-dom';

import {UserItemPropsType} from './users.types';
import s from './user.module.scss';

export const UserItem: FC<UserItemPropsType> = ({
    imgUrl,
    name,
    isFriend,
    isFollowingInProgress,
    follow,
    id,
    unfollow,
    status,
}) => {
    const onAddToFriends = () => {
        follow(id);
    };
    const onRemoveFromFriends = () => {
        unfollow(id);
    };
    const getFollowButton = () => {
        if (isFriend) {
            return (
                <div className={s.follow}>
                    <button
                        disabled={isFollowingInProgress.some(userId => userId === id)}
                        onClick={onRemoveFromFriends}
                        className={s.followBtn}
                    >
                        Отписаться
                    </button>
                </div>
            );
        } else {
            return (
                <div className={s.follow}>
                    <button
                        disabled={isFollowingInProgress.some(userId => userId === id)}
                        onClick={onAddToFriends}
                        className={s.followBtn}
                    >
                        Подписаться
                    </button>
                </div>
            );
        }
    };

    const getIsFollowing = () => {
        if(isFriend) {
            return <span className={s.yourFriend} >&#10003; Вы подписаны</span>;
        }
    };

    return (
        <div className={s.user}>
            <div className={s.mainPart}>
                <div className={s.leftSide}>
                    <div className={s.userAvatar}>
                        <Link to={`/profile/${id}`}>
                            <img className={s.avatarImg} alt="UserAvatar" src={imgUrl}/>
                        </Link>
                    </div>
                    <div className={s.userInfo}>
                        <div className={s.infoName}>
                            <Link className={s.profileLink} to={`/profile/${id}`}>
                                <p>{name}</p>
                            </Link>
                        </div>
                        <div className={s.infoStatus}>
                            <p className={s.status}>
                                {status?.slice(0, 20)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className={s.isFollowing}>
                    {getIsFollowing()}
                </div>
            </div>

            <div className={s.actions}>
                {getFollowButton()}
                <div className={s.startChatting}>
                    <Link to={`/dialog/${id}`}>
                        <button className={s.startChattingBtn}>
                            Написать сообщение
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
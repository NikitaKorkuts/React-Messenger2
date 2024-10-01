import React, {FC} from 'react';
import {Link, NavLink} from 'react-router-dom';

import {ReactComponent as SearchIcon} from '../../../assets/icons/search-icon.svg';
import {ReactComponent as ChatIcon} from '../../../assets/icons/chatIcon.svg';
import defaultAvatar from '../../../assets/images/defaultAvatar.png';
import invertedTriangle from '../../../assets/icons/invertedTriangle.png';
import {Dropdown} from '../../shared/Dropdown/Dropdown';
import {RouterType} from '../../../types/types';

import s from './Header.module.scss';
import {HeaderPropsType} from './header.types';

export const Header: FC<HeaderPropsType & RouterType> = ({
    isAuth,
    userId,
    authUserProfile,
    router,
    logout,
    newMessagesCount,
    subscribeLinkClickHandler,
}) => {
    const pathname = router.location.pathname;
    const isProfileLinkActive = pathname === '/profile' || pathname === `/profile/${userId}`;
    const isSubscribeLinkActive = pathname + router.location.search === '/users?friend=true';

    return (
        <div className={s.header}>
            <div className={s.wrapper}>
                <div className={s.search}>
                    <NavLink
                        to={'/users'}
                        className={({ isActive }) => (isActive ? s.active : '')}
                    >
                        <SearchIcon className={s.searchIcon} />
                    </NavLink>
                    <NavLink
                        to={!pathname.includes('/dialog/') ? '/dialogs' : '/dialog'}
                        className={({ isActive }) => (isActive ? s.active : '')}
                    >
                        <ChatIcon className={s.chatIcon} />
                        {newMessagesCount !== 0 && (
                            <div className={s.newMessagesCount}>
                                <p className={s.newMessagesCountText}>{newMessagesCount}</p>
                            </div>
                        )}
                    </NavLink>

                </div>
                {isAuth && authUserProfile
                    ?
                    <div className={s.profileLink}>
                        <Dropdown
                            header={
                                <div className={s.dropdownMenuHeader}>
                                    <p className={s.link}>{authUserProfile.fullName}</p>
                                    <img
                                        className={s.triangleIcon}
                                        src={invertedTriangle}
                                        alt="triangle"
                                    />
                                </div>
                            }
                            menuItems={
                                <div className={s.dropdownMenuItems}>
                                    <NavLink
                                        end to={'/profile'}
                                        className={isProfileLinkActive ? s.active : ''}
                                    >
                                        <div className={s.dropdownMenuItem}>
                                            Профиль
                                        </div>
                                    </NavLink>
                                    <NavLink
                                        to={'/users?friend=true'}
                                        onClick={subscribeLinkClickHandler}
                                        className={isSubscribeLinkActive ? s.active : ''}
                                    >
                                        <div className={s.dropdownMenuItem}>
                                            <p>Подписки</p>
                                        </div>
                                    </NavLink>
                                    <a onClick={logout}>
                                        <div className={s.dropdownMenuItem}>
                                        Выйти
                                        </div>
                                    </a>
                                </div>
                            }
                        />
                        <Link
                            to={`/profile/${userId}`}
                            className={s.profileLink}
                        >
                            <img
                                className={s.avatar}
                                src={authUserProfile.photos?.small || defaultAvatar}
                                alt="avatar"
                            />
                        </Link>
                    </div>
                    :
                    <Link to={'/login'} className={s.login}>Войти</Link>
                }
            </div>
        </div>
    );
};
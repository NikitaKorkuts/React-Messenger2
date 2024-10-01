import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Navigate} from 'react-router-dom';

import {
    getIsFriend,
    getUserProfile,
    getUserStatus,
    profileActions, updateProfile,
    updateUserAvatar,
    updateUserStatus,
} from '../../../store/profile/profile.actions';
import {withRouter} from '../../../hocs/withRouter';
import {AppStateType} from '../../../store/store.types';
import {RouterType} from '../../../types/types';
import {follow, unfollow} from '../../../store/users/users.actions';
import {withAuthRedirect} from '../../../hocs/withAuthRedirect';

import {Profile} from './Profile';
import {ProfileContainerPropsType} from './profile.types';

class ProfileContainer extends React.Component<RouterType & ProfileContainerPropsType> {
    __refreshUserProfile() {
        const {getUserProfile, getUserStatus, router, authUserId, getIsFriend} = this.props;

        const userId = router.params.id || authUserId;
        if (userId) {
            getUserProfile(userId);
            getUserStatus(userId);
            getIsFriend(userId);
        }
    }

    componentDidMount() {
        this.__refreshUserProfile();
    }

    componentDidUpdate(prevProps: RouterType & ProfileContainerPropsType) {
        if (prevProps.router.params.id !== this.props.router.params.id) {
            this.__refreshUserProfile();
        }
    }

    render() {
        const {
            isAuth,
            authUserId,
            router,
            profile,
            status,
            profileUpdatingStatus,
            updateUserStatus,
            setProfileUpdatingStatus,
            updateProfile,
            updateUserAvatar,
            isFriend,
            follow,
            unfollow,
            setIsFriend,
        } = this.props;

        if (!isAuth && !router.params.id) {
            return <Navigate to={'/login'}/>;
        }
        const isOwner = Number(router.params.id) === authUserId || !router.params.id;
        return (
            <Profile
                isOwner={isOwner}
                profile={profile}
                status={status}
                profileUpdatingStatus={profileUpdatingStatus}
                updateUserStatus={updateUserStatus}
                updateProfile={updateProfile}
                updateUserAvatar={updateUserAvatar}
                setProfileUpdatingStatus={setProfileUpdatingStatus}
                isFriend={isFriend}
                follow={follow}
                unfollow={unfollow}
                setIsFriend={setIsFriend}
            />
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    authUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    profile: state.profile.profile,
    status: state.profile.status,
    profileUpdatingStatus: state.profile.profileUpdatingStatus,
    isFriend: state.profile.isFriend,
});

export default compose<React.ComponentType>(withRouter, withAuthRedirect, connect(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    updateUserAvatar,
    updateProfile,
    setProfileUpdatingStatus: profileActions.setProfileUpdatingStatus,
    getIsFriend,
    follow,
    unfollow,
    setIsFriend: profileActions.setIsFriend,
}))(ProfileContainer);
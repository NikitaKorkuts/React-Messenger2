import {connect} from 'react-redux';
import React, {Component} from 'react';
import {compose} from 'redux';

import {AppStateType} from '../../../store/store.types';
import {withRouter} from '../../../hocs/withRouter';
import {logout} from '../../../store/auth/auth.actions';
import {RouterType} from '../../../types/types';
import {getNewMessagesCount} from '../../../store/dialogs/dialogs.actions';
import {requestUsers, usersActions} from '../../../store/users/users.actions';

import {Header} from './Header';
import {HeaderContainerPropsType} from './header.types';


class HeaderContainer extends Component<HeaderContainerPropsType & RouterType> {
    newMessagesCountRequestTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
    });
    componentDidMount() {
        const {getNewMessagesCount, isAuth} = this.props;
        if (isAuth) {
            clearInterval(this.newMessagesCountRequestTimer);
            this.newMessagesCountRequestTimer = setInterval(
                () => {

                    getNewMessagesCount();

                }, 3000,
            );
        }
    }

    componentDidUpdate(prevProps: HeaderContainerPropsType & RouterType) {
        const {getNewMessagesCount, isAuth} = this.props;

        if (prevProps.isAuth !== isAuth) {
            clearInterval(this.newMessagesCountRequestTimer);
            this.newMessagesCountRequestTimer = setInterval(
                () => {
                    if (isAuth) {
                        getNewMessagesCount();
                    }
                }, 3000,
            );
        }
    }

    componentWillUnmount() {
        clearInterval(this.newMessagesCountRequestTimer);
    }

    subscribeLinkClickHandler = () => {
        const {router, setFilter, requestUsers, pageSize} = this.props;

        if(router.location.pathname === '/users' && router.location.search !== '?friend=true' ) {
            setFilter({
                term: '',
                friend: true,
            });
            requestUsers(1,  pageSize,{
                term: '',
                friend: true,
            });
        }
    };

    render() {
        const {authUserProfile, isAuth, userId, logout, newMessagesCount, router} = this.props;

        return (
            <Header
                authUserProfile={authUserProfile}
                isAuth={isAuth}
                userId={userId}
                logout={logout}
                newMessagesCount={newMessagesCount}
                router={router}
                subscribeLinkClickHandler={this.subscribeLinkClickHandler}
            />
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    userId: state.auth.userId,
    authUserProfile: state.auth.authUserProfile,
    newMessagesCount: state.dialogs.newMessagesCount,
    pageSize: state.users.pageSize,
});

export default compose<React.ComponentType>(withRouter, connect(mapStateToProps, {
    logout,
    getNewMessagesCount,
    setFilter: usersActions.setFilter,
    requestUsers,
}))(HeaderContainer);
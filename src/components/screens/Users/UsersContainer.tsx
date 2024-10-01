import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {Preloader} from '../../shared/Preloader/Preloader';
import {withRouter} from '../../../hocs/withRouter';
import {AppStateType} from '../../../store/store.types';
import {RouterType} from '../../../types/types';
import {follow, requestUsers, unfollow, usersActions} from '../../../store/users/users.actions';
import {withAuthRedirect} from '../../../hocs/withAuthRedirect';

import {UsersContainerPropsType} from './users.types';
import {Users} from './Users';

class UsersContainer extends Component<RouterType & UsersContainerPropsType> {

    componentDidMount() {
        const {filter, currentPage, pageSize, router, requestUsers} = this.props;

        const search = new URLSearchParams(router.location.search);

        let actualPage = currentPage;
        let actualFilter = filter;

        if (!!search.get('page')) actualPage = Number(search.get('page'));
        if (!!search.get('term')) actualFilter = {...actualFilter, term: search.get('term') as string};
        switch (search.get('friend')) {
        case 'null':
            actualFilter = {...actualFilter, friend: null};
            break;
        case 'false':
            actualFilter = {...actualFilter, friend: false};
            break;
        case 'true':
            actualFilter = {...actualFilter, friend: true};
            break;
        }
        requestUsers(actualPage, pageSize, actualFilter);
    }

    componentDidUpdate(prevProps: RouterType & UsersContainerPropsType) {
        const {filter, currentPage, router} = this.props;

        if(filter !== prevProps.filter || currentPage !== prevProps.currentPage) {
            const queryParams: any = {};

            if (!!filter.term) queryParams.term = filter.term;
            if (filter.friend !== null) queryParams.friend = String(filter.friend);
            if (currentPage !== 1) queryParams.page = String(currentPage);

            const queryString = new URLSearchParams(queryParams).toString();

            router.navigate({
                search: '?' + queryString,
            });
        }
    }

    render() {
        const {
            isFetching,
            users,
            totalUsersCount,
            currentPage,
            pageSize,
            filter,
            setCurrentPage,
            requestUsers,
            isFollowingInProgress,
            unfollow,
            follow,
        } = this.props;

        if (isFetching) {
            return <Preloader/>;
        }
        return (
            <Users
                users={users}
                totalUsersCount={totalUsersCount}
                currentPage={currentPage}
                pageSize={pageSize}
                filter={filter}
                setCurrentPage={setCurrentPage}
                requestUsers={requestUsers}
                isFollowingInProgress={isFollowingInProgress}
                unfollow={unfollow}
                follow={follow}
            />
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isFetching: state.users.isFetching,
    users: state.users.users,
    totalUsersCount: state.users.totalUsersCount,
    currentPage: state.users.currentPage,
    pageSize: state.users.pageSize,
    filter: state.users.filter,
    isFollowingInProgress: state.users.isFollowingInProgress,
});


export default compose<React.ComponentType>(withRouter, withAuthRedirect, connect(mapStateToProps, {
    requestUsers,
    setCurrentPage: usersActions.setCurrentPage,
    follow,
    unfollow,
}))(UsersContainer);
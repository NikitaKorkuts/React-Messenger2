import React, {FunctionComponent} from 'react';
import {Navigate} from 'react-router-dom';
import {connect} from 'react-redux';

import {AppStateType} from '../store/store.types';

const mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
});

type MapStatePropsType = ReturnType<typeof mapStateToPropsForRedirect>

export const withAuthRedirect = <WCP extends object>(WrappedComponent: React.ComponentType<WCP>) => {
    const RedirectComponent: FunctionComponent<MapStatePropsType> = (props) => {
        const {isAuth, ...restProps} = props;
        if (!props.isAuth) return <Navigate to={'/login'}/>;
        return <WrappedComponent {...restProps as WCP} />;
    };

    return connect<MapStatePropsType, {}, WCP, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent);
};
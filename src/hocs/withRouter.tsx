import React from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {FunctionComponent} from 'react';

type WithRouterProps = {};

export const withRouter = <P extends object>(Component: React.ComponentType<P>) => {
    const ComponentWithRouterProp: FunctionComponent<P & WithRouterProps> = (props) => {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        return (
            <Component {...props as P} router={{location, navigate, params}}/>
        );
    };

    return ComponentWithRouterProp;
};
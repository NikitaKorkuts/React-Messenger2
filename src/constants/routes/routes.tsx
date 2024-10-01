import React from 'react';
import {Navigate} from 'react-router-dom';

const DialogsPage = React.lazy(() => import('../../pages/Dialogs/DialogsPage'));
export const DialogPage = React.lazy(() => import('../../pages/Dialog/DialogPage'));
const LoginPage = React.lazy(() => import('../../pages/Login/LoginPage'));
export const ProfilePage = React.lazy(() => import('../../pages/Profile/ProfilePage'));
const UsersPage = React.lazy(() => import('../../pages/Users/UsersPage'));

export const routes = [
    {
        path: '/dialogs',
        component: <DialogsPage/>,
        child: null,
        childPath: null,
    },
    {
        path: '/dialog',
        component: <DialogPage/>,
        child: <DialogPage/>,
        childPath: ':id',
    },
    {
        path: '/login',
        component: <LoginPage/>,
        child: null,
        childPath: null,
    },
    {
        path: '/profile',
        component: <ProfilePage/>,
        child: <ProfilePage/>,
        childPath: ':id',
    },
    {
        path: '/users',
        component: <UsersPage/>,
        child: null,
        childPath: null,
    },
    {
        path: '*',
        component: <Navigate to="/dialogs" />,
        child: null,
        childPath: null,
    },
];

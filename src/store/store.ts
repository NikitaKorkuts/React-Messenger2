import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';

import {dialogsReducer} from './dialogs/dialogs.reducer';
import {profileReducer} from './profile/profile.reducer';
import {authReducer} from './auth/auth.reducer';
import {appReducer} from './app/app.reducer';
import {usersReducer} from './users/users.reducer';

export const rootReducer = combineReducers({
    dialogs: dialogsReducer,
    profile: profileReducer,
    auth: authReducer,
    app: appReducer,
    users: usersReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

//@ts-ignore
window.store = store;

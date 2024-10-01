import {connect} from 'react-redux';

import {AppStateType} from '../../../store/store.types';
import {login} from '../../../store/auth/auth.actions';

import {Login} from './Login';

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, {login})(Login);

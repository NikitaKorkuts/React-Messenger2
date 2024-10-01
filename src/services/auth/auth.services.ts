import {instance} from '../services';
import {ResponseType, ResultCodeCaptcha, ResultCodesEnum} from '../services.types';

import {GetCaptchaUrlResponseType, LoginResponseDataType, MeResponseDataType} from './auth.types';

export const authServices = {
    me() {
        return instance.get<ResponseType<MeResponseDataType>>('auth/me')
            .then(response => response.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<ResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeCaptcha>>('auth/login', {
            email,
            password,
            rememberMe,
            captcha,
        })
            .then(res => res.data);
    },
    logout() {
        return instance.delete('auth/login')
            .then(res => res.data);
    },
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponseType>('security/get-captcha-url')
            .then(res => res.data);
    },
};
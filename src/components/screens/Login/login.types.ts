export type LoginPropsType = {
    isAuth: boolean
    captchaUrl: string | null
    login: (loginFormData: LoginFormDataType,
            setLoginFormSubmittingStatus: (statusObj: StatusObjType) => void) => Promise<void>
}

export type LoginFormType = {
    email: string
    password: string
    rememberMe: boolean
    verifyCode: string
}

export type SubmitPropsType = {
    setSubmitting: (isSubmitting: boolean) => void
    setStatus: (statusObj: StatusObjType) => void
}

export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

export type StatusObjType = {
    error: string
}
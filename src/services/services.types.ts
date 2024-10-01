export type ResponseType<D = {}, RS = ResultCodesEnum> = {
    data: D
    resultCode: RS
    messages: Array<string>
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeCaptcha {
    CaptchaIsRequired = 10
}
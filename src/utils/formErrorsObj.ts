export const formErrorsObj = (messages: Array<string>) => {
    const regEx = /\(([^)]+)\)/;
    const errors: any = {};

    messages.map((msg) => {
        const errorLocation = regEx.exec(msg);
        const errMsg = msg.replace(regEx, '');

        if (errorLocation && errorLocation[1].search(/->/) !== -1) {
            const obj = errorLocation[1].split('->').map(str => str.charAt(0).toLowerCase() + str.slice(1));
            errors[obj[0]] = {...errors[obj[0]], [obj[1]]: errMsg};
        } else if (errorLocation) {
            const errLocation = errorLocation[1].charAt(0).toLowerCase() + errorLocation[1].slice(1);
            errors[errLocation] = errMsg;
        } else {
            errors['_error'] = errMsg;
        }
    });
    return errors;
};
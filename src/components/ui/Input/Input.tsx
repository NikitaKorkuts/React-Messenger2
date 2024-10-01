import React, {FC} from 'react';

import {Field} from '../../shared/Field/Field';

import {ExtraPropsType, InputPropsType} from './input.types';

export const Input: FC<InputPropsType> = ({
    type = 'text',
    name,
    checked,
    hasError= false,
    error= '',
    props = {},
}) => {
    const extraProps: ExtraPropsType = {};
    if (type === 'checkbox' && checked === true) {
        extraProps.checked = true;
    }
    return (
        <Field
            error={error}
            hasError={hasError}
        >
            <input
                type={type}
                name={name}
                {...props}
                {...extraProps}
            />
        </Field>
    );
};
import React, {FC} from 'react';

import {Field} from '../../shared/Field/Field';

import {TextareaPropsType} from './textarea.types';

export const Textarea: FC<TextareaPropsType> = ({
    name,
    hasError = false,
    error = '',
    props = {},
}) => {
    return (
        <Field
            error={error}
            hasError={hasError}
        >
            <textarea
                name={name}
                {...props}
            />
        </Field>
    );
};
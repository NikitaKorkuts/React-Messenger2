import {ChangeEvent} from 'react';

import {FilterType} from '../../../../store/users/users.types';

export type FormType = {
    term: string
    friend: FriendType
}

export type FriendType = 'null' | 'true' | 'false';

export type UsersSearchFormPropsType = {
    onFilterChanged: (filter: FilterType) => void
    filter: FilterType
}

export type handleSelectChangeType = (
    e: ChangeEvent<HTMLSelectElement>,
    callbacks: {
        setSubmitting: (isSubmitting: boolean) => void,
        isSubmitting: boolean
        values: FormType
    },
) => void
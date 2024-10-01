import {ChangeEvent, FC} from 'react';
import {Field, Form, Formik} from 'formik';

import {FilterType} from '../../../../store/users/users.types';
import {ReactComponent as SearcIcon} from '../../../../assets/icons/search-icon.svg';

import s from './usersSearchForm.module.scss';
import {FormType, FriendType, handleSelectChangeType, UsersSearchFormPropsType} from './usersSearchForm.types';

export const UsersSearchForm: FC<UsersSearchFormPropsType> = ({
    onFilterChanged,
    filter,
}) => {

    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        let friend;
        switch (values.friend) {
        case 'null':
            friend = null;
            break;
        case 'false':
            friend = false;
            break;
        case 'true':
            friend = true;
            break;
        }

        const filter: FilterType = {
            term: values.term,
            friend: friend,
        };

        onFilterChanged(filter);
        setSubmitting(false);
    };

    const handleSelectChange: handleSelectChangeType = (e, {isSubmitting, values, setSubmitting}) => {
        e.persist();
        if (!isSubmitting) {
            submit({...values, friend: e.target.value as FriendType}, {setSubmitting});
        }
    };


    return (
        <div className={s.usersSearchForm}>
            <Formik
                enableReinitialize={true}
                initialValues={{term: filter.term, friend: String(filter.friend) as FriendType}}
                onSubmit={submit}
            >
                {({isSubmitting, values, setSubmitting}) => (
                    <Form className={s.usersSearch}>
                        <SearcIcon
                            className={s.searchIcon}
                            onClick={!isSubmitting ? () => submit(values, {setSubmitting}) : () => {
                            }}
                        />
                        <Field
                            placeholder="Искать..."
                            className={s.searchForm}
                            type=""
                            name="term"
                            // autoFocus={true}
                        />

                        <Field
                            name="friend"
                            as="select"
                            className={s.searchOptions}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                handleSelectChange(e, {setSubmitting, isSubmitting, values});
                            }}
                        >
                            <option
                                className={s.searchOption}
                                value="null"
                            >
                                Все пользователи
                            </option>
                            <option
                                className={s.searchOption}
                                value="true"
                            >
                                Среди подписок
                            </option>
                            <option
                                className={s.searchOption}
                                value="false"
                            >
                                Кроме подписок
                            </option>
                        </Field>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
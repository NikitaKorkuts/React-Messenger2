import React, {FC} from 'react';
import {Formik, getIn} from 'formik';
import * as yup from 'yup';

import {ContactsType} from '../../../../types/types';
import {ProfileEditDataFormsPropsType} from '../profile.types';
import {Input} from '../../../ui/Input/Input';
import {Textarea} from '../../../ui/Textarea/Textarea';

import s from './ProfileEditDataForm.module.scss';

export const ProfileEditDataForms: FC<ProfileEditDataFormsPropsType> = ({profile, submit}) => {
    const initialValues = {
        fullName: profile.fullName,
        aboutMe: profile.aboutMe,
        lookingForAJob: profile.lookingForAJob,
        lookingForAJobDescription: profile.lookingForAJobDescription,
        contacts: {} as ContactsType,
    };

    const contactsValidation = {};
    for (const contact in profile.contacts) {
        (contactsValidation as any)[contact] = yup
            .string()
            .max(200, 'Введен слишком длинный url адресс')
            .url('Введен некорректный url адресс');

        if (profile.contacts[contact]) {
            Object.defineProperty(initialValues.contacts, contact, {
                value: profile.contacts[contact] as string,
                enumerable: true,
            });
        } else {
            Object.defineProperty(initialValues.contacts, contact, {
                value: '',
                enumerable: true,
            });
        }
    }

    const validationSchemaFields = {
        fullName: yup
            .string()
            .max(20, 'Вы ввели слишком длинное имя')
            .required('Введите имя'),
        aboutMe: yup
            .string()
            .max(1000, 'Вы ввели слишком длинный пароль')
            .required('Введите информацию о себе'),
        lookingForAJobDescription: yup
            .string()
            .max(1000, 'Вы ввели слишком длинный код подтверждения')
            .required('Введите свои профессиональные навыки'),
        contacts: yup.object().shape(contactsValidation),
    };


    return (

        <div>
            <Formik
                initialValues={initialValues}
                validateOnBlur
                onSubmit={(values, {setStatus, setErrors}) => submit(values, setStatus, setErrors)}
                validationSchema={yup.object().shape(validationSchemaFields)}
            >
                {({
                    values,
                    handleChange,
                    touched,
                    errors,
                    handleBlur,
                    handleSubmit,
                    status,
                }) => {

                    return (
                        <div>
                            <form className={s.formLogin} onSubmit={handleSubmit}>

                                <div className={s.formLogInWithEmail}>

                                    <div className={s.formTitleRow}>
                                        <h1>Редактировать Профиль</h1>
                                    </div>

                                    <div className={s.formRow}>
                                        <label>
                                            <p>Имя</p>
                                            <Input
                                                name="fullName"
                                                hasError={touched.fullName && errors.fullName}
                                                error={errors.fullName}
                                                props={{
                                                    onBlur: handleBlur,
                                                    value: values.fullName,
                                                    onChange: handleChange,
                                                }}
                                            />
                                        </label>
                                    </div>

                                    <div className={s.formRow}>
                                        <label>
                                            <p>Обо Мне</p>
                                            <Textarea
                                                name="aboutMe"
                                                hasError={touched.aboutMe && errors.aboutMe}
                                                error={errors.aboutMe}
                                                props={{
                                                    onBlur: handleBlur,
                                                    value: values.aboutMe,
                                                    onChange: handleChange,
                                                }}
                                            />
                                        </label>
                                    </div>

                                    <div className={s.formRow}>
                                        <label className={s.formCheckbox}>
                                            <p>Ищу Работу</p>
                                            <Input
                                                name="lookingForAJob"
                                                type="checkbox"
                                                checked={values.lookingForAJob}
                                                props={{
                                                    onBlur: handleBlur,
                                                    onChange: handleChange,
                                                }}
                                            />
                                        </label>
                                    </div>

                                    <div className={s.formRow}>
                                        <label>
                                            <p>Мои Навыки</p>
                                            <Textarea
                                                name="lookingForAJobDescription"
                                                hasError={
                                                    touched.lookingForAJobDescription &&
                                                    errors.lookingForAJobDescription
                                                }
                                                error={errors.lookingForAJobDescription}
                                                props={{
                                                    onBlur: handleBlur,
                                                    value: values.lookingForAJobDescription,
                                                    onChange: handleChange,
                                                }}
                                            />
                                        </label>
                                    </div>

                                    <div className={s.formTitleRow}>
                                        <h1>Редактировать Контакты</h1>
                                    </div>

                                    {Object.keys(profile.contacts as ContactsType).map(key => {
                                        if (values.contacts) {
                                            return (
                                                <div
                                                    className={s.formRow}
                                                    key={key}
                                                >
                                                    <label>
                                                        <p>{key}</p>
                                                        <Input
                                                            hasError={
                                                                getIn(touched.contacts, key) &&
                                                                getIn(errors.contacts, key)
                                                            }
                                                            error={getIn(errors.contacts, key)}
                                                            name={'contacts.' + key}
                                                            props={{
                                                                onBlur: handleBlur,
                                                                value: values.contacts[key],
                                                                onChange: handleChange,
                                                            }
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                            );
                                        }
                                        return {};
                                    })}
                                    {status?.error && (
                                        <div className={s.formRow}>
                                            <label>
                                                <span className={s.formErrorText}>{status?.error}</span>
                                            </label>
                                        </div>)
                                    }

                                    <div className={s.formRow}>
                                        <button type="submit">Сохранить Изменения</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    );
                }
                }
            </Formik>
        </div>
    );
};
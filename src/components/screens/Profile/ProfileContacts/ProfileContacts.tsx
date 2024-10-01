import React, {FC} from 'react';

import s from '../profile.module.scss';
import {ProfileContactsPropsType} from '../profile.types';

export const ProfileContacts: FC<ProfileContactsPropsType> = ({contacts}) => {
    const contactElements = [];

    for (const key in contacts) {
        if (contacts[key]) {
            const contact = (
                <div
                    key={key}
                    className={s.contact}
                >
                    <p className={s.contactHeader}>{`${key}`}</p>
                    <a
                        href={contacts[key] as string}
                        className={s.contactLink}
                    >
                        {contacts[key]} &#10138;
                    </a>
                </div>
            );
            contactElements.push(contact);
        }
    }

    if (contactElements.length > 0) {
        return (
            <div className={`${s.contentBlock} ${s.contactsBlock}`}>
                <h1 className={s.header}>Контакты</h1>
                {contactElements}
            </div>
        );
    }
    return <></>;
};

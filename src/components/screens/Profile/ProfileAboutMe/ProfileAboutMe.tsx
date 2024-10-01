import React, {FC} from 'react';

import s from '../profile.module.scss';
import {ProfileAboutMePropsType} from '../profile.types';

export const ProfileAboutMe: FC<ProfileAboutMePropsType> = ({aboutMe, lookingForAJobDescription}) => {
    if (aboutMe || lookingForAJobDescription) {
        return (
            <div className={`${s.contentBlock} ${s.aboutUserBlock}`}>
                {aboutMe && (
                    <div>
                        <h1 className={s.header}>Обо мне</h1>
                        <p className={s.aboutMeText}>{aboutMe}</p>
                    </div>
                )}
                {lookingForAJobDescription && (
                    <div>
                        <h1 className={s.header}>Мои навыки</h1>
                        <p className={s.aboutMeText}>{lookingForAJobDescription}</p>
                    </div>
                )}
            </div>

        );
    }
    return <></>;
};

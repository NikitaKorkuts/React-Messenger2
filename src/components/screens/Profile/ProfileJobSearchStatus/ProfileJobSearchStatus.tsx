import React, {FC} from 'react';

import {ProfileJobSearchStatusType} from '../profile.types';
import s from '../profile.module.scss';

export const ProfileJobSearchStatus: FC<ProfileJobSearchStatusType> = ({areLookingForJob}) => {
    if (areLookingForJob) {
        return (
            <div className={s.jobSearchStatus}>
                <h2>Статус поиска работы: <span className={s.activelyLooking}>В Активном Поиске</span></h2>
            </div>
        );
    }
    return (
        <div className={s.jobSearchStatus}>
            <h2>Статус поиска работы: <span className={s.notLooking}>Не в поиске</span></h2>
        </div>
    );
};
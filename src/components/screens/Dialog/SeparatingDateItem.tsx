import React, {FC} from 'react';

import s from './dialog.module.scss';
import {SeparatingDateItemPropsType} from './dialog.types';

export const SeparatingDateItem:FC<SeparatingDateItemPropsType> = ({date}) => {
    return (
        <div>
            <div className={s.separationDate}>
                <p>
                    {date}
                </p>
            </div>
        </div>
    );
};
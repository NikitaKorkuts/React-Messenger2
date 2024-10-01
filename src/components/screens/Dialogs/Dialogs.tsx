import React, {FC} from 'react';

import s from './dialogs.module.scss';
import {DialogsPropsType} from './dialogs.types';
import {DialogItem} from './DialogItem';

export const Dialogs: FC<DialogsPropsType> = ({dialogs, authUserId}) => {
    return (
        <div className={s.dialogs}>
            {dialogs.map((dialog) => {
                return <DialogItem
                    key={dialog.id}
                    dialog={dialog}
                    authUserId={authUserId}
                />;
            })}
            {dialogs.length === 0 && (
                <span className={s.noDialogs}>
                    Нет диалогов
                </span>
            )}
        </div>
    );
};
import React, {FC} from 'react';

import s from './modal.module.scss';
import {ModalPropsType} from './modal.types';

export const Modal: FC<ModalPropsType> = ({ active, setActive, children}) => {
    return (
        <div className={`${s.modalBackground} ${active && s.active}`} onClick={() => setActive(false)}>
            <div className={`${s.modal} ${active && s.active}`} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};
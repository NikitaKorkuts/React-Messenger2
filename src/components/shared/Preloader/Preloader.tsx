import React, {FC} from 'react';

import preloader from '../../../assets/icons/Preloader.svg';

import s from './Preloader.module.scss';

export const Preloader: FC = () => {
    return (
        <div className={s.preloader}>
            <img className={s.preloaderImg} src={preloader} alt="preloader-icon"/>
        </div>
    );
};
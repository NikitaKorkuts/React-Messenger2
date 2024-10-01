import React, {ChangeEvent, FC} from 'react';

import {ProfileInfoPropsType} from '../profile.types';
import s from '../profile.module.scss';

import defaultAvatar from '../../../../assets/images/defaultAvatar.png';
import uploadAvatarIcon from '../../../../assets/icons/upload-avatar.png' ;
import {ProfileStatus} from '../ProfileStatus/ProfileStatus';

export const ProfileInfo: FC<ProfileInfoPropsType> = ({profile, updateAvatar, updateStatus, status, isOwner}) => {

    const onAvatarSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            updateAvatar(e.target.files[0]);
        }
    };

    return (
        <div className={s.user}>
            {isOwner &&
                (
                    <div className={`${s.ownerAvatar} ${s.avatar}`}>
                        <img className={s.avatarImg} src={profile?.photos?.large || defaultAvatar} alt="avatar"/>
                        <img className={s.addIcon} src={uploadAvatarIcon} alt="addIcon"/>
                        <label>
                            <div className={s.uploadFileArea}></div>
                            <input
                                type="file"
                                onChange={onAvatarSelected}
                                hidden
                            />
                        </label>
                    </div>
                )}
            {!isOwner &&
                (
                    <div className={`${s.userAvatar} ${s.avatar}`}>
                        <img className={s.avatarImg} src={profile?.photos?.large || defaultAvatar} alt="avatar"/>
                    </div>
                )}
            <div className={s.userInfo}>
                <div className={s.infoName}>
                    <p>{profile?.fullName}</p>
                </div>
                <div>
                    <ProfileStatus
                        isOwner={isOwner}
                        status={status}
                        updateStatus={updateStatus}
                    />
                </div>
            </div>
        </div>
    );
};


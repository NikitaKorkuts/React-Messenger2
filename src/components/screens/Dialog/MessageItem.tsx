import React, {FC} from 'react';
import {Link} from 'react-router-dom';

import defaultAvatar from '../../../assets/images/defaultAvatar.png';
import {ReactComponent as CheckIcon} from '../../../assets/icons/checkmark.svg';
import {ReactComponent as DeleteIcon} from '../../../assets/icons/settingsIcon.svg';
import {Dropdown} from '../../shared/Dropdown/Dropdown';

import s from './dialog.module.scss';
import {MessageItemPropsType} from './dialog.types';

export const MessageItem: FC<MessageItemPropsType> = ({
    senderName,
    viewed,
    id,
    body,
    addedAt,
    senderId,
    chattingUserProfile,
    authUserProfile,
    isSameSender,
    getFormattedDateHMM,
    deleteMessage,
    messageType,
}) => {
    const isSender = authUserProfile.userId === senderId;

    return (
        <div
            id={id}
            className={`${s.message} ${isSender ? s.right : s.left} ${isSameSender ? s.sameSender : ''}`}
        >
            <div className={s.avatar}>
                {!isSameSender && (
                    <>
                        {isSender && (
                            <Link to={`/profile/${authUserProfile.userId}`}>
                                <img src={authUserProfile?.photos?.large || defaultAvatar} alt="avatar"/>
                            </Link>
                        )}
                        {!isSender && (
                            <Link to={`/profile/${chattingUserProfile.userId}`}>
                                <img src={chattingUserProfile?.photos?.small || defaultAvatar} alt="avatar"/>
                            </Link>
                        )}
                    </>
                )}
            </div>
            <div className={s.body}>
                {!isSameSender && (
                    <div className={s.info}>
                        <span className={s.name}>{senderName}</span>
                    </div>
                )}
                <div className={s.messageText}>
                    <div
                        className={s.messageTextBody}
                        dangerouslySetInnerHTML={{__html: body}}
                    />

                    <div className={`${s.checkmark} ${isSameSender ? s.sameSender : ''}`}>
                        <span className={s.date}>{getFormattedDateHMM(addedAt)}</span>
                        <CheckIcon className={viewed ? s.fill_blue : s.fill_gray} />
                    </div>
                    <div className={s.deleteIcon}>
                        <Dropdown
                            header={
                                <DeleteIcon />
                            }
                            menuItems={
                                <div className={s.dropdownMenu}>
                                    <div className={s.menuItem}>
                                        <p onClick={() => deleteMessage(id, messageType)}>Удалить у меня</p>
                                    </div>
                                </div>
                            }
                        />

                    </div>
                </div>
            </div>

        </div>
    );
};


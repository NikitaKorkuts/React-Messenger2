import React, {FC} from 'react';
import {Link} from 'react-router-dom';

import defaultAvatar from '../../../assets/images/defaultAvatar.png';
import {getFormattedLastDialogActivityDate} from '../../../utils/dates/getFormattedLastDialogActivityDate';
import {ReactComponent as CheckmarkIcon} from '../../../assets/icons/checkmark.svg';

import s from './dialogs.module.scss';
import {DialogItemPropsType} from './dialogs.types';


export const DialogItem: FC<DialogItemPropsType> = ({dialog, authUserId}) => {
    const isSameSender = dialog.lastMessage?.senderId === authUserId;

    const getUserAvatar = () => {
        const avatar = dialog.photos.small;
        return <img className={s.avatar} src={avatar ? avatar : defaultAvatar} alt="avatar"/>;
    };

    const getLastMessage = () => {
        const lastMsg = dialog.lastMessage;

        if (dialog.hasNewMessages) {
            return 'Новое сообщение';
        } else if (!lastMsg) {
            return 'Нет сообщений';
        } else {
            return (
                <>
                    <CheckmarkIcon
                        className={`${s.isLastMessageViewed} ${lastMsg.viewed ? s.viewed : ''}`}
                    />
                    {lastMsg.senderName && (
                        <>
                            <span className={s.lastMessageSender}>
                                {`${isSameSender ? 'Вы' : lastMsg.senderName}: `}
                            </span>
                        </>
                    )}
                    {dialog.lastMessage.body}
                </>
            );
        }
    };

    return (
        <Link
            to={'/dialog/' + dialog.id}
            className={s.dialog}
        >
            <div className={s.dialogMain}>
                {getUserAvatar()}
                <div className={s.userInfo}>
                    <p className={s.userName}>{dialog.userName}</p>
                    <div className={s.lastMessage}>
                        <p className={s.lastMessageBody}>
                            {getLastMessage()}
                        </p>
                    </div>
                </div>
                {dialog.hasNewMessages && (
                    <div className={s.newMessagesCount}>
                        {dialog.newMessagesCount}
                    </div>
                )}
                {!dialog.lastMessage?.viewed && !dialog.hasNewMessages && (
                    <div className={s.notViewedMessage}></div>
                )}
            </div>
            <div className={s.lastDialogActivityDate}>
                <p >
                    {getFormattedLastDialogActivityDate(dialog.lastDialogActivityDate)}
                </p>
            </div>
        </Link>
    );
};
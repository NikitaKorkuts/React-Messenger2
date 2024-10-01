import React, {FC} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Formik} from 'formik';
import * as yup from 'yup';

import {Textarea} from '../../ui/Textarea/Textarea';
import {getFormattedLastUserActivityDate} from '../../../utils/dates/getFormattedLastUserActivityDate';
import {MessageTypesEnum} from '../../../store/dialogs/dialogs.types';
import {Preloader} from '../../shared/Preloader/Preloader';

import {DialogPropsType} from './dialog.types';
import {MessageItem} from './MessageItem';
import s from './dialog.module.scss';
import {SeparatingDateItem} from './SeparatingDateItem';


export const Dialog: FC<DialogPropsType> = ({
    updatingMessages,
    chattingUserProfile,
    authUserProfile,
    notUpdatingMessages,
    fetchNotUpdatingMessages,
    currentPage,
    totalPagesCount,
    sendMessage,
    compareDates,
    getFormattedDateWithFullMonth,
    getFormattedDateHMM,
    activeDialog,
    deleteMessage,
}) => {

    const MessagesElements = updatingMessages.map((m, i) => {
        const nextMessage = updatingMessages[i + 1] || notUpdatingMessages[0];
        const isSameSender = nextMessage?.senderId === m.senderId;

        return (
            <div key={m.id}>
                {!compareDates(m.addedAt, nextMessage?.addedAt) && (
                    <SeparatingDateItem
                        date={getFormattedDateWithFullMonth(m.addedAt)}
                    />
                )}
                <MessageItem
                    body={m.body}
                    senderName={m.senderName}
                    key={m.id}
                    id={m.id}
                    viewed={m.viewed}
                    addedAt={m.addedAt}
                    senderId={m.senderId}
                    chattingUserProfile={chattingUserProfile}
                    authUserProfile={authUserProfile}
                    isSameSender={isSameSender}
                    getFormattedDateHMM={getFormattedDateHMM}
                    deleteMessage={deleteMessage}
                    messageType={MessageTypesEnum.updatingMessage}
                />
            </div>

        );
    });

    const validationSchema = yup.object().shape({
        msgBody: yup.string()
            .required('Заполните поле'),
    });

    return (
        <div
            id="scrollableDiv"
            className={s.dialog}
        >
            {activeDialog?.lastUserActivityDate && (
                <div className={s.lastUserActivityDate}>
                    <span>{getFormattedLastUserActivityDate(activeDialog?.lastUserActivityDate)}</span>
                </div>
            )}

            <Formik
                initialValues={{msgBody: ''}}
                validateOnBlur={false}
                validateOnChange={false}
                validationSchema={validationSchema}
                onSubmit={(values, {resetForm, setSubmitting}) => {
                    sendMessage(values.msgBody);
                    setSubmitting(false);
                    resetForm();
                }}
            >
                {({
                    values,
                    handleChange,
                    touched,
                    errors,
                    handleBlur,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className={s.sendMessage}>
                            <Textarea
                                name={'msgBody'}
                                hasError={touched.msgBody && errors.msgBody}
                                error={errors.msgBody}
                                type={'textarea'}
                                props={{
                                    onBlur: handleBlur,
                                    value: values.msgBody,
                                    onChange: handleChange,
                                    placeholder: 'Напишите сообщение...',
                                }}
                            />
                            <button className={s.sendMessageBtn} type="submit">Отправить</button>
                        </div>
                    </form>
                )}
            </Formik>

            {updatingMessages.length !== 0
                ?
                MessagesElements
                : (
                    <span className={s.noMessages}>Нет сообщений</span>
                )}

            {notUpdatingMessages.length !== 0 && <InfiniteScroll
                next={fetchNotUpdatingMessages}
                inverse={true}
                className={s.infiniteScroll}
                hasMore={currentPage !== totalPagesCount}
                // loader={<h4 className={s.loaderText}>Загрузка...</h4>}
                loader={<Preloader />}
                dataLength={notUpdatingMessages.length}
                scrollableTarget="scrollableDiv"
            >


                {notUpdatingMessages.map((m, i) => {
                    const nextMessage = notUpdatingMessages[i + 1];
                    const isSameSender = nextMessage?.senderId === m.senderId;

                    return (
                        <div key={m.id}>
                            {!compareDates(m.addedAt, nextMessage?.addedAt) && (
                                <SeparatingDateItem
                                    date={getFormattedDateWithFullMonth(m.addedAt)}
                                />
                            )}

                            <MessageItem
                                body={m.body}
                                senderName={m.senderName}
                                id={m.id}
                                key={m.id}
                                viewed={m.viewed}
                                addedAt={m.addedAt}
                                senderId={m.senderId}
                                chattingUserProfile={chattingUserProfile}
                                authUserProfile={authUserProfile}
                                isSameSender={isSameSender}
                                getFormattedDateHMM={getFormattedDateHMM}
                                deleteMessage={deleteMessage}
                                messageType={MessageTypesEnum.notUpdatingMessage}
                            />
                        </div>
                    );
                })}
            </InfiniteScroll>}
        </div>

    );
};
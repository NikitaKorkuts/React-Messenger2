import {BasicThunkActionType} from '../store.types';

import {dialogsServieces} from '../../services/dialogs/dialogs.servieces';
import {ProfileType} from '../profile/profile.types';
import {profileServices} from '../../services/profile/profile.services';
import {reversedMessagesWithConvertedDate} from '../../utils/messagesWithConvertedDate';
import {dialogsWithConvertedDate} from '../../utils/dialogsWithConvertedDate';
import {ResultCodesEnum} from '../../services/services.types';

import {
    CHATTING_USER_PROFILE_RECEIVED,
    DELETE_NOT_UPDATING_MESSAGE,
    DELETE_UPDATING_MESSAGE,
    DIALOGS_RECEIVED,
    MESSAGES_RECEIVED,
    RESET_MESSAGES,
    SET_ACTIVE_DIALOG,
    SET_ACTIVE_DIALOG_ID,
    SET_ARE_MESSAGES_FETCHING,
    SET_CURRENT_PAGE,
    SET_IS_MESSAGE_SENDING,
    SET_NEW_MESSAGES_COUNT,
    SET_NOT_UPDATING_MESSAGES,
    SET_TOTAL_PAGES_COUNT,
} from './dialogs.consts';
import {DialogsActionsType, DialogType, MessageType, MessageTypesEnum} from './dialogs.types';


export const dialogsActions = {
    dialogsReceived: (dialogs: DialogType[]) => ({
        type: DIALOGS_RECEIVED,
        payload: {dialogs},
    } as const),
    messagesReceived: (messages: MessageType[]) => ({
        type: MESSAGES_RECEIVED,
        payload: {messages},
    } as const),
    chattingUserProfileReceived: (profile: ProfileType) => ({
        type: CHATTING_USER_PROFILE_RECEIVED,
        payload: {profile},
    } as const),
    setCurrentPage: (page: number) => ({
        type: SET_CURRENT_PAGE,
        payload: {page},
    } as const),
    setAreMessagesFetching: (areFetching: boolean) => ({
        type: SET_ARE_MESSAGES_FETCHING,
        payload: {areFetching},
    } as const),
    setNotUpdatingMessages: (messages: MessageType[]) => ({
        type: SET_NOT_UPDATING_MESSAGES,
        payload: {messages},
    } as const),
    setTotalPagesCount: (pagesCount: number) => ({
        type: SET_TOTAL_PAGES_COUNT,
        payload: {pagesCount},
    } as const),
    setIsMessageSending: (isSending: boolean) => ({
        type: SET_IS_MESSAGE_SENDING,
        payload: {isSending},
    } as const),
    resetMessages: () => ({
        type: RESET_MESSAGES,
    } as const),
    setNewMessagesCount: (newMessagesCount: number) => ({
        type: SET_NEW_MESSAGES_COUNT,
        payload: {newMessagesCount},
    } as const),
    setActiveDialogId: (activeDialogId: number | null) => ({
        type: SET_ACTIVE_DIALOG_ID,
        payload: {activeDialogId},
    } as const),
    setActiveDialog: (activeDialog: DialogType | null) => ({
        type: SET_ACTIVE_DIALOG,
        payload: {activeDialog},
    } as const),
    deleteUpdatingMessage: (messageId: string) => ({
        type: DELETE_UPDATING_MESSAGE,
        payload: {messageId},
    } as const),
    deleteNotUpdatingMessage: (messageId: string) => ({
        type: DELETE_NOT_UPDATING_MESSAGE,
        payload: {messageId},
    } as const),
};

export const getDialogs = (): BasicThunkActionType<DialogsActionsType> => {
    return async (dispatch) => {
        const response = await dialogsServieces.getDialogs();
        let newResponse = dialogsWithConvertedDate(response);
        newResponse = await Promise.all(newResponse.map(async (d) => {
            if(d.hasNewMessages) {
                return d;
            }
            const lastMessage = await dialogsServieces.getMessages(d.id, 1, 1);
            if(lastMessage.items[0]) {
                const newLastMessage = {
                    ...lastMessage.items[0],
                    body: lastMessage.items[0].body.replaceAll('<br />', ' ').slice(0, 15),
                };

                return {...d, lastMessage: newLastMessage};
            }

            return d;
        }));
        dispatch(dialogsActions.dialogsReceived(newResponse));
    };
};

export const getMessages = (
    dialogId: number,
    page = 1,
    count = 10,
): BasicThunkActionType<DialogsActionsType> => {
    return async (dispatch) => {
        dispatch(dialogsActions.setAreMessagesFetching(true));
        const response = await dialogsServieces.getMessages(dialogId, page, count);
        const newResponse = reversedMessagesWithConvertedDate(response);
        dispatch(dialogsActions.setAreMessagesFetching(false));
        dispatch(dialogsActions.setIsMessageSending(false));
        if(page>1) {
            dispatch(dialogsActions.setNotUpdatingMessages(newResponse.items));
        } else {
            dispatch(dialogsActions.messagesReceived(newResponse.items));
        }
    };
};

export const getTotalPagesCount = (dialogId: number): BasicThunkActionType<DialogsActionsType> => {
    return async (dispatch, getState) => {
        const response = await dialogsServieces.getMessages(dialogId, 1, 0);
        dispatch(dialogsActions.setTotalPagesCount(Math.ceil(response.totalCount / getState().dialogs.pageCount)));
    };
};

export const getChattingUserProfile = (userId: number): BasicThunkActionType<DialogsActionsType> => {
    return async (dispatch) => {
        const response = await profileServices.getUserProfile(userId);
        dispatch(dialogsActions.chattingUserProfileReceived(response));
    };
};

export const sendMessage = (dialogId: number, msgBody: string): BasicThunkActionType<DialogsActionsType> => {
    return async (dispatch) => {
        dispatch(dialogsActions.setIsMessageSending(true));
        await dialogsServieces.sendMessage(dialogId, msgBody);
    };
};

export const getNewMessagesCount = (): BasicThunkActionType<DialogsActionsType> => {
    return async (dispatch) => {
        const response = await dialogsServieces.getNewMessagesCount();
        dispatch(dialogsActions.setNewMessagesCount(response));
    };
};

export const getActiveDialog = (activeDialogId: number | null): BasicThunkActionType<DialogsActionsType> => {
    return async (dispatch, getState) => {
        if(activeDialogId) {
            let activeDialog = getState().dialogs.dialogs?.find(d => d.id === activeDialogId);
            if (activeDialog) {
                dispatch(dialogsActions.setActiveDialog(activeDialog));
            } else {
                const response = await dialogsServieces.getDialogs();
                const newResponse = dialogsWithConvertedDate(response);
                activeDialog = newResponse.find(d => d.id === activeDialogId);
                if (activeDialog) {
                    dispatch(dialogsActions.setActiveDialog(activeDialog));
                }
            }
        } else {
            dispatch(dialogsActions.setActiveDialog(null));
        }
    };
};

export const deleteMessage = (id: string, messageType: MessageTypesEnum): BasicThunkActionType<DialogsActionsType> => {
    return async (dispatch) => {
        const response = await dialogsServieces.deleteMessage(id);
        if(response.resultCode === ResultCodesEnum.Success) {
            if(messageType === MessageTypesEnum.updatingMessage) {
                dispatch(dialogsActions.deleteUpdatingMessage(id));
            } else if (messageType === MessageTypesEnum.notUpdatingMessage) {
                dispatch(dialogsActions.deleteNotUpdatingMessage(id));
            }
        }
    };
};




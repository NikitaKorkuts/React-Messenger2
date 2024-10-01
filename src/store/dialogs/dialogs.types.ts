import {InferActionsType} from '../store.types';

import {dialogsInitialState} from './dialogs.reducer';

import {dialogsActions} from './dialogs.actions';

export type DialogsInitialStateType = typeof dialogsInitialState

export type DialogsActionsType = InferActionsType<typeof dialogsActions>

export type DialogType = {
    id: number
    userName: string
    hasNewMessages: boolean
    lastDialogActivityDate: Date
    lastMessage: MessageType
    lastUserActivityDate: Date
    newMessagesCount: number
    photos: {
        large: string | null
        small: string | null
    }
}

export type MessageType = {
    id: string
    body: string
    translatedBody?: any
    addedAt: Date
    senderId: number
    senderName: string
    recipientId: number
    viewed: boolean
}

export enum MessageTypesEnum {
    'updatingMessage',
    'notUpdatingMessage',
}


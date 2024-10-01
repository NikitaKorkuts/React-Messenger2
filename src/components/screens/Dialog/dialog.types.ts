import {DialogType, MessageType, MessageTypesEnum} from '../../../store/dialogs/dialogs.types';
import {ProfileType} from '../../../store/profile/profile.types';

export type DialogPropsType = {
    updatingMessages: MessageType[]
    notUpdatingMessages: MessageType[]
    chattingUserProfile: ProfileType
    authUserProfile: ProfileType
    fetchNotUpdatingMessages: () => void
    totalPagesCount: number
    currentPage: number
    sendMessage: (body: string) => void
    compareDates: (date1: Date, date2: Date) => boolean
    getFormattedDateWithFullMonth: (date: Date) => string
    getFormattedDateHMM: (date: Date) => string
    activeDialog: DialogType
    deleteMessage: (id: string, messageTypesEnum: MessageTypesEnum) => void
}

export type DialogContainerPropsType = {
    updatingMessages: MessageType[]
    notUpdatingMessages: MessageType[]
    getMessages: (dialogId: number, page: number, count: number) => Promise<void>
    getTotalPagesCount: (dialogId: number) => void
    getChattingUserProfile: (userId: number) => Promise<void>
    chattingUserProfile: ProfileType
    authUserProfile: ProfileType
    areMessagesFetching: boolean
    currentPage: number
    pageCount: number
    setCurrentPage: (page: number) => void
    totalPagesCount: number
    sendMessage: (dialogId: number, msgBody: string) => void
    isMessageSending: boolean
    resetMessages: () => void
    getActiveDialog: (activeDialogId: number | null) => void
    setActiveDialogId: (activeDialogId: number | null) => void
    activeDialogId: number | null
    activeDialog: DialogType
    deleteMessage: (id: string, MessageTypesEnum: MessageTypesEnum) => void
}

export type MessageItemPropsType = {
    body: string
    senderName: string
    viewed: boolean
    id: string
    addedAt: Date
    senderId: number
    chattingUserProfile: ProfileType
    authUserProfile: ProfileType
    isSameSender: boolean
    getFormattedDateHMM: (date: Date) => string
    deleteMessage: (id: string, messageType: MessageTypesEnum) => void
    messageType: MessageTypesEnum
}

export type MessagesResponseType = {
    error: null | string
    items: MessageType[]
    totalCount: number
}

export type SeparatingDateItemPropsType = {
    date: string
}
import {DialogType} from '../../../store/dialogs/dialogs.types';
import {Nullable} from '../../../types/types';

export type DialogsPropsType = {
    dialogs: DialogType[]
    authUserId: Nullable<number>
}

export type DialogItemPropsType = {
    dialog: DialogType
    authUserId: Nullable<number>
}

export type DialogsContainerPropsType = {
    dialogs: DialogType[]
    newMessagesCount: number
    getDialogs: () => Promise<void>
    getNewMessagesCount: () => void
    authUserId: Nullable<number>
}
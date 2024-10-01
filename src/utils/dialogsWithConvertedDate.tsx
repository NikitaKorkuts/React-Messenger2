import {DialogType} from '../store/dialogs/dialogs.types';

import {convertInDate} from './dates/convertInDate';

export const dialogsWithConvertedDate = (dialogs: DialogType[]) => {
    return [...dialogs]
        .map((d) => {
            const lastDialogActivityDate = convertInDate(d.lastDialogActivityDate);
            const lastUserActivityDate = convertInDate(d.lastUserActivityDate);
            return {...d, lastDialogActivityDate, lastUserActivityDate};
        });
};
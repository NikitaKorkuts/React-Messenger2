import {MessagesResponseType} from '../components/screens/Dialog/dialog.types';

import {convertInDate} from './dates/convertInDate';

export const reversedMessagesWithConvertedDate = (response: MessagesResponseType) => {
    const newMessages = [...response.items]
        .map((m) => {
            const date = convertInDate(m.addedAt);
            return {...m, addedAt: date};
        })
        .reverse();
    return {...response, items: newMessages};
};
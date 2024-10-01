import {getFormattedDateHMM} from './getFormattedDateHMM';
import {getFormattedDateWithFullMonth} from './getFormattedDateWithFullMonth';

export const getFormattedLastDialogActivityDate = (date: Date) => {
    const nowDate = new Date();
    const areDaysSame = nowDate.getDate() === date.getDate();
    const areMonthsSame = nowDate.getMonth() === date.getMonth();
    const areYearSame = nowDate.getFullYear() === date.getFullYear();
    const time = getFormattedDateHMM(date);
    const newDate = getFormattedDateWithFullMonth(date);

    if(areDaysSame && areMonthsSame && areYearSame) {
        return `Сегодня в ${time}`;
    } else if (nowDate.getDate() === date.getDate()-1 && areMonthsSame && areYearSame) {
        return `Вчера в ${time}`;
    } else if (!areYearSame) {
        return `${newDate} г.`;
    } else {
        return `${newDate} ${time}`;
    }
};
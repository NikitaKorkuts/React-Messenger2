import {compareDates} from './compareDate';
import {getFormattedDateWithFullMonth} from './getFormattedDateWithFullMonth';
import {getFormattedDateHMM} from './getFormattedDateHMM';

export const getFormattedLastUserActivityDate = (date: Date) => {
    const nowDate = new Date();
    const yesterday = new Date(new Date().setDate(new Date().getDate()-1));
    const areYearSame = nowDate.getFullYear() === date.getFullYear();
    const areHoursSame = nowDate.getHours() === date.getHours();
    const areMinutesSame = nowDate.getMinutes() === date.getMinutes();
    const areSecondsSame = nowDate.getSeconds() === date.getSeconds() || nowDate.getSeconds() - 1 === date.getSeconds();
    const time = getFormattedDateHMM(date);

    if (compareDates(date, nowDate)) {
        if(areHoursSame && areMinutesSame && areSecondsSame) {
            return 'В сети';
        } else {
            return `Был(a) сегодня в ${time}`;
        }
    } else if (compareDates(date, yesterday)) {
        return `Был(a) вчера в ${time}`;
    } else if (!areYearSame) {
        return `Был(a) ${getFormattedDateWithFullMonth(date)} г.`;
    } else {
        return `Был(a) ${getFormattedDateWithFullMonth(date)}`;
    }
};
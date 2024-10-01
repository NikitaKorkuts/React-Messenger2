export const getFormattedDateHMM = (date: Date) => {
    return `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;
};
export const getFormattedDateWithFullMonth = (date: Date) => {
    const currentYear = new Date().getFullYear();
    const month = date.toLocaleString('default', { month: 'short' });
    const format1 = `${date.getDate()} ${month}`;
    const format2 = `${date.getDate()} ${month} ${date.getFullYear()}`;

    return currentYear === date.getFullYear() ? format1 : format2;
};
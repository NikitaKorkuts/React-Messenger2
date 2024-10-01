export const compareDates = (date1: Date, date2: Date) => {
    const daysCompare = date1?.getDate() === date2?.getDate();
    const monthsCompare = date1?.getMonth() === date2?.getMonth();
    const yearsCompare = date1?.getFullYear() === date2?.getFullYear();

    return daysCompare && monthsCompare && yearsCompare;
};
const convertToDateFromString = (dateString: string): Date => {
    const date = new Date(Number(dateString));
    return date;
};

const timeDifference = (current: number, previous: Date) => {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous.getTime();

    if (elapsed <= 0) {
        return 'Just Now';
    } else if (elapsed < msPerMinute) {
        if (Math.round(elapsed / 1000) == 0) return 'Just Now';
        return Math.round(elapsed / 1000) + 's';
    } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + 'm';
    } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + 'h';
    } else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + 'd';
    } else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + 'M';
    } else {
        return Math.round(elapsed / msPerYear) + 'y';
    }
};

export const getRelativeDate = (dateString: string) => {
    const currentDate = Date.now();
    const convertedDate = convertToDateFromString(dateString);
    return timeDifference(currentDate, convertedDate);
};

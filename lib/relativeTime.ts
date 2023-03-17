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

    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) == 1
            ? Math.round(elapsed / 1000) + ' second ago'
            : Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) == 1
            ? Math.round(elapsed / msPerMinute) + ' minute ago'
            : Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) == 1
            ? Math.round(elapsed / msPerHour) + ' hour ago'
            : Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) == 1
            ? Math.round(elapsed / msPerDay) + ' day ago'
            : Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) == 1
            ? Math.round(elapsed / msPerMonth) + ' month ago'
            : Math.round(elapsed / msPerMonth) + ' months ago';
    } else {
        return Math.round(elapsed / msPerYear) == 1
            ? Math.round(elapsed / msPerYear) + ' year ago'
            : Math.round(elapsed / msPerYear) + ' years ago';
    }
};

export const getRelativeDate = (dateString: string) => {
    const currentDate = Date.now();
    const convertedDate = convertToDateFromString(dateString);
    return timeDifference(currentDate, convertedDate);
};

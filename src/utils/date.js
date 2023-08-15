import dayjs from "dayjs"
import { DATE_FORMAT_DISPLAY, DATETIME_FORMAT_DISPLAY } from "@/constants";

let utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

export const formatDate = (date, formatType = DATE_FORMAT_DISPLAY) => {
    return dayjs(date).format(formatType);
}

export const convertUtcToLocalTimeString = (utcTime, format = DATETIME_FORMAT_DISPLAY) => {
    try {
        if (utcTime)
            return dayjs.utc(utcTime).local().format(format);
        return '';
    } catch (err) {
        return '';
    }
}

export const diffTimeLeft = (endDate) => {
    const endDateUtc = dayjs.utc(endDate);

    const diffHours = endDateUtc.diff(dayjs().utc(), 'hours') || 0;
    const diffMinutes = endDateUtc.diff(dayjs().utc(), 'minutes') || 0;
    if (diffMinutes / 60 <= 0)
        return "Hết hạn";

    const hours = (diffHours % 24) < 1 ? 1 : (diffHours % 24);
    return `${Math.floor(diffHours / 24)} ngày ${hours} giờ`;
}
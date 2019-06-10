import format from 'date-fns/format';
import parse from 'date-fns/parse';
import isSameMonth from 'date-fns/is_same_month';
import addDays from "date-fns/add_days";

export const FormateDate = date => format(date, 'YYYY-MM-DD');
export const PrettyDate = date => format(date, 'MMMM D, YYYY');
export const FormateDates = dates => dates.map(dateObj => ({ arrival: format(dateObj.arrival, 'YYYY-MM-DD'), departure: format(dateObj.departure, 'YYYY-MM-DD') }));
export const ParseDate = date => parse(date);
export const ParseDates = dates => dates.map(dateObj => ({ arrival: parse(dateObj.arrival), departure: parse(dateObj.departure) }));
export const DefaultBirthDate = new Date(1993, 1, 1);
export const GetSwapDateRange = (arrival, departure) => {
    if (isSameMonth(arrival, departure)) {
        return `${format(arrival, 'MMM Do')} - ${format(departure, 'Do')}`;
    }
    return `${format(arrival, 'MMM Do')} - ${format(departure, 'MMM Do')}`;
};
export const Today = new Date();
Today.setHours(0,0,0,0);
export const FormatedToday = FormateDate(Today);
export const Yesterday = addDays(Today, -1);
export const minDate = addDays(Today, -20);
export function convertPlannerDates(dates) {
    const convertedDates = [];
    if (!dates || !dates[0]) return convertedDates;
    if (dates[0].start || dates[0].end) {
        dates.forEach((date) => {
            const dateObj = {};
            dateObj.arrival = date.start;
            dateObj.departure = date.end;
            convertedDates.push(dateObj);
        });
    } else if (dates[0].arrival || dates[0].departure) {
        dates.forEach((date) => {
            const dateObj = {};
            dateObj.start = date.arrival < Today ? Today : date.arrival;
            dateObj.end = date.departure;
            if (dateObj.end < Today) return;//remove data if its past min date
            convertedDates.push(dateObj);
        });
    }
    return convertedDates;
}
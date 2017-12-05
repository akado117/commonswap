import format from 'date-fns/format';
import parse from 'date-fns/parse';
import isSameMonth from 'date-fns/is_same_month';

export const FormateDate = date => format(date, 'YYYY-MM-DD');
export const PrettyDate = date => format(date, 'MMMM D, YYYY');
export const FormateDates = dates => dates.map(dateObj => ({ start: format(dateObj.start, 'YYYY-MM-DD'), end: format(dateObj.end, 'YYYY-MM-DD') }));
export const ParseDates = dates => dates.map(dateObj => ({ start: parse(dateObj.start), end: parse(dateObj.end) }));
export const GetSwapDateRange = (arrival, departure) => {
    if (isSameMonth(arrival, departure)) {
        return `${format(arrival, 'MMM Do')} - ${format(departure, 'Do')}`;
    }
    return `${format(arrival, 'MMM Do')} - ${format(departure, 'MMM Do')}`;
};
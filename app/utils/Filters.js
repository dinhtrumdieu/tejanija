import moment from 'moment-timezone';
import RNDeviceInfo from 'react-native-device-info';

const numeral = require('numeral');
import {isNil} from 'lodash';

function formatPrice(price) {
    let numberOfDecimalDigits = 3;
    const format = numberOfDecimalDigits === 0
        ? '0,0'
        : `0,0.[${Array(numberOfDecimalDigits + 1).join('0')}]`;
    return price ? numeral(price).format(format) : 0;
}

function getDateTime(timestamp) {
    return moment.tz(timestamp, RNDeviceInfo.getTimezone()).format('YYYY-MM-DD HH:mm:ss');
}

function getDate(timestamp) {
    return moment.tz(timestamp, RNDeviceInfo.getTimezone()).format('DD/MM/YYYY');
}

function getTimeStamp(date) {
    const timestamp = moment.tz(date, RNDeviceInfo.getTimezone()).format();
    return moment(timestamp).format('x');
}

function getTimeDay(time, format) {
    return moment(time).format(format || 'DD.MM HH:mm:ss');
}

function formatBirthday(time, format) {
    return moment(time).format(format || 'DD-MM-YYYY');
}

function timesToMonthName(timestamp) {
    return moment(timestamp).format('MMM Do YY');
}

function formatPhoneNumber(phoneNumberString) {
    let cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return match[1] + '-' + match[2] + '-' + match[3];
    }
    return '';
}

export {
    formatPrice, getDateTime, getTimeDay, getDate, formatPhoneNumber, timesToMonthName, getTimeStamp, formatBirthday
};

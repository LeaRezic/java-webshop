import moment from 'moment';

const ISO_DATE = 'YYYY-MM-DD';
const DISPLAY_DATE_FORMAT = 'DD.MM.YYYY';
const DISPLAY_DATE_TIME_FORMAT = 'DD.MM.YYYY - HH:mm:ss';
const TOKEN_DISPLAY_DATE = 'DD/MM/YYYY HH:mm:ss';

const ISO_DATE_TIME = 'YYYY-MM-DD HH:mm:ss';

export const changeIsoDateFormat = (date: string): string => {
  if (moment(date, [ISO_DATE], true).isValid()) {
    const momentDate = moment(date, ISO_DATE).utc(true);
    return momentDate.format(DISPLAY_DATE_FORMAT);
  }
  return date;
}

export const getDateFromToken = (tokenDate: string): Date => {
  if (moment(tokenDate, [TOKEN_DISPLAY_DATE], true).isValid()) {
    const momentDate = moment(tokenDate, TOKEN_DISPLAY_DATE).utc(false);
    return momentDate.toDate();
  }
  return null;
}

export const getDateFromDisplayDateTime = (displayDateTime: string): Date => {
  displayDateTime = displayDateTime.split('.')[0];
  console.log(`[UTIL]: display time ${displayDateTime}`);
  if (moment(displayDateTime, [ISO_DATE_TIME], true).isValid()) {
    const momentDate = moment(displayDateTime, ISO_DATE_TIME).utc(false);
    console.log(`[UTIL]: date ${momentDate.toDate()}`);
    return momentDate.toDate();
  }
  console.log(`[UTIL]: display time NO VALIDO`)
  return null;
}

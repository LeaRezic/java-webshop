import moment from 'moment';

const ISO_DATE = 'YYYY-MM-DD';
const DISPLAY_DATE_FORMAT = 'DD.MM.YYYY';
const TOKEN_DISPLAY_DATE = 'DD/MM/YYYY HH:mm:ss';

export const changeIsoDateFormat = (date: string): string => {
  if (moment(date, [ISO_DATE], true).isValid()) {
    const momentDate = moment(date, ISO_DATE).utc(true);
    return momentDate.format(DISPLAY_DATE_FORMAT);
  }
  return date;
}

export const getDateFromToken = (tokenDate: string): Date => {
  if (moment(tokenDate, [TOKEN_DISPLAY_DATE], true).isValid()) {
    console.log('IS VALID');
    const momentDate = moment(tokenDate, TOKEN_DISPLAY_DATE).utc(false);
    return momentDate.toDate();
  }
  return null;
}

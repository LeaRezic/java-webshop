import moment from 'moment';

const ISO_DATE = 'YYYY-MM-DD';
const DISPLAY_DATE_FORMAT = 'DD.MM.YYYY';

export const changeIsoDateFormat = (date: string): string => {
  if (moment(date, [ISO_DATE], true).isValid()) {
    const momentDate = moment(date, ISO_DATE).utc(true);
    return momentDate.format(DISPLAY_DATE_FORMAT);
  }
  return date;
}

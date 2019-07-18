import { ILoginLog } from '../../interfaces';
import { changeIsoDateFormat } from '../../../../utils/dateUtils';

export const columnsConfig = [{
    Header: 'Username',
    id: '0',
    accessor: (row: ILoginLog) => row.username,
    sortable: true,
  },
  {
    Header: 'IP Address',
    id: '1',
    accessor: (row: ILoginLog) => row.ipAddress,
    sortable: true,
  },
  {
    Header: 'Login Date',
    id: '2',
    accessor: (row: ILoginLog) => row.date,
    sortable: true,
    Cell: props => getDateNice(props),
  },
];

const getDateNice = (data: any) => {
  try {
    const details = data.value.split(' ');
    const result = `${changeIsoDateFormat(details[0])} - ${details[1].split('.')[0]}`;
    return result;
  } catch {
    return 'N/A';
  }
}
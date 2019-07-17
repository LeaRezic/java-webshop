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
    Cell: props => {
      const details = props.value.split(' ');
      return `${changeIsoDateFormat(details[0])} - ${details[1].split('.')[0]}`;
    },
  },
];

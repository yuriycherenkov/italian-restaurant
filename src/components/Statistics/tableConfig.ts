import { renderDate } from './helpers';

export const COLUMNS = [
  { field: 'id', headerName: 'Order ID', width: 150 },
  { field: 'createdAt', headerName: 'Created', renderCell: renderDate },
  { field: 'status', headerName: 'Order Status' },
];

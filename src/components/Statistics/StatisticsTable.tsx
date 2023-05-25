import React from 'react';

import { Order } from '@/entitiesTypes';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { COLUMNS } from './tableConfig';

const StatisticsTable: React.FC<{ orders: Order[] }> = ({ orders }) => {
  return (
    <Box
      sx={{
        mt: 2,
      }}
    >
      <DataGrid
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        columns={COLUMNS}
        rows={orders}
      />
    </Box>
  );
};

export default StatisticsTable;

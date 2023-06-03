import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import type { OrderDetails } from '@/entitiesTypes';

export const OrderDetailsCustomer: React.FC<{ orderDetails: OrderDetails[] }> = ({ orderDetails }) => {
  return (
    <List>
      {orderDetails?.map((orderItem, index) => (
        <ListItem
          key={`${orderItem.id}_${index}`}
          secondaryAction={
            <>
              <Typography>${orderItem.menuItem.price}</Typography>
              <Typography>x{orderItem.quantity}</Typography>
            </>
          }
        >
          <ListItemAvatar>
            <Paper sx={{ overflow: 'hidden', height: 60, width: '100%', maxWidth: 60, mr: 1 }}>
              <Image src={orderItem.menuItem.dish.image!} alt="" width={60} height={60} />
            </Paper>
          </ListItemAvatar>
          <ListItemText primary={orderItem.menuItem.dish.title} secondary={orderItem.menuItem.dish.description} />
        </ListItem>
      ))}
    </List>
  );
};

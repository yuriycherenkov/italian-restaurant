import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Image from 'next/image';
import type { OrderDetails } from '@/entitiesTypes';

export const OrderDetailsList: React.FC<{ orderDetails: OrderDetails[] }> = ({ orderDetails }) => {
  return (
    <List>
      {orderDetails?.map((orderItem, index) => (
        <ListItem
          sx={{ px: 0 }}
          key={`${orderItem.id}_${index}`}
          secondaryAction={<Chip label={`x ${orderItem.quantity}`} variant="outlined" />}
        >
          <ListItemAvatar>
            <Avatar>
              <Image src={orderItem.menuItem.dish.image!} alt="" width={40} height={40} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>{orderItem.menuItem.dish.title}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

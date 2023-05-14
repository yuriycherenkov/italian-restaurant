import React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { AuthUserNav } from './AuthUserNav';
import { Identity } from './Identity';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import logo from 'public/logo.png';
import { Cart } from '../Cart';

const AppBar: React.FC = () => {
  const { data: session } = useSession();
  const [isOpen, toggle] = React.useState(false);

  // if (!session?.user?.email) return null;

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    toggle(!isOpen);
  };

  return (
    <MuiAppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Image src={logo} alt="logo" width={30} />
        <Typography variant="h6" color="primary" noWrap sx={{ ml: 2 }}>
          Italiano
        </Typography>
        <AuthUserNav />
        {session?.user?.email && <Identity user={session.user.email} />}
        <IconButton onClick={toggleDrawer}>
          <ShoppingBasketIcon />
        </IconButton>
        <Drawer anchor="right" open={isOpen} onClose={toggleDrawer}>
          <Cart />
        </Drawer>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;

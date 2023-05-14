import { Box, Button, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { signOut } from 'next-auth/react';
import { useState } from 'react';

type IdentityProps = {
  user: string;
};

export const Identity: React.FC<IdentityProps> = ({ user }) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Button startIcon={<PersonIcon />} onClick={handleOpenUserMenu}>
        {user}
      </Button>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={() => signOut()}>
          <Typography textAlign="center">Sign out</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

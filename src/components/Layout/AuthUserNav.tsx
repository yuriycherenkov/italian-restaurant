import { Box, Button } from '@mui/material';
import Link from 'next/link';

const pages = [
  { title: 'Orders', href: '/orders' },
  { title: 'Menu', href: '/menu' },
];

export const AuthUserNav = () => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 2 }}>
      {pages.map((page) => (
        <Button key={page.title} href={page.href} component={Link}>
          {page.title}
        </Button>
      ))}
    </Box>
  );
};

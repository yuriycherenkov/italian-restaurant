import { Box, Button } from '@mui/material';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const pages = [
  { title: 'Orders', href: '/dashboard/orders' },
  { title: 'Statistics', href: '/dashboard/statistics' },
];

export const AuthUserNav = () => {
  const { data: session } = useSession();

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 2 }}>
      {session?.user?.email &&
        pages.map((page) => (
          <Button key={page.title} href={page.href} component={Link}>
            {page.title}
          </Button>
        ))}
    </Box>
  );
};

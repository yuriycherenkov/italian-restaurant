import React from 'react';
import Container from '@mui/material/Container';
import AppBar from './AppBar';

const Layout: React.FC<{ children: any }> = ({ children }) => {
  return (
    <>
      <AppBar />
      <main>
        <Container maxWidth="xl">{children}</Container>
      </main>
    </>
  );
};

export default Layout;

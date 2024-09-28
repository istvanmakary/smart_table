import { AppBar, Box, Toolbar } from '@mui/material';
import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <AppBar sx={{ backgroundColor: '#009879' }} position="fixed">
        <Toolbar
          sx={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}
        >
          <h1>Take home problem</h1>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 15 }}>{children}</Box>
    </>
  );
};

export default Layout;

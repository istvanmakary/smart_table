import { AppBar, Box, Toolbar } from '@mui/material';
import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <AppBar sx={{ backgroundColor: '#009879' }} position="fixed">
        <Toolbar>
          <h1>Take home problem</h1>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 15 }}>{children}</Box>
    </>
  );
};

export default Layout;

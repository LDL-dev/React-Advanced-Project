import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Box } from '@chakra-ui/react';

export const Root = () => {
  return (
    <Box bg='yellow.100' minH='100vh' py='4'>
      <Navigation />
      <Outlet />
    </Box>
  );
};

import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav>
      <Flex gap='2' align='space-between' ml='4' mb='4'>
        <Button size='lg' colorScheme='black' variant='link' w='36'>
          <Link to='/'>Event list</Link>
        </Button>
        <Link to='/event/new'>
          <Button colorScheme='green' variant='solid' w='36'>
            + Add Event
          </Button>
        </Link>
      </Flex>
    </nav>
  );
};

import { Center, Text, VStack } from '@chakra-ui/react';

export const NotFound = () => {
  return (
    <Center>
      <VStack>
        <Text fontSize='64' as='b'>
          404
        </Text>
        <Text>
          That&#39;s an error. The requested URL was not found on this server.
        </Text>
      </VStack>
    </Center>
  );
};

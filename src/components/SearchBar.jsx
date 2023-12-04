import { Input } from '@chakra-ui/react';

export const SearchBar = ({ onChange }) => {
  return (
    <Input
      w={{ base: '50', sm: '80' }}
      size='md'
      bg='white'
      borderRadius='lg'
      placeholder='Start typing to search for events'
      _placeholder={{ color: 'gray.400' }}
      onChange={onChange}
    />
  );
};

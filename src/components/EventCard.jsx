import { Card, CardBody, Flex, Image, Text } from '@chakra-ui/react';
import {
  eventCategories,
  eventStartDate,
  eventStartTime,
  eventEndTime
} from '../utils/eventUtils';

export const EventCard = ({ event, categories }) => {
  return (
    <Card
      borderRadius='xl'
      cursor='pointer'
      _hover={{ transform: 'scale(1.01)' }}
      bg='white'
    >
      <Image src={event.image} w='100%' h='40%' fit='cover' />
      <CardBody minW='100%' mt='-3'>
        <Flex direction='column' gap='5'>
          <Flex justify='space-between'>
            <Flex direction='column'>
              <Text
                casing='uppercase'
                color='gray.500'
                fontWeight='600'
                fontSize='calc(9px + 0.390625vw)'
              >
                {eventCategories(event, categories)}
              </Text>
              <Text as='b' fontSize='calc(16px + 0.390625vw)' color='gray.700'>
                {event.title}
              </Text>
              <Text color='gray.500' fontWeight='500'>
                {event.description}
              </Text>
            </Flex>
          </Flex>
          <Flex direction='column' gap='1.5'>
            <Text
              color='gray.700'
              fontSize='calc(14px + 0.390625vw)'
              fontWeight='500'
            >
              {event.location}
            </Text>
            <Text color='gray.500' fontWeight='500'>
              {eventStartDate(event)}
            </Text>
            <Text color='gray.500' fontWeight='500'>
              {eventStartTime(event)} - {eventEndTime(event)} hrs
            </Text>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

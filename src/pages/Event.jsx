import React from 'react';
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import {
  eventCategories,
  eventCreator,
  eventEndTime,
  eventStartDate,
  eventStartTime
} from '../utils/eventUtils';
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { NotFound } from './NotFound';
import { EventForm } from '../components/EventForm';
import { API_URL } from '../main';

export const eventLoader = async () => {
  const usersResponse = await fetch(API_URL + '/users');
  const eventsResponse = await fetch(API_URL + '/events');
  const categoriesResponse = await fetch(API_URL + '/categories');
  const users = await usersResponse.json();
  const events = await eventsResponse.json();
  const categories = await categoriesResponse.json();

  return { users, events, categories };
};

export const Event = () => {
  const { eventId } = useParams();
  const { users, events, categories } = useLoaderData();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteEvent = async eventId => {
    if (confirm('Are you sure you want to delete this event?')) {
      const eventResponse = await fetch(API_URL + '/events/' + eventId, {
        method: 'DELETE'
      });
      if (eventResponse.ok) {
        alert('The event was successfully deleted!');
        navigate(`/`);
      } else {
        alert('There was an error processing your request!');
      }
    }
  };

  const event = events.find(event => event.id === Number(eventId));
  if (!event) {
    return <NotFound />;
  }

  return (
    <Flex>
      {/* Left column */}
      <Box minW='15vw'></Box>
      {/* Center column with Event */}
      <Center minH='80vh'>
        <Box w='70vw' bg='white'>
          <Image src={event.image} w='100%' h='30vh' fit='cover' />
          <Box>
            <Flex direction='column' gap='8' p='2'>
              {/* Upper box */}
              <Flex justify='space-between' gap='4'>
                {/* Upper left box */}
                <Flex direction='column' gap='4'>
                  <Text
                    casing='uppercase'
                    color='gray.500'
                    fontWeight='600'
                    fontSize='calc(9px + 0.390625vw)'
                  >
                    {eventCategories(event, categories)}
                  </Text>
                  <Text
                    as='b'
                    fontSize='calc(16px + 0.390625vw)'
                    color='gray.700'
                  >
                    {event.title}
                  </Text>
                  <Text color='gray.500' fontWeight='500'>
                    {event.description}
                  </Text>
                </Flex>
                {/* Upper right box */}
                <Flex direction='column' align='center'>
                  <Text align='center' fontSize='calc(8px + 0.390625vw)'>
                    created by
                  </Text>
                  <Image
                    borderRadius='full'
                    boxSize='70px'
                    src={eventCreator(event, users).image}
                    alt={eventCreator(event, users).name}
                  />
                  <Text align='center' fontSize='calc(8px + 0.390625vw)'>
                    {eventCreator(event, users).name}
                  </Text>
                </Flex>
              </Flex>
              <Text
                whiteSpace='wrap'
                color='gray.700'
                fontSize='calc(14px + 0.390625vw)'
                fontWeight='500'
              >
                {event.location}
              </Text>
              <Flex wrap='wrap' gap='2'>
                <Text whiteSpace='nowrap' color='gray.500' fontWeight='500'>
                  {eventStartDate(event)}
                </Text>
                <Text whiteSpace='nowrap' color='gray.500' fontWeight='500'>
                  {eventStartTime(event)} - {eventEndTime(event)} hrs
                </Text>
              </Flex>
              <Flex gap='1' wrap='wrap' justify='flex-end'>
                <Button colorScheme='blue' onClick={onOpen} w='36'>
                  🖉 Edit event
                </Button>
                <Modal
                  isOpen={isOpen}
                  onClose={onClose}
                  size={{ base: 'full', lg: '3xl', xl: '5xl' }}
                  closeOnEsc='true'
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>
                      <ModalCloseButton />
                    </ModalHeader>

                    <ModalBody>
                      <EventForm />
                    </ModalBody>
                  </ModalContent>
                </Modal>
                <Button
                  colorScheme='red'
                  w='36'
                  onClick={() => deleteEvent(eventId)}
                >
                  ✖ Delete event
                </Button>
                <Link to='/'>
                  <Button colorScheme='gray' variant='solid' w='36'>
                    ← Back
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Center>
      {/* Right column */}
      <Box minW='15vw'></Box>
    </Flex>
  );
};

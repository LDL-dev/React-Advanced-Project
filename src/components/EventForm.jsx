import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Textarea
} from '@chakra-ui/react';
import { Form, useParams, useLoaderData, Link } from 'react-router-dom';

export const eventFormLoader = async () => {
  const usersResponse = await fetch('http://localhost:3000/users');
  const eventsResponse = await fetch('http://localhost:3000/events');
  const categoriesResponse = await fetch('http://localhost:3000/categories');
  const users = await usersResponse.json();
  const events = await eventsResponse.json();
  const categories = await categoriesResponse.json();

  return { users, events, categories };
};

// prettier-ignore
export const actionHandleSubmit = async ({ request, params }) => {

  let formData = await request.formData();                            // gets the formData
  let fetchOptions;

  if (params.eventId) {                                               // if the path contains an eventId,
    fetchOptions = {                                                  // we are editing an event; 
      method: 'PUT',
      url: 'http://localhost:3000/events/' + params.eventId
    };
  } else {                                                            // else, we are adding a new event
    fetchOptions = {
      method: 'POST',
      url: 'http://localhost:3000/events'
    };
  }

  const categoryIds = await formData                                  // gets the categoryIds from the category boxes
    .getAll('categoryIds')                                            // that were checked by the event creator
    .map(str => parseInt(str));                                       // and returns them as an array of integers

  const formDataObject = Object.fromEntries(formData);

  formDataObject['createdBy'] = Number(formDataObject['createdBy']);

  formDataObject['categoryIds'] = categoryIds;                        // stores the categoryIds in the formDataObject

  formDataObject['startTime'] = formDataObject['date']                // combines date and starting time,
    .concat('T')                                                      // puts it in the right format and
    .concat(formDataObject['startTime'])                              // stores it in the formDataObject
    .concat(':00.000Z');

  formDataObject['endTime'] = formDataObject['date']                  // combines date and ending time,
    .concat('T')                                                      // puts it in the right format and
    .concat(formDataObject['endTime'])                                // stores it in the formDataObject
    .concat(':00.000Z');

  delete formDataObject.date;                                         // removes the 'date' field from the formDataObject

  // posts the form data as an event to the events database
  const eventResponse = await fetch(fetchOptions.url, {
    method: fetchOptions.method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formDataObject)
  });

  const event = await eventResponse.json();

  if (eventResponse.ok) {
    alert('The event was successfully saved!')
  } else {
    alert('There was an error processing your request!')
  }

  window.location.href=`/event/${event.id}`;
  return null;
};

export const EventForm = () => {
  const { users, categories } = useLoaderData();
  const { eventId } = useParams();

  let event;

  // find the event by the url params, or create a new event object
  if (eventId) {
    const { events } = useLoaderData();
    event = events.find(event => event.id === Number(eventId));
  } else {
    event = {
      createdBy: '1',
      title: '',
      description: '',
      image: '',
      categoryIds: [],
      location: '',
      startTime: '',
      endTime: ''
    };
  }

  return (
    <Flex>
      {/* Left column */}
      <Box w={{ base: '5vw', md: '20vw', '2xl': '30vw' }}></Box>
      {/* Center column with form */}
      <Box w={{ base: '90vw', md: '60vw', '2xl': '40vw' }}>
        <Form method='post' action=''>
          <Flex direction='column' align='flex-start' gap='7'>
            {/* Title */}
            <FormControl borderColor='gray.400' isRequired='true'>
              <FormLabel>Event title</FormLabel>
              <Input
                name='title'
                defaultValue={event.title}
                placeholder='Enter an event title - try to make it catchy!'
              />
            </FormControl>
            {/* Description */}
            <FormControl borderColor='gray.400' isRequired='true'>
              <FormLabel>Event description</FormLabel>
              <Textarea
                name='description'
                defaultValue={event.description}
                placeholder='Describe the event in your own words'
              />
            </FormControl>
            {/* Categories*/}
            <FormControl borderColor='gray.400'>
              <FormLabel>Event categories</FormLabel>
              <CheckboxGroup
                colorScheme='green'
                defaultValue={event.categoryIds.map(id => id.toString())}
              >
                <HStack>
                  {categories.map(category => {
                    return (
                      <Checkbox
                        key={category.id}
                        name='categoryIds'
                        size='md'
                        value={category.id.toString()}
                      >
                        {category.name}
                      </Checkbox>
                    );
                  })}
                </HStack>
              </CheckboxGroup>
            </FormControl>
            {/* Image URL */}
            <FormControl borderColor='gray.400'>
              <FormLabel>Event image URL</FormLabel>
              <Input name='image' defaultValue={event.image} />
            </FormControl>
            {/* Location */}
            <FormControl borderColor='gray.400' isRequired='true'>
              <FormLabel>Event location</FormLabel>
              <Input name='location' defaultValue={event.location} />
            </FormControl>
            {/* Date */}
            <FormControl borderColor='gray.400' isRequired='true'>
              <FormLabel>Event date (mm-dd-yyyy)</FormLabel>
              <Input
                name='date'
                type='date'
                defaultValue={event.startTime.slice(0, 10)}
                required
              />
              <FormLabel>Event starting time</FormLabel>
              <Input
                name='startTime'
                type='time'
                required
                defaultValue={event.startTime.slice(11, 16)}
              />
              <FormLabel>Event ending time</FormLabel>
              <Input
                name='endTime'
                type='time'
                required
                defaultValue={event.endTime.slice(11, 16)}
              />
            </FormControl>
            {/* Created By */}
            <FormControl borderColor='gray.400' isRequired='true'>
              <FormLabel>Event added by:</FormLabel>
              <Select
                name='createdBy'
                borderColor='gray.400'
                defaultValue={event.createdBy}
              >
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            {/* Submit form to router*/}
            <Flex w='100%' justify='flex-end'>
              <Button colorScheme='green' variant='solid' type='submit'>
                Save event
              </Button>
              <Link to='/'>
                <Button colorScheme='gray' variant='solid'>
                  Cancel
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Form>
      </Box>
      {/* Right column */}
      <Box w={{ base: '5vw', md: '20vw', '2xl': '30vw' }}></Box>
    </Flex>
  );
};

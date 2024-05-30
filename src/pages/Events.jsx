import React, { useState } from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { SearchBar } from '../components/SearchBar';
import { SearchFilter } from '../components/SearchFilter';
import { ShowEvents } from '../components/ShowEvents';
import { useLoaderData } from 'react-router-dom';
import { API_URL } from '../main';

export const eventsLoader = async () => {
  const usersResponse = await fetch(API_URL + '/users');
  const eventsResponse = await fetch(API_URL + '/events');
  const categoriesResponse = await fetch(API_URL + '/categories');
  const users = await usersResponse.json();
  const events = await eventsResponse.json();
  const categories = await categoriesResponse.json();

  return { users, events, categories };
};

export const Events = () => {
  const { users, events, categories } = useLoaderData();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const containsText = (value, text) => {
    return value.toString().toLowerCase().includes(text.toLowerCase());
  };

  let foundEvents = events;

  // filter categories
  if (selectedCategory !== '') {
    foundEvents = foundEvents.filter(event =>
      event.categoryIds.includes(Number(selectedCategory))
    );
  }

  foundEvents = foundEvents.filter(
    event =>
      containsText(
        users.find(user => user.id === event.createdBy).name,
        query
      ) ||
      containsText(
        categories
          .filter(category => event.categoryIds.includes(category.id))
          .map(category => category.name),
        query
      ) ||
      containsText(Object.values(event), query)
  );

  return (
    <Flex direction='column' align='center' gap='3' bg='yellow.100'>
      <Heading size='lg' color='gray.700'>
        Our fun events
      </Heading>
      <SearchBar onChange={handleChange} />
      <SearchFilter
        onChange={setSelectedCategory}
        value={selectedCategory}
        categories={categories}
      />
      <ShowEvents foundEvents={foundEvents} categories={categories} />
    </Flex>
  );
};

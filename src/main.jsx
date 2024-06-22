import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Event, eventLoader } from './pages/Event';
import { Events, eventsLoader } from './pages/Events';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './components/Root';
import { NotFound } from './pages/NotFound';
import {
  EventForm,
  actionHandleSubmit,
  eventFormLoader
} from './components/EventForm';
import { ErrorBoundary } from './components/ErrorBoundary';

export const API_URL =
  //  'https://my-json-server.typicode.com/LDL-dev/events-db.json';
  'https://json-server-mock-api-jvzt.onrender.com/';
// hhttp://localhost:3000

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Events />,
        loader: eventsLoader
      },
      {
        path: '/event/:eventId',
        element: <Event />,
        loader: eventLoader,
        action: actionHandleSubmit
      },
      {
        path: '/event/new',
        element: <EventForm />,
        loader: eventFormLoader,
        action: actionHandleSubmit
      },
      {
        path: '*',
        element: <NotFound />
      }
    ],
    errorElement: <ErrorBoundary />
  }
]);

// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

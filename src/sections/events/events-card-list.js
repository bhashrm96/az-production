import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import EventsCard from './events-card';
import { useSSR } from 'react-i18next';
import axios from 'axios';
import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

export default function EventsCardList() {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("https://dev-azproduction-api.flynautstaging.com/events/view_all_events", {
      headers: {
        Authorization: sessionStorage.getItem("accessToken")
      }
    }).then((res) => {
      setEvents(res.data.data);
    })
  }, [])
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
    >
<<<<<<< HEAD
      {events.length > 0 && events.map((events, index) => (
        <EventsCard key={events.id} events={events} index={index} />
=======
      {events.length > 0 && events.map((events) => (
        <EventsCard key={events.id} events={events} />
>>>>>>> 3158989336036a9443c48a8277182b1baf2e5a3a
      ))}
    </Box>
  );
}

EventsCardList.propTypes = {
  events: PropTypes.array,
};

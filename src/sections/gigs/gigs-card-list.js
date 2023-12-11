import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import GigsCard from './gigs-card';
import { useEffect, useState } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function GigsCardList() {

  const [cards, setCards] = useState([])

  useEffect(() => {
    axios.get("https://dev-azproduction-api.flynautstaging.com/gigs/view_all_gigs", {
      headers: {
        Authorization: sessionStorage.getItem('accessToken')
      }
    }).then((res) => {

      setCards(res.data.data);
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
      {cards.map((gigs, index) => (
        <GigsCard key={gigs.id} gigs={gigs} index={index} />
=======
      {cards.map((gigs) => (
        <GigsCard key={gigs.id} gigs={gigs} />
>>>>>>> 3158989336036a9443c48a8277182b1baf2e5a3a
      ))}
    </Box>
  );
}

GigsCardList.propTypes = {
  gigss: PropTypes.array,
};

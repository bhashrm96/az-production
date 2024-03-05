import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import GigsCard from './gigs-card';
import { useEffect, useState } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function GigsCardList() {

  const [cards, setCards] = useState([])

  useEffect(() => {
    axios.get("https://dev-azproduction-api.flynautstaging.com/admin/view_all_gigs", {
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
      gridTemplateColumns={cards.length > 0 ? {
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      } : {}}
    >
      {cards.length > 0 ? cards.map((gigs, index) => (
        <GigsCard key={gigs.id} gigs={gigs} index={index} />
      )) : <div style={{ fontSize: '1.6rem', fontWeight: 'bold', textAlign: "center", width: "100%" }}>
        No Gig Found!
      </div>}
    </Box>
  );
}

GigsCardList.propTypes = {
  gigss: PropTypes.array,
};

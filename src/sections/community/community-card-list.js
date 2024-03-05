import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import CommunityCard from './community-card';
import { useEffect, useState } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function CommunityCardList() {

  const [cards, setCards] = useState([])

  useEffect(() => {
    axios.get("https://dev-azproduction-api.flynautstaging.com/community/get-communities", {
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
      {cards.length > 0 ? cards.map((community, index) => (
        <CommunityCard key={community.id} community={community} index={index} />
      )) : <div style={{ fontSize: '1.6rem', fontWeight: 'bold', textAlign: "center", width: "100%" }}>
        No Community Found!
      </div>}
    </Box>
  );
}

CommunityCardList.propTypes = {
  communitys: PropTypes.array,
};

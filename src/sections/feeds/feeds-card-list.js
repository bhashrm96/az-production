import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import FeedsCard from './feeds-card';
import { useSSR } from 'react-i18next';
import axios from 'axios';
import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

export default function FeedsCardList() {

  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    axios.get("https://dev-azproduction-api.flynautstaging.com/admin/feeds?userId=4", {
      headers: {
        Authorization: sessionStorage.getItem("accessToken")
      }
    }).then((res) => {
      setFeeds(res.data.data);
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
      {feeds.length > 0 && feeds.map((feeds, index) => (
        <FeedsCard key={feeds.id} feeds={feeds} index={index} />
      ))}
    </Box>
  );
}

FeedsCardList.propTypes = {
  feeds: PropTypes.array,
};

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
      gridTemplateColumns="1fr" // This ensures only one column for all screen sizes
    >
      {feeds.length > 0 && feeds.map((feed, index) => (
        <FeedsCard key={feed.id} feeds={feed} index={index} />
      ))}
    </Box>
  );
}

FeedsCardList.propTypes = {
  feeds: PropTypes.array,
};

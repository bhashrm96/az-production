import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import FeedsCard from './feeds-card';
import { useSSR } from 'react-i18next';
import axios from 'axios';
import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

export default function FeedsCardList() {

  const [feeds, setFeeds] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    axios.get("https://dev-azproduction-api.flynautstaging.com/admin/feeds?userId=4", {
      headers: {
        Authorization: sessionStorage.getItem("accessToken")
      }
    }).then((res) => {
      setFeeds(res.data.data);
    })
  }, [isUpdate])

  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns="1fr"
    >
      {feeds.length > 0 ? feeds.map((feed, index) => (
        <FeedsCard setIsUpdate={setIsUpdate} key={feed.id} feeds={feed} index={index} />
      )) : <div style={{ fontSize: '1.6rem', fontWeight: 'bold', textAlign: "center", width: "100%" }}>
        No Post Found!
      </div>}
    </Box>
  );
}

FeedsCardList.propTypes = {
  feeds: PropTypes.array,
};

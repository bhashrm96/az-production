import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import ClassifiedCard from './classified-card';
import { useSSR } from 'react-i18next';
import axios from 'axios';
import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

export default function ClassifiedCardList() {

  const [classified, setClassified] = useState([]);

  useEffect(() => {
    axios.get("https://dev-azproduction-api.flynautstaging.com/classified/get_All_classified", {
      headers: {
        Authorization: sessionStorage.getItem("accessToken")
      }
    }).then((res) => {
      setClassified(res.data.data);
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
      {classified.length > 0 && classified.map((classified, index) => (
        <ClassifiedCard key={classified.id} classified={classified} index={index} />
=======
      {classified.length > 0 && classified.map((classified) => (
        <ClassifiedCard key={classified.id} classified={classified} />
>>>>>>> 3158989336036a9443c48a8277182b1baf2e5a3a
      ))}
    </Box>
  );
}

ClassifiedCardList.propTypes = {
  classified: PropTypes.array,
};

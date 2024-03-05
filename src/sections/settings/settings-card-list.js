import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import SettingsCard from './settings-card';
import { useEffect, useState } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function SettingsCardList() {

  const [cards, setCards] = useState([])

  useEffect(() => {
    axios.get("https://dev-azproduction-api.flynautstaging.com/settings/get-communities", {
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
      {cards.map((settings, index) => (
        <SettingsCard key={settings.id} settings={settings} index={index} />
      ))}
    </Box>
  );
}

SettingsCardList.propTypes = {
  settingss: PropTypes.array,
};

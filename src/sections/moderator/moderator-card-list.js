import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import ModeratorCard from './moderator-card';

// ----------------------------------------------------------------------

export default function ModeratorCardList({ moderators }) {
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
      {moderators.map((moderator) => (
        <ModeratorCard key={moderator.id} moderator={moderator} />
      ))}
    </Box>
  );
}

ModeratorCardList.propTypes = {
  moderators: PropTypes.array,
};

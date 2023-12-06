import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import GigsCard from './gigs-card';

// ----------------------------------------------------------------------

export default function GigsCardList({ gigss }) {
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
      {gigss.map((gigs) => (
        <GigsCard key={gigs.id} gigs={gigs} />
      ))}
    </Box>
  );
}

GigsCardList.propTypes = {
  gigss: PropTypes.array,
};

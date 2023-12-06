import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import VendorCard from './vendor-card';

// ----------------------------------------------------------------------

export default function VendorCardList({ vendors }) {
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
      {vendors.map((vendor) => (
        <VendorCard key={vendor.id} vendor={vendor} />
      ))}
    </Box>
  );
}

VendorCardList.propTypes = {
  vendors: PropTypes.array,
};

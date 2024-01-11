'use client';

import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ProfileFollowers({ followers, data }) {
  const _mockFollowed = followers.slice(4, 8).map((i) => i.id);

  const [followed, setFollowed] = useState(_mockFollowed);

  const handleClick = useCallback(
    (item) => {
      const selected = followed.includes(item)
        ? followed.filter((value) => value !== item)
        : [...followed, item];

      setFollowed(selected);
    },
    [followed]
  );

  return (
    <>
      <Typography variant="h4" sx={{ my: 5 }}>
        Products
      </Typography>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {data.products.map((follower) => (
          <FollowerItemProduct
            key={follower.id}
            follower={follower}
            selected={followed.includes(follower.id)}
            onSelected={() => handleClick(follower.id)}
          />
        ))}
      </Box>

      <Typography variant="h4" sx={{ my: 5 }}>
        Services
      </Typography>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {data.services.map((follower) => (
          <FollowerItemService
            key={follower.id}
            follower={follower}
            selected={followed.includes(follower.id)}
            onSelected={() => handleClick(follower.id)}
          />
        ))}
      </Box>
    </>
  );
}

ProfileFollowers.propTypes = {
  followers: PropTypes.array,
};

// ----------------------------------------------------------------------

function FollowerItemProduct({ follower, selected, onSelected }) {
  const { name, price, avatarUrl, photo, photos } = follower;

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: (theme) => theme.spacing(3, 2, 3, 3),
      }}
    >
      <Avatar alt={name} src={photos.length > 0 ? photos[0].url : null} sx={{ width: 48, height: 48, mr: 2 }} />

      <ListItemText
        primary={name}
        // secondary={
        //   <>
        //     <Iconify icon="mingcute:location-fill" width={16} sx={{ flexShrink: 0, mr: 0.5 }} />
        //     {country} country country country country country country country country country
        //   </>
        // }
        primaryTypographyProps={{
          noWrap: true,
          typography: 'subtitle2',
        }}
        secondaryTypographyProps={{
          mt: 0.5,
          noWrap: true,
          display: 'flex',
          component: 'span',
          alignItems: 'center',
          typography: 'caption',
          color: 'text.disabled',
        }}
      />

      <ListItemText
        primary={`$${price}`}
        // secondary={
        //   <>
        //     <Iconify icon="mingcute:location-fill" width={16} sx={{ flexShrink: 0, mr: 0.5 }} />
        //     {country} country country country country country country country country country
        //   </>
        // }
        primaryTypographyProps={{
          noWrap: true,
          typography: 'subtitle2',
        }}
        secondaryTypographyProps={{
          mt: 0.5,
          noWrap: true,
          display: 'flex',
          component: 'span',
          alignItems: 'center',
          typography: 'caption',
          color: 'text.disabled',
        }}
      />

      {/* <Button
        size="small"
        variant={selected ? 'text' : 'outlined'}
        color={selected ? 'success' : 'inherit'}
        startIcon={
          selected ? <Iconify width={18} icon="eva:checkmark-fill" sx={{ mr: -0.75 }} /> : null
        }
        onClick={onSelected}
        sx={{ flexShrink: 0, ml: 1.5 }}
      >
        {selected ? 'Followed' : 'Follow'}
      </Button> */}
    </Card>
  );
}

function FollowerItemService({ follower, selected, onSelected }) {
  const { name, price, avatarUrl, photo, photos } = follower;

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: (theme) => theme.spacing(3, 2, 3, 3),
      }}
    >
      <Avatar alt={name} src={photo.length > 0 ? photo[0].url : null} sx={{ width: 48, height: 48, mr: 2 }} />

      <ListItemText
        primary={name}
        // secondary={
        //   <>
        //     <Iconify icon="mingcute:location-fill" width={16} sx={{ flexShrink: 0, mr: 0.5 }} />
        //     {country} country country country country country country country country country
        //   </>
        // }
        primaryTypographyProps={{
          noWrap: true,
          typography: 'subtitle2',
        }}
        secondaryTypographyProps={{
          mt: 0.5,
          noWrap: true,
          display: 'flex',
          component: 'span',
          alignItems: 'center',
          typography: 'caption',
          color: 'text.disabled',
        }}
      />

      <ListItemText
        primary={`$${price}/hour`}
        // secondary={
        //   <>
        //     <Iconify icon="mingcute:location-fill" width={16} sx={{ flexShrink: 0, mr: 0.5 }} />
        //     {country} country country country country country country country country country
        //   </>
        // }
        primaryTypographyProps={{
          noWrap: true,
          typography: 'subtitle2',
        }}
        secondaryTypographyProps={{
          mt: 0.5,
          noWrap: true,
          display: 'flex',
          component: 'span',
          alignItems: 'center',
          typography: 'caption',
          color: 'text.disabled',
        }}
      />

      {/* <Button
        size="small"
        variant={selected ? 'text' : 'outlined'}
        color={selected ? 'success' : 'inherit'}
        startIcon={
          selected ? <Iconify width={18} icon="eva:checkmark-fill" sx={{ mr: -0.75 }} /> : null
        }
        onClick={onSelected}
        sx={{ flexShrink: 0, ml: 1.5 }}
      >
        {selected ? 'Followed' : 'Follow'}
      </Button> */}
    </Card>
  );
}

FollowerItemService.propTypes = {
  follower: PropTypes.object,
  onSelected: PropTypes.func,
  selected: PropTypes.bool,
};

FollowerItemProduct.propTypes = {
  follower: PropTypes.object,
  onSelected: PropTypes.func,
  selected: PropTypes.bool,
};

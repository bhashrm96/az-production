'use client';

import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import { Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { fNumber } from 'src/utils/format-number';

import { _socials } from 'src/_mock';

import Iconify from 'src/components/iconify';

import ProfilePostItem from './profile-post-item';

// ----------------------------------------------------------------------

export default function ProfileHome({ info, posts, vendorData, productServices, members }) {
  const theme = useTheme();
  const fileRef = useRef(null);

  const handleAttach = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const renderFollows = (
    <Card sx={{ py: 3, textAlign: 'center', typography: 'h4' }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
      >
        <Stack width={1}>
          {/* {fNumber(info.totalFollowers)} */}
          11k
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Followers
          </Box>
        </Stack>

        {/* <Stack width={1}>
          {fNumber(info.totalFollowing)}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Following
          </Box>
        </Stack> */}
      </Stack>
    </Card>
  );

  const renderAbout = (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Box sx={{ typography: 'body2' }}>{vendorData.about_company}</Box>
      </Stack>

      <CardHeader title="Company Info" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Box sx={{ typography: 'body2' }}>{vendorData.business_website}</Box>
        <Box sx={{ typography: 'body2' }}>{vendorData.company_email}</Box>
      </Stack>
    </Card>
  );

  const renderPostInput = (
    <Card sx={{ p: 3 }}>
      <InputBase
        multiline
        fullWidth
        rows={4}
        placeholder="Share what you are thinking here..."
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 1,
          border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.2)}`,
        }}
      />

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
          <Fab size="small" color="inherit" variant="softExtended" onClick={handleAttach}>
            <Iconify icon="solar:gallery-wide-bold" width={24} sx={{ color: 'success.main' }} />
            Image/Video
          </Fab>

          <Fab size="small" color="inherit" variant="softExtended">
            <Iconify icon="solar:videocamera-record-bold" width={24} sx={{ color: 'error.main' }} />
            Streaming
          </Fab>
        </Stack>

        <Button variant="contained">Post</Button>
      </Stack>

      <input ref={fileRef} type="file" style={{ display: 'none' }} />
    </Card>
  );

  const renderProducts = (
    <Card>
      <CardHeader title="Products and Services" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {productServices.map((product) => (
          <Stack
            key={product.id}
            spacing={2}
            direction="row"
            sx={{ wordBreak: 'break-all', typography: 'body2', display: 'flex', alignItems: 'center' }}
          >
            <Avatar
              src={product.photos?.length > 0 && product.photos[0].url}
              alt={product.name}
              sx={{
                width: { xs: 30, md: 30 },
                height: { xs: 30, md: 30 },
                border: `solid 2px ${theme.palette.common.white}`,
              }}
            />
            <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
              {product.name}
            </Box>
            <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
              {product.price}
            </Box>

          </Stack>
        ))}

      </Stack>
      <Stack>
        <Link sx={{ textAlign: 'center', marginBottom: '10px' }}>
          View All
        </Link>
      </Stack>
    </Card>
  );

  const renderMembers = (
    <Card>
      <CardHeader title="Members" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {members.map((product) => (
          <Stack
            key={product.id}
            spacing={2}
            direction="row"
            sx={{ wordBreak: 'break-all', typography: 'body2', display: 'flex', alignItems: 'center' }}
          >
            <Avatar
              alt={product.first_name}
              sx={{
                width: { xs: 30, md: 30 },
                height: { xs: 30, md: 30 },
                border: `solid 2px ${theme.palette.common.white}`,
              }}
            />
            <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
              {product.first_name}
            </Box>
            <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
              {product.last_name}
            </Box>

          </Stack>
        ))}

      </Stack>
      <Stack>
        <Link sx={{ textAlign: 'center', marginBottom: '10px' }}>
          View All
        </Link>
      </Stack>
    </Card>
  );

  // const renderPortfolio = (
  //   <Card>
  //     <CardHeader title="Products and Services" />

  //     <Stack spacing={2} sx={{ p: 3 }}>
  //       {productServices.products.map((product) => (
  //         <Stack
  //           key={product.id}
  //           spacing={2}
  //           direction="row"
  //           sx={{ wordBreak: 'break-all', typography: 'body2', display: 'flex', alignItems: 'center' }}
  //         >
  //           <Avatar
  //             src={product.photos.length > 0 && product.photos[0].url}
  //             alt={product.name}
  //             sx={{
  //               width: { xs: 30, md: 30 },
  //               height: { xs: 30, md: 30 },
  //               border: `solid 2px ${theme.palette.common.white}`,
  //             }}
  //           />
  //           <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
  //             {product.name}
  //           </Box>
  //           <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
  //             {product.price}
  //           </Box>

  //         </Stack>
  //       ))}

  //     </Stack>
  //     <Stack>
  //       <Link sx={{ textAlign: 'center', marginBottom: '10px' }}>
  //         View All
  //       </Link>
  //     </Stack>
  //   </Card>
  // );

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={4}>
        <Stack spacing={3}>
          {renderFollows}

          {renderAbout}

          {renderProducts}

          {renderMembers}
        </Stack>
      </Grid>

      <Grid xs={12} md={8}>
        <Stack spacing={3}>
          {posts.map((post) => (
            <ProfilePostItem key={post.id} post={post} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}

ProfileHome.propTypes = {
  info: PropTypes.object,
  posts: PropTypes.array,
};

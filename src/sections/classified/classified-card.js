import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { alpha, useTheme } from '@mui/material/styles';

import { fShortenNumber } from 'src/utils/format-number';

import { _socials } from 'src/_mock';
import { AvatarShape } from 'src/assets/illustrations';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
<<<<<<< HEAD
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function ClassifiedCard({ classified, index }) {
  const theme = useTheme();
  const router = useRouter();
=======

// ----------------------------------------------------------------------

export default function ClassifiedCard({ classified }) {
  const theme = useTheme();
>>>>>>> 3158989336036a9443c48a8277182b1baf2e5a3a

  const { ad_title, image_url, category_name, price, avatarUrl } = classified;

  return (
<<<<<<< HEAD
    <div onClick={() => router.push(paths.dashboard.classified.details(index))}>
      <Card sx={{ textAlign: 'center' }}>
        <Box sx={{ position: 'relative' }}>
          {/* <AvatarShape
            sx={{
              left: 0,
              right: 0,
              zIndex: 10,
              mx: 'auto',
              bottom: -26,
              position: 'absolute',
            }}
          /> */}

          {/* <Avatar
            alt={ad_title}
            src={avatarUrl}
            sx={{
              width: 64,
              height: 64,
              zIndex: 11,
              left: 0,
              right: 0,
              bottom: -32,
              mx: 'auto',
              position: 'absolute',
            }}
          /> */}

          <Image
            src={image_url}
            alt={image_url}
            ratio="16/9"
            overlay={alpha(theme.palette.grey[900], 0.48)}
          />
        </Box>

        <ListItemText
          sx={{ mt: 7, mb: 1 }}
          primary={ad_title}
          secondary={category_name}
          primaryTypographyProps={{ typography: 'subtitle1' }}
          secondaryTypographyProps={{ component: 'span', mt: 0.5 }}
        />

        {/* <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mb: 2.5 }}>
=======
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <AvatarShape
          sx={{
            left: 0,
            right: 0,
            zIndex: 10,
            mx: 'auto',
            bottom: -26,
            position: 'absolute',
          }}
        />

        <Avatar
          alt={ad_title}
          src={avatarUrl}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute',
          }}
        />

        <Image
          src={image_url}
          alt={image_url}
          ratio="16/9"
          overlay={alpha(theme.palette.grey[900], 0.48)}
        />
      </Box>

      <ListItemText
        sx={{ mt: 7, mb: 1 }}
        primary={ad_title}
        secondary={category_name}
        primaryTypographyProps={{ typography: 'subtitle1' }}
        secondaryTypographyProps={{ component: 'span', mt: 0.5 }}
      />

      {/* <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mb: 2.5 }}>
>>>>>>> 3158989336036a9443c48a8277182b1baf2e5a3a
        {_socials.map((social) => (
          <IconButton
            key={social.name}
            sx={{
              color: social.color,
              '&:hover': {
                bgcolor: alpha(social.color, 0.08),
              },
            }}
          >
            <Iconify icon={social.icon} />
          </IconButton>
        ))}
      </Stack> */}

<<<<<<< HEAD
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box
          display="grid"
          gridTemplateColumns="repeat(1, 1fr)"
          sx={{ py: 3, typography: 'subtitle1' }}
        >
          <div>
            <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
              Price
            </Typography>

            Rs. {price}
          </div>
        </Box>
      </Card>
    </div>
=======
      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box
        display="grid"
        gridTemplateColumns="repeat(1, 1fr)"
        sx={{ py: 3, typography: 'subtitle1' }}
      >
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
            Price
          </Typography>

          Rs. {price}
        </div>
      </Box>
    </Card>
>>>>>>> 3158989336036a9443c48a8277182b1baf2e5a3a
  );
}

ClassifiedCard.propTypes = {
  classified: PropTypes.object,
};

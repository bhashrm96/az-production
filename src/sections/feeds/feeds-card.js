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
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function FeedsCard({ feeds, index }) {
  const theme = useTheme();
  const router = useRouter();

  const { title, images, description, price, avatarUrl } = feeds;

  return (
    <div
    // onClick={() => router.push(paths.dashboard.feeds.details(index))}
    >
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

          <Image
            src={images.length > 0 && images[0].url}
            alt={title}
            ratio="16/9"
          // overlay={alpha(theme.palette.grey[900], 0.48)}
          />
        </Box>

        <ListItemText
          sx={{ mt: 7, mb: 1 }}
          primary={title ? title : "title"}
          secondary={description ? description : "description"}
          primaryTypographyProps={{ typography: 'subtitle1' }}
          secondaryTypographyProps={{ component: 'span', mt: 0.5 }}
        />

        {/* <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mb: 2.5 }}>
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

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box
          display="grid"
          gridTemplateColumns="repeat(1, 1fr)"
          sx={{ py: 3, typography: 'subtitle1', display: 'flex', alignItems: "center", justifyContent: 'center' }}
        >
          <Avatar
            alt={title ? title : "title"}
            src={avatarUrl}
            sx={{
              width: 30,
              height: 30,
              zIndex: 11,
            }}
          />
          <div style={{ marginLeft: '0.5rem' }}>username</div>
        </Box>
      </Card>
    </div>
  );
}

FeedsCard.propTypes = {
  feeds: PropTypes.object,
};

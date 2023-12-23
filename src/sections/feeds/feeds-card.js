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

  const { title, images, description, created_at, avatarUrl } = feeds;

  return (
    <div
    // onClick={() => router.push(paths.dashboard.feeds.details(index))}
    >
      <Card sx={{ textAlign: 'center' }}>

        <Box
          display="grid"
          gridTemplateColumns="repeat(1, 1fr)"
          sx={{ py: 2, px: 2, typography: 'subtitle1', display: 'flex', alignItems: "center", justifyContent: 'start' }}
        >
          <Avatar
            alt={title ? title : "title"}
            src={avatarUrl}
            sx={{
              width: 40,
              height: 40,
              zIndex: 11,
            }}
          />
          <div style={{ marginLeft: "0.5rem", display: 'flex', flexDirection: "column" }}>
            <small style={{ textAlign: "left" }}>Username</small>
            <small style={{ color: "grey", textAlign: "left" }}>{new Intl.DateTimeFormat('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            }).format(new Date(Date.parse(created_at)))}</small>
          </div>
        </Box>

        <ListItemText
          sx={{ mb: 1, px: 2 }}
          // primary={title ? title : "title"}
          secondary={description ? description : "description"}
          primaryTypographyProps={{ typography: 'subtitle1', textAlign: "left" }}
          secondaryTypographyProps={{ component: 'span', mt: 0.5, textAlign: "left" }}
        />

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
      </Card>
    </div>
  );
}

FeedsCard.propTypes = {
  feeds: PropTypes.object,
};

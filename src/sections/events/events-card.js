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

export default function EventsCard({ events, index }) {
  const theme = useTheme();
  const router = useRouter();

  const { event_title, images, event_description, event_category_name, start_time, end_time, avatarUrl, event_date } = events;

  return (
    <div onClick={() => router.push(paths.dashboard.events.details(events.id))}>
      <Card sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
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
          {/* 
          <Avatar
            alt={event_title}
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
            src={images}
            alt={images}
            ratio="16/9"
            overlay={alpha(theme.palette.grey[900], 0.48)}
          />
        </Box>

        <ListItemText
          sx={{ mt: 2, mb: 1 }}
          primary={`${event_title}`}
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
          gridTemplateColumns="repeat(3, 1fr)"
          sx={{ py: 3, typography: 'subtitle1' }}
        >
          <div>
            <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
              Event Date
            </Typography>
            {event_date.slice(0, 10)}
          </div>
        </Box>
      </Card>
    </div>
  );
}

EventsCard.propTypes = {
  events: PropTypes.object,
};

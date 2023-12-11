import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

export default function ProfileCover({ name, avatarUrl, role, coverUrl }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
<<<<<<< HEAD
          color: alpha(theme.palette.primary.darker, 0.3),
          imgUrl: coverUrl,
        }),
        backgroundColor: alpha(theme.palette.primary.darker, 0.3),
=======
          color: alpha(theme.palette.primary.darker, 0.8),
          imgUrl: coverUrl,
        }),
>>>>>>> 3158989336036a9443c48a8277182b1baf2e5a3a
        height: 1,
        color: 'common.white',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          left: { md: 24 },
          bottom: { md: 24 },
          zIndex: { md: 10 },
          pt: { xs: 6, md: 0 },
          position: { md: 'absolute' },
        }}
      >
<<<<<<< HEAD
        {/* <Avatar
=======
        <Avatar
>>>>>>> 3158989336036a9443c48a8277182b1baf2e5a3a
          src={avatarUrl}
          alt={name}
          sx={{
            mx: 'auto',
            width: { xs: 64, md: 128 },
            height: { xs: 64, md: 128 },
            border: `solid 2px ${theme.palette.common.white}`,
          }}
<<<<<<< HEAD
        /> */}
=======
        />
>>>>>>> 3158989336036a9443c48a8277182b1baf2e5a3a

        <ListItemText
          sx={{
            mt: 3,
            ml: { md: 3 },
            textAlign: { xs: 'center', md: 'unset' },
          }}
          primary={name}
          secondary={role}
          primaryTypographyProps={{
            typography: 'h4',
<<<<<<< HEAD
            color: `${!coverUrl ? 'black' : 'inherit'}`
=======
>>>>>>> 3158989336036a9443c48a8277182b1baf2e5a3a
          }}
          secondaryTypographyProps={{
            mt: 0.5,
            color: 'inherit',
            component: 'span',
            typography: 'body2',
            sx: { opacity: 0.48 },
<<<<<<< HEAD
            color: `${!coverUrl ? 'black' : 'inherit'}`
=======
>>>>>>> 3158989336036a9443c48a8277182b1baf2e5a3a
          }}
        />
      </Stack>
    </Box>
  );
}

ProfileCover.propTypes = {
  avatarUrl: PropTypes.string,
  coverUrl: PropTypes.string,
  name: PropTypes.string,
  role: PropTypes.string,
};

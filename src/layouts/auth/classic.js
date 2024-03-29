import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgGradient } from 'src/theme/css';
import { useAuthContext } from 'src/auth/hooks';

import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

const METHODS = [
  {
    id: 'jwt',
    label: 'Jwt',
    path: paths.login.root,
    icon: '/assets/icons/auth/ic_jwt.svg',
  },
  // {
  //   id: 'firebase',
  //   label: 'Firebase',
  //   path: paths.auth.firebase.login,
  //   icon: '/assets/icons/auth/ic_firebase.svg',
  // },
  // {
  //   id: 'amplify',
  //   label: 'Amplify',
  //   path: paths.auth.amplify.login,
  //   icon: '/assets/icons/auth/ic_amplify.svg',
  // },
  // {
  //   id: 'auth0',
  //   label: 'Auth0',
  //   path: paths.auth.auth0.login,
  //   icon: '/assets/icons/auth/ic_auth0.svg',
  // },
];

export default function AuthClassicLayout({ children, image, title }) {
  const { method } = useAuthContext();

  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  // const renderLogo = (
  //   <Logo
  //     sx={{
  //       zIndex: 9,
  //       position: 'absolute',
  //       m: { xs: 2, md: 5 },
  //     }}
  //   />
  // );

  const renderContent = (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {children}
    </Stack>
  );

  const renderSection = (
    <Stack
      spacing={10}
      alignItems="center"
      justifyContent="center"
      sx={{
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.88 : 0.94
          ),
          imgUrl: '/assets/background/overlay_2.jpg',
        }),
      }}
    >
      {/* <Typography variant="h3" sx={{ maxWidth: 480, textAlign: 'center' }}>
        {title || 'Hi, Welcome back'}
      </Typography> */}

      <Box
        component="img"
        alt="auth"
        src={image || '/logo/logo-main.png'}
        sx={{
          maxWidth: {
            xs: 480,
            lg: 520,
            xl: 520,
          },
          backgroundImage: 'url("/")'
        }}
      />

      {/* <Stack direction="row" spacing={2}>
        {METHODS.map((option) => (
          <Tooltip key={option.label} title={option.label}>
            <Link component={RouterLink} href={option.path}>
              <Box
                component="img"
                alt={option.label}
                src={option.icon}
                sx={{
                  width: 32,
                  height: 32,
                  ...(method !== option.id && {
                    filter: 'grayscale(100%)',
                  }),
                }}
              />
            </Link>
          </Tooltip>
        ))}
      </Stack> */}
    </Stack>
  );

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      {/* {renderLogo} */}

      {mdUp && renderSection}

      {renderContent}
    </Stack>
  );
}

AuthClassicLayout.propTypes = {
  children: PropTypes.node,
  image: PropTypes.string,
  title: PropTypes.string,
};

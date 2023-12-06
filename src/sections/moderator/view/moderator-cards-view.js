'use client';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { _moderatorCards } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ModeratorCardList from '../moderator-card-list';

// ----------------------------------------------------------------------

export default function ModeratorCardsView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Moderator Cards"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Moderator', href: paths.dashboard.moderator.root },
          { name: 'Cards' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.moderator.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Moderator
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ModeratorCardList moderators={_moderatorCards} />
    </Container>
  );
}

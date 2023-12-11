'use client';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { _eventsCards } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import EventsCardList from '../events-card-list';

// ----------------------------------------------------------------------

export default function EventsCardsView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Events"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Events' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <EventsCardList events={_eventsCards} />
    </Container>
  );
}

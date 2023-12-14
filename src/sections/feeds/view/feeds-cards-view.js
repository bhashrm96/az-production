'use client';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { _feedsCards } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import FeedsCardList from '../feeds-card-list';

// ----------------------------------------------------------------------

export default function FeedsCardsView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Feeds"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Feeds' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <FeedsCardList feeds={_feedsCards} />
    </Container>
  );
}

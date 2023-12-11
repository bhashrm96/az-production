'use client';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { _classifiedCards } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ClassifiedCardList from '../classified-card-list';

// ----------------------------------------------------------------------

export default function ClassifiedCardsView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Classified"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Classified' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ClassifiedCardList classified={_classifiedCards} />
    </Container>
  );
}

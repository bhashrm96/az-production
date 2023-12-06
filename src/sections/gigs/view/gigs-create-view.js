'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import GigsNewEditForm from '../gigs-new-edit-form';

// ----------------------------------------------------------------------

export default function GigsCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new gigs"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Gigs',
            href: paths.dashboard.gigs.root,
          },
          { name: 'New gigs' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <GigsNewEditForm />
    </Container>
  );
}

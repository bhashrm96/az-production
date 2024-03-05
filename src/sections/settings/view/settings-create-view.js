'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import SettingsNewEditForm from '../settings-new-edit-form';

// ----------------------------------------------------------------------

export default function SettingsCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new faq"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Settings',
          },
          { name: 'New FAQ' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <SettingsNewEditForm />
    </Container>
  );
}

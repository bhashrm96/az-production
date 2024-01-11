'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ModeratorNewEditForm from '../moderator-new-edit-form';

// ----------------------------------------------------------------------

export default function ModeratorCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new moderator"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Moderator',
            href: paths.dashboard.moderator.list,
          },
          { name: 'New moderator' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ModeratorNewEditForm />
    </Container>
  );
}

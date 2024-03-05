'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CommunityNewEditForm from '../community-new-edit-form';

// ----------------------------------------------------------------------

export default function CommunityCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new community"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Community',
            href: paths.dashboard.community.root,
          },
          { name: 'New community' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <CommunityNewEditForm />
    </Container>
  );
}

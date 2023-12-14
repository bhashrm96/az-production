'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import FeedsNewEditForm from '../feeds-new-edit-form';

// ----------------------------------------------------------------------

export default function FeedsCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new feeds"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Feeds',
            href: paths.dashboard.feeds.root,
          },
          { name: 'New feeds' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <FeedsNewEditForm />
    </Container>
  );
}

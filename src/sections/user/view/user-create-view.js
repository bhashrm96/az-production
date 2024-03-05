'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSearchParams } from 'next/navigation';
import UserNewEditForm from '../user-new-edit-form';

// ----------------------------------------------------------------------

export default function UserCreateView() {
  const settings = useSettingsContext();
  const searchParams = useSearchParams()

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new user"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: searchParams.get('role') === '1' ? 'Film Professionals' : 'Producers',
            href: searchParams.get('role') === '1' ? paths.dashboard.user.professionals : paths.dashboard.user.producers,
          },
          { name: 'New' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <UserNewEditForm />
    </Container>
  );
}

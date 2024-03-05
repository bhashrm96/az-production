'use client';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { _settingsCards } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import SettingsCardList from '../settings-card-list';

// ----------------------------------------------------------------------

export default function SettingsCardsView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Settings Cards"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Settings' },
        ]}
        // action={
        //   <Button
        //     component={RouterLink}
        //     href={paths.dashboard.settings.new}
        //     variant="contained"
        //     startIcon={<Iconify icon="mingcute:add-line" />}
        //   >
        //     New Settings
        //   </Button>
        // }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <SettingsCardList settingss={_settingsCards} />
    </Container>
  );
}

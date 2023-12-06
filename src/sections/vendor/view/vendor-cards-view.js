'use client';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { _vendorCards } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import VendorCardList from '../vendor-card-list';

// ----------------------------------------------------------------------

export default function VendorCardsView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Vendor Cards"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Vendor', href: paths.dashboard.vendor.root },
          { name: 'Cards' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.vendor.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Vendor
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <VendorCardList vendors={_vendorCards} />
    </Container>
  );
}

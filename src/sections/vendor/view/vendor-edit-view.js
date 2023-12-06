'use client';

import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _vendorList } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import VendorNewEditForm from '../vendor-new-edit-form';

// ----------------------------------------------------------------------

export default function VendorEditView({ id }) {
  const settings = useSettingsContext();

  const currentVendor = _vendorList.find((vendor) => vendor.id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Vendor',
            href: paths.dashboard.vendor.root,
          },
          { name: currentVendor?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <VendorNewEditForm currentVendor={currentVendor} />
    </Container>
  );
}

VendorEditView.propTypes = {
  id: PropTypes.string,
};

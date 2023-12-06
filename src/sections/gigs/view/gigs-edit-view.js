'use client';

import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _gigsList } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import GigsNewEditForm from '../gigs-new-edit-form';

// ----------------------------------------------------------------------

export default function GigsEditView({ id }) {
  const settings = useSettingsContext();

  const currentGigs = _gigsList.find((gigs) => gigs.id === id);

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
            name: 'Gigs',
            href: paths.dashboard.gigs.root,
          },
          { name: currentGigs?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <GigsNewEditForm currentGigs={currentGigs} />
    </Container>
  );
}

GigsEditView.propTypes = {
  id: PropTypes.string,
};

'use client';

import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _classifiedList } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ClassifiedNewEditForm from '../classified-new-edit-form';

// ----------------------------------------------------------------------

export default function ClassifiedEditView({ id }) {
  const settings = useSettingsContext();

  const currentClassified = _classifiedList.find((classified) => classified.id === id);

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
            name: 'Classified',
            href: paths.dashboard.classified.root,
          },
          { name: currentClassified?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ClassifiedNewEditForm currentClassified={currentClassified} />
    </Container>
  );
}

ClassifiedEditView.propTypes = {
  id: PropTypes.string,
};

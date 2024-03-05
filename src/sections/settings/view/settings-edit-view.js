'use client';

import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _settingsList } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import SettingsNewEditForm from '../settings-new-edit-form';

// ----------------------------------------------------------------------

export default function SettingsEditView({ id }) {
  const settings = useSettingsContext();

  const currentSettings = _settingsList.find((settings) => settings.id === id);

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
            name: 'Settings',
            href: paths.dashboard.settings.root,
          },
          { name: currentSettings?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <SettingsNewEditForm currentSettings={currentSettings} />
    </Container>
  );
}

SettingsEditView.propTypes = {
  id: PropTypes.string,
};

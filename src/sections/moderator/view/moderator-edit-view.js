'use client';

import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _moderatorList } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ModeratorNewEditForm from '../moderator-new-edit-form';

// ----------------------------------------------------------------------

export default function ModeratorEditView({ id }) {
  const settings = useSettingsContext();

  const currentModerator = _moderatorList.find((moderator) => moderator.id === id);

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
            name: 'Moderator',
            href: paths.dashboard.moderator.root,
          },
          { name: currentModerator?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ModeratorNewEditForm currentModerator={currentModerator} />
    </Container>
  );
}

ModeratorEditView.propTypes = {
  id: PropTypes.string,
};

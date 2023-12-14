'use client';

import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _feedsList } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import FeedsNewEditForm from '../feeds-new-edit-form';

// ----------------------------------------------------------------------

export default function FeedsEditView({ id }) {
  const settings = useSettingsContext();

  const currentFeeds = _feedsList.find((feeds) => feeds.id === id);

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
            name: 'Feeds',
            href: paths.dashboard.feeds.root,
          },
          { name: currentFeeds?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <FeedsNewEditForm currentFeeds={currentFeeds} />
    </Container>
  );
}

FeedsEditView.propTypes = {
  id: PropTypes.string,
};

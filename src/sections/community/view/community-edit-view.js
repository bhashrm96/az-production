'use client';

import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _communityList } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CommunityNewEditForm from '../community-new-edit-form';

// ----------------------------------------------------------------------

export default function CommunityEditView({ id }) {
  const settings = useSettingsContext();

  const currentCommunity = _communityList.find((community) => community.id === id);

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
            name: 'Community',
            href: paths.dashboard.community.root,
          },
          { name: currentCommunity?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <CommunityNewEditForm currentCommunity={currentCommunity} />
    </Container>
  );
}

CommunityEditView.propTypes = {
  id: PropTypes.string,
};

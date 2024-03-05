'use client';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { _communityCards } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CommunityCardList from '../community-card-list';

// ----------------------------------------------------------------------

export default function CommunityCardsView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Community Cards"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Community' },
        ]}
        // action={
        //   <Button
        //     component={RouterLink}
        //     href={paths.dashboard.community.new}
        //     variant="contained"
        //     startIcon={<Iconify icon="mingcute:add-line" />}
        //   >
        //     New Community
        //   </Button>
        // }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CommunityCardList communitys={_communityCards} />
    </Container>
  );
}

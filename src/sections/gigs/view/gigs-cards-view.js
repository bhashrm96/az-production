'use client';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { _gigsCards } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import GigsCardList from '../gigs-card-list';

// ----------------------------------------------------------------------

export default function GigsCardsView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Gigs Cards"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Gigs' },
        ]}
        // action={
        //   <Button
        //     component={RouterLink}
        //     href={paths.dashboard.gigs.new}
        //     variant="contained"
        //     startIcon={<Iconify icon="mingcute:add-line" />}
        //   >
        //     New Gigs
        //   </Button>
        // }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <GigsCardList gigss={_gigsCards} />
    </Container>
  );
}

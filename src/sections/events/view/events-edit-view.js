'use client';

import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _eventsList } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import EventsNewEditForm from '../events-new-edit-form';

// ----------------------------------------------------------------------

export default function EventsEditView({ id }) {
  const settings = useSettingsContext();

  const currentEvents = _eventsList.find((events) => events.id === id);

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
            name: 'Events',
            href: paths.dashboard.events.root,
          },
          { name: currentEvents?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <EventsNewEditForm currentEvents={currentEvents} />
    </Container>
  );
}

EventsEditView.propTypes = {
  id: PropTypes.string,
};

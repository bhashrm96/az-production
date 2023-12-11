'use client';

import { useState, useCallback, useEffect } from 'react';

import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Tabs, { tabsClasses } from '@mui/material/Tabs';

import { paths } from 'src/routes/paths';
import axios from 'axios';

import { useMockedEvents } from 'src/hooks/use-mocked-events';

import { _eventsAbout, _eventsFeeds, _eventsFriends, _eventsGallery, _eventsFollowers } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProfileHome from '../profile-home';
import ProfileCover from '../profile-cover';
import ProfileFriends from '../profile-friends';
import ProfileGallery from '../profile-gallery';
import ProfileFollowers from '../profile-followers';

export default function EventsProfileView({ id }) {
  const [data, setData] = useState({})
  useEffect(() => {
    axios.get("https://dev-azproduction-api.flynautstaging.com/events/view_all_events", {
      headers: {
        Authorization: sessionStorage.getItem('accessToken')
      }
    }).then((res) => {

      setData(res.data.data[id]);
    })
  }, [])
  const settings = useSettingsContext();

  const { events } = useMockedEvents();

  const [searchFriends, setSearchFriends] = useState('');

  const [currentTab, setCurrentTab] = useState('profile');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const handleSearchFriends = useCallback((event) => {
    setSearchFriends(event.target.value);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Profile"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Events', href: paths.dashboard.events.cards },
          { name: data.event_title },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card
        sx={{
          mb: 3,
          height: 290,
        }}
      >
        <ProfileCover
          role={data.event_date ? data.event_date.slice(0, 10) : ''}
          name={data.event_title}
          avatarUrl={events?.photoURL}
          coverUrl={data.images}
        />
      </Card>

      <ProfileHome info={data} posts={_eventsFeeds} />
    </Container>
  );
}

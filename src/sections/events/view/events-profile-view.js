'use client';

<<<<<<< HEAD
import { useState, useCallback, useEffect } from 'react';
=======
import { useState, useCallback } from 'react';
>>>>>>> 3158989336036a9443c48a8277182b1baf2e5a3a

import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Tabs, { tabsClasses } from '@mui/material/Tabs';

import { paths } from 'src/routes/paths';
<<<<<<< HEAD
import axios from 'axios';
=======
>>>>>>> 3158989336036a9443c48a8277182b1baf2e5a3a

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

<<<<<<< HEAD
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
=======
// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'profile',
    label: 'Profile',
    icon: <Iconify icon="solar:events-id-bold" width={24} />,
  },
  {
    value: 'followers',
    label: 'Followers',
    icon: <Iconify icon="solar:heart-bold" width={24} />,
  },
  {
    value: 'friends',
    label: 'Friends',
    icon: <Iconify icon="solar:events-group-rounded-bold" width={24} />,
  },
  {
    value: 'gallery',
    label: 'Gallery',
    icon: <Iconify icon="solar:gallery-wide-bold" width={24} />,
  },
];

// ----------------------------------------------------------------------

export default function EventsProfileView() {
>>>>>>> 3158989336036a9443c48a8277182b1baf2e5a3a
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
<<<<<<< HEAD
          { name: 'Events', href: paths.dashboard.events.cards },
          { name: data.event_title },
=======
          { name: 'Events', href: paths.dashboard.events.root },
          { name: events?.displayName },
>>>>>>> 3158989336036a9443c48a8277182b1baf2e5a3a
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
<<<<<<< HEAD
          role={data.event_date ? data.event_date.slice(0, 10) : ''}
          name={data.event_title}
          avatarUrl={events?.photoURL}
          coverUrl={data.images}
        />
      </Card>

      <ProfileHome info={data} posts={_eventsFeeds} />
=======
          role={_eventsAbout.role}
          name={events?.displayName}
          avatarUrl={events?.photoURL}
          coverUrl={_eventsAbout.coverUrl}
        />

        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            width: 1,
            bottom: 0,
            zIndex: 9,
            position: 'absolute',
            bgcolor: 'background.paper',
            [`& .${tabsClasses.flexContainer}`]: {
              pr: { md: 3 },
              justifyContent: {
                sm: 'center',
                md: 'flex-end',
              },
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
          ))}
        </Tabs>
      </Card>

      {currentTab === 'profile' && <ProfileHome info={_eventsAbout} posts={_eventsFeeds} />}

      {currentTab === 'followers' && <ProfileFollowers followers={_eventsFollowers} />}

      {currentTab === 'friends' && (
        <ProfileFriends
          friends={_eventsFriends}
          searchFriends={searchFriends}
          onSearchFriends={handleSearchFriends}
        />
      )}

      {currentTab === 'gallery' && <ProfileGallery gallery={_eventsGallery} />}
>>>>>>> 3158989336036a9443c48a8277182b1baf2e5a3a
    </Container>
  );
}

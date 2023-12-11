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

import { useMockedClassified } from 'src/hooks/use-mocked-classified';

import { _classifiedAbout, _classifiedFeeds, _classifiedFriends, _classifiedGallery, _classifiedFollowers } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProfileHome from '../profile-home';
import ProfileCover from '../profile-cover';
import ProfileFriends from '../profile-friends';
import ProfileGallery from '../profile-gallery';
import ProfileFollowers from '../profile-followers';

<<<<<<< HEAD
export default function ClassifiedProfileView({ id }) {
  const [data, setData] = useState({})
  useEffect(() => {
    axios.get("https://dev-azproduction-api.flynautstaging.com/classified/get_All_classified", {
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
    icon: <Iconify icon="solar:classified-id-bold" width={24} />,
  },
  {
    value: 'followers',
    label: 'Followers',
    icon: <Iconify icon="solar:heart-bold" width={24} />,
  },
  {
    value: 'friends',
    label: 'Friends',
    icon: <Iconify icon="solar:classified-group-rounded-bold" width={24} />,
  },
  {
    value: 'gallery',
    label: 'Gallery',
    icon: <Iconify icon="solar:gallery-wide-bold" width={24} />,
  },
];

// ----------------------------------------------------------------------

export default function ClassifiedProfileView() {
>>>>>>> 3158989336036a9443c48a8277182b1baf2e5a3a
  const settings = useSettingsContext();

  const { classified } = useMockedClassified();

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
          { name: 'Classified', href: paths.dashboard.classified.cards },
          { name: data.ad_title },
=======
          { name: 'Classified', href: paths.dashboard.classified.root },
          { name: classified?.displayName },
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
          // role={_classifiedAbout.role}
          name={data.ad_title}
          coverUrl={data.image_url}
        />
      </Card>

      <ProfileHome info={data} posts={_classifiedFeeds} />
=======
          role={_classifiedAbout.role}
          name={classified?.displayName}
          avatarUrl={classified?.photoURL}
          coverUrl={_classifiedAbout.coverUrl}
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

      {currentTab === 'profile' && <ProfileHome info={_classifiedAbout} posts={_classifiedFeeds} />}

      {currentTab === 'followers' && <ProfileFollowers followers={_classifiedFollowers} />}

      {currentTab === 'friends' && (
        <ProfileFriends
          friends={_classifiedFriends}
          searchFriends={searchFriends}
          onSearchFriends={handleSearchFriends}
        />
      )}

      {currentTab === 'gallery' && <ProfileGallery gallery={_classifiedGallery} />}
>>>>>>> 3158989336036a9443c48a8277182b1baf2e5a3a
    </Container>
  );
}

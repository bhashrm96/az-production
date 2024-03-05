'use client';

import { useState, useCallback, useEffect } from 'react';

import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Tabs, { tabsClasses } from '@mui/material/Tabs';

import { paths } from 'src/routes/paths';
import axios from 'axios';

import { useMockedSettings } from 'src/hooks/use-mocked-settings';

import { _settingsAbout, _settingsFeeds, _settingsFriends, _settingsGallery, _settingsFollowers } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProfileHome from '../profile-home';
import ProfileCover from '../profile-cover';
import ProfileFriends from '../profile-friends';
import ProfileGallery from '../profile-gallery';
import ProfileFollowers from '../profile-followers';

export default function SettingsProfileView() {
  const [data, setData] = useState({})
  const [posts, setPosts] = useState([])
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    axios.get(`https://dev-azproduction-api.flynautstaging.com/admin/admin-profile/${JSON.parse(localStorage.getItem('user')).id}`, {
      headers: {
        Authorization: sessionStorage.getItem('accessToken')
      }
    }).then((res) => {
      setData(res.data.data);
    })
  }, [isUpdate])

  const settings = useSettingsContext();

  const { setting } = useMockedSettings();

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
          { name: 'Settings' },
          { name: "Profile" },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card
        sx={{
          mb: 3,
          height: 175,
        }}
      >
        <ProfileCover
          name={data?.name}
          members={data?.email}
          avatarUrl={data?.icon_image}
          coverUrl={data?.cover_image}
        />
      </Card>

      <ProfileHome id={JSON.parse(localStorage.getItem('user')).id} setIsUpdate={setIsUpdate} info={data} posts={posts} />
    </Container>
  );
}

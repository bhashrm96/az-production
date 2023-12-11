'use client';

import { useState, useCallback, useEffect } from 'react';

import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Tabs, { tabsClasses } from '@mui/material/Tabs';

import { paths } from 'src/routes/paths';
import axios from 'axios';

import { useMockedGigs } from 'src/hooks/use-mocked-gigs';

import { _gigsAbout, _gigsFeeds, _gigsFriends, _gigsGallery, _gigsFollowers } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProfileHome from '../profile-home';
import ProfileCover from '../profile-cover';
import ProfileFriends from '../profile-friends';
import ProfileGallery from '../profile-gallery';
import ProfileFollowers from '../profile-followers';

export default function GigsProfileView({ id }) {
  const [data, setData] = useState({})
  useEffect(() => {
    axios.get("https://dev-azproduction-api.flynautstaging.com/gigs/view_all_gigs", {
      headers: {
        Authorization: sessionStorage.getItem('accessToken')
      }
    }).then((res) => {

      setData(res.data.data[id]);
    })
  }, [])
  const settings = useSettingsContext();

  const { gigs } = useMockedGigs();

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
          { name: 'Gigs', href: paths.dashboard.gigs.cards },
          { name: data.gigs_title },
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
          // role={_gigsAbout.role}
          name={data.gigs_title}
          avatarUrl={gigs?.photoURL}
          coverUrl={data.image}
        />
      </Card>

      <ProfileHome info={data} posts={_gigsFeeds} />
    </Container>
  );
}

'use client';

import { useState, useCallback, useEffect } from 'react';

import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Tabs, { tabsClasses } from '@mui/material/Tabs';

import { paths } from 'src/routes/paths';
import axios from 'axios';

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
          { name: 'Classified', href: paths.dashboard.classified.cards },
          { name: data.ad_title },
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
          // role={_classifiedAbout.role}
          name={data.ad_title}
          coverUrl={data.image_url}
        />
      </Card>

      <ProfileHome info={data} posts={_classifiedFeeds} />
    </Container>
  );
}

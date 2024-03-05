'use client';

import { useState, useCallback, useEffect } from 'react';

import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Tabs, { tabsClasses } from '@mui/material/Tabs';

import { paths } from 'src/routes/paths';
import axios from 'axios';

import { useMockedCommunity } from 'src/hooks/use-mocked-community';

import { _communityAbout, _communityFeeds, _communityFriends, _communityGallery, _communityFollowers } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProfileHome from '../profile-home';
import ProfileCover from '../profile-cover';
import ProfileFriends from '../profile-friends';
import ProfileGallery from '../profile-gallery';
import ProfileFollowers from '../profile-followers';

export default function CommunityProfileView({ id }) {
  const [data, setData] = useState({})
  const [posts, setPosts] = useState([])
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    axios.get(`https://dev-azproduction-api.flynautstaging.com/community/community-details/${id}`, {
      headers: {
        Authorization: sessionStorage.getItem('accessToken')
      }
    }).then((res) => {
      setData(res.data.data);
    })

    axios.get(`https://dev-azproduction-api.flynautstaging.com/community/get-community-posts/${id}`, {
      headers: {
        Authorization: sessionStorage.getItem('accessToken')
      }
    }).then((res) => {
      setPosts(res.data.data);
    })
  }, [isUpdate])
  const settings = useSettingsContext();

  const { community } = useMockedCommunity();

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
          { name: 'Community', href: paths.dashboard.community.cards },
          { name: data.community_name },
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
          name={data.community_name}
          members={data.memberCount}
          avatarUrl={data.icon_image}
          coverUrl={data.cover_image}
        />
      </Card>

      <ProfileHome setIsUpdate={setIsUpdate} info={data} posts={posts} />
    </Container>
  );
}

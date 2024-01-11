'use client';

import { useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Tabs, { tabsClasses } from '@mui/material/Tabs';

import { paths } from 'src/routes/paths';

import { useMockedVendor } from 'src/hooks/use-mocked-vendor';

import { _vendorAbout, _vendorFeeds, _vendorFriends, _vendorGallery, _vendorFollowers } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProfileHome from '../profile-home';
import ProfileCover from '../profile-cover';
import ProfileFriends from '../profile-friends';
import ProfileGallery from '../profile-gallery';
import ProfileFollowers from '../profile-followers';
import ProfileMembers from '../profile-members';
import axios from 'axios';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'home',
    label: 'Home',
    icon: <Iconify icon="solar:vendor-id-bold" width={24} />,
  },
  {
    value: 'productServices',
    label: 'Products and Services'
  },
  {
    value: 'portfolio',
    label: 'Portfolio',
    icon: <Iconify icon="solar:vendors-group-rounded-bold" width={24} />,
  },
  {
    value: 'members',
    label: 'Members',
  },
];

// ----------------------------------------------------------------------

export default function VendorProfileView({ id }) {
  const settings = useSettingsContext();

  const { vendor } = useMockedVendor();

  const [vendorData, setVendorData] = useState()

  const [searchFriends, setSearchFriends] = useState('');

  const [currentTab, setCurrentTab] = useState('home');

  const [products, setProducts] = useState([])

  useEffect(() => {
    if (vendorData) {
      let products = []
      if (vendorData.products.length > 3) {
        vendorData.products.forEach((x, index) => {
          if (index < 2) {
            products.push(x)
          }
        })
      } else {
        vendorData.products.forEach((x, index) => {
          products.push(x)
        })
        vendorData.services.forEach((x, index) => {
          if (products.length < 3) {
            products.push(x)
          }
        })
      }
      setProducts(products)
    }
  }, [vendorData])

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, [vendorData]);

  const handleSearchFriends = useCallback((event) => {
    setSearchFriends(event.target.value);
  }, []);

  useEffect(() => {
    const getData = async () => {
      await axios.get(`https://dev-azproduction-api.flynautstaging.com/auth/vendors/${id}`).then((res) => {
        setVendorData(res.data.data);
        console.log(res.data.data);
      })
    }

    getData()
  }, [])

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Vendor Details"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Vendors', href: paths.dashboard.vendor.list },
          { name: vendor?.displayName },
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
          name={vendorData?.vendorDetails.business_name}
          avatarUrl={vendor?.photoURL}
          coverUrl={_vendorAbout.coverUrl}
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

      {(currentTab === 'home' && vendorData) && <ProfileHome info={_vendorAbout} vendorData={vendorData.vendorDetails} posts={_vendorFeeds}
        productServices={products} members={vendorData.staff}
      />}

      {currentTab === 'productServices' && <ProfileFollowers data={{ products: vendorData.products, services: vendorData.services }} followers={_vendorFollowers} />}

      {currentTab === 'portfolio' && <ProfileGallery data={vendorData.portfolio} gallery={_vendorGallery} />}

      {currentTab === 'members' && <ProfileMembers data={vendorData.staff} followers={_vendorFollowers} />}
    </Container>
  );
}

'use client';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import { SeoIllustration } from 'src/assets/illustrations';
import { _appAuthors, _appRelated, _appFeatured, _appInvoices, _appInstalled } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';

import AppWidget from '../app-widget';
import AppWelcome from '../app-welcome';
import AppFeatured from '../app-featured';
import AppNewInvoice from '../app-new-invoice';
import AppTopAuthors from '../app-top-authors';
import AppTopRelated from '../app-top-related';
import AppAreaInstalled from '../app-area-installed';
import AppWidgetSummary from '../app-widget-summary';
import AppCurrentDownload from '../app-current-download';
import AppTopInstalledCountries from '../app-top-installed-countries';
import { CardHeader } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const { user } = useMockedUser();

  const theme = useTheme();

  const settings = useSettingsContext();

  const [data, setData] = useState({});

  useEffect(() => {
    axios.get('https://dev-azproduction-api.flynautstaging.com/admin/dashboard-data').then((res) => {
      setData(res.data.data);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>

        <Grid xs={12} md={12}>
          <AppWelcome
            title={`Welcome back 👋 \n ${JSON.parse(localStorage.getItem("user")).moderator ? JSON.parse(localStorage.getItem("user")).moderator.firstname : JSON.parse(localStorage.getItem("user")).name}`}
          />
        </Grid>

        <Grid xs={12}>
          <CardHeader title="User Management" />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Users"
            total={data?.users}
            chart={{
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Vendors"
            total={data?.vendors}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Moderators"
            total={data?.moderators}
            chart={{
              colors: [theme.palette.warning.light, theme.palette.warning.main],
            }}
          />
        </Grid>

        <Grid xs={12}>
          <CardHeader title="App Management" />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Gigs"
            total={data?.gigs}
            chart={{
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Events"
            total={data?.events}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Classified"
            total={data?.classifieds}
            chart={{
              colors: [theme.palette.warning.light, theme.palette.warning.main],
            }}
          />
        </Grid>

        <Grid xs={12} md={6}>
          <AppWidgetSummary
            title="Total Communities"
            total={data?.communities}
            chart={{
            }}
          />
        </Grid>

        <Grid xs={12} md={6}>
          <AppWidgetSummary
            title="Total Feeds"
            total={data?.feeds}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
            }}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={4}>
          <AppCurrentDownload
            title="Current Download"
            chart={{
              series: [
                { label: 'Mac', value: 12244 },
                { label: 'Window', value: 53345 },
                { label: 'iOS', value: 44313 },
                { label: 'Android', value: 78343 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppAreaInstalled
            title="Area Installed"
            subheader="(+43%) than last year"
            chart={{
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              series: [
                {
                  year: '2019',
                  data: [
                    {
                      name: 'Asia',
                      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
                    },
                    {
                      name: 'America',
                      data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
                    },
                  ],
                },
                {
                  year: '2020',
                  data: [
                    {
                      name: 'Asia',
                      data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
                    },
                    {
                      name: 'America',
                      data: [56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77],
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} lg={8}>
          <AppNewInvoice
            title="New Invoice"
            tableData={_appInvoices}
            tableLabels={[
              { id: 'id', label: 'Invoice ID' },
              { id: 'category', label: 'Category' },
              { id: 'price', label: 'Price' },
              { id: 'status', label: 'Status' },
              { id: '' },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTopRelated title="Top Related Applications" list={_appRelated} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTopInstalledCountries title="Top Installed Countries" list={_appInstalled} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTopAuthors title="Top Authors" list={_appAuthors} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <Stack spacing={3}>
            <AppWidget
              title="Conversion"
              total={38566}
              icon="solar:user-rounded-bold"
              chart={{
                series: 48,
              }}
            />

            <AppWidget
              title="Applications"
              total={55566}
              icon="fluent:mail-24-filled"
              color="info"
              chart={{
                series: 75,
              }}
            />
          </Stack>
        </Grid> */}
      </Grid>
    </Container>
  );
}

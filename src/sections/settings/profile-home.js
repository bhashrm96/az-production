'use client';

import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogTitle, DialogContent, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import { IconButton } from '@mui/material';
import { paths } from 'src/routes/paths';
import { _socials } from 'src/_mock';

import Iconify from 'src/components/iconify';

import ProfilePostItem from './profile-post-item';
import { useRouter } from 'src/routes/hooks';
import axios from 'axios';

import SettingsQuickEditForm from './settings-quick-edit-form';

// ----------------------------------------------------------------------

export default function ProfileHome({ info, posts, setIsUpdate, id }) {
  const router = useRouter();
  const fileRef = useRef(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteSettings = async () => {
    await axios.delete(`https://dev-azproduction-api.flynautstaging.com/admin/delete-settings/${info.id}`, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken")
      }
    })
    setLoading(true);
    router.push(paths.dashboard.settings.cards);
  };

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const renderAbout = (
    <Card>
      <Stack spacing={2} sx={{ p: 3 }}>

        <Stack spacing={2} sx={{ px: 3, py: 1 }}>
          <Button onClick={handleOpenDeleteModal} sx={{ typography: 'body2' }}>
            Change Password
          </Button>
        </Stack>

      </Stack>
    </Card >
  );

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={12}>
        <SettingsQuickEditForm id={id} currentProfile={info} open={isDeleteModalOpen} onClose={handleCloseDeleteModal} />
        <Stack spacing={3}>
          {renderAbout}
        </Stack>
      </Grid>
      {/* <Grid xs={12} md={12}>
        <Stack spacing={3}>
          {posts.map((post) => (
            <ProfilePostItem setIsUpdate={setIsUpdate} key={post.id} post={post} />
          ))}
        </Stack>
      </Grid> */}
    </Grid>
  );
}

ProfileHome.propTypes = {
  info: PropTypes.object,
  posts: PropTypes.array,
};

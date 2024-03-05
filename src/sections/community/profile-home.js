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

// ----------------------------------------------------------------------

export default function ProfileHome({ info, posts, setIsUpdate }) {
  const router = useRouter();
  const fileRef = useRef(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteCommunity = async () => {
    await axios.delete(`https://dev-azproduction-api.flynautstaging.com/admin/delete-community/${info.id}`, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken")
      }
    })
    setLoading(true);
    router.push(paths.dashboard.community.cards);
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

        <CardHeader title="About" />

        <Stack spacing={2} sx={{ px: 3, py: 1 }}>
          <Box sx={{ typography: 'body2' }}>
            {info.community_description}
          </Box>
        </Stack>

        <IconButton onClick={handleOpenDeleteModal}>
          <Iconify color='red' icon="iconamoon:trash-bold" />
          <Typography
            variant="body2"
            sx={{
              ml: 0.5
            }}
          >
            Delete Community
          </Typography>
        </IconButton>

      </Stack>


    </Card >
  );

  return (
    <Grid container spacing={3}>
      <Dialog
        fullWidth
        maxWidth={false}
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}
      >
        <DialogTitle>Delete community</DialogTitle>

        <DialogContent>
          Do you really want to delete this community?
        </DialogContent>

        <DialogActions>
          <Button disabled={loading} variant="contained" onClick={handleDeleteCommunity}>
            Yes
          </Button>
          <Button variant="outlined" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>

        </DialogActions>
      </Dialog>
      <Grid xs={12} md={12}>
        <Stack spacing={3}>
          {renderAbout}
        </Stack>
      </Grid>
      <Grid xs={12} md={12}>
        <Stack spacing={3}>
          {posts.map((post) => (
            <ProfilePostItem setIsUpdate={setIsUpdate} key={post.id} post={post} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}

ProfileHome.propTypes = {
  info: PropTypes.object,
  posts: PropTypes.array,
};

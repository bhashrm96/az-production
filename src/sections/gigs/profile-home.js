'use client';

import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';

import { fNumber } from 'src/utils/format-number';

import { _socials } from 'src/_mock';

import Iconify from 'src/components/iconify';

import ProfilePostItem from './profile-post-item';

import GigsQuickEditForm from './gigs-quick-edit-form';
import GigsQuickDeleteForm from './gigs-quick-delete-form';

// ----------------------------------------------------------------------

export default function ProfileHome({ info, posts, setIsUpdate }) {
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const fileRef = useRef(null);

  const handleAttach = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleOpenEditModal = () => {
    setIsEdit(true);
  }

  const handleCloseEditModal = () => {
    setIsEdit(false);
  }

  const handleOpenDeleteModal = () => {
    setIsDelete(true);
  }

  const handleCloseDeleteModal = () => {
    setIsDelete(false);
  }

  const renderAbout = (
    <Card>
      <Stack spacing={2} sx={{ p: 3 }}>
        <div style={{
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'end'
        }}>
          <div
            onClick={handleOpenEditModal}
          >

            <Iconify
              width={24}
              icon="solar:pen-bold"
            />

          </div>
          <div
            style={{
              marginLeft: '1rem'
            }}
            onClick={handleOpenDeleteModal}
          >

            <Iconify
              width={24}
              color="red"
              icon="solar:trash-bin-trash-bold"
            />

          </div>
        </div>
        <Stack direction="row" spacing={2}>
          <Box sx={{ typography: 'body2' }}>
            {`Category: `}
            {info.gigs_category_name}
          </Box>
        </Stack>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Box sx={{ typography: 'body2' }}>
            {`Rate: $`}
            {info.rate}
            {`/hr`}
          </Box>
        </Stack>


        <Stack direction="row" spacing={2}>
          <Box sx={{ typography: 'body2' }}>
            {`Expertise: `}
            {info.expertise}
          </Box>
        </Stack>
      </Stack>

      <CardHeader title="Posted By" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" spacing={2}>
          <Box sx={{ typography: 'body2' }}>
            {info.first_name} {info.last_name}
          </Box>
        </Stack>

      </Stack>


    </Card>
  );

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={12}>
        <Stack spacing={3}>
          <GigsQuickEditForm setIsUpdate={setIsUpdate} currentGigs={info} open={isEdit} onClose={handleCloseEditModal} />
          <GigsQuickDeleteForm setIsUpdate={setIsUpdate} currentGigs={info} open={isDelete} onClose={handleCloseDeleteModal} />

          {renderAbout}
        </Stack>
      </Grid>
    </Grid>
  );
}

ProfileHome.propTypes = {
  info: PropTypes.object,
  posts: PropTypes.array,
};

import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { countries } from 'src/assets/data';
import { USER_STATUS_OPTIONS } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import axios from 'axios';
import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function EventsQuickEditForm({ currentEvents, open, onClose, setIsUpdate }) {
  const { enqueueSnackbar } = useSnackbar();

  const [permissions, setPermissions] = useState([]);

  console.log(currentEvents);

  const handleAddPermission = () => {
    const newPermission = { page_id: '', permission_id: '' };
    setPermissions([...permissions, newPermission]);
  };

  const handleDeletePermission = (index) => {
    const updatedPermissions = permissions.filter((_, i) => i !== index);
    setPermissions(updatedPermissions);
  };

  const onPageChange = (value, index) => {
    console.log(index);
    const updatedPermissions = [...permissions];
    updatedPermissions[index].page_id = value.target.value;
    console.log(updatedPermissions);
    setPermissions(updatedPermissions);
  };

  const onPermissionChange = (value, index) => {
    const updatedPermissions = [...permissions];
    updatedPermissions[index].permission_id = value.target.value;
    console.log(updatedPermissions);
    setPermissions(updatedPermissions);
  };

  const NewEventsSchema = Yup.object().shape({
    end_time: Yup.string().required('End time is required'),
    event_title: Yup.string().required('Event title is required'),
    event_description: Yup.string().required('Event description is required'),
    start_time: Yup.string().required('Sttart time is required'),
    event_date: Yup.string().required('Event date is required')
  });

  const methods = useForm({
    resolver: yupResolver(NewEventsSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset({
      end_time: currentEvents?.end_time || '',
      event_title: currentEvents?.event_title || '',
      event_description: currentEvents?.event_description || '',
      start_time: currentEvents?.start_time || '',
      event_date: currentEvents?.event_date || ''
    });

  }, [reset, currentEvents]);

  const onSubmit = handleSubmit(async (data) => {
    let body = {
      id: currentEvents.id,
      ...data
    }

    try {
      axios.put("https://dev-azproduction-api.flynautstaging.com/admin/update_event", body, {
        headers: {
          Authorization: sessionStorage.getItem("accessToken")
        }
      }).then((res) => {
        setIsUpdate(pValue => { return !pValue });
        onClose();
      })
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Quick Update</DialogTitle>

        <DialogContent>

          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
            sx={{ mt: 2 }}
          >

            <RHFTextField name="event_title" label="Event Title" />
            <RHFTextField name="event_date" label="Event Date" />
            <RHFTextField name="start_time" label="Start Time" />
            <RHFTextField name="end_time" label="End Time" />
            <RHFTextField name="event_description" label="Event Description" />

            {/* <RHFAutocomplete
              name="country"
              label="Country"
              options={countries.map((country) => country.label)}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => {
                const { code, label, phone } = countries.filter(
                  (country) => country.label === option
                )[0];

                if (!label) {
                  return null;
                }

                return (
                  <li {...props} key={label}>
                    <Iconify
                      key={label}
                      icon={`circle-flags:${code.toLowerCase()}`}
                      width={28}
                      sx={{ mr: 1 }}
                    />
                    {label} ({code}) +{phone}
                  </li>
                );
              }}
            />

            <RHFTextField name="state" label="State/Region" />
            <RHFTextField name="city" label="City" />
            <RHFTextField name="address" label="Address" />
            <RHFTextField name="zipCode" label="Zip/Code" />
            <RHFTextField name="company" label="Company" />
            <RHFTextField name="role" label="Role" /> */}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Update
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

EventsQuickEditForm.propTypes = {
  currentEvents: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

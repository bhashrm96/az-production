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
import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function ModeratorQuickEditForm({ currentModerator, open, onClose, setIsUpdate }) {
  const { enqueueSnackbar } = useSnackbar();

  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (open) {
      axios.get(`https://dev-azproduction-api.flynautstaging.com/admin/moderators/${currentModerator.id}/permissions`).then(res => {
        setPermissions(res.data.permissions);
      })
    }
  }, [open])

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

  const NewModeratorSchema = Yup.object().shape({
    firstname: Yup.string().required('First name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phone: Yup.string().required('Phone number is required'),
    lastname: Yup.string().required('Last name is required')
  });

  const defaultValues = useMemo(
    () => ({
      firstname: currentModerator?.firstname || '',
      email: currentModerator?.email || '',
      phone: currentModerator?.phone || '',
      lastname: currentModerator?.lastname || ''
    }),
    [currentModerator]
  );

  const methods = useForm({
    resolver: yupResolver(NewModeratorSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const body = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone
      }

      const response = await axios.put(`https://dev-azproduction-api.flynautstaging.com/admin/moderators/${currentModerator.id}`, body);
      if (response.status === 200) {
        const permissionsData = {
          permissions
        };
        await axios.put(`https://dev-azproduction-api.flynautstaging.com/admin/moderators/${currentModerator.id}/permissions`, permissionsData).then(() => {
          onClose();
          enqueueSnackbar('Updated successfully')
          setIsUpdate(pValue => !pValue)
        })
      }
    } catch (error) {
      console.log("error", error);
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
            sx={{
              mt: 3
            }}
          >

            <RHFTextField name="firstname" label="First Name" />
            <RHFTextField name="lastname" label="Last Name" />
            <RHFTextField name="email" label="Email Address" />
            <RHFTextField name="phone" label="Phone Number" />
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

          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(3, 1fr)',
            }}
            sx={permissions.length > 0 ? { mt: 2 } : { mt: 0 }}
          >
            {permissions.map((permission, index) => (
              <>
                <RHFSelect
                  onChange={onPageChange}
                  index={index}
                  name="page"
                  defaultValue={permission.page_id}
                  native={false}
                >
                  <MenuItem disabled={permissions.some(obj => obj.page_id === 1)} value={1}>Users</MenuItem>
                  <MenuItem disabled={permissions.some(obj => obj.page_id === 2)} value={2}>Vendors</MenuItem>
                  <MenuItem disabled={permissions.some(obj => obj.page_id === 3)} value={3}>Gigs</MenuItem>
                  <MenuItem disabled={permissions.some(obj => obj.page_id === 5)} value={5}>Events</MenuItem>
                  <MenuItem disabled={permissions.some(obj => obj.page_id === 6)} value={6}>Classified</MenuItem>
                </RHFSelect>
                <RHFSelect
                  onChange={onPermissionChange}
                  name="permission"
                  defaultValue={permission.permission_id}
                  index={index}
                  native={false}
                >
                  <MenuItem value={1}>Read Only</MenuItem>
                  <MenuItem value={2}>Full Access</MenuItem>
                  <MenuItem value={3}>Deny</MenuItem>
                </RHFSelect>
                <Button onClick={() => handleDeletePermission(index)}>
                  Delete
                </Button>
              </>
            ))}
          </Box>
          <Button sx={{ mt: 2 }} onClick={handleAddPermission} variant="soft" color="success">
            Add Permission
          </Button>
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

ModeratorQuickEditForm.propTypes = {
  currentModerator: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

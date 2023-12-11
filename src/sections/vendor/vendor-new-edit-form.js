import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useMemo, useCallback, useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';

import { countries } from 'src/assets/data';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
  RHFSelect
} from 'src/components/hook-form';

import axios from 'axios';

// ----------------------------------------------------------------------

export default function VendorNewEditForm({ currentVendor }) {
  const router = useRouter();

  const [permissions, setPermissions] = useState([]);

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

  const { enqueueSnackbar } = useSnackbar();

  const NewVendorSchema = Yup.object().shape({
    firstname: Yup.string().required('First name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phone: Yup.string().required('Phone number is required'),
    lastname: Yup.string().required('Last name is required'),
    password: Yup.string().required().required('Password is required'),
  });

  const defaultValues = useMemo(
    () => ({
      firstname: '',
      email: '',
      phone: '',
      lastname: '',
      password: ''
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewVendorSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const body = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
        phone: data.phone
      }

      const response = await axios.post('https://dev-azproduction-api.flynautstaging.com/admin/moderators', body);
      if (response.status === 201) {
        const vendorId = response.data.vendorId;
        const permissionsData = {
          permissions,
        };
        const presponse = await axios.post(`https://dev-azproduction-api.flynautstaging.com/admin/vendors/${vendorId}/permissions`, permissionsData);
        console.log(presponse);
      }
      router.push(paths.dashboard.vendor.list);
    } catch (error) {
      console.log("error", error);
    }
  });

  // const handleDrop = useCallback(
  //   (acceptedFiles) => {
  //     const file = acceptedFiles[0];

  //     const newFile = Object.assign(file, {
  //       preview: URL.createObjectURL(file),
  //     });

  //     if (file) {
  //       setValue('avatarUrl', newFile, { shouldValidate: true });
  //     }
  //   },
  //   [setValue]
  // );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {/* <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {currentVendor && (
              <Label
                color={
                  (values.status === 'active' && 'success') ||
                  (values.status === 'banned' && 'error') ||
                  'warning'
                }
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

            {currentVendor && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== 'active'}
                        onChange={(event) =>
                          field.onChange(event.target.checked ? 'banned' : 'active')
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Banned
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}

            <RHFSwitch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email Verified
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Disabling this will automatically send the vendor a verification email
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />

            {currentVendor && (
              <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <Button variant="soft" color="error">
                  Delete Vendor
                </Button>
              </Stack>
            )}
          </Card>
        </Grid> */}

        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="firstname" label="First Name" />
              <RHFTextField name="lastname" label="Last Name" />
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField name="phone" label="Phone Number" />

              <RHFTextField name="password" label="Password" />
              <RHFTextField name="confirmPassword" label="Confirm Password" />

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
                    onChange={onRoleChange}
                    name="page"
                    defaultValue="Select Page"
                    native={false}
                  >
                    <MenuItem value="1">Users</MenuItem>
                    <MenuItem value="2">Vendors</MenuItem>
                    <MenuItem value="3">Gigs</MenuItem>
                    <MenuItem value="5">Events</MenuItem>
                    <MenuItem value="6">Classified</MenuItem>
                  </RHFSelect>
                  <RHFSelect
                    onChange={onPermissionChange}
                    name="permission"
                    defaultValue="Select Permission"
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
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentVendor ? 'Create Vendor' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

VendorNewEditForm.propTypes = {
  currentVendor: PropTypes.object,
};

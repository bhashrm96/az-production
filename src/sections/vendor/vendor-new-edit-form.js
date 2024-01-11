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

  const [gender, setGender] = useState([]);
  const [category, setCategory] = useState([]);

  const onRoleChange = (value, index) => {
    setGender(value.target.value);
  };

  const onCategoryChange = (value, index) => {
    setCategory(value.target.value);
  };

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

  const [categories, setCategories] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get('https://dev-azproduction-api.flynautstaging.com/auth/vendors-categories')
      console.log(response.data.data, 'rrrrrrrrrr');
      setCategories(response.data.data);
    }
    getCategories();
  }, [])

  const NewVendorSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phone_no: Yup.string().required('Phone number is required'),
    last_name: Yup.string().required('Last name is required'),
    fax_number: Yup.string().required('Fax number is required'),
    business_name: Yup.string().required('Business name is required'),
    business_website: Yup.string().required('Business website is required'),
    company_email: Yup.string().required('Company email is required'),
    company_phone_no: Yup.string().required('Company phone number is required'),
    about_company: Yup.string().required('Company description is required')
  });

  const defaultValues = useMemo(
    () => ({
      first_name: '',
      last_name: '',
      email: '',
      phone_no: '',
      business_name: '',
      business_website: '',
      company_email: '',
      company_phone_no: '',
      about_company: '',
      fax_number: ''
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
      let body = {
        ...data,
        category,
        gender
      }

      const response = await axios.post('https://dev-azproduction-api.flynautstaging.com/admin/create_vendors', body);
      if (response.status === 200) {
        router.push(paths.dashboard.vendor.list);
      }
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
              <RHFTextField name="first_name" label="First Name" />
              <RHFTextField name="last_name" label="Last Name" />
              <RHFTextField type={'email'} name="email" label="Email Address" />
              <RHFTextField type={'number'} name="phone_no" label="Phone Number" />
              <RHFTextField name="business_name" label="Business Name" />
              <RHFTextField name="business_website" label="Business Website" />
              <RHFTextField type={'email'} name="company_email" label="Company Email Address" />
              <RHFTextField type={'number'} name="company_phone_no" label="Company Phone Number" />
              <RHFTextField name="about_company" label="About Company" />
              <RHFTextField type={'number'} name="fax_number" label="Fax Number" />

              <RHFSelect
                onChange={onRoleChange}
                name="gender"
                defaultValue={""}
                native={false}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </RHFSelect>

              <RHFSelect
                onChange={onCategoryChange}
                name="category"
                defaultValue={""}
                native={false}
              >
                {categories.map(x => {
                  return (
                    <MenuItem value={x.id}>{x.categoryname}</MenuItem>
                  )
                })}
              </RHFSelect>
            </Box>
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

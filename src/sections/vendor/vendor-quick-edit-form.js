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
import axios from 'axios';

import { countries } from 'src/assets/data';
import { USER_STATUS_OPTIONS } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function VendorQuickEditForm({ currentVendor, open, onClose, setIsUpdate }) {
  const { enqueueSnackbar } = useSnackbar();

  const [permissions, setPermissions] = useState([]);

  const [gender, setGender] = useState(currentVendor.gender || "");
  const [category, setCategory] = useState(currentVendor.category || "");

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

  useEffect(() => {
    if (open) {
      const getCategories = async () => {
        const response = await axios.get('https://dev-azproduction-api.flynautstaging.com/auth/vendors-categories')
        setCategories(response.data.data);
      }
      getCategories();
    }
  }, [open])

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
      first_name: currentVendor.first_name || '',
      last_name: currentVendor.last_name || '',
      email: currentVendor.email || '',
      phone_no: currentVendor.phone_no || '',
      business_name: currentVendor.business_name || '',
      business_website: currentVendor.business_website || '',
      company_email: currentVendor.company_email || '',
      company_phone_no: currentVendor.company_phone_no || '',
      about_company: currentVendor.about_company || '',
      fax_number: currentVendor.fax_number || ''
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewVendorSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      let body = {
        ...data,
        category,
        gender
      }
      await axios.put(`https://dev-azproduction-api.flynautstaging.com/admin/edit_vendor/${currentVendor.id}`, body);
      setIsUpdate(pValue => !pValue)
      reset();
      onClose();
      enqueueSnackbar('Update success!');
      console.info('DATA', data);
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
            sx={{
              mt: 3
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
              defaultValue={currentVendor.gender || ""}
              native={false}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </RHFSelect>

            <RHFSelect
              onChange={onCategoryChange}
              name="category"
              defaultValue={currentVendor.category || ""}
              native={false}
            >
              {categories.map(x => {
                return (
                  <MenuItem value={x.id}>{x.categoryname}</MenuItem>
                )
              })}
            </RHFSelect>
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

VendorQuickEditForm.propTypes = {
  currentVendor: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

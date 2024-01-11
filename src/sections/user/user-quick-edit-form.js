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

export default function UserQuickEditForm({ currentUser, open, onClose, setIsUpdate }) {
  const { enqueueSnackbar } = useSnackbar();

  const [permissions, setPermissions] = useState([]);
  const [gender, setGender] = useState([]);

  useEffect(() => {
    console.log(currentUser, 'cccccccc');
  }, [currentUser])

  const onRoleChange = (value, index) => {
    setGender(value.target.value);
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

  const NewUserSchema = Yup.object().shape({
    firstname: Yup.string().required('First name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phone: Yup.string().required('Phone number is required'),
    lastname: Yup.string().required('Last name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      firstname: currentUser?.first_name || '',
      email: currentUser?.email_id || '',
      phone: currentUser?.phone_number || '',
      lastname: currentUser?.last_name || ''
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
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
        first_name: data.firstname,
        last_name: data.lastname,
        email_id: data.email,
        phone_number: data.phone,
      }

      await axios.put(`https://dev-azproduction-api.flynautstaging.com/admin/edit-user/${currentUser.id}`, body).then(() => {
        onClose();
        enqueueSnackbar('Updated successfully')
        setIsUpdate(pValue => !pValue)
      }).catch((err) => {
        console.log(err);
      })
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

UserQuickEditForm.propTypes = {
  currentUser: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

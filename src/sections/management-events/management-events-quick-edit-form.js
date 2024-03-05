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

  const [old, setOld] = useState(currentUser.event_category_name)
  const [permissions, setPermissions] = useState([]);
  const [gender, setGender] = useState([]);

  useEffect(() => {
    setOld(currentUser.event_category_name)
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
    category: Yup.string().required('Category name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      category: currentUser?.event_category_name || ''
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
        oldCategory: old,
        category: data.category
      }

      await axios.post(`https://dev-azproduction-api.flynautstaging.com/admin/createEventsCategory/`, body).then(() => {
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
            sx={{
              mt: 1
            }}
          >
            <RHFTextField name="category" label="Category Name" />

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

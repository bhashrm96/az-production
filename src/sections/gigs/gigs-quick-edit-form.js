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
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function GigsQuickEditForm({ currentGigs, open, onClose, setIsUpdate }) {
  const { enqueueSnackbar } = useSnackbar();
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

  const NewGigsSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    rate: Yup.string().required('Rate is required')
  });

  const methods = useForm({
    resolver: yupResolver(NewGigsSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset({
      title: currentGigs?.gigs_title || '',
      rate: currentGigs?.rate || '',
    });

  }, [reset, currentGigs]);

  const onSubmit = handleSubmit(async (data) => {

    let body = {
      id: currentGigs.id,
      gigs_title: data.title,
      rate: data.rate
    }

    try {
      axios.put("https://dev-azproduction-api.flynautstaging.com/admin/update_gigs", body, {
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

            <RHFTextField name="title" label="Title" />
            <RHFTextField name="rate" label="Rate" />

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

GigsQuickEditForm.propTypes = {
  currentGigs: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

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

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function UserQuickEditForm({ currentUser, open, onClose, setIsUpdate }) {
  const { enqueueSnackbar } = useSnackbar();
  const [old, setOld] = useState(currentUser.hashtagText)

  useEffect(() => {
    setOld(currentUser.hashtagText)
  }, [currentUser])

  const NewUserSchema = Yup.object().shape({
    hashtag: Yup.string().required('Hashtag is required'),
  });

  const defaultValues = useMemo(
    () => ({
      hashtag: currentUser?.hashtagText || ''
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
        oldHashtag: old,
        hashtagText: data.hashtag
      }

      await axios.post(`https://dev-azproduction-api.flynautstaging.com/admin/createHashtag/`, body).then(() => {
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
            <RHFTextField name="hashtag" label="Hashtag" />

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

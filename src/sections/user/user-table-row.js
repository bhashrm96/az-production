import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';

import { useBoolean } from 'src/hooks/use-boolean';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import UserQuickEditForm from './user-quick-edit-form';

// ----------------------------------------------------------------------

export default function UserTableRow({ row, selected, onEditRow, onViewRow, onSelectRow, setIsUpdate }) {
  const { first_name, avatarUrl, last_name, status, email_id, phone_number } = row;

  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if ('moderator' in JSON.parse(localStorage.getItem("user"))) {
      const data = JSON.parse(localStorage.getItem("user")).permissions.filter((x) => x.page_id === 1)
      setPermissions(data)
    }
  }, [])

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  const handleStatusChange = async (id) => {
    const res = await axios.delete(`https://dev-azproduction-api.flynautstaging.com/admin/delete-user/${id}`, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken")
      }
    }).then(res => {
      setIsUpdate(pValue => { return !pValue });
      confirm.onFalse();
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ display: 'flex', justifyContent: 'center', paddingRight: "0px" }}>
          <Avatar alt={first_name} src={avatarUrl} />
        </TableCell>

        <TableCell>
          <ListItemText
            primary={first_name}
            secondary={email_id}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{phone_number}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{first_name}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{last_name}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (status === "1" ? 'success' : 'error') ||
              'default'
            }
          >
            {status === "1" ? "Active" : "Inactive"}
          </Label>
        </TableCell>

        <TableCell align="center" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          {/* <Tooltip title="Quick Edit" placement="top" arrow>
            <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip> */}

          {'moderator' in JSON.parse(localStorage.getItem("user")) ? (permissions.length > 0 && permissions[0].permission_name === "full access" ?
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton> : null) :
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>}
        </TableCell>
      </TableRow>

      <UserQuickEditForm setIsUpdate={setIsUpdate} currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} />

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        {/* <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Deactivate
        </MenuItem> */}

        <MenuItem
          onClick={quickEdit.onTrue}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={onViewRow}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={() => handleStatusChange(row.id)}>
            Delete
          </Button >
        }
      />
    </>
  );
}

UserTableRow.propTypes = {
  // onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};

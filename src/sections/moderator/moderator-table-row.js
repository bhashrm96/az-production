import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/hooks/use-boolean';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import ModeratorQuickEditForm from './moderator-quick-edit-form';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function ModeratorTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow, setIsUpdate }) {
  const { firstname, avatarUrl, lastname, status, email, phone } = row;

  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if ('moderator' in JSON.parse(localStorage.getItem("user"))) {
      const data = JSON.parse(localStorage.getItem("user")).permissions.filter((x) => x.page_id === 4)
      setPermissions(data)
    }
  }, [])

  const handleStatusChange = async (id) => {
    const res = await axios.delete(`https://dev-azproduction-api.flynautstaging.com/admin/delete_moderator/${id}`, {
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

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ display: 'flex', justifyContent: 'center', paddingRight: "0px" }}>
          <Avatar alt={firstname} src={avatarUrl} />
        </TableCell>

        <TableCell>
          <ListItemText
            primary={firstname}
            secondary={email}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{phone}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{firstname}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{lastname}</TableCell>

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

      <ModeratorQuickEditForm currentModerator={row} open={quickEdit.value} onClose={quickEdit.onFalse} setIsUpdate={setIsUpdate} />

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
          </Button>
        }
      />
    </>
  );
}

ModeratorTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};

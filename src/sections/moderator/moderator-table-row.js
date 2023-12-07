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
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export default function ModeratorTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { firstname, avatarUrl, lastname, status, email, phone } = row;

  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("user")).permissions.filter((x) => x.page_id === 4)
    setPermissions(data)
  }, [])

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  useEffect(() => {
    console.log(row, 'rrrrrrrrrrr');
  }, [])

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
            primary={name}
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

          {permissions.length > 0 ? permissions[0].permission_name === "full access" ? <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton> : null : null}
        </TableCell>
      </TableRow>

      <ModeratorQuickEditForm currentModerator={row} open={quickEdit.value} onClose={quickEdit.onFalse} />

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Deactivate
        </MenuItem>

        <MenuItem
          onClick={quickEdit.onTrue}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
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

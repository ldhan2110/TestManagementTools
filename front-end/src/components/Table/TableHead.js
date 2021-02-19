import React from "react";
import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from "@material-ui/core";


const EnhancedTableHead = (props) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headers } = props;

  const {hasCheckbox, hasActions, headerCells} = headers;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {hasCheckbox && 
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all' }}
          />
        </TableCell>}
        {headerCells.map((headCell) => !headCell.hidden && (
          <TableCell
            key={headCell.id}
            align={headCell.alignment}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        {hasActions && (<TableCell align="right">Actions</TableCell>)}
      </TableRow>
    </TableHead>
  );
}

export default (EnhancedTableHead);
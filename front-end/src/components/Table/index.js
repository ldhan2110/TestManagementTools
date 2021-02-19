import React, {useState} from "react";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import EnhancedTableHead from './TableHead';
import EnhancedTableToolbar from './TableToolbar';
import {getComparator,stableSort} from './utils';
import {
  Avatar as MuiAvatar,
  Checkbox,
  Chip as MuiChip,
  IconButton,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow} from "@material-ui/core";

import { green, orange } from "@material-ui/core/colors";

import {
  Archive as ArchiveIcon,
  RemoveRedEye as RemoveRedEyeIcon
} from "@material-ui/icons";

import { spacing } from "@material-ui/system";
import { retinaImage } from "polished";

const Paper = styled(MuiPaper)(spacing);

const Chip = styled(MuiChip)`
  ${spacing};

  background: ${props => props.active && green[500]};
  background: ${props => props.sent && orange[700]};
  color: ${props => (props.active || props.sent) && props.theme.palette.common.white};
`

const Avatar = styled(MuiAvatar)`
  background: ${props => props.theme.palette.primary.main};
`;

const Customer = styled.div`
  display: flex;
  align-items: center;
`;


const EnhancedTable = (props) => {
  const {rows, headerList, viewAction} = props;
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('customer');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
  
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
  
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDefaultViewAction = (event,row) => {
      if (viewAction){
        viewAction(row.name);
      }
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div>
      <Paper>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headers = {headerList}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`${row.id}-${index}`}
                      selected={isItemSelected}
                      >
                      {headerList.hasCheckbox &&
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          onClick={(event) => handleClick(event, row.id)}
                        />
                      </TableCell>}
                      {Object.values(row).map((item,index)=>{
                        if (!headerList.headerCells[index].hidden){
                          switch(headerList.headerCells[index].type){
                            case 'text':
                              return (<TableCell component="th" id={labelId} scope="row" key={index} align={headerList.headerCells[index].alignment}>
                                      {item}
                                  </TableCell>)

                            case 'label':
                              return (<TableCell align={headerList.headerCells[index].alignment} key={index}>
                                        {item === 0 && <Chip size="small" mr={1} mb={1} label="Active" active={1}/>}
                                        {item === 1 && <Chip size="small" mr={1} mb={1} label="Inactive" />}
                                  </TableCell>)
                            
                            default:
                              break
                          }
                        }
                      })}

                      {headerList.hasActions &&
                      <TableCell>
                        <IconButton aria-label="delete">
                          <ArchiveIcon />
                        </IconButton>  
                        <IconButton aria-label="details" onClick={(event)=>handleDefaultViewAction(event, row)}>
                          <RemoveRedEyeIcon />
                        </IconButton>  
                      </TableCell>}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default (EnhancedTable);
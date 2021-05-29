import React, {useState} from "react";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import EnhancedTableHead from './TableHead';
import EnhancedTableToolbar from './TableToolbar';
import {getComparator,stableSort} from './utils';
import { useHistory } from "react-router-dom";

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
  Typography,
  TableRow} from "@material-ui/core";

import { green, orange, red } from "@material-ui/core/colors";

import {
  Archive as ArchiveIcon,
  RemoveRedEye as RemoveRedEyeIcon
} from "@material-ui/icons";

import { spacing } from "@material-ui/system";
import { retinaImage } from "polished";

const Paper = styled(MuiPaper)(spacing);

const Chip = styled(MuiChip)`
  ${spacing};

  background: ${props => props.is_active && green[500]};
  background: ${props => props.pass && green[500]};
  background: ${props => props.fail && red[500]};
  background: ${props => props.block && orange[500]};
  background: ${props => props.sent && orange[700]};
  color: ${props => (props.is_active || props.sent) && props.theme.palette.common.white};
  color: ${props => (props.pass || props.sent) && props.theme.palette.common.white};
  color: ${props => (props.fail || props.sent) && props.theme.palette.common.white};
  color: ${props => (props.block || props.sent) && props.theme.palette.common.white};
`

const Avatar = styled(MuiAvatar)`
  background: ${props => props.theme.palette.primary.main};
`;

const Customer = styled.div`
  display: flex;
  align-items: center;
`;


const EnhancedTable = (props) => {
  const history = useHistory();

  const {rows, headerList, viewAction, conditions, setConditions, searchMethod} = props;
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
    if (viewAction) viewAction();
    else {
        history.push({
          pathname: window.location.pathname+"/"+row._id,
          state: row
        });
      }
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div>
      <Paper>
        <EnhancedTableToolbar numSelected={selected.length} conditions={conditions} setConditions={setConditions} searchMethod={searchMethod}/>
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
                        if (headerList.headerCells[index] !== undefined && !headerList.headerCells[index].hidden){
                          switch(headerList.headerCells[index].type){
                            case 'text':
                              return (<TableCell style={{overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200, whiteSpace: 'nowrap'}} 
                              component="th" id={labelId} scope="row" key={index} align={headerList.headerCells[index].alignment}>

                                        {row[headerList.headerCells[index].id]}

                                  </TableCell>)

                            case 'label':
                              return (<TableCell align={headerList.headerCells[index].alignment} key={index}>
                                        {row[headerList.headerCells[index].id] == 1 && <Chip size="small" mr={1} mb={1} label="Active" is_active={1}/>}
                                        {row[headerList.headerCells[index].id] == 0 && <Chip size="small" mr={1} mb={1} label="Inactive" />}
                                        {row[headerList.headerCells[index].id] == 2 || row[headerList.headerCells[index].id] == "Pass" && <Chip size="small" mr={1} mb={1} label="Pass" pass={1}/>}
                                        {row[headerList.headerCells[index].id] == 3 || row[headerList.headerCells[index].id] == "Fail" && <Chip size="small" mr={1} mb={1} label="Fail" fail={1}/>}
                                        {row[headerList.headerCells[index].id] == 4 || row[headerList.headerCells[index].id] == "Block" && <Chip size="small" mr={1} mb={1} label="Block" block={1}/>}
                                        {row[headerList.headerCells[index].id] == 'Untest' && <Chip size="small" mr={1} mb={1} label="Untest" />}
                                  </TableCell>)
                            
                            default:
                              break
                          }
                        }
                      })}

                      {headerList.hasActions &&
                      <TableCell align="right">
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
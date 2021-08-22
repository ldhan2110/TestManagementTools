import React, {useState, useEffect} from "react";
import styled from "styled-components";
import EnhancedTableHead from './TableHead';
import EnhancedTableToolbar from './TableToolbar';
import {getComparator,stableSort} from './utils';
import { useHistory } from "react-router-dom";

import {
  Grid,
  Divider,
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
  TableRow,
  Tooltip} from "@material-ui/core";
  import {
    UserMinus
  } from "react-feather";

import { green, orange, red, blue } from "@material-ui/core/colors";

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { spacing } from "@material-ui/system";
import { Clipboard } from "react-feather";
import CustomEmptyOverlayGrid from './NoDataIcon'
import CircularProgress from '@material-ui/core/CircularProgress';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import AssessmentIcon from '@material-ui/icons/Assessment';


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



const EnhancedTable = (props) => {
  const history = useHistory();

  const {rows, headerList, viewAction, viewRPAction, conditions, setConditions, searchMethod, handleDefaultDeleteAction, type, load} = props;
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

  useEffect(()=>{
    setPage(0);
  },[rows.length])
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDefaultViewAction = (event,row) => {
    if (viewAction) viewAction(row);
    else {
      if(row._id){
        history.push({
          pathname: window.location.pathname+"/"+row._id,
          state: row
        });
      } else if(row.id) {
         history.push({
          pathname: window.location.pathname+"/"+row.id,
          state: row
         });
      }
    }
  };
  const handleDefaultViewRPAction = (event,row) => {
    if (viewRPAction) viewRPAction(row);
    else {
      if(row._id){
        history.push({
          pathname: window.location.pathname+"/"+row._id,
          state: row
        });
      } else if(row.id) {
         history.push({
          pathname: window.location.pathname+"/"+row.id,
          state: row
         });
      }
    }
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div>
      <Paper>
        <EnhancedTableToolbar numSelected={selected.length} conditions={conditions} setConditions={setConditions} searchMethod={searchMethod}/>
        {rows?.length > 0 ? 
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
                              if(type === 'requirements')
                              return (<TableCell align={headerList.headerCells[index].alignment} key={index}>
                                        {row[headerList.headerCells[index].id] == 1 && headerList.headerCells[index].label !== 'Status' && <Chip size="small" mr={1} mb={1} label="Active" is_active={1}/>}
                                        {row[headerList.headerCells[index].id] == 0 && headerList.headerCells[index].label !== 'Status' && <Chip size="small" mr={1} mb={1} label="Inactive" />}
                                        {row[headerList.headerCells[index].id] == 1 && headerList.headerCells[index].label === 'Status' && <Chip size="small" mr={1} mb={1} label="Complete" is_active={1}/>}
                                        {row[headerList.headerCells[index].id] == 0 && headerList.headerCells[index].label === 'Status' && <Chip size="small" mr={1} mb={1} label="Incomplete" />}
                                        {row[headerList.headerCells[index].id] == 2 || row[headerList.headerCells[index].id] === "Pass" && <Chip size="small" mr={1} mb={1} label="Pass" pass={1}/>}
                                        {row[headerList.headerCells[index].id] == 3 || row[headerList.headerCells[index].id] === "Fail" && <Chip size="small" mr={1} mb={1} label="Fail" fail={1}/>}
                                        {row[headerList.headerCells[index].id] == 4 || row[headerList.headerCells[index].id] === "Block" && <Chip size="small" mr={1} mb={1} label="Block" block={1}/>}
                                        {row[headerList.headerCells[index].id] == 'Untest' && <Chip size="small" mr={1} mb={1} label="Untest" />}
                                  </TableCell>)
                              else
                              return (<TableCell align={headerList.headerCells[index].alignment} key={index}>
                                {row[headerList.headerCells[index].id] == 1 && <Chip size="small" mr={1} mb={1} label="Active" is_active={1}/>}
                                {row[headerList.headerCells[index].id] == 0 && <Chip size="small" mr={1} mb={1} label="Inactive" />}
                                {row[headerList.headerCells[index].id] == 2 || row[headerList.headerCells[index].id] === "Pass" && <Chip size="small" mr={1} mb={1} label="Pass" pass={1}/>}
                                {row[headerList.headerCells[index].id] == 3 || row[headerList.headerCells[index].id] === "Fail" && <Chip size="small" mr={1} mb={1} label="Fail" fail={1}/>}
                                {row[headerList.headerCells[index].id] == 4 || row[headerList.headerCells[index].id] === "Block" && <Chip size="small" mr={1} mb={1} label="Block" block={1}/>}
                                {row[headerList.headerCells[index].id] == 'Untest' && <Chip size="small" mr={1} mb={1} label="Untest" />}
                                  </TableCell>)
                            
                            default:
                              break
                          }
                        }
                      })}

                      {headerList.hasActions &&
                      <TableCell align="right">
                        {type === 'membermantis'  && <Tooltip title="Remove member">
                        <IconButton aria-label="delete" onClick={()=>handleDefaultDeleteAction(row)}>
                          <UserMinus style={{color: red[500]}}/>
                        </IconButton> 
                        </Tooltip>}
                        {type === 'member'  && <Tooltip title="Remove member">
                        <IconButton aria-label="delete" onClick={()=>handleDefaultDeleteAction(row.id)}>
                          <UserMinus style={{color: red[500]}}/>
                        </IconButton> 
                        </Tooltip>}
                        {(type === 'testplan' || type === 'build' || type === 'requirements') && <Tooltip title="Delete"> 
                        <IconButton aria-label="delete" onClick={()=>handleDefaultDeleteAction(row._id)}>
                          <DeleteIcon style={{color: red[400]}}/>
                        </IconButton> 
                        </Tooltip>}
                        {type === 'testexecution' && <Tooltip title="Execute">
                        <IconButton aria-label="execute" onClick={()=>handleDefaultDeleteAction(row._id)}>
                          <Clipboard style={{color: blue[400]}}/>
                        </IconButton> 
                        </Tooltip>}
                        {type === 'testcases' && <Tooltip title="Delete">
                        <IconButton aria-label="delete" onClick={()=>handleDefaultDeleteAction(row._id, row.type)}>
                          <DeleteIcon style={{color: red[400]}}/>
                        </IconButton> 
                        </Tooltip>}

                        {type === 'issue' && <Tooltip title="View Details">
                           <IconButton aria-label="details" onClick={(event)=>handleDefaultViewAction(event, row)}>
                          <RemoveRedEyeIcon style={{color: blue[400]}}/>
                        </IconButton> 
                        </Tooltip>}
                        {type === 'build' && 
                        <Tooltip title="View Report">
                           <IconButton aria-label="details" onClick={(event)=>handleDefaultViewRPAction(event, row)}>
                          <AssessmentIcon style={{color: blue[400]}}/>
                        </IconButton> 
                        </Tooltip>}
                        
                        {type !== 'testcases' &&  type !== 'member' && type !== 'issue' && type !== 'membermantis' && 
                        <Tooltip title="View / Edit">
                           <IconButton aria-label="details" onClick={(event)=>handleDefaultViewAction(event, row)}>
                          <EditIcon style={{color: blue[400]}}/>
                        </IconButton> 
                        </Tooltip>}
                        {(type === 'member' || type === 'membermantis') && <Tooltip title="Change role">
                            <IconButton aria-label="details" onClick={(event)=>handleDefaultViewAction(event, row)}>
                              <EditIcon style={{color: blue[400]}}/>
                            </IconButton>
                          </Tooltip>}
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
        : <div>
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
              rowCount={0}
              headers = {headerList}
            /></Table></TableContainer><Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item style={{marginTop: 50}}>{(load === "") ? <CircularProgress style={{marginTop: 44, marginBottom: 44}}/> : <CustomEmptyOverlayGrid/>}</Grid>
          <Grid item style={{marginBottom: 50}}>
            {(load === "") ? <div></div>:
            <Typography variant="subtitle1" gutterBottom display="inline" style={{ userSelect: "none" }}>
              No Data
            </Typography>}
          </Grid>
        </Grid><Divider/></div>}
                
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
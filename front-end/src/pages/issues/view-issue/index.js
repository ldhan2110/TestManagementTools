import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {GET_ALL_ISSUE_REQ} from '../../../redux/issue/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import {
  Dialog,
  Button,
  IconButton,
  DialogContent,
  Link,
  DialogActions,
  DialogTitle,
} from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid';
import { useHistory } from "react-router-dom";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { 
    project: state.project.currentSelectedProject,
    issue: state.issue,
   }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    getAllIssueReq: (payload) => dispatch({type:GET_ALL_ISSUE_REQ, payload}),
  }
}

const ViewIssuePopup = (props) => {
  
  const { displayMsg, issue, getAllIssueReq, project } = props;
  
  const {isOpen, setOpen, listIssueOfExec} = props;  
  
  const [open, setOpenPopup] = useState(isOpen);

  const [pageSize, setPageSize] = useState(5);

  const history = useHistory();

  useEffect(()=>{
    //issue.success = null;
    //getAllIssueReq(project);
  },[])

  const handleClose = () =>{
      setOpen(false);
  }
  
  useEffect(()=>{
      setOpenPopup(isOpen);
  },[isOpen, open])

  // useEffect(()=>{
  //   if(issue.success === null && issue.error === true && open){
  //     displayMsg({
  //       content: issue.errorMsg,
  //       type: 'error'
  //     });
  //   }
  // },[issue.success, issue.error, open])


  const [openDelIssue, setOpenDelIssue] = useState(false);
  const [delIssueInfo, setDelIssueInfo] = useState([]);

  const handleCloseDelIssue = () =>{
    setOpenDelIssue(false);
    setDelIssueInfo([]);
  }
  const handleDeleteIssue = () =>{
    console.log(delIssueInfo);
  }

  // Format datagrid columns
const columns = [
  { field: 'issue_id', headerName: 'ID', width: 91 },
  {
    field: 'url',
    headerName: 'Mantis Link',
    flex: 1,
    minWidth: 150,
    sortable: false,
    renderCell: (params) => (
      <Link href={params.value} target="_blank" rel="noopener">
        {params.value}
      </Link>
    )
  },
  { 
    field: 'Action',
    width: 100,
    sortable: false,
    filterable: false,
    renderCell: (params) => {      
      const handleAction = (event) =>{
        setOpenDelIssue(true);
        setDelIssueInfo(params.row);
      }
      return(
      <IconButton
        onClick={handleAction}>
        <DeleteOutlineIcon style={{color: '#f44336'}}/>
      </IconButton>
    )}
  },
];

  
  return (
    <React.Fragment > 
      <Dialog open={open} disableEnforceFocus 
         onClose={handleClose} aria-labelledby="form-dialog-title"
         fullWidth
         maxWidth="sm"
         >
        {/* <DialogTitle id="form-dialog-title">View Issues</DialogTitle> */}
        <DialogContent dividers>
          <div style={{height: 370, width: '100%'}}>
            <DataGrid
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20, 50, 100]}
              disableSelectionOnClick 
              rows={listIssueOfExec}
              columns={columns}              
              getRowId={(e => e._id)}
              disableColumnSelector
              //loading={issue.success === "" ? true : false}
            />
            <Dialog id="popup-del-issue" open={openDelIssue} >
              <DialogTitle>Confirm</DialogTitle>
              <DialogContent>Are you sure want to delete this issue?</DialogContent>
              <DialogActions>
                <Button onClick={handleDeleteIssue} color="primary">Yes</Button>
                <Button onClick={handleCloseDelIssue} color="primary">No</Button>
              </DialogActions>
            </Dialog>
          </div>
        </DialogContent>

      </Dialog>
    </React.Fragment>
  )
}

export default  connect(mapStateToProps, mapDispatchToProps)(ViewIssuePopup);
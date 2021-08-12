import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {GET_ALL_ISSUE_REQ, DELETE_ISSUE_FROM_EXEC_REQ, RESET_DELETE_ISSUE_FROM_EXEC} from '../../../redux/issue/constants';
import { GET_ALL_TESTEXEC_REQ } from "../../../redux/test-execution/constants";
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
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { 
    project: state.project.currentSelectedProject,
    issue: state.issue,
    testexec: state.testexec,
   }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    getAllTestExecReq: () => dispatch({ type: GET_ALL_TESTEXEC_REQ}),
    getAllIssueReq: (payload) => dispatch({type:GET_ALL_ISSUE_REQ, payload}),
    deleteIssueFromExecReq: (payload) => dispatch({type: DELETE_ISSUE_FROM_EXEC_REQ, payload}),
    resetDeleteIssueFromExec: () => dispatch({type:RESET_DELETE_ISSUE_FROM_EXEC})
  }
}

const ViewIssuePopup = (props) => {
  
  const { displayMsg, issue, testexec, project, deleteIssueFromExecReq,
    resetDeleteIssueFromExec, getAllTestExecReq } = props;
  
  const {isOpen, setOpen, listIssueOfExec, execid} = props;  
  
  const [open, setOpenPopup] = useState(isOpen);

  const [pageSize, setPageSize] = useState(5);

  const [load, setLoad] = useState(false);

  const handleClose = () =>{
      setOpen(false);
  }
  
  useEffect(()=>{
      setOpenPopup(isOpen);
  },[isOpen, open])

  useEffect(()=>{
    if (issue.insIssueDeleteFromExec?.sucess === false){
      displayMsg({
        content: issue.insIssueDeleteFromExec.errMsg,
        type: 'error'
      });
      resetDeleteIssueFromExec();
      setLoad(false);
    } else if (issue.insIssueDeleteFromExec?.sucess === true) {
      displayMsg({
        content: "Delete issue successfully !",
        type: 'success'
      });
      getAllTestExecReq();
      resetDeleteIssueFromExec();
      setLoad(false);
    }
  },[issue.insIssueDeleteFromExec])


  const [openDelIssue, setOpenDelIssue] = useState(false);
  const [delIssueInfo, setDelIssueInfo] = useState([]);

  const handleCloseDelIssue = () =>{
    setOpenDelIssue(false);
    setDelIssueInfo([]);
  }

  const handleDeleteIssue = () =>{
    deleteIssueFromExecReq({
      projectid: project,
      testexecution_id: execid,
      issue_id: delIssueInfo.issue_id
    });
    setOpenDelIssue(false);
    setLoad(true);
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
              loading={(load === true || testexec.success === "") ? true : false}
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
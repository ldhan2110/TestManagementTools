import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {GET_ALL_ISSUE_REQ, DELETE_ISSUE_FROM_EXEC_REQ, RESET_DELETE_ISSUE_FROM_EXEC} from '../../../redux/issue/constants';
import { GET_ALL_TESTEXEC_REQ } from "../../../redux/test-execution/constants";
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import {
  Dialog,
  DialogContentText,  
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  Button,
  IconButton,
  Link,  
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
  
  const {isOpen, setOpen, listIssueOfExec, execid, refreshWhenDelIssue} = props;  
  
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
      if(refreshWhenDelIssue){
        console.log('b');
        refreshWhenDelIssue();
      }
    }
  },[issue.insIssueDeleteFromExec])

  // Del issue
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

  // Add issue
  const [openAddIssue, setOpenAddIssue] = useState(false);
  const [addIssueInfo, setAddIssueInfo] = useState([]);
  const handleCloseAddIssue = () =>{
    setOpenAddIssue(false);
    setAddIssueInfo({
      projectid: project,
      urlAddIssue: ''
    });
  }

  const handleAddIssue = () =>{
    // deleteIssueFromExecReq({
    //   projectid: project,
    //   testexecution_id: execid,
    //   issue_id: delIssueInfo.issue_id
    // });
    console.log(addIssueInfo);
    setOpenAddIssue(false);
    //setLoad(true);
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
         maxWidth="md"
         >
        {/* <DialogTitle id="form-dialog-title">View Issues</DialogTitle> */}
        <DialogContent dividers>
          <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '10px'}}>
            <Button variant="contained" color="primary"
              onClick={() => setOpenAddIssue(true)}>
              Add Issue
            </Button>
          </div>
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
              loading={(load === true) ? true : false}
            />
            <Dialog id="popup-del-issue" open={openDelIssue} onClose={handleCloseDelIssue} >
              <DialogTitle>Confirm</DialogTitle>
              <DialogContent>Are you sure you want to delete this issue?</DialogContent>
              <DialogActions>
                <Button onClick={handleDeleteIssue} color="primary">Yes</Button>
                <Button onClick={handleCloseDelIssue} color="primary">No</Button>
              </DialogActions>
            </Dialog>

            <Dialog open={openAddIssue} onClose={handleCloseAddIssue} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add issue</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  You can link created issue from Mantis to this test execution here.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Issue URL"
                  type="email"
                  fullWidth
                  value={addIssueInfo.urlAddIssue}
                  onChange={(event) => setAddIssueInfo({...addIssueInfo, urlAddIssue: event.target.value})}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseAddIssue} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleAddIssue} color="primary">
                  Add
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </DialogContent>

      </Dialog>
    </React.Fragment>
  )
}

export default  connect(mapStateToProps, mapDispatchToProps)(ViewIssuePopup);
import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {ADD_ISSUE_REQ, GET_ALL_ISSUE_REQ, DELETE_ISSUE_FROM_EXEC_REQ, RESET_DELETE_ISSUE_FROM_EXEC, RESET_ADD_ISSUE} from '../../../redux/issue/constants';
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
    addIssueToExec: (payload) => dispatch({type:ADD_ISSUE_REQ, payload}),
    deleteIssueFromExecReq: (payload) => dispatch({type: DELETE_ISSUE_FROM_EXEC_REQ, payload}),
    resetDeleteIssueFromExec: () => dispatch({type:RESET_DELETE_ISSUE_FROM_EXEC}),    
    resetAddIssueToExecRedux: () => dispatch({type:RESET_ADD_ISSUE})
  }
}

const ViewIssueTCPopup = (props) => {
  
  const { displayMsg, issue, testexec, project, deleteIssueFromExecReq,
    resetDeleteIssueFromExec, getAllTestExecReq, addIssueToExec, resetAddIssueToExecRedux } = props;
  
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
    // deleteIssueFromExecReq({
    //   projectid: project,
    //   testexecution_id: execid?execid:"",
    //   issue_id: delIssueInfo.issue_id
    // });
    setOpenDelIssue(false);
    setLoad(true);
  }

  // Add issue
  const [openAddIssue, setOpenAddIssue] = useState(false);
  const [addIssueInfo, setAddIssueInfo] = useState({
    projectid: project,
    issue_id: '',
    testexecution_id: execid?execid:"",
    url: ''
  });
  const handleCloseAddIssue = () =>{
    setOpenAddIssue(false);
    setAddIssueInfo({
      projectid: project,
      issue_id: '',
      testexecution_id: execid?execid:"",
      url: ''
    });
  }

  const handleAddIssue = () =>{
    //console.log(addIssueInfo);
    setOpenAddIssue(false);
    setLoad(true);
    //addIssueToExec(addIssueInfo);
  }

  const handleEnterUrl = (event) => {
    setAddIssueInfo({...addIssueInfo,
      url: event.target.value,
      issue_id: handleIssueIdFromUrl(event.target.value)});    
  }

  const handleIssueIdFromUrl = (url) => {
    let index = url.lastIndexOf('?id=');
    return url.slice(index+4);
  }

  useEffect(()=>{
    if (issue.insAddIssueToExec?.sucess === false){
      displayMsg({
        content: issue.insAddIssueToExec.errMsg,
        type: 'error'
      });
      resetAddIssueToExecRedux();
      setLoad(false);
    } else if (issue.insAddIssueToExec?.sucess === true) {
      displayMsg({
        content: "Add issue successfully !",
        type: 'success'
      });
      setAddIssueInfo({
        projectid: project,
        issue_id: '',
        testexecution_id: execid?execid:"",
        url: ''
      });
      getAllTestExecReq();
      resetAddIssueToExecRedux();
      setLoad(false);
      if(refreshWhenDelIssue){
        refreshWhenDelIssue();
      }
    }
  },[issue.insAddIssueToExec])
  

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
    hide: true,
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
          {/* <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '10px'}}>
            <Button variant="contained" color="primary"
              onClick={() => setOpenAddIssue(true)}>
              Add Issue
            </Button>
          </div> */}
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
              <DialogContent>Are you sure you want to delete this defect?</DialogContent>
              <DialogActions>
                <Button onClick={handleDeleteIssue} color="primary">Yes</Button>
                <Button onClick={handleCloseDelIssue} color="primary">No</Button>
              </DialogActions>
            </Dialog>

            <Dialog open={openAddIssue} onClose={handleCloseAddIssue} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add defect</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  You can link created defect from Mantis to this test execution here. The link should look like this: https://(yourmantis).mantishub.io/view.php?id=(issueID)
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Defect URL"
                  type="email"
                  fullWidth
                  value={addIssueInfo.url}
                  onChange={handleEnterUrl}
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

export default  connect(mapStateToProps, mapDispatchToProps)(ViewIssueTCPopup);
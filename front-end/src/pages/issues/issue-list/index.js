import React, { useEffect, useState } from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import EnhancedTable from '../../../components/Table/index';
import Helmet from 'react-helmet';
import {ISSUE_HEADERS} from '../../../components/Table/DefineHeader';
import {ISSUE_SEARCH} from '../../../components/Table/DefineSearch';
import {GET_ALL_ISSUE_REQ, DELETE_ISSUE_REQ, RESET_DELETE_ISSUE} from '../../../redux/issue/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
import {
  Grid,
  Typography,
  Divider,
  Button,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog
} from '@material-ui/core';

import {
  Add as AddIcon,
} from "@material-ui/icons";


//MAP STATES TO PROPS - REDUX
function mapStateToProps(state) {
  return {
    issue: state.issue,
    listIssue: state.issue.listIssue,
    project: state.project.currentSelectedProject,
    role: state.project.currentRole,
    insIssueDelete: state.issue.insIssueDelete,
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    getAllIssueReq: (payload) => dispatch({ type: GET_ALL_ISSUE_REQ, payload}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    deleteIssueReq: (payload) => dispatch({ type: DELETE_ISSUE_REQ, payload }),
    resetDeleteRedux: () => dispatch({type: RESET_DELETE_ISSUE})
  }
}


const IssueListPage = (props) => {

  const {listIssue, issue, getAllIssueReq, project, role, deleteIssueReq, resetDeleteRedux, insIssueDelete, displayMsg} = props;

  const [array, setArray] = React.useState(listIssue);

  const [listissue, setlistissue] = React.useState(listIssue);

  const [ISSUE_SEARCH_CONDITIONS, setIssueCon] = React.useState(ISSUE_SEARCH);

  //delete TP dialog
  const [open, setOpen] = React.useState(false);

  //Delete TP infor
  const [issueInfor, setIssueInfor] = React.useState({
    id: '',
    projectid: project
  });

  const [searchConditions, setConditions] = useState({
    summary: '',
    reporter: '',
    category: '',
  });   

  const history = useHistory();

  
  const searchIssue = () => {
    
  }

  useEffect(()=>{
    issue.success = "";
    getAllIssueReq(project);
  },[])

  useEffect(()=>{
    if(issue.success === true){
        setArray(listIssue);
        setlistissue(listIssue);
    }
  },[issue])

  useEffect(()=>{
    if (issue?.success === null && issue?.error === true) {
      displayMsg({
        content: issue?.errorMsg,
        type: 'error'
      });        
    }
  },[issue?.error]);  

  const handleChangeConditions = (props, data) => {
    setConditions({...searchConditions, [props]: data });
  }

  useEffect(()=>{
    if (searchConditions.reporter === '' && searchConditions.summary === '' && searchConditions.category === ''){
      setArray(listissue);
    } 
    else{
      if(searchConditions.reporter === '')
      setArray(listissue.filter((item) => {
        if(item.summary.toLowerCase().includes(searchConditions.summary.toLowerCase())
        && item.category.toLowerCase().includes(searchConditions.category.toLowerCase())
        )
          return item;}))
      else
      setArray(listissue.filter((item) => {
        if(item.reporter){
          if(item.summary.toLowerCase().includes(searchConditions.summary.toLowerCase())
          && item.category.toLowerCase().includes(searchConditions.category.toLowerCase())
          && item.reporter.toLowerCase().includes(searchConditions.reporter.toLowerCase())
          )
            return item;
        } else {          
            return;
        }
      }))
    }
  },[searchConditions]);


    useEffect(()=>{
      if (insIssueDelete.sucess === false){
        issue.success = true;
        displayMsg({
          content: insIssueDelete.errMsg,
          type: 'error'
        });
        resetDeleteRedux();
      } else if (insIssueDelete.sucess === true) {
        displayMsg({
          content: "Delete issue successfully !",
          type: 'success'
        });
        getAllIssueReq(project);
        resetDeleteRedux();
      }
    },[insIssueDelete.sucess]);      

    const deleteIssue = (id) => {
      setIssueInfor({...issueInfor, id: id});
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleDelete=()=>{
      issue.success = "";
      deleteIssueReq(issueInfor);
      setOpen(false);
    };
  // <-- delete TP
  return(
    <div>

      <Helmet title="Defect List" />
      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Defects List
          </Typography>

        </Grid>
        <Grid item>
          {/* Delete TP dialog */}
          <Grid item>
          {(role === 'Project Manager' || role === 'Test Lead') &&
                <Dialog open={open} >
                  <DialogTitle>Confirm</DialogTitle>
                  <DialogContent>Are you sure want to delete this issue?</DialogContent>
                  <DialogActions>
                    <Button onClick={handleDelete} color="primary">Yes</Button>
                    <Button onClick={handleClose} color="primary">No</Button>
                  </DialogActions>
                </Dialog>}

                {(role === 'Tester') &&
                <Dialog open={open} >
                  <DialogTitle>Delete</DialogTitle>
                  <DialogContent>Do not allow Tester role !</DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">OK</Button>
                  </DialogActions>
                </Dialog>}
          </Grid>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
        {/* Load bar */}
        {(issue.success === true)? <EnhancedTable
            rows={array}
            headerList = {ISSUE_HEADERS}
            conditions={ISSUE_SEARCH_CONDITIONS}
            setConditions={handleChangeConditions}
            searchMethod={searchIssue}
            handleDefaultDeleteAction={deleteIssue}
            type='issue'
            load={issue.success}
          />:
          <EnhancedTable
            rows={[]}
            headerList = {ISSUE_HEADERS}
            //conditions={ISSUE_SEARCH}
            //setConditions={handleChangeConditions}
            type='issue'
            load={issue.success}
          />}
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(IssueListPage));
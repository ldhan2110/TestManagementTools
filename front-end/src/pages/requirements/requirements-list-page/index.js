import React, {useEffect, useState} from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import EnhancedTable from '../../../components/Table/index';
import Helmet from 'react-helmet';
import {REQUIREMENTS_HEADER} from '../../../components/Table/DefineHeader';
import {REQUIREMENT_SEARCH} from '../../../components/Table/DefineSearch';
import { connect } from 'react-redux';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import {ADD_NEW_TESTPLAN_REQ, GET_ALL_TESTPLAN_REQ, DELETE_TESTPLAN_REQ, RESET_DELETE_TESTPLAN} from '../../../redux/test-plan/constants';

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
import LinearProgress from '@material-ui/core/LinearProgress';

//MAP STATES TO PROPS - REDUX
function mapStateToProps(state) {
  return {
    listTestplan: state.testplan.listTestplan,
    project: state.project.currentSelectedProject,
    role: state.project.currentRole,
    insTestplanDelete: state.testplan.insTestplanDelete
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    addNewTestplanReq: (payload) => dispatch({ type: ADD_NEW_TESTPLAN_REQ, payload }),
    getAllTestplanReq: (payload) => dispatch({ type: GET_ALL_TESTPLAN_REQ, payload}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    deleteTestplanReq: (payload) => dispatch({ type: DELETE_TESTPLAN_REQ, payload }),
    resetDeleteRedux: () => dispatch({type: RESET_DELETE_TESTPLAN})
  }
}


const RequirementListPage = (props) => {
  //const {classes} = props;

  const {listTestplan, getAllTestplanReq, project, role, deleteTestplanReq, resetDeleteRedux, insTestplanDelete, displayMsg} = props;

  const [array, setArray] = React.useState(listTestplan);

  //load TP bar
  const [count, setCount] = React.useState(0);
  const [count1, setCount1] = React.useState(0);

  //delete TP dialog
  const [open, setOpen] = React.useState(false);

  //Delete TP infor
  const [testplanInfor, setTestplanInfor] = React.useState({
    testplanid: '',
    projectid: project
  });

  const [searchConditions, setConditions] = useState({
    testplanName: '',
    active: -1
  });   

  const history = useHistory();


  const handleClickNewRequirements = () => {
    history.push({pathname: window.location.pathname+"/new-requirement",});
  }

  const navigateToDetailPage = () => {
      history.push(window.location.pathname+"/requirement-detail");
  }


  const searchTestPlan = () => {
    console.log(searchConditions);
    if (searchConditions.active === -1 && searchConditions.testplanName === ''){
      setArray(listTestplan);
    } 
    else{
      if(searchConditions.active === -1)
        setArray(listTestplan.filter((item) => {
          if(item.testplanname.toLowerCase().includes(searchConditions.testplanName.toLowerCase()))
            return listTestplan;}))
      else
        setArray(listTestplan.filter((item) => {
          if(item.testplanname.toLowerCase().includes(searchConditions.testplanName.toLowerCase()) && searchConditions.active === item.is_active)
            return listTestplan;}))
    }
  }

  useEffect(()=>{
    getAllTestplanReq(project);
  },[])

  useEffect(()=>{
    setArray(listTestplan);
    //load bar
    if(count < 3){
    setCount(count+1);
    setTimeout(()=>{
      setCount1(count1+1);
    },200);}
    //console.log(count);
    //console.log(count1);
  },[listTestplan])

  const handleChangeConditions = (props, data) => {
    setConditions({...searchConditions, [props]: data });
  }

  useEffect(()=>{ 
    console.log('keyword: '+searchConditions.testplanName + '   ' + searchConditions.active);
    if (searchConditions.active === -1 && searchConditions.testplanName === ''){
      setArray(listTestplan);
    } 
    else{
      console.log('not empty');
      if(searchConditions.active === -1)
      setArray(listTestplan.filter((item) => {
        if(item.testplanname.toLowerCase().includes(searchConditions.testplanName.toLowerCase()))
          return listTestplan;}))
      else
      setArray(listTestplan.filter((item) => {
        if(item.testplanname.toLowerCase().includes(searchConditions.testplanName.toLowerCase()) && searchConditions.active === item.is_active)
          return listTestplan;}))
    }
  },[searchConditions]);
  // --> delete TP
  try {
    useEffect(()=>{
      if (insTestplanDelete.sucess === false){
        displayMsg({
          content: insTestplanDelete.errMsg,
          type: 'error'
        });
        setCount(1);
        setCount1(1);
        getAllTestplanReq(project);
        resetDeleteRedux();
      } else if (insTestplanDelete.sucess === true) {
        displayMsg({
          content: "Delete testplan successfully !",
          type: 'success'
        });
        setCount(1);
        setCount1(1);
        getAllTestplanReq(project);
        resetDeleteRedux();
      }
    },[insTestplanDelete.sucess]);      
  } catch (error) {
    console.log('error: '+error);
  }

    const deleteTP = (id) => {
      setTestplanInfor({...testplanInfor, testplanid: id});
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleDelete=()=>{
      setCount(-2);
      setCount1(-2);
      deleteTestplanReq(testplanInfor);
      setOpen(false);
    };
  // <-- delete TP


  return(
    <div>

      <Helmet title="Requirements Management" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Requirements List
          </Typography>
          {/* <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} exact to="/">
              Dashboard
            </Link>
            <Link component={NavLink} exact to="/">
              Pages
            </Link>
            <Typography>Invoices</Typography>
          </Breadcrumbs> */}
        </Grid>
        <Grid item>
          <div>
           <Button variant="contained" color="primary" onClick={handleClickNewRequirements}>
              <AddIcon />
              New Requirement
            </Button>
          </div>
          {/* Delete TP dialog */}
          {/* <Grid item>
                <Dialog open={open} >
                  <DialogTitle>Confirm</DialogTitle>
                  <DialogContent>Are you sure want to delete this requirement?</DialogContent>
                  <DialogActions>
                  <Button onClick={handleDelete} color="primary">Yes</Button>
                    <Button onClick={handleClose} color="primary">No</Button>
                  </DialogActions>
                </Dialog>}
              
                <Dialog open={open} >
                  <DialogTitle>Delete</DialogTitle>
                  <DialogContent>Do not allow Tester role !</DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">OK</Button>
                  </DialogActions>
                </Dialog>
          </Grid> */}
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable
            rows={array}
            headerList = {REQUIREMENTS_HEADER}
            onClick={navigateToDetailPage}
            conditions={REQUIREMENT_SEARCH}
            setConditions={handleChangeConditions}
            //searchMethod={searchRequirements}
            type='requirements'
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(RequirementListPage));

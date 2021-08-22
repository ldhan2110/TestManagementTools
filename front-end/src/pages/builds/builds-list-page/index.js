import React, {useEffect, useState} from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import EnhancedTable from '../../../components/Table/index';
import Helmet from 'react-helmet';
import {BUILDS_HEADERS} from '../../../components/Table/DefineHeader';
import {BUILDS_SEARCH} from '../../../components/Table/DefineSearch';
import { connect } from 'react-redux';
import {ADD_NEW_BUILD_REQ, GET_ALL_BUILDS_REQ, DELETE_BUILD_REQ, RESET_DELETE_BUILD} from '../../../redux/build-release/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { GET_ALL_ACTIVE_TESTPLAN_REQ} from '../../../redux/test-plan/constants';
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
    build: state.build,
    listBuilds: state.build.listBuilds,
    project: state.project.currentSelectedProject,
    listTestPlan: state.testplan.listActiveTestplan,
    role: state.project.currentRole,
    insBuildsDelete: state.build.insBuildsDelete
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    addNewBuildReq: (payload) => dispatch({ type: ADD_NEW_BUILD_REQ, payload }),
    getAllBuildReq: (payload) => dispatch({ type: GET_ALL_BUILDS_REQ, payload}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    getAllTestPlanReq: () => dispatch({type: GET_ALL_ACTIVE_TESTPLAN_REQ}),
    deleteBuildReq: (payload) => dispatch({ type: DELETE_BUILD_REQ, payload}),
    resetDeleteRedux: () => dispatch({type: RESET_DELETE_BUILD})
  }
}


const BuildListPage = (props) => {

  const history = useHistory();

  //const {classes} = props;

  const {listBuilds, build, getAllBuildReq, project, getAllTestPlanReq, listTestPlan, role, displayMsg, deleteBuildReq, resetDeleteRedux, insBuildsDelete} = props;

  const [BUILD_SEARCH_CONDITIONS, setSearchConditions] = useState(BUILDS_SEARCH);

  const [array, setArray] = React.useState([]);

  //delete TP dialog
  const [open, setOpen] = React.useState(false);

  //Delete TP infor
  const [buildInfor, setBuildInfor] = React.useState({
    projectid: project,
    buildid: ''
  });

  const [searchConditions, setConditions] = useState({
    buildName: '',
    active: -1,
    testplanName: -1
  });

  const convertTestplanItem = (listTestPlan) => {
    const arr = listTestPlan.slice();
    arr.map(item => {item.value = item.testplanname; item.label = item.testplanname; return item;})
    return arr;
  }

  const searchBuild = () => {
    if (searchConditions.active === -1 && searchConditions.buildName === '' && searchConditions.testplanName === ''){
      handleArray(listBuilds);
    } 
    else{
      if(searchConditions.active === -1)
        handleArray(listBuilds.filter((item) => {
        if(item.buildname.toLowerCase().includes(searchConditions.buildName.toLowerCase())
        && item.testplan.testplanname.toLowerCase().includes(searchConditions.testplanName.toLowerCase()))
          return listBuilds;}))
      else
        handleArray(listBuilds.filter((item) => {
        if(item.buildname.toLowerCase().includes(searchConditions.buildName.toLowerCase()) && searchConditions.active === item.is_active
        && item.testplan.testplanname.toLowerCase().includes(searchConditions.testplanName.toLowerCase()))
          return listBuilds;}))
    }
  }

  const handleArray = (arrData) => {   

  setArray([]);
  for(let i in arrData){
    let temp_active = 0;
    if(arrData[i].is_active === true)
    temp_active = 0
    else
    temp_active = 4 

    let temp_public = 0;
    if(arrData[i].is_open === true)
    temp_public = 0
    else
    temp_public = 4 

    setArray(array => [...array, {
      _id: arrData[i]._id,
      buildname: arrData[i].buildname,
      descriptions: arrData[i].description,
      is_active: arrData[i].is_active,
      is_open: arrData[i].is_open,
      releasedate: arrData[i].releasedate,
      testplanname: arrData[i]?.testplan?.testplanname
    }]);

  }
}

  useEffect(()=>{
    build.success = "";
    getAllBuildReq(project);
    getAllTestPlanReq();
    setArray([]);
  },[]);

  useEffect(()=>{
    if(build.success === true)
      if(insBuildsDelete.sucess !== false)
        handleArray(listBuilds);
        //console.log(listBuilds);
  },[build])


  useEffect(()=>{
    if (listTestPlan){
      BUILD_SEARCH_CONDITIONS[1].listValues=convertTestplanItem(listTestPlan);
    }
  },[listTestPlan])




  useEffect(()=>{
    if (searchConditions.active === -1 && searchConditions.buildName === '' && searchConditions.testplanName === -1){
      handleArray(listBuilds);
    } 
    else if(searchConditions.active === -1 && searchConditions.buildName !== '' && searchConditions.testplanName === -1){
        handleArray(listBuilds.filter((item) => {
          if(item.buildname.toLowerCase().includes(searchConditions.buildName.toLowerCase()))
            return listBuilds;}))  
    }
    else if(searchConditions.active === -1 && searchConditions.testplanName !== -1){
        handleArray(listBuilds.filter((item) => {
          if(item.buildname.toLowerCase().includes(searchConditions.buildName.toLowerCase())
          && item.testplan.testplanname.toLowerCase().includes(searchConditions.testplanName.toLowerCase()))
            return listBuilds;}))
    }
    else if(searchConditions.active !== -1 && searchConditions.testplanName === -1){
        handleArray(listBuilds.filter((item) => {
          if(item.buildname.toLowerCase().includes(searchConditions.buildName.toLowerCase()) 
          && searchConditions.active === item.is_active)
            return listBuilds;}))
    }
    else{
        handleArray(listBuilds.filter((item) => {
          if(item.buildname.toLowerCase().includes(searchConditions.buildName.toLowerCase()) && searchConditions.active === item.is_active
          && item.testplan.testplanname.toLowerCase().includes(searchConditions.testplanName.toLowerCase()))
            return listBuilds;}))  
    }
  },[searchConditions]);


  const handleClickNewBuild = () => {
    history.push({
      pathname: window.location.pathname+"/new-build",
      state: array
  });
  }

  const navigateToDetailPage = () => {
      history.push(window.location.pathname+"/buildDetail");
  }

  const handleViewRP = (row) => {
    history.push(window.location.pathname+"/"+row._id+"/report");
  };


  const handleChangeConditions = (props, data) => {
    setConditions({...searchConditions, [props]: data });
  }
  // --> delete TP
  useEffect(()=>{
    if (insBuildsDelete.sucess === false){
      //displayMsg({
        //content: "  Do not allow Tester role !",
         //type: 'error'
      // }); 
      //setEnableDeleteBtn(true);
      //setLoadingg(false);
      //getAllBuildReq(project);
      //getAllTestPlanReq();
      insBuildsDelete.sucess = true;
      resetDeleteRedux();
    } else if (insBuildsDelete.sucess === true) {
      displayMsg({
        content: "Delete build successfully !",
        type: 'success'
      });
      getAllBuildReq(project);
      getAllTestPlanReq();
      //setArray([]);
      //setEnableDeleteBtn(true);
      //setLoadingg(false);
      resetDeleteRedux();
      //history.goBack();
      }
  },[insBuildsDelete.sucess]);

  const deleteBuild = (id) => {
    setBuildInfor({...buildInfor, buildid: id});
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete=()=>{
    build.success = "";
    deleteBuildReq(buildInfor);
    setOpen(false);
  };
// <-- delete TP

  return(
    <div>

      <Helmet title="Builds/Releases Management" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Builds/Releases List
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
            {(role === 'Project Manager' || role === 'Test Lead') && <Button variant="contained" color="primary" onClick={handleClickNewBuild}>
              <AddIcon />
              New Build
            </Button>}
          </div>
          {/* Delete TP dialog */}
          <Grid item>
          {(role === 'Project Manager' || role === 'Test Lead') &&
                <Dialog open={open} >
                  <DialogTitle>Confirm</DialogTitle>
                  <DialogContent>Are you sure want to delete this build?</DialogContent>
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
        {build.success === true ? 
          <EnhancedTable
            rows={array}
            headerList = {BUILDS_HEADERS}
            onClick={navigateToDetailPage}
            conditions={BUILD_SEARCH_CONDITIONS}
            setConditions={handleChangeConditions}
            searchMethod={searchBuild}
            handleDefaultDeleteAction={deleteBuild}
            viewRPAction={handleViewRP}
            type='build'
            load={build.success}
          />:
          <EnhancedTable
            rows={[]}
            headerList = {BUILDS_HEADERS}
            //conditions={BUILD_SEARCH_CONDITIONS}
            type='build'
            load={build.success}
          />
          }
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(BuildListPage));

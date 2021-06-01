import React, {useEffect, useState} from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import EnhancedTable from '../../../components/Table/index';
import Helmet from 'react-helmet';
import {BUILDS_HEADERS} from '../../../components/Table/DefineHeader';
import {BUILDS_SEARCH} from '../../../components/Table/DefineSearch';
import { connect } from 'react-redux';
import {ADD_NEW_BUILD_REQ, GET_ALL_BUILDS_REQ} from '../../../redux/build-release/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { GET_ALL_ACTIVE_TESTPLAN_REQ} from '../../../redux/test-plan/constants';
import {
  Grid,
  Typography,
  Divider, 
  Button
} from '@material-ui/core';

import {
  Add as AddIcon,
} from "@material-ui/icons";


//MAP STATES TO PROPS - REDUX
function mapStateToProps(state) {
  return {
    listBuilds: state.build.listBuilds,
    project: state.project.currentSelectedProject,
    listTestPlan: state.testplan.listActiveTestplan,
    role: state.project.currentRole
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    addNewBuildReq: (payload) => dispatch({ type: ADD_NEW_BUILD_REQ, payload }),
    getAllBuildReq: (payload) => dispatch({ type: GET_ALL_BUILDS_REQ, payload}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    getAllTestPlanReq: () => dispatch({type: GET_ALL_ACTIVE_TESTPLAN_REQ})
  }
}


const BuildListPage = (props) => {

  const history = useHistory();

  const {classes} = props;

  const {listBuilds, getAllBuildReq, project, getAllTestPlanReq, listTestPlan, role} = props;

  const [BUILD_SEARCH_CONDITIONS, setSearchConditions] = useState(BUILDS_SEARCH);

  const [array, setArray] = React.useState([]);

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
      testplanname: arrData[i].testplan
    }]);

  }
}

  useEffect(()=>{
    getAllBuildReq(project);
    getAllTestPlanReq();
    setArray([]);
  },[]);

  useEffect(()=>{
    handleArray(listBuilds);
  },[listBuilds])


  useEffect(()=>{
    if (listTestPlan){
      BUILD_SEARCH_CONDITIONS[1].listValues=convertTestplanItem(listTestPlan);
    }
  },[listTestPlan])


  useEffect(()=>{
    console.log(BUILD_SEARCH_CONDITIONS);
  },[BUILD_SEARCH_CONDITIONS])

  useEffect(()=>{
    console.log('keyword: '+ 'buildname: '+searchConditions.buildName + '   ' +'active: '+ searchConditions.active+'  '+ 'testplanName: '+searchConditions.testplanName);
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
    history.push(window.location.pathname+"/new-build");
  }

  const navigateToDetailPage = () => {
      history.push(window.location.pathname+"/buildDetail");
  }


  const handleChangeConditions = (props, data) => {
    setConditions({...searchConditions, [props]: data });
  }

  return(
    <div>

      <Helmet title="Build/Release Management" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Build/Release List
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
            {(role === 'projectmanager' || role === 'testlead') && <Button variant="contained" color="primary" onClick={handleClickNewBuild}>
              <AddIcon />
              New Build
            </Button>}
          </div>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable
            rows={array}
            headerList = {BUILDS_HEADERS}
            onClick={navigateToDetailPage}
            conditions={BUILD_SEARCH_CONDITIONS}
            setConditions={handleChangeConditions}
            searchMethod={searchBuild}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(BuildListPage));

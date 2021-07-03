import React, { useEffect, useState } from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import EnhancedTable from '../../../components/Table/index';
import Helmet from 'react-helmet';
import {TEST_EXECUTION_HEADERS} from '../../../components/Table/DefineHeader';
import {TEST_EXEC_SEARCH} from '../../../components/Table/DefineSearch';
import { GET_ALL_TESTEXEC_REQ} from '../../../redux/test-execution/constants';
import { GET_ALL_ACTIVE_TESTPLAN_REQ} from '../../../redux/test-plan/constants';

import { connect } from 'react-redux';
import {
  Grid,
  Typography,
  Divider,
  Button
} from '@material-ui/core';

import {
  Add as AddIcon,
} from "@material-ui/icons";
import { GET_ALL_BUILD_ACTIVE_REQ, GET_ALL_BUILD_TESTPLAN_REQ, RESET_BUILD_ACTIVE, RESET_BUILD_TESTPLAN } from "../../../redux/build-release/constants";
import LinearProgress from '@material-ui/core/LinearProgress';

// const NavLink = React.forwardRef((props, ref) => (
//   <RouterNavLink innerRef={ref} {...props} />
// ));


//MAP STATES TO PROPS - REDUX
function mapStateToProps(state) {
  return {
    listTestExec: state.testexec.listTestExec,
    listTestPlan: state.testplan.listActiveTestplan,
    listBuild: state.build.listBuildActive,
    listBuildByTestPlan: state.build.listBuildsByTestplan
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    //addNewBuildReq: (payload) => dispatch({ type: ADD_NEW_BUILD_REQ, payload }),
    getAllTestExecReq: () => dispatch({ type: GET_ALL_TESTEXEC_REQ}),
    getAllTestPlanReq: () => dispatch({type: GET_ALL_ACTIVE_TESTPLAN_REQ}),
    getAllBuildReq: (payload) => dispatch({type: GET_ALL_BUILD_ACTIVE_REQ, payload}),
    getBuildByTestplan: (payload) => dispatch({type: GET_ALL_BUILD_TESTPLAN_REQ, payload}),
    resetBuildActive: () => dispatch({type: RESET_BUILD_ACTIVE}),
    resetBuildTestplan: () => dispatch({type: RESET_BUILD_TESTPLAN})
  }
}



const TestExecutionListPage = (props) => {
  //const {classes} = props;

  const {listTestExec, listTestPlan, getAllTestExecReq, getAllTestPlanReq, getAllBuildReq, getBuildByTestplan, listBuild, listBuildByTestPlan, resetBuildActive, resetBuildTestplan} = props;

  const [listTestexec, setListTestExec] = useState([]);

  const [array, setArray] = React.useState(listTestexec);

  const [arrayExec, setArrayExec] = React.useState([]);

  const [TEST_EXEC_SEARCH_CONDITIONS, setSearchConditions] = useState(TEST_EXEC_SEARCH);

  const [searchConditions, setConditions] = useState({
    testexecName: '',
    testplanName: -1,
    buildName: -1,
    status: -1
  });

  //load TP bar
  const [count, setCount] = React.useState(0);
  const [count1, setCount1] = React.useState(0);

  const history = useHistory();

  const handleClickNewTestExecution = () => {
    history.push(window.location.pathname+"/create-test-execution");
  }

  const navigateToEditPage = (row) =>{
      history.push(window.location.pathname+"/edit/"+row._id);
  }

  const searchTestExec = () =>{

  }

  const handleChangeConditions = (props, data) => {
    setConditions({...searchConditions, [props]: data });
  }

  const convertTestplanItem = (listTestPlan) => {
    const arr = listTestPlan.slice();
    arr.map(item => {item.value = item.testplanname; item.label = item.testplanname; return item;})
    return arr;
  }

  const convertBuildItem = (listBuild) => {
    const arr = listBuild.slice();
      arr.map(item => {item.value = item.buildname; item.label = item.buildname; return item;})
      console.log(arr);
      return arr;
 
  }

  useEffect(()=>{
    getAllTestExecReq();
    getAllTestPlanReq();
    getAllBuildReq({projectid: localStorage.getItem('selectProject')});
  },[]);

  useEffect(()=>{
    if (listTestPlan) {
      TEST_EXEC_SEARCH_CONDITIONS[1].listValues = convertTestplanItem(listTestPlan);
    }
    if (listBuild.length !== 0){
      TEST_EXEC_SEARCH_CONDITIONS[2].listValues = convertBuildItem(listBuild[0].build);
    }
  },[listTestPlan, listBuild])
  


  useEffect(()=>{
    console.log(TEST_EXEC_SEARCH_CONDITIONS);
  },[TEST_EXEC_SEARCH_CONDITIONS])

 



  useEffect(()=>{
    console.log('keyword: ' + searchConditions.status+'  '+searchConditions.testplanName+'  '+searchConditions.testexecName);
    var tempArr = [];
    listTestExec.forEach((item)=>{
      tempArr.push({_id: item._id, status: item.status, testexecutionname: item.testexecutionname, description: item.description, tester: item.tester ? item.tester.username : '', testplanname: item.testplan.testplanname, buildname: item.build.buildname })
    });
    setListTestExec(tempArr);
    setArrayExec(tempArr);
    //load bar
    if(count < 3){
      setCount(count+1);
      setTimeout(()=>{
        setCount1(count1+1);
      },200);}
  },[listTestExec]);

  useEffect(()=>{
    setArray(arrayExec);
    console.log('array: '+ JSON.stringify(array));

  },[arrayExec]);


  useEffect(()=>{
      if (searchConditions.status === -1 && searchConditions.testplanName === -1 && searchConditions.testexecName === '' && searchConditions.buildName === -1){
      setArray(listTestexec);
    } 
    else if(searchConditions.status === -1 && searchConditions.testplanName === -1 && searchConditions.buildName === -1){
        setArray(listTestexec.filter((item) => {
          if(item.testexecutionname.toLowerCase().includes(searchConditions.testexecName.toLowerCase()))
            return listTestexec;}));
    }
    else if(searchConditions.status === -1 && searchConditions.testplanName === -1 && searchConditions.buildName !== -1){
      setArray(listTestexec.filter((item) => {
        if(item.testexecutionname.toLowerCase().includes(searchConditions.testexecName.toLowerCase())
        && item.buildname.toLowerCase().includes(searchConditions.buildName.toLowerCase()))
          return listTestexec;}));
    }
    else if(searchConditions.status === -1 && searchConditions.testplanName !== -1 && searchConditions.buildName !== -1){
        setArray(listTestexec.filter((item) => {
          if(item.testplanname.toLowerCase().includes(searchConditions.testplanName.toLowerCase())
          && item.testexecutionname.toLowerCase().includes(searchConditions.testexecName.toLowerCase())
          && item.buildname.toLowerCase().includes(searchConditions.buildName.toLowerCase()))
            return listTestexec;}));
    }
    else if(searchConditions.status !== -1 && searchConditions.testplanName !== -1 && searchConditions.buildName !== -1){
        setArray(listTestexec.filter((item) => {
          if(searchConditions.status === item.status
          && item.testplanname.toLowerCase().includes(searchConditions.testplanName.toLowerCase())
          && item.testexecutionname.toLowerCase().includes(searchConditions.testexecName.toLowerCase())
          && item.buildname.toLowerCase().includes(searchConditions.buildName.toLowerCase()))
            return listTestexec;}));
    }
    else if(searchConditions.status !== -1 && searchConditions.testplanName === -1 && searchConditions.buildName === -1){
        setArray(listTestexec.filter((item) => {
          if(searchConditions.status === item.status
          && item.testexecutionname.toLowerCase().includes(searchConditions.testexecName.toLowerCase()))
            return listTestexec;}));
    }
    else if(searchConditions.status !== -1 && searchConditions.testplanName !== -1 && searchConditions.buildName === -1){
        setArray(listTestexec.filter((item) => {
          if(searchConditions.status === item.status
          && item.testplanname.toLowerCase().includes(searchConditions.testplanName.toLowerCase())
          && item.testexecutionname.toLowerCase().includes(searchConditions.testexecName.toLowerCase()))
            return listTestexec;}));
    }
    else if(searchConditions.status === -1 && searchConditions.testplanName !== -1 && searchConditions.buildName === -1){
      setArray(listTestexec.filter((item) => {
        if(item.testplanname.toLowerCase().includes(searchConditions.testplanName.toLowerCase())
        && item.testexecutionname.toLowerCase().includes(searchConditions.testexecName.toLowerCase()))
          return listTestexec;}));
    }
    else if(searchConditions.status !== -1 && searchConditions.testplanName === -1  && searchConditions.buildName !== -1){
        setArray(listTestexec.filter((item) => {
          if(searchConditions.status === item.status
          && item.testexecutionname.toLowerCase().includes(searchConditions.testexecName.toLowerCase())
          && item.buildname.toLowerCase().includes(searchConditions.buildName.toLowerCase()))
            return listTestexec;}));
    }
    else {
      setArray(listTestexec);
    }

  },[searchConditions]);

  const navigateOverviewPage = (id) =>{
    history.push(window.location.pathname+"/"+id);
  };

  return(
    <div>

      <Helmet title="Service Management" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Test Execution List
          </Typography>
        </Grid>
        <Grid item>
          <div>
            <Button variant="contained" color="primary" onClick={handleClickNewTestExecution}>
              <AddIcon />
              New Test Execution
            </Button>
          </div>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          {/* Load bar */}
        {count1 < 2 && <LinearProgress />}
          <EnhancedTable
            rows={array}
            headerList = {TEST_EXECUTION_HEADERS}
            conditions={TEST_EXEC_SEARCH_CONDITIONS}
            setConditions={handleChangeConditions}
            searchMethod={searchTestExec}
            handleDefaultDeleteAction={navigateOverviewPage}
            viewAction={navigateToEditPage}
            type='testexecution'
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TestExecutionListPage));
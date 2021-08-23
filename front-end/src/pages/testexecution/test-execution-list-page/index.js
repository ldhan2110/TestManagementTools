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


//MAP STATES TO PROPS - REDUX
function mapStateToProps(state) {
  return {
    testexec: state.testexec,
    build: state.build,
    testplan: state.testplan,
    listTestExec: state.testexec.listTestExec,
    listTestPlan: state.testplan.listActiveTestplan,
    listBuild: state.build.listBuildActive,
    listBuildByTestPlan: state.build.listBuildsByTestplan
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    getAllTestExecReq: () => dispatch({ type: GET_ALL_TESTEXEC_REQ}),
    getAllTestPlanReq: () => dispatch({type: GET_ALL_ACTIVE_TESTPLAN_REQ}),
    getAllBuildReq: (payload) => dispatch({type: GET_ALL_BUILD_ACTIVE_REQ, payload}),
    getBuildByTestplan: (payload) => dispatch({type: GET_ALL_BUILD_TESTPLAN_REQ, payload}),
    resetBuildActive: () => dispatch({type: RESET_BUILD_ACTIVE}),
    resetBuildTestplan: () => dispatch({type: RESET_BUILD_TESTPLAN})
  }
}



const TestExecutionListPage = (props) => {

  const {listTestExec, testexec, build, testplan, listTestPlan, getAllTestExecReq, getAllTestPlanReq, getAllBuildReq, listBuild} = props;

  const [listTestexec, setListTestExec] = useState([]);

  const [array, setArray] = React.useState(listTestexec);

  const [arrayExec, setArrayExec] = React.useState([]);

  const [TEST_EXEC_SEARCH_CONDITIONS, setSearchConditions] = useState(TEST_EXEC_SEARCH);

  const [searchConditions, setConditions] = useState({
    testexecName: '',
    testplanName: -1,
    buildName: -1,
    status: -1,
    username: ''
  });

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
      return arr; 
  }


  useEffect(()=>{
    testexec.success = "";
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
    var tempArr = [];
    listTestExec.forEach((item)=>{
      tempArr.push({_id: item._id, status: item.status, testexecutionname: item.testexecutionname, description: item.description, tester: item.tester ? item.tester.username : '', testplanname: item.testplan.testplanname, buildname: item.build.buildname })
    });
    setListTestExec(tempArr);
    setArrayExec(tempArr);
  },[listTestExec]);

  useEffect(()=>{
    setArray(arrayExec);
  },[arrayExec]);


  useEffect(()=>{
      if (searchConditions.status === -1 && searchConditions.testplanName === -1 && searchConditions.testexecName === '' && searchConditions.buildName === -1 && searchConditions.username === ''){
      setArray(listTestexec);
    } 
    else if(searchConditions.status === -1 && searchConditions.testplanName === -1 && searchConditions.buildName === -1 && searchConditions.username === ''){
        setArray(listTestexec.filter((item) => {
          if(item.testexecutionname.toLowerCase().includes(searchConditions.testexecName.toLowerCase()))
            return listTestexec;}));
    }
    else if(searchConditions.status === -1 && searchConditions.testplanName === -1 && searchConditions.buildName !== -1 && searchConditions.username === ''){
      setArray(listTestexec.filter((item) => {
        if(item.testexecutionname.toLowerCase().includes(searchConditions.testexecName.toLowerCase())
        && item.buildname.toLowerCase().includes(searchConditions.buildName.toLowerCase()))
          return listTestexec;}));
    }
    else if(searchConditions.status === -1 && searchConditions.testplanName !== -1 && searchConditions.buildName !== -1 && searchConditions.username === ''){
        setArray(listTestexec.filter((item) => {
          if(item.testplanname.toLowerCase().includes(searchConditions.testplanName.toLowerCase())
          && item.testexecutionname.toLowerCase().includes(searchConditions.testexecName.toLowerCase())
          && item.buildname.toLowerCase().includes(searchConditions.buildName.toLowerCase()))
            return listTestexec;}));
    }
    else if(searchConditions.status !== -1 && searchConditions.testplanName !== -1 && searchConditions.buildName !== -1 && searchConditions.username === ''){
        setArray(listTestexec.filter((item) => {
          if(searchConditions.status === item.status
          && item.testplanname.toLowerCase().includes(searchConditions.testplanName.toLowerCase())
          && item.testexecutionname.toLowerCase().includes(searchConditions.testexecName.toLowerCase())
          && item.buildname.toLowerCase().includes(searchConditions.buildName.toLowerCase()))
            return listTestexec;}));
    }
    else if(searchConditions.status !== -1 && searchConditions.testplanName === -1 && searchConditions.buildName === -1 && searchConditions.username === ''){
        setArray(listTestexec.filter((item) => {
          if(searchConditions.status === item.status
          && item.testexecutionname.toLowerCase().includes(searchConditions.testexecName.toLowerCase()))
            return listTestexec;}));
    }
    else if(searchConditions.status !== -1 && searchConditions.testplanName !== -1 && searchConditions.buildName === -1 && searchConditions.username === ''){
        setArray(listTestexec.filter((item) => {
          if(searchConditions.status === item.status
          && item.testplanname.toLowerCase().includes(searchConditions.testplanName.toLowerCase())
          && item.testexecutionname.toLowerCase().includes(searchConditions.testexecName.toLowerCase()))
            return listTestexec;}));
    }
    else if(searchConditions.status === -1 && searchConditions.testplanName !== -1 && searchConditions.buildName === -1 && searchConditions.username === ''){
      setArray(listTestexec.filter((item) => {
        if(item.testplanname.toLowerCase().includes(searchConditions.testplanName.toLowerCase())
        && item.testexecutionname.toLowerCase().includes(searchConditions.testexecName.toLowerCase()))
          return listTestexec;}));
    }
    else if(searchConditions.status !== -1 && searchConditions.testplanName === -1  && searchConditions.buildName !== -1 && searchConditions.username === ''){
        setArray(listTestexec.filter((item) => {
          if(searchConditions.status === item.status
          && item.testexecutionname.toLowerCase().includes(searchConditions.testexecName.toLowerCase())
          && item.buildname.toLowerCase().includes(searchConditions.buildName.toLowerCase()))
            return listTestexec;}));
    }
    else if(searchConditions.status === -1 && searchConditions.testplanName === -1 && searchConditions.buildName === -1 && searchConditions.username !== ''){
      setArray(listTestexec.filter((item) => {
        if(item.testexecutionname.toLowerCase().includes(searchConditions.testexecName.toLowerCase())
        && item.tester.toLowerCase().includes(searchConditions.username.toLowerCase()))
          return listTestexec;}));
    }
    else if(searchConditions.status === -1 && searchConditions.testplanName !== -1 && searchConditions.buildName === -1 && searchConditions.username !== ''){
      setArray(listTestexec.filter((item) => {
        if(item.testplanname.toLowerCase().includes(searchConditions.testplanName.toLowerCase())
        && item.testexecutionname.toLowerCase().includes(searchConditions.testexecName.toLowerCase())
        && item.tester.toLowerCase().includes(searchConditions.username.toLowerCase()))
          return listTestexec;}));
    }
    else if(searchConditions.status === -1 && searchConditions.testplanName === -1 && searchConditions.buildName !== -1 && searchConditions.username !== ''){
      setArray(listTestexec.filter((item) => {
        if(item.buildname.toLowerCase().includes(searchConditions.buildname.toLowerCase())
        && item.testexecutionname.toLowerCase().includes(searchConditions.testexecName.toLowerCase())
        && item.tester.toLowerCase().includes(searchConditions.username.toLowerCase()))
          return listTestexec;}));
    }
    else if(searchConditions.status !== -1 && searchConditions.testplanName === -1  && searchConditions.buildName === -1 && searchConditions.username !== ''){
      setArray(listTestexec.filter((item) => {
        if(searchConditions.status === item.status
        && item.testexecutionname.toLowerCase().includes(searchConditions.testexecName.toLowerCase())
        && item.tester.toLowerCase().includes(searchConditions.username.toLowerCase()))
          return listTestexec;}));
  }
    else if(searchConditions.status === -1 && searchConditions.testplanName !== -1 && searchConditions.buildName !== -1 && searchConditions.username !== ''){
      setArray(listTestexec.filter((item) => {
        if(item.testplanname.toLowerCase().includes(searchConditions.testplanName.toLowerCase())
        && item.testexecutionname.toLowerCase().includes(searchConditions.testexecName.toLowerCase())
        && item.buildname.toLowerCase().includes(searchConditions.buildName.toLowerCase())
        && item.tester.toLowerCase().includes(searchConditions.username.toLowerCase()))
          return listTestexec;}));
    }
    else if(searchConditions.status !== -1 && searchConditions.testplanName !== -1 && searchConditions.buildName === -1 && searchConditions.username !== ''){
      setArray(listTestexec.filter((item) => {
        if(searchConditions.status === item.status
        && item.testplanname.toLowerCase().includes(searchConditions.testplanName.toLowerCase())
        && item.testexecutionname.toLowerCase().includes(searchConditions.testexecName.toLowerCase())
        && item.tester.toLowerCase().includes(searchConditions.username.toLowerCase()))
          return listTestexec;}));
    }
    else if(searchConditions.status !== -1 && searchConditions.testplanName === -1 && searchConditions.buildName !== -1 && searchConditions.username !== ''){
      setArray(listTestexec.filter((item) => {
        if(searchConditions.status === item.status
        && item.testexecutionname.toLowerCase().includes(searchConditions.testexecName.toLowerCase())
        && item.buildname.toLowerCase().includes(searchConditions.buildName.toLowerCase())
        && item.tester.toLowerCase().includes(searchConditions.username.toLowerCase()))
          return listTestexec;}));
    }
    else if(searchConditions.status !== -1 && searchConditions.testplanName !== -1 && searchConditions.buildName !== -1 && searchConditions.username !== ''){
      setArray(listTestexec.filter((item) => {
        if(searchConditions.status === item.status
        && item.testplanname.toLowerCase().includes(searchConditions.testplanName.toLowerCase())
        && item.testexecutionname.toLowerCase().includes(searchConditions.testexecName.toLowerCase())
        && item.buildname.toLowerCase().includes(searchConditions.buildName.toLowerCase())
        && item.tester.toLowerCase().includes(searchConditions.username.toLowerCase()))
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

      <Helmet title="Test Executions Management" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Test Executions List
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
        {(testexec.success === true) ? 
          <EnhancedTable
            rows={array}
            headerList = {TEST_EXECUTION_HEADERS}
            conditions={TEST_EXEC_SEARCH_CONDITIONS, TEST_EXEC_SEARCH}
            setConditions={handleChangeConditions}
            searchMethod={searchTestExec}
            handleDefaultDeleteAction={navigateOverviewPage}
            viewAction={navigateToEditPage}
            type='testexecution'
            load={(testexec.success)}
          />: 
          <EnhancedTable
            rows={[]}
            headerList = {TEST_EXECUTION_HEADERS}
            //conditions={TEST_EXEC_SEARCH_CONDITIONS, TEST_EXEC_SEARCH}
            viewAction={navigateToEditPage}
            type='testexecution'
            load={(testexec.success)}
          />
          }
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TestExecutionListPage));
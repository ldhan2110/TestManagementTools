import React, {useState, useEffect} from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import { useHistory } from "react-router-dom";
import SelectBox from '../../../components/Selectbox';
import SelectTestCasePopup from '../../testcases/select-test-case-page/index';
import { connect } from 'react-redux';
import {
  Grid,
  Typography,
  FormControl,
  Button,
  Divider,
  TextField,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select, MenuItem
} from '@material-ui/core';

import {GET_ALL_USERS_OF_PROJECT_REQ} from '../../../redux/users/constants';
import { ADD_TESTEXEC_REQ, GET_ALL_TESTEXEC_REQ, RESET_ADD_TEST_EXEC } from '../../../redux/test-execution/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { GET_ALL_ACTIVE_TESTPLAN_REQ } from "../../../redux/test-plan/constants";
import { GET_ALL_BUILD_TESTPLAN_REQ } from "../../../redux/build-release/constants";
import build from "@date-io/date-fns";


//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { 
    listUser: state.user.listUsersOfProject,
    listtestcaseselect: state.testcase.listTestcaseSelect,
    insTestexec: state.testexec.insTestexec,
    listTestExec: state.testexec.listTestExec,
    listActiveTestplan: state.testplan.listActiveTestplan,
    listBuildByTestPlan: state.build.listBuildsByTestplan
   }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    getAllUserReq: (payload) => dispatch({type: GET_ALL_USERS_OF_PROJECT_REQ, payload}),
    addNewTestexecReq: (payload) => dispatch({type: ADD_TESTEXEC_REQ, payload}),
    getAllTestExecReq: (payload) => dispatch({type: GET_ALL_TESTEXEC_REQ}),
    getAllActiveTestplanReq: (payload) => dispatch({type: GET_ALL_ACTIVE_TESTPLAN_REQ}),
    getBuildByTestPlan: (payload) => dispatch({type: GET_ALL_BUILD_TESTPLAN_REQ, payload}),
    resetAddRedux: () => dispatch({type: RESET_ADD_TEST_EXEC})
  }
}

const NewTestExecutionPage = (props) => {
    const {classes, listTestExecution, listtestcaseselect} = props;

    const {listUser, listActiveTestplan, listTestExec, getAllUserReq, addNewTestexecReq, insTestexec, displayMsg, getAllTestExecReq, getAllActiveTestplanReq, resetAddRedux, listBuildByTestPlan, getBuildByTestPlan} = props;

    const [open,setOpenPopup] = useState(false);

    const [listBuild, setListBuild] = useState([]);
    const [checkError, setCheckError] = useState(false);
    const [testExecInfo, setTestExecInfo] = useState({
        testexecutionname: '',
        description: '',
        testplanname: '',
        buildname: '',
        listexectestcases: [],
        is_public: false,
        is_active: false,
        assigntester: '',
        exist_testexecution: ''
    });
    const history = useHistory();
    const [error, setError] = useState({
      testexecutionname: 'ss',
      description: 'ss',
      testplanname: 'ss',
      buildname: 'ss'
    });
    useEffect(()=>{
      getAllUserReq(localStorage.getItem('selectProject'));
      getAllActiveTestplanReq();
      getAllTestExecReq();
    },[])

    useEffect(()=>{
      setListBuild(listBuildByTestPlan);
    },[listBuildByTestPlan])


    useEffect(()=>{
      if (listtestcaseselect !== null){
      var temparr = [];
      listtestcaseselect.forEach((item)=>{
          temparr.push({testcaseid: item._id});
      });
      setTestExecInfo({...testExecInfo, listexectestcases: temparr });
    }
    },[listtestcaseselect]);


    try {
      useEffect(()=>{
        if (insTestexec.sucess === false){
          displayMsg({
            content: insTestexec.errMsg,
            type: 'error'
          });
          resetAddRedux();
        } else if (insTestexec.sucess === true) {
          displayMsg({
            content: "Create Test Execution successfully !",
            type: 'success'
          });
          getAllTestExecReq();
          resetAddRedux();
          history.goBack();
        }
      },[insTestexec.sucess]);      
    } catch (error) {
      console.log("error: "+error);
    }

    useEffect(()=>{
      console.log(listTestExec);
    },[listTestExec]);




    const handleClose = () =>{
      history.goBack();      
    }

    const handleOpenSelectTC = () => {
      setOpenPopup(true);
    }

    const handleChange = (prop) => (event) => {
      if (prop !== 'is_public' && prop !== 'is_active')
        setTestExecInfo({ ...testExecInfo, [prop]: event.target.value });
      else
        setTestExecInfo({ ...testExecInfo, [prop]: !testExecInfo.prop });
      if (prop === 'testplanname'){
        getBuildByTestPlan({testplanname: event.target.value });
      }
    if(checkError == true)
    setError({ ...error, [prop]: event.target.value });
    };

    const handleCreateNewTestExec = () => {
      console.log('testExecInfo: '+JSON.stringify(testExecInfo));
      console.log('error: '+JSON.stringify(error));
      setCheckError(true);

    if(testExecInfo.description === "")
    setError({ ...testExecInfo, description: "" });

    if(testExecInfo.testexecutionname === "")
    setError({ ...testExecInfo, testexecutionname: "" });

    if(testExecInfo.description.trim().length == 0 || testExecInfo.testexecutionname.trim().length == 0
        ||testExecInfo.description.trim().length !== testExecInfo.description.length 
        || testExecInfo.testexecutionname.trim().length !== testExecInfo.testexecutionname.length){
          /*console.log('testExecInfo.description.length: '+testExecInfo.description.trim().length ==0 );
          console.log('testExecInfo.testexecutionname.length: '+testExecInfo.testexecutionname.trim().length);
          console.log('testExecInfo.description.length: '+testExecInfo.description.trim().length);
          console.log('testExecInfo.description.length: '+testExecInfo.description.length );
          console.log('testExecInfo.testexecutionname.length: '+testExecInfo.testexecutionname.trim().length );
          console.log('testExecInfo.testexecutionname.length: '+testExecInfo.testexecutionname.length );*/
        displayMsg({
          content: "Test Execution Name or Descriptions should not contain spaces or blanks",
          type: 'error'
        }); 
    }

    else if(testExecInfo.testplanname === ""){
      displayMsg({
        content: "Test Plan is required!",
        type: 'error'
      });
    }

    else if(testExecInfo.buildname=== ""){
      displayMsg({
        content: "Build/Release is required!",
        type: 'error'
      });
    }

    
    

    else if(testExecInfo.testexecutionname !== "" && testExecInfo.description !== "")
      addNewTestexecReq(testExecInfo);
    }
    
    return (
    <div>
        <Helmet title="New Test Execution" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            New Test Execution
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
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
        <form className={classes.content}>
          {/*<TextField id="testExecutionName" label="Test Execution Name" variant="outlined"  fullWidth  value={testExecInfo.testexecName} onChange={handleChange('testexecutionname')}/>
          <TextField id="descriptions" label="Descriptions" variant="outlined"  fullWidth  value={testExecInfo.description} onChange={handleChange('description')}/> */}
          
          <TextField id="testExecutionName" label="Test Execution Name" 
          variant="outlined"  fullWidth required inputProps={{maxLength : 16}} 
          value={testExecInfo.testexecutionname || ''} onChange={handleChange('testexecutionname')} 
          error={testExecInfo.testexecutionname.trim().length == 0  && error.testexecutionname.trim().length == 0  ? true : false}
          helperText={testExecInfo.testexecutionname.trim().length == 0 && error.testexecutionname.trim().length == 0 ? 'Test Execution Name is required' : ' '}/>

          <TextField id="descriptions" label="Descriptions" 
          variant="outlined"  fullWidth required multiline rows={20} 
          value={testExecInfo.description || ''} onChange={handleChange('description')} 
          error={testExecInfo.description.trim().length == 0 && error.description.trim().length == 0 ? true : false}
          helperText={testExecInfo.description.trim().length == 0 && error.description.trim().length == 0 ? 'Descriptions is required' : ' '}/>                      
        
        <FormControl variant="outlined" fullWidth>
           <InputLabel id="demo-simple-select-outlined-label">Test Plan</InputLabel>
            <Select
          labelId="testPlan"
          id="testPlan"
          value={testExecInfo.testplanname || ''}
          onChange={handleChange('testplanname')}
          label="testplanname"
          error={!testExecInfo.testplanname && !error.testplanname ? true : false}
          helperText={!testExecInfo.testplanname && !error.testplanname ? 'Test Plan is required' : ' '}

          /*labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="testplan"
          onChange={handleChange('testplanname')}*/
        >
          {listActiveTestplan.map((item, index) => <MenuItem key={index} value={item.testplanname}>{item.testplanname}</MenuItem>)}    
        </Select>
      </FormControl>

      <FormControl variant="outlined" fullWidth>
           <InputLabel id="build">Build/Release</InputLabel>
            <Select
          labelId="build"
          id="build"
          value={testExecInfo.buildname || ''}
          onChange={handleChange('buildname')}
          label="buildname"
          error={!testExecInfo.buildname && !error.buildname ? true : false}
          helperText={!testExecInfo.buildname && !error.buildname ? 'Build/Release is required' : ' '}

          /*labelId="build"
          id="build"
          label="build"
          onChange={handleChange('buildname')}*/
        >
          {listBuild.map((item, index) => <MenuItem key={index} value={item.buildname}>{item.buildname}</MenuItem>)}    
        </Select>
      </FormControl>



          <Grid container>
              <Grid item xs={3}>
                <p>Create from existing test execution ?</p>
              </Grid>
              <Grid item xs={9}>
                <SelectBox labelTitle="Create from existing test execution ?" listItems={listTestExecution ? listTestExecution : null} />
              </Grid>
          </Grid>

          <div>
            <Grid container spacing={3}>
              <Grid item>
                <p>Select Test Case: <b>{testExecInfo.listexectestcases.length} selected</b></p>
              </Grid>
              <Grid item>
                <SelectTestCasePopup isOpen={open} setOpen={setOpenPopup} selected={testExecInfo.listExecTestcase}/>
                <Button variant="contained" onClick={handleOpenSelectTC}>Add Test Case</Button>
              </Grid>
            </Grid>
          </div>
            
          <div>
             <FormControlLabel 
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" value = {testExecInfo.is_public} onChange={handleChange('is_public')} />}
              label="Public"
              labelPlacement="start"
            />
          </div>
          <div>
            <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" value = {testExecInfo.is_active} onChange={handleChange('is_active')}  />}
              label="Active"
              labelPlacement="start"
            />
          </div> 


          <FormControl variant="outlined" fullWidth>
           <InputLabel id="tester" >Assign Tester</InputLabel>
            <Select
          labelId="tester"
          id="tester"
          label="Tester"
          value={testExecInfo.assigntester}
          onChange={handleChange('assigntester')}
        >
           {listUser.map((item,index) => (
              <MenuItem key={index} value={item.username}>{item.username}</MenuItem>
          ))}
        </Select>
        </FormControl>

    

        
          <div className = {classes.btnGroup}>
          <Button variant="contained" color="primary" onClick={handleCreateNewTestExec}>
            Create
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </div>
        </form>
        </Grid>
      </Grid>
    </div>
    );
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(NewTestExecutionPage));
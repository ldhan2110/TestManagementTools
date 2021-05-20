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


//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { 
    listUser: state.user.listUsersOfProject,
    listtestcaseselect: state.testcase.listTestcaseSelect,
    insTestexec: state.testexec.insTestexec,
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

    const {listUser, listActiveTestplan, getAllUserReq, addNewTestexecReq, insTestexec, displayMsg, getAllTestExecReq, getAllActiveTestplanReq, resetAddRedux, listBuildByTestPlan, getBuildByTestPlan} = props;

    const [open,setOpenPopup] = useState(false);

    const [listBuild, setListBuild] = useState([]);
    
    const [testExecInfo, setTestExecInfo] = useState({
        testexecutionname: '',
        description: '',
        testplanname: '',
        buildname: '',
        listexectestcases: [],
        is_public: false,
        is_active: false,
        assigntester: ''
    });
    const history = useHistory();

    useEffect(()=>{
      getAllUserReq(localStorage.getItem('selectProject'));
      getAllActiveTestplanReq();
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
    };

    const handleCreateNewTestExec = () => {
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
          <TextField id="testExecutionName" label="Test Execution Name" variant="outlined"  fullWidth  value={testExecInfo.testexecName} onChange={handleChange('testexecutionname')}/>
          <TextField id="descriptions" label="Descriptions" variant="outlined"  fullWidth required multiline rows={15} value={testExecInfo.description} onChange={handleChange('description')}/>

        <FormControl variant="outlined" fullWidth>
           <InputLabel id="demo-simple-select-outlined-label">Test Plan</InputLabel>
            <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="testplan"
          onChange={handleChange('testplanname')}
        >
          {listActiveTestplan.map((item, index) => <MenuItem key={index} value={item.testplanname}>{item.testplanname}</MenuItem>)}    
        </Select>
      </FormControl>

      <FormControl variant="outlined" fullWidth>
           <InputLabel id="build">Build/Release</InputLabel>
            <Select
          labelId="build"
          id="build"
          label="build"
          //onChange={handleChange('testplanname')}
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
           <InputLabel id="tester">Assign Tester</InputLabel>
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
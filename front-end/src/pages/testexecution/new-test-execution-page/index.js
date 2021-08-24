import React, {useState, useEffect} from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import { useHistory } from "react-router-dom";
import SelectTestCasePopup from '../../testcases/select-test-case-page/index';
import { connect } from 'react-redux';
import MultipleSelect from "../../../components/MultipleSelect";
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
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GET_ALL_ACTIVE_REQUIREMENTS_REQ } from "../../../redux/requirements/constants";
import { RESET_LIST_TESTCASE_SELECT } from "../../../redux/test-case/constants";

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { 
    listUser: state.user.listUsersOfProject,
    listtestcaseselect: state.testcase.listTestcaseSelect,
    insTestexec: state.testexec.insTestexec,
    listActiveTestplan: state.testplan.listActiveTestplan,
    listBuildByTestPlan: state.build.listBuildsByTestplan,
    listTestExec: state.testexec.listTestExec,
    listRequirements: state.requirements.listActiveRequirements
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
    getAllActiveRequirementReq: (payload) => dispatch({type: GET_ALL_ACTIVE_REQUIREMENTS_REQ}),
    resetAddRedux: () => dispatch({type: RESET_ADD_TEST_EXEC}),
    resetSelectTC: () => dispatch({type: RESET_LIST_TESTCASE_SELECT})
  }
}

const NewTestExecutionPage = (props) => {
    const {classes, listtestcaseselect} = props;

    const {resetSelectTC,listRequirements, listUser, listActiveTestplan, getAllUserReq, addNewTestexecReq, insTestexec, displayMsg, getAllTestExecReq, getAllActiveTestplanReq, resetAddRedux, listBuildByTestPlan, getBuildByTestPlan, listTestExec, getAllActiveRequirementReq} = props;

    const [open,setOpenPopup] = useState(false);

    const [listBuild, setListBuild] = useState([]);
    const [checkError, setCheckError] = useState(false);
    const [selectRequirements, setListRequirements] = useState([]);
    const [testExecInfo, setTestExecInfo] = useState({
        exist_testexecution: '',
        testexecutionname: '',
        description: '',
        testplanname: '',
        buildname: '',
        listrequirement: [],
        listexectestcases: [],
        is_public: false,
        is_active: false,
        environment: '',
        assigntester: ''
    });
    const history = useHistory();
    const [error, setError] = useState({
      testexecutionname: 'ss',
      description: 'ss',
      testplanname: 'ss',
      buildname: 'ss',
    });

    const [enableCreateBtn, setEnableCreateBtn] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
      getAllUserReq(localStorage.getItem('selectProject'));
      getAllActiveTestplanReq();
      getAllTestExecReq();
      getAllActiveRequirementReq();
      resetSelectTC();
    },[])

    useEffect(()=>{
      if(testExecInfo.exist_testexecution === '')
        setListBuild(listBuildByTestPlan);
    },[listBuildByTestPlan])

    useEffect(()=>{
      setTestExecInfo({
        ...testExecInfo,
        listrequirement: covertFromName2Id(selectRequirements)
      })
    },[selectRequirements])

  
    useEffect(()=>{
      if (listtestcaseselect !== null){
      var temparr = [];
      listtestcaseselect.forEach((item)=>{
          temparr.push({testcaseid: item._id});
      });
      setTestExecInfo({...testExecInfo, listexectestcases: temparr });
    }
    },[listtestcaseselect]);

    useEffect(() => {
      if(testExecInfo.exist_testexecution !== '') {
        let tempExec = listTestExec.filter(item => item._id === testExecInfo.exist_testexecution);
        var temparr = [];
        tempExec[0].exectestcases.forEach((item)=>{
          temparr.push({testcaseid: item._id});
      });
        if(tempExec?.length > 0) {
          setTestExecInfo({ ...testExecInfo, 
            buildname: tempExec[0].build.buildname,
            testplanname: tempExec[0].testplan.testplanname,
            listexectestcases: temparr
          });
          setListBuild([{buildname: tempExec[0].build.buildname}]);
        }
        getBuildByTestPlan({testplanname: testExecInfo.testplanname });
      }      
      
    },[testExecInfo.exist_testexecution]);
    

    try {
      useEffect(()=>{
        if (insTestexec.sucess === false){
          displayMsg({
            content: insTestexec.errMsg,
            type: 'error'
          });
          setEnableCreateBtn(true);
          setLoading(false);
          resetAddRedux();
        } else if (insTestexec.sucess === true) {
          displayMsg({
            content: "Create Test Execution successfully !",
            type: 'success'
          });   
          //getAllTestExecReq();
          resetAddRedux();
          setEnableCreateBtn(true);
          setLoading(false);
          history.goBack();

        }
      },[insTestexec.sucess]);      
    } catch (error) {
      //console.log("error: "+error);
    }


  const covertFromName2Id = (name) => {
      var result = [];
      name.forEach(element => {
        result.push(listRequirements.filter(x => x.projectrequirementname === element)[0]._id);
      });
      return result;
    };


    const handleClose = () =>{
      history.goBack();      
    }

    const handleOpenSelectTC = () => {
      setOpenPopup(true);
    }

    const handleChange = (prop) => (event) => {
      if (prop === 'exist_testexecution')
        setTestExecInfo({ ...testExecInfo, [prop] : event.target.value });

      if (prop !== 'is_public' && prop !== 'is_active')
        setTestExecInfo({ ...testExecInfo, [prop]: event.target.value });

      else
        setTestExecInfo({ ...testExecInfo, [prop]: !testExecInfo.prop });

      if (prop === 'testplanname'){
        if(testExecInfo.exist_testexecution === '')
          getBuildByTestPlan({testplanname: event.target.value });
      }
      if(checkError === true)
      setError({ ...error, [prop]: event.target.value });
    };

    const handleCreateNewTestExec = () => {
      setCheckError(true);

      if(testExecInfo.description === "")
        setError({ ...testExecInfo, description: "" });

      if(testExecInfo.testexecutionname === "")
        setError({ ...testExecInfo, testexecutionname: "" });

      if(testExecInfo.description.trim().length === 0 || testExecInfo.testexecutionname.trim().length === 0
        ||testExecInfo.description.trim().length !== testExecInfo.description.length 
        || testExecInfo.testexecutionname.trim().length !== testExecInfo.testexecutionname.length){
        displayMsg({
          content: "Test Execution Name or Descriptions should not contain spaces before and after !",
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


      else if(testExecInfo.testexecutionname !== "" && testExecInfo.description !== ""){
        setEnableCreateBtn(false);
        setLoading(true);
        addNewTestexecReq(testExecInfo);
      }
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
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
        <form className={classes.content}>
          <TextField id="testExecutionName" label="Test Execution Name" 
          variant="outlined"  fullWidth required inputProps={{maxLength : 100}} 
          value={testExecInfo.testexecutionname || ''} onChange={handleChange('testexecutionname')} 
          error={testExecInfo.testexecutionname.trim().length === 0  && error.testexecutionname.trim().length === 0  ? true : false}
          helperText={testExecInfo.testexecutionname.trim().length === 0 && error.testexecutionname.trim().length === 0 ? 'Test Execution Name is required' : ' '}/>
        
          <FormControl variant="outlined" fullWidth required>   
          <InputLabel id="demo-simple-select-outlined-label">Test Plan</InputLabel>
          <Select
          labelId="testPlan"
          id="testPlan"
          value={testExecInfo.testplanname || ''}
          onChange={handleChange('testplanname')}
          label="Test Plan"
          error={!testExecInfo.testplanname && !error.testplanname ? true : false}
          helperText={!testExecInfo.testplanname && !error.testplanname ? 'Test Plan is required' : ' '}
          disabled={testExecInfo.exist_testexecution === '' ? false:true}
          >
          {listActiveTestplan.map((item, index) => <MenuItem key={index} value={item.testplanname}>{item.testplanname}</MenuItem>)}    
        </Select>
      </FormControl>

      <FormControl variant="outlined" fullWidth required>
           <InputLabel id="build" >Build/Release</InputLabel>
            <Select
          labelId="build"
          id="build"
          value={testExecInfo.buildname || ''}
          onChange={handleChange('buildname')}
          label="Build/Release"
          error={!testExecInfo.buildname && !error.buildname ? true : false}
          helperText={!testExecInfo.buildname && !error.buildname ? 'Build/Release is required' : ' '}
          disabled={testExecInfo.exist_testexecution === '' ? false:true}
        >
          {listBuild.map((item, index) => <MenuItem key={index} value={item.buildname}>{item.buildname}</MenuItem>)}    
        </Select>
      </FormControl>
      
{/*       <MultipleSelect title = {'Requirements'} 
      select={selectRequirements} 
      setSelect={setListRequirements} 
      listData={listRequirements}/> */}


          <Grid container>
              <FormControl variant="outlined" fullWidth>
              <InputLabel id="testexec" >Create from existing test execution ?</InputLabel>
            <Select
          labelId="testexec"
          id="testexec"
          onChange={handleChange('exist_testexecution')}
          label="Create from existing test execution ?">
            
          <MenuItem key={''} value={''}>&nbsp;</MenuItem>
          {listTestExec.map((item, index) => <MenuItem key={index} value={item._id}>{item.testexecutionname}</MenuItem>)}    
        </Select>
      </FormControl>

              
          </Grid>

          <div>
            <Grid container spacing={3}>
              <Grid item>
                <p>Select Test Case: <b> {testExecInfo.listexectestcases.length} selected</b></p>
              </Grid>
              <Grid item>
                <SelectTestCasePopup isOpen={open} setOpen={setOpenPopup} selected={testExecInfo.listexectestcases}/>
                <Button variant="contained" onClick={handleOpenSelectTC} disabled={testExecInfo.exist_testexecution === '' ? false:true}>Add Test Case</Button>
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

          <div style={{display: 'flex', flexDirection: 'row'}}>
            <TextField id="Environment" label="Environment" 
            variant="outlined"
            value={testExecInfo.environment || ''} onChange={handleChange('environment')}
            style={{marginRight: '10px', width: '350px'}} 
            />

           <FormControl variant="outlined" fullWidth>
           <InputLabel id="tester" >Assign Tester</InputLabel>
            <Select
          labelId="tester"
          id="tester"
          label="Tester"
          value={testExecInfo.assigntester}
          onChange={handleChange('assigntester')}
        >
           <MenuItem key={''} value={''}>&nbsp;</MenuItem>
           {listUser?.map((item,index) => (
              <MenuItem key={index} value={item.username}>{item.username}</MenuItem>
          ))}
        </Select>
        </FormControl></div>

        <TextField id="descriptions" label="Descriptions" 
        variant="outlined"  fullWidth required multiline rows={3} 
        value={testExecInfo.description || ''} onChange={handleChange('description')} 
        error={testExecInfo.description.trim().length === 0 && error.description.trim().length === 0 ? true : false}
        helperText={testExecInfo.description.trim().length === 0 && error.description.trim().length === 0 ? 'Descriptions is required' : ' '}/> 

        
          <div className = {classes.btnGroup}>
          <Button variant="contained" color="primary" disabled={enableCreateBtn ? false : true } startIcon={<AddIcon/>} onClick={handleCreateNewTestExec}>
            Create
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>
          <Button variant="contained" startIcon={<CancelIcon/>} onClick={handleClose}>
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
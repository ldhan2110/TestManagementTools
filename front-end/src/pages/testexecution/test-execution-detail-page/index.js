import React, {useEffect, useState} from "react";
import styles from "./styles";
import styled from "styled-components";
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import { useHistory } from "react-router-dom";
import { green, orange, red } from "@material-ui/core/colors";
import { spacing } from "@material-ui/system";
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import MultipleSelect from "../../../components/MultipleSelect";
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import SelectTestCasePopup from '../../testcases/select-test-case-page/index';
import ViewIssuePopup from '../../issues/view-issue/index';
import {
  Grid,
  Typography,
  Button,
  Divider,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  List, ListItem, ListItemText, ListItemSecondaryAction,
  Chip as MuiChip,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog
} from '@material-ui/core';
import { GET_ALL_TESTEXEC_REQ, SELECT_TEST_EXEC_REQ, UPDATE_TEST_EXEC_DETAIL_REQ, RESET_UPDATE_TEST_EXEC, RESET_DELETE_TEST_EXEC, DELETE_TEST_EXEC_REQ, RESET_UPDATE_TEST_EXEC_DETAIL } from "../../../redux/test-execution/constants";
import { DISPLAY_MESSAGE } from "../../../redux/message/constants";
import { GET_ALL_USERS_OF_PROJECT_REQ } from "../../../redux/users/constants";
import { GET_ALL_ACTIVE_TESTPLAN_REQ } from "../../../redux/test-plan/constants";
import { GET_ALL_BUILD_TESTPLAN_REQ } from "../../../redux/build-release/constants";
import { GET_ALL_ACTIVE_REQUIREMENTS_REQ } from "../../../redux/requirements/constants";
import { RESET_LIST_TESTCASE_SELECT } from "../../../redux/test-case/constants";

const Chip = styled(MuiChip)`
  ${spacing};

  background: ${props => props.active && green[500]};
  background: ${props => props.pass && green[500]};
  background: ${props => props.fail && red[500]};
  background: ${props => props.block && orange[500]};
  background: ${props => props.sent && orange[700]};
  color: ${props => (props.active || props.sent) && props.theme.palette.common.white};
  color: ${props => (props.pass || props.sent) && props.theme.palette.common.white};
  color: ${props => (props.fail || props.sent) && props.theme.palette.common.white};
  color: ${props => (props.block || props.sent) && props.theme.palette.common.white};
`

//MAP STATES TO PROPS - REDUX
function mapStateToProps(state) {
  return {
    testexec: state.testexec,
    listTestExec: state.testexec.listTestExec,
    updTestExec: state.testexec.updTestExecDetail,
    delTestExec: state.testexec.delTestExec,
    execTest: state.testexec.execTest,
    listUser: state.user.listUsersOfProject,
    accountInfo: state.account.accountInfo,
    listActiveTestplan: state.testplan.listActiveTestplan,
    listBuildByTestPlan: state.build.listBuildsByTestplan,
    listRequirements: state.requirements.listActiveRequirements,
    listtestcaseselect: state.testcase.listTestcaseSelect,
  };
}


//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    updateTestExecReq: (payload) => dispatch({type: UPDATE_TEST_EXEC_DETAIL_REQ, payload}),
    deleteTestExecReq: (payload) => dispatch({type: DELETE_TEST_EXEC_REQ, payload}),
    getAllTestExecReq: () => dispatch({ type: GET_ALL_TESTEXEC_REQ}),
    selectTestExecReq: (payload) => dispatch({type: SELECT_TEST_EXEC_REQ, payload}),
    getAllUserReq: (payload) => dispatch({type: GET_ALL_USERS_OF_PROJECT_REQ, payload}),
    resetRedux: () => dispatch({type: RESET_UPDATE_TEST_EXEC_DETAIL}),
    resetListTestcaseSelect: () => dispatch({type: RESET_LIST_TESTCASE_SELECT}),
    resetDelTestExec: () => dispatch({type: RESET_DELETE_TEST_EXEC}),
    getAllActiveTestplanReq: (payload) => dispatch({type: GET_ALL_ACTIVE_TESTPLAN_REQ}),
    getBuildByTestPlan: (payload) => dispatch({type: GET_ALL_BUILD_TESTPLAN_REQ, payload}),
    getAllActiveRequirementReq: (payload) => dispatch({type: GET_ALL_ACTIVE_REQUIREMENTS_REQ}),
  }
}

const TestExecutionDetailPage = (props) => {
    const {classes,delTestExec, testexec, deleteTestExecReq,resetDelTestExec, resetListTestcaseSelect, listRequirements, getAllActiveRequirementReq, getAllActiveTestplanReq, listActiveTestplan, listBuildByTestPlan, getBuildByTestPlan, listTestExec, updateTestExecReq, updTestExec, displayMsg, getAllTestExecReq, selectTestExecReq, execTest, listtestcaseselect,getAllUserReq, listUser, resetRedux, accountInfo} = props;
    const history = useHistory();
    const location = useLocation();

    const [enableDeleteBtn, setEnableDeleteBtn] = useState(true);
    const [loadingg, setLoadingg] = useState(false);
    const [openPopup,setOpenPopup] = useState(false);
    const [open, setOpen] = useState(false);
    const [openIssue, setOpenIssuePopup] = useState(false);

    const filterTestExec = (id) => {
      return  listTestExec.find((item) => item._id === id);
    }

    const [checkError, setCheckError] = useState(false);

    const [testExecInfo, setTestExecInfo] = useState(filterTestExec(props.match.params.testExecutionId));

    const getAllName = () => {
      var result = [];
      testExecInfo?.listprojectrequirement?.forEach(element => {
        result.push(element?.projectrequirementname);
      });
      return result;
    };

    const [selectRequirements, setListRequirements] = useState(getAllName());
    const [enableCreateBtn, setEnableCreateBtn] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
      selectTestExecReq({id: props.match.params.testExecutionId, listTestcase: testExecInfo.exectestcases});
      getAllUserReq(localStorage.getItem('selectProject'));
      getAllActiveTestplanReq();
      getBuildByTestPlan({testplanname: testExecInfo.testplan.testplanname });
      getAllActiveRequirementReq();
      resetListTestcaseSelect();
    },[])

    const [del, setDel] = useState(false);
    const refreshWhenDelIssue = () => {
      setDel(true);
      //getAllTestExecReq();
    }

    useEffect(()=>{
      if(testexec.success === true && del === true){
        setDel(false);
        setTestExecInfo(filterTestExec(props.match.params.testExecutionId));
      }
    },[testexec.success])

    const covertFromName2Id = (name) => {
      var result = [];
      name?.forEach(element => {
        result.push(listRequirements?.filter(x => x.projectrequirementname === element)[0]?._id);
      });
      return result;
    };

    const [error, setError] = useState({
      testexecutionname: 'ss',
      description: 'ss',
    });



    useEffect(()=>{
      setTestExecInfo({
        ...testExecInfo,
        listprojectrequirement: covertFromName2Id(selectRequirements)
      })
    },[selectRequirements])

  
    useEffect(()=>{
      if (listtestcaseselect.length > 0) {
        // listtestcaseselect.map(item => {
        //   if (testExecInfo.exectestcases.findIndex(x => x._id === item._id) === -1) 
        //     tempArr.push(addNewExecTC(item));
        //   })
        var tempArr = convertListSelect(listtestcaseselect);
        var result = [];
        tempArr.map(obj => result.push(testExecInfo.exectestcases.find(o => o._id === obj._id) || obj));
        setTestExecInfo({...testExecInfo, exectestcases: result});
      }
      //setTestExecInfo({...testExecInfo, exectestcases: tempArr});
    },[listtestcaseselect])

  


    try {
      useEffect(()=>{
        if (updTestExec.sucess === false){
          setLoading(false);
          displayMsg({
            content: updTestExec.errMsg,
            type: 'error'
          });
          setEnableCreateBtn(true);
          setLoading(false);
          resetRedux();
        } else if (updTestExec.sucess === true) {
          setLoading(false);
          displayMsg({
            content: "Update Test Execution successfully !",
            type: 'success'
          });
          setEnableCreateBtn(true);
          setLoading(false);
          getAllTestExecReq();
          resetRedux();
          handleClose();
        }
       } ,[updTestExec.sucess])    
    } catch (error) {
      //console.log('error: '+error);
    }

    useEffect(()=>{
      if (delTestExec.sucess === false){
        // displayMsg({
        //   content: insBuildsDelete.errMsg,
        //   type: 'error'
        // }); 
        setEnableDeleteBtn(true);
        setLoadingg(false);
        resetDelTestExec();
      } else if (delTestExec.sucess === true) {
        displayMsg({
          content: "Delete Test Execution successfully !",
          type: 'success'
        });
        setEnableDeleteBtn(true);
        setLoadingg(false);
        resetDelTestExec();
        handleClose();
        }
    },[delTestExec]);

    const handleClose=()=>{
      history.push(location.pathname.substring(0, location.pathname.lastIndexOf("/") - 5));
    }

    const convertListSelect = (list) => {
      var arr = [];
      list.map(item => arr.push({_id: item._id, testcaseName: item.testcaseName, status: "Untest"}))
      return arr;
    }

    const handleChange = (prop) => (event) => {
      if (prop === 'testplanname' ){
       
        setTestExecInfo({...testExecInfo, testplan: {_id: event.target.value, testplanname: listActiveTestplan.find(item => item._id === event.target.value).testplanname}});
        getBuildByTestPlan({testplanname: listActiveTestplan.find(item => item._id === event.target.value).testplanname });
      }

      else if (prop === 'buildname' ){
        setTestExecInfo({...testExecInfo, build: {_id: event.target.value, buildname: listBuildByTestPlan.find(item => item._id === event.target.value).buildname} });
      }

      else if (prop === 'assignTester' ){
        if (event.target.value !== '')
          setTestExecInfo({...testExecInfo, tester: {_id: event.target.value, username: listUser.find(item => item.user === event.target.value).username} });
        else
        setTestExecInfo({...testExecInfo, tester: {_id: event.target.value, username: ''} });
      }
        
      
      else if (prop !== 'status') {
        setTestExecInfo({...testExecInfo, [prop]: event.target.value});
      }

      if(checkError === true)
      setError({ ...error, [prop]: event.target.value });
    };

    const handleSave = (prop) => {
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

      else if(testExecInfo.testexecutionname !== "" && testExecInfo.description !== ""){
      setEnableCreateBtn(false);
      setLoading(true);
      updateTestExecReq({...testExecInfo, exectestcases: formatRequirementTC(testExecInfo.exectestcases)});
      //console.log({...testExecInfo, exectestcases: formatRequirementTC(testExecInfo.exectestcases)})
      }
    }    

    const formatRequirementTC = (list) =>{
      //console.log(list)
      const formatReq = (item) => {
        if(item.requirement) {
         if(item.requirement._id === "")
          return;
         else return item.requirement._id;
        }
        else return;
      }
      let result = list.map(item => ({...item, requirement: formatReq(item)}));
      //let result = list.map(item => (Object.assign({}, item, {requirement: undefined})));
      return result;
    };

    const handleOpenSelectTC = () => {
      setOpenPopup(true);
    }

    const handleOpenIssue = () => {
      setOpenIssuePopup(true);
    }

    return (
    <div>
        <Helmet title="Test Execution Edit" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
              <Typography variant="h3" gutterBottom display="inline">
                  Test Execution Edit {/*- {testExecInfo.testexecutionname}*/}
              </Typography>
        </Grid>
        <Grid item>
        <div>
          <Button variant="contained" disabled={enableDeleteBtn ? false : true } startIcon={<DeleteIcon />} size="large" style={enableDeleteBtn ? {color: red[500] } : {}} onClick={()=>{setOpen(true);}}>
            Delete Test Execution
            {loadingg && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>
        </div>
          <Grid item>
                <Dialog open={open} >
                  <DialogTitle>Confirm</DialogTitle>
                  <DialogContent>Are you sure want to delete this test execution?</DialogContent>
                  <DialogActions>
                    <Button  color="primary" onClick={()=>{ deleteTestExecReq(testExecInfo._id); setEnableDeleteBtn(false);
        setLoadingg(true);  setOpen(false);}}>Yes</Button>
                    <Button onClick={()=>{setOpen(false);}} color="primary">No</Button>
                  </DialogActions>
                </Dialog>
          </Grid>
        </Grid>
        
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
        <form className={classes.content}>
          <TextField id="testExecutionName" label="Test Execution Name" variant="outlined"  fullWidth required inputProps={{maxLength : 100}} onChange={handleChange('testexecutionname')} value={testExecInfo.testexecutionname}
          error={testExecInfo.testexecutionname.trim().length === 0  && error.testexecutionname.trim().length === 0  ? true : false}
          helperText={testExecInfo.testexecutionname.trim().length === 0 && error.testexecutionname.trim().length === 0 ? 'Test Execution Name is required' : ' '}/>
          
          <FormControl variant="outlined" fullWidth required inputProps={{maxLength : 100}}>   
          <InputLabel id="demo-simple-select-outlined-label">Test Plan</InputLabel>
          <Select
          labelId="testPlan"
          id="testPlan"
          value={testExecInfo.testplan._id}
          onChange={handleChange('testplanname')}
          label="Test Plan"
        >
          {listActiveTestplan.map((item, index) => <MenuItem key={item._id} value={item._id}>{item.testplanname}</MenuItem>)}    
        </Select>
      </FormControl>


          <FormControl variant="outlined" fullWidth required>
           <InputLabel id="build" >Build/Release </InputLabel>
            <Select
          labelId="build"
          id="build"
          value={testExecInfo.build._id || ''}
          onChange={handleChange('buildname')}
          label="Build/Release"
        >
          {listBuildByTestPlan.map((item, index) => <MenuItem key={index} value={item._id}>{item.buildname}</MenuItem>)}    
        </Select>
      </FormControl>

{/*       <MultipleSelect title = {'Requirements'} 
      select={selectRequirements} 
      setSelect={setListRequirements} 
      listData={listRequirements}/> */}

        <div style={{display: 'flex', flexDirection: 'row'}}>
          <TextField id="Environment" label="Environment" 
            variant="outlined"
            value={testExecInfo.environment || ''} onChange={handleChange('environment')}
            style={{marginRight: '10px', width: '350px'}} 
            />
          <FormControl variant="outlined" className={classes.formControl} fullWidth >
              <InputLabel id="assignTester">Assign Tester</InputLabel>
                  <Select
                    labelId="assignTester"
                    id="assignTester"
                    value={testExecInfo.tester._id}
                    onChange={handleChange('assignTester')} 
                    label="assignTester">
                        <MenuItem key={''} value={''}>&nbsp;</MenuItem>
                        {listUser?.map((item,index) => (
                            <MenuItem key={index} value={item.user}>{item.username}</MenuItem>
                        ))}
                  </Select>
          </FormControl>
        </div>

          <div>
             <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" required  checked={testExecInfo.is_public}/>}
              label="Public"
              labelPlacement="start"
              disabled
            />
          </div>
          <div>
            <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" required  checked={testExecInfo.is_active}/>}
              label="Active"
              labelPlacement="start"
              disabled
            />
          </div>
          <TextField id="descriptions" label="Descriptions" variant="outlined" onChange={handleChange('description')} fullWidth required  multiline rows={3} value={testExecInfo.description}
          error={testExecInfo.description.trim().length === 0 && error.description.trim().length === 0 ? true : false}
          helperText={testExecInfo.description.trim().length === 0 && error.description.trim().length === 0 ? 'Descriptions is required' : ' '}/> 


          <FormControl variant="outlined" className={classes.formControl} fullWidth >
              <InputLabel id="status">Status</InputLabel>
                  <Select
                    labelId="status"
                    id="status"
                    value={testExecInfo.status}
                    disabled
                    label="status">
                        <MenuItem value={'Untest'}>Untest</MenuItem>
                        <MenuItem value={"Pass"}>Pass</MenuItem>
                        <MenuItem value={"Block"}>Blocked</MenuItem>
                        <MenuItem value={"Fail"}>Fail</MenuItem>
                  </Select>
          </FormControl>
          
          
          <div>
            <Grid container spacing={3}>
              <Grid item>
              <p>Defects: <b>{testExecInfo.issue?.length ? testExecInfo.issue.length : 0}</b><b> defects</b></p>
              </Grid>
              <Grid item>
              <ViewIssuePopup
                isOpen={openIssue}
                setOpen={setOpenIssuePopup}
                listIssueOfExec={testExecInfo.issue ? testExecInfo.issue : []}
                execid={props.match.params.testExecutionId}
                refreshWhenDelIssue={refreshWhenDelIssue}
                />
                <Button variant="contained" onClick={handleOpenIssue}>View Defects</Button>
              </Grid>
            </Grid>
          </div>



          <SelectTestCasePopup isOpen={openPopup} setOpen={setOpenPopup} selected={testExecInfo.exectestcases}/>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Grid container justify="space-between" direction="row">
                    <Grid item>
                    <Typography variant="h4" gutterBottom display="inline">List Executed Test Cases</Typography>
                    </Grid>
                    <Grid item>
                    <Button variant="contained" color="primary" onClick={handleOpenSelectTC}>Edit Test Case</Button>
                    </Grid>
                </Grid>
                
              </Grid> 
              <Grid item xs={12}>
                <Paper style={{maxHeight: 200, overflow: 'auto'}}>
                <List>
                  {testExecInfo.exectestcases && testExecInfo.exectestcases.map((item,index) => 
                    <ListItem key={index} dense button  selected>
                      <ListItemText id={item._id} primary={item.testcaseName} />
                      <ListItemSecondaryAction>
                        {item.status === 'Untest' && <Chip size="small" mr={1} mb={1} label={item.status + " (" + (item?.issue?.length?item.issue.length:0) + " defects)"} />}
                        {item.status === 'Pass' && <Chip size="small" mr={1} mb={1} label={item.status + " (" + (item?.issue?.length?item.issue.length:0) + " defects)"} pass={1}/>}
                        {item.status === 'Blocked' && <Chip size="small" mr={1} mb={1} label={item.status + " (" + (item?.issue?.length?item.issue.length:0) + " defects)"} block={1}/>}
                        {item.status === 'Fail' && <Chip size="small" mr={1} mb={1} label={item.status + " (" + (item?.issue?.length?item.issue.length:0) + " defects)"} fail={1}/>}
                      </ListItemSecondaryAction>
                    </ListItem>
                  )}
                </List>
                </Paper>
              </Grid> 
            </Grid>


  

          <div className = {classes.btnGroup}>
          <Button variant="contained" color="primary" disabled={enableCreateBtn ? false : true } startIcon={<SaveIcon />} onClick={handleSave}>
            Save
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>
          <Button variant="contained" startIcon={<CancelIcon />} onClick={handleClose}>
            Cancel
          </Button>
        </div>
        </form>
        </Grid>
      </Grid>
    </div>
    );
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TestExecutionDetailPage));
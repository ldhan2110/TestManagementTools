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
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
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
import { GET_ALL_TESTEXEC_REQ, SELECT_TEST_EXEC_REQ, UPDATE_TEST_EXEC_REQ, RESET_UPDATE_TEST_EXEC } from "../../../redux/test-execution/constants";
import { DISPLAY_MESSAGE } from "../../../redux/message/constants";
import { GET_ALL_USERS_OF_PROJECT_REQ } from "../../../redux/users/constants";
import { GET_ALL_ACTIVE_TESTPLAN_REQ } from "../../../redux/test-plan/constants";
import { GET_ALL_BUILD_TESTPLAN_REQ } from "../../../redux/build-release/constants";

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
    listTestExec: state.testexec.listTestExec,
    updTestExec: state.testexec.updTestExec,
    execTest: state.testexec.execTest,
    listUser: state.user.listUsersOfProject,
    accountInfo: state.account.accountInfo,
    listActiveTestplan: state.testplan.listActiveTestplan,
    listBuildByTestPlan: state.build.listBuildsByTestplan,
  };
}


//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    updateTestExecReq: (payload) => dispatch({type: UPDATE_TEST_EXEC_REQ, payload}),
    getAllTestExecReq: () => dispatch({ type: GET_ALL_TESTEXEC_REQ}),
    selectTestExecReq: (payload) => dispatch({type: SELECT_TEST_EXEC_REQ, payload}),
    getAllUserReq: (payload) => dispatch({type: GET_ALL_USERS_OF_PROJECT_REQ, payload}),
    resetRedux: () => dispatch({type: RESET_UPDATE_TEST_EXEC}),
    getAllActiveTestplanReq: (payload) => dispatch({type: GET_ALL_ACTIVE_TESTPLAN_REQ}),
    getBuildByTestPlan: (payload) => dispatch({type: GET_ALL_BUILD_TESTPLAN_REQ, payload}),
  }
}

const TestExecutionDetailPage = (props) => {
    const {classes, getAllActiveTestplanReq, listActiveTestplan, listBuildByTestPlan, getBuildByTestPlan, listTestExec, updateTestExecReq, updTestExec, displayMsg, getAllTestExecReq, selectTestExecReq, execTest, getAllUserReq, listUser, resetRedux, accountInfo} = props;
    const history = useHistory();
    const location = useLocation();

    const [enableDeleteBtn, setEnableDeleteBtn] = useState(true);
    const [loadingg, setLoadingg] = useState(false);
    const [open, setOpen] = useState(false);

    const filterTestExec = (id) => {
      return  listTestExec.find((item) => item._id === id);
    }

    const [testExecInfo, setTestExecInfo] = useState(filterTestExec(props.match.params.testExecutionId));

    const [resultTestExec, setResultTestExec] = useState({
      status: testExecInfo.status,
      testexecid: props.match.params.testExecutionId
    })

    const [enableCreateBtn, setEnableCreateBtn] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
      selectTestExecReq({id: props.match.params.testExecutionId, listTestcase: testExecInfo.exectestcases});
      getAllUserReq(localStorage.getItem('selectProject'));
      getAllActiveTestplanReq();
      getBuildByTestPlan({testplanname: testExecInfo.testplan.testplanname });
    },[])

    useEffect(()=>{
      console.log(testExecInfo);
    },[testExecInfo])


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
            content: "Update result successfully !",
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
      console.log('error: '+error);
    }

    const handleClose=()=>{
      history.push(location.pathname.substring(0, location.pathname.lastIndexOf("/") - 5));
    }

    const handleChange = (prop) => (event) => {
      if (prop !== 'status' )
        setTestExecInfo({ ...testExecInfo, [prop]: event.target.value });
      
      else if (prop === 'status') {
        setTestExecInfo({...testExecInfo, status: event.target.value});
        setResultTestExec({...resultTestExec, status: event.target.value});
      }
    };

    const handleSave = (prop) => {
      setEnableCreateBtn(false);
      setLoading(true);
      updateTestExecReq(resultTestExec);
    }

    

  
    return (
    <div>
        <Helmet title="Test Execution Detail" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
              <Typography variant="h3" gutterBottom display="inline">
                  Test Execution Detail - {testExecInfo.testexecutionname}
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
                    <Button  color="primary">Yes</Button>
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
          <TextField id="testExecutionName" label="Test Execution Name" variant="outlined"  fullWidth required onChange={handleChange('testexecutionname')} value={testExecInfo.testexecutionname}/>
          <FormControl variant="outlined" fullWidth required>   
          <InputLabel id="demo-simple-select-outlined-label">Test Plan</InputLabel>
          <Select
          labelId="testPlan"
          id="testPlan"
          value={testExecInfo.testplan.testplanname || ''}
          onChange={handleChange('testplanname')}>
          {listActiveTestplan.map((item, index) => <MenuItem key={index} value={item.testplanname}>{item.testplanname}</MenuItem>)}    
        </Select>
      </FormControl>
          <FormControl variant="outlined" fullWidth required>
           <InputLabel id="build" >Build/Release </InputLabel>
            <Select
          labelId="build"
          id="build"
          value={testExecInfo.build.buildname || ''}
          onChange={handleChange('buildname')}
          label="buildname"
        >
          {listBuildByTestPlan.map((item, index) => <MenuItem key={index} value={item.buildname}>{item.buildname}</MenuItem>)}    
        </Select>
      </FormControl>

          <FormControl variant="outlined" className={classes.formControl} fullWidth required >
              <InputLabel id="assignTester">Assign Tester</InputLabel>
                  <Select
                    labelId="assignTester"
                    id="assignTester"
                    value={testExecInfo.tester.username}
                    onChange={handleChange('assignTester')}
                    label="assignTester">
                        {listUser.map((item,index) => (
                            <MenuItem key={index} value={item.username}>{item.username}</MenuItem>
                        ))}
                  </Select>
          </FormControl>

          <div>
             <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" required  checked={testExecInfo.is_public}/>}
              label="Public"
              labelPlacement="start"
            />
          </div>
          <div>
            <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" required  checked={testExecInfo.is_active}/>}
              label="Active"
              labelPlacement="start"
            />
          </div>
          <TextField id="descriptions" label="Description" variant="outlined" onChange={handleChange('description')} fullWidth required  multiline rows={3} value={testExecInfo.description}/>                

          <FormControl variant="outlined" className={classes.formControl} fullWidth >
              <InputLabel id="status">Status</InputLabel>
                  <Select
                    labelId="status"
                    id="status"
                    value={testExecInfo.status}
                    label="status">
                        <MenuItem value={'Untest'}>Untest</MenuItem>
                        <MenuItem value={"Pass"}>Pass</MenuItem>
                        <MenuItem value={"Block"}>Blocked</MenuItem>
                        <MenuItem value={"Fail"}>Fail</MenuItem>
                  </Select>
          </FormControl>

            <Grid container spacing={1}>
              <Grid item xs={12}><Typography variant="h4" gutterBottom display="inline">List Executed Test Cases</Typography></Grid> 
              <Grid item xs={12}>
                <Paper style={{maxHeight: 200, overflow: 'auto'}}>
                <List>
                  {testExecInfo.exectestcases && testExecInfo.exectestcases.map((item,index) => 
                    <ListItem key={index} dense button  selected>
                      <ListItemText id={item.id} primary={item.testcaseName} />
                      <ListItemSecondaryAction>
                        {item.status === 'Untest' && <Chip size="small" mr={1} mb={1} label={item.status} />}
                        {item.status === 'Pass' && <Chip size="small" mr={1} mb={1} label={item.status} pass={1}/>}
                        {item.status === 'Blocked' && <Chip size="small" mr={1} mb={1} label={item.status} block={1}/>}
                        {item.status === 'Fail' && <Chip size="small" mr={1} mb={1} label={item.status} fail={1}/>}
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
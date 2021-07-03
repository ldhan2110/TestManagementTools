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
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
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
  MenuItem
} from '@material-ui/core';
import { GET_ALL_TESTEXEC_REQ, SELECT_TEST_EXEC_REQ, UPDATE_TEST_EXEC_REQ, RESET_UPDATE_TEST_EXEC } from "../../../redux/test-execution/constants";
import { DISPLAY_MESSAGE } from "../../../redux/message/constants";
import { GET_ALL_USERS_OF_PROJECT_REQ } from "../../../redux/users/constants";


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
    accountInfo: state.account.accountInfo
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
    resetRedux: () => dispatch({type: RESET_UPDATE_TEST_EXEC})
  }
}

const TestExecutionDetailPage = (props) => {
    const {classes, listTestExec, updateTestExecReq, updTestExec, displayMsg, getAllTestExecReq, selectTestExecReq, execTest, getAllUserReq, listUser, resetRedux, accountInfo} = props;
    const history = useHistory();
    const location = useLocation();

    const filterTestExec = (id) => {
      return  listTestExec.find((item) => item._id === id);
    }

    const [testExecInfo, setTestExecInfo] = useState(filterTestExec(props.match.params.testExecutionId));


    const [isExecute,setExecute] = useState(location.pathname.substring(location.pathname.lastIndexOf("/") + 1) === 'execute-result' ? true : false);

    const [resultTestExec, setResultTestExec] = useState({
      status: testExecInfo.status,
      testexecid: props.match.params.testExecutionId
    })

    const filterTestcaseUntest = () => {
      return execTest.listTestCase.find(item => item.status === 'Untest');
    }

    const [enableCreateBtn, setEnableCreateBtn] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
      selectTestExecReq({id: props.match.params.testExecutionId, listTestcase: testExecInfo.exectestcases});
      getAllUserReq(localStorage.getItem('selectProject'));
    },[])

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

    useEffect(()=>{
      console.log(listTestExec);
     },[listTestExec])  

    const handleClose=()=>{
      var url;
      if (isExecute){
        url = location.pathname.substring(0, location.pathname.substring(0, location.pathname.lastIndexOf("/")).lastIndexOf("/"));
      } else {
        url = location.pathname.substring(0, location.pathname.lastIndexOf("/"));
      }
      history.push(url);
    }

    const handleChange = (prop) => (event) => {
      if (prop !== 'status' && !isExecute)
        setTestExecInfo({ ...testExecInfo, [prop]: event.target.value });
      
      else if (prop === 'status' && isExecute) {
        setTestExecInfo({...testExecInfo, status: event.target.value});
        setResultTestExec({...resultTestExec, status: event.target.value});
      }
    };

    const handleSave = (prop) => {
      setEnableCreateBtn(false);
      setLoading(true);
      updateTestExecReq(resultTestExec);
    }

    const handleExecute = () => {
        var item = filterTestcaseUntest();
        if (item)
          history.push(location.pathname+'/test-exec/'+item._id+'/execute-result');
        else 
          history.push(location.pathname+'/execute-result');
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
        
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
        <form className={classes.content}>
          <TextField id="testExecutionName" label="Test Execution Name" variant="outlined"  fullWidth required onChange={handleChange('testexecutionname')} value={testExecInfo.testexecutionname}/>
          <TextField id="testplanName" label="Test Plan" variant="outlined"  fullWidth required  value={testExecInfo.testplan.testplanname}/>
          <TextField id="buildName" label="Build/Release" variant="outlined"  fullWidth required  value={testExecInfo.build.buildname}/>

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
                    onChange={handleChange('status')}
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
                    <ListItem key={index} dense button  selected onClick={()=>{if (!isExecute){history.push(location.pathname+'/test-exec/'+item._id)}}}>
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


          {/* <Typography variant="subtitle1" gutterBottom display="inline" style={{margin: '150px 0'}}><b>Total exec.time: 00:00:01s</b></Typography> */}

          <div className = {classes.btnGroup}>
          {isExecute && <Button variant="contained" color="primary" disabled={enableCreateBtn ? false : true } startIcon={<SaveIcon />} onClick={handleSave}>
            Save
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>}
          {!isExecute && testExecInfo.status === 'Untest' && (testExecInfo.tester.username === '' || testExecInfo.tester.username === accountInfo.username) && <Button variant="contained" color="primary" startIcon={<HourglassEmptyIcon />} onClick={handleExecute}>
            Execute
          </Button>}
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
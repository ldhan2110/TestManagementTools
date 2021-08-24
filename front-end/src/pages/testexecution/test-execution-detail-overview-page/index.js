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
import DoughnutChart from '../../../components/Charts/DoughnutChart';
import {PASSED, FAILED, BLOCKED, NOT_EXECUTE} from '../../../components/Charts/Constants';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import ViewIssuePopup from '../../issues/view-issue/index';
import {
  Grid,
  Typography,
  Button,
  Divider,
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
    testexec: state.testexec,
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
    const {classes, testexec, listTestExec, updateTestExecReq, updTestExec, displayMsg, getAllTestExecReq, selectTestExecReq, execTest, getAllUserReq, listUser, resetRedux, accountInfo} = props;
    const history = useHistory();
    const location = useLocation();

    const filterTestExec = (id) => {
      if (listTestExec.length !== 0 && listTestExec.find((item) => item._id === id)){
        return listTestExec.find((item) => item._id === id);
      }
      else{
        history.replace("/error/404");
         return{
          build: {_id: "", buildname: ""},
          description: "",
          exectestcases:  [],
          is_active: false,
          is_public: false,
          listprojectrequirement: [],
          status: "",
          tester: {_id: "", username: ""},
          testexecutionname: "",
          testplan: {_id: "", testplanname: ""},
          _id: "",
        }
      }
       
    }

    const [testExecInfo, setTestExecInfo] = useState([]);


    const [isExecute,setExecute] = useState(location.pathname.substring(location.pathname.lastIndexOf("/") + 1) === 'execute-result' ? true : false);

    const [dataExecOverview, setExecOverview] = useState({
      labels: ["Passed", "Failed", "Blocked", "Untest"],
      datasets: [
        {
          data: [0,0,0,0],
          backgroundColor: [
            PASSED,
            FAILED,
            BLOCKED,
            NOT_EXECUTE
          ],
          borderWidth: 5
        }
      ]
    })
  
    const[totalExec, setTotalExec] = useState(0);

    const [openIssue, setOpenIssuePopup] = useState(false);

    const [resultTestExec, setResultTestExec] = useState({
      status:  'Untest',
      testexecid: props.match.params.testExecutionId
    })

    useEffect(()=>{
      setTimeout(()=>{
      if (testexec.success === true) {
        setTestExecInfo(filterTestExec(props.match.params.testExecutionId));        
      }},50);
  }, [testexec.success])

  useEffect(()=>{
    selectTestExecReq({id: props.match.params.testExecutionId, listTestcase: testExecInfo.exectestcases});
    setResultTestExec({
      status: testExecInfo.status,
      testexecid: props.match.params.testExecutionId
    })
}, [testExecInfo])
  
    const filterTestcaseUntest = () => {
      return execTest.listTestCase.find(item => item.status === 'Untest');
    }

    const filterTestcaseFail = () => {
      return execTest.listTestCase[0];
    }

    const [enableCreateBtn, setEnableCreateBtn] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
      testexec.success = "";
      selectTestExecReq({id: props.match.params.testExecutionId, listTestcase: testExecInfo.exectestcases});
      getAllUserReq(localStorage.getItem('selectProject'));
      getAllTestExecReq();
    },[])

    useEffect(()=> {
      testexec.success = "";
      selectTestExecReq({id: props.match.params.testExecutionId, listTestcase: testExecInfo.exectestcases});
      getAllUserReq(localStorage.getItem('selectProject'));
      getAllTestExecReq();
    },[props.match.params?.testExecutionId])

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
      //console.log('error: '+error);
    }

    useEffect(()=>{
      if (testExecInfo.exectestcases){
        setExecOverview({
          labels: ["Passed", "Failed", "Blocked", "Untest"],
      datasets: [
        {
          data: countTestExec(),
          backgroundColor: [
            PASSED,
            FAILED,
            BLOCKED,
            NOT_EXECUTE
          ],
          borderWidth: 5
        }
      ]
        })
        setTotalExec(countTotalExec());
      }
      if (testExecInfo.status){
        setResultTestExec({
          ...resultTestExec,
          status: testExecInfo.status
        })
      }
     },[testExecInfo])  

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

    const handleRetest = () => {
      var item = filterTestcaseFail();
      if (item)
        history.push(location.pathname+'/test-exec/'+item._id+'/re-execute-result');
      else 
        history.push(location.pathname+'/execute-result');
    }

  const countTestExec = () => {
      var result = [0,0,0,0];
      if (testExecInfo.exectestcases){
        testExecInfo.exectestcases.map((item,index)=>{
            if (item.status === 'Pass')
              result[0]++;
            else if (item.status === 'Fail')
              result[1]++;
            else if (item.status === 'Blocked')
              result[2]++;
            else
              result[3]++;
        });
      }
      return result;
    }
  
  const countTotalExec = () =>{
    var count = 0;
      if (testExecInfo.exectestcases){
        testExecInfo.exectestcases.map((item,index)=>{
            if (item.status === 'Pass')
              count++;
            else if (item.status === 'Fail')
            count++;
            else if (item.status === 'Blocked')
            count++;
            else
            count++;
        });
      }
      return count;
  }

  const handleOpenIssue = () => {
    setOpenIssuePopup(true);
  }
  
    return (
    <div>
        <Helmet title="Test Execution Details" />

      <Grid
        justify="flex-start"
        alignItems="center"
        container
        spacing={5}
      >
        <Grid item>

              <Typography variant="h3" gutterBottom display="inline">
                  Test Execution Details - {testExecInfo.testexecutionname}
              </Typography>
        </Grid>
        {testexec.success === "" && <CircularProgress size={25}/>}
        
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
        <form className={classes.content}>

          <DoughnutChart dataset={dataExecOverview} type='testexec' overviewData={totalExec}/>

         

            <Grid container spacing={1}>
              <Grid item xs={12}><Typography variant="h4" gutterBottom display="inline">List Executed Test Cases</Typography></Grid> 
              <Grid item xs={12}>
                <Paper style={{maxHeight: 200, overflow: 'auto'}}>
                <List>
                  {testExecInfo.exectestcases && testExecInfo.exectestcases.map((item,index) => 
                    <ListItem key={index} dense button  selected onClick={()=>{if (!isExecute){history.push(location.pathname+'/test-exec/'+item._id)}}}>
                      <ListItemText id={item.id} primary={item.testcaseName} />
                      <ListItemSecondaryAction>
                        {item.status === 'Untest' && <Chip size="small" mr={1} mb={1} label={item.status + " (" + item.issue.length + " defects)"} />}
                        {item.status === 'Pass' && <Chip size="small" mr={1} mb={1} label={item.status + " (" + item.issue.length + " defects)"} pass={1}/>}
                        {item.status === 'Blocked' && <Chip size="small" mr={1} mb={1} label={item.status + " (" + item.issue.length + " defects)"} block={1}/>}
                        {item.status === 'Fail' && <Chip size="small" mr={1} mb={1} label={item.status + " (" + item.issue.length + " defects)"} fail={1}/>}
                      </ListItemSecondaryAction>
                    </ListItem>
                  )}
                </List>
                </Paper>
              </Grid> 
            </Grid>

            <div>
            <Grid
              container
              direction="row"
              alignItems="center"
              spacing={3}>
              <Grid item>
                <p>Defects: <b>{testExecInfo.issue?.length ? testExecInfo.issue.length : 0}</b><b> defects</b></p>
              </Grid>
              <Grid item>
               <ViewIssuePopup
                isOpen={openIssue}
                setOpen={setOpenIssuePopup}
                listIssueOfExec={testExecInfo.issue ? testExecInfo.issue : []}
                execid={props.match.params.testExecutionId}
                /> 
                <Button variant="contained" onClick={handleOpenIssue}>View Defects</Button>
              </Grid>                
            </Grid>
          </div>



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
                        <MenuItem value={"Block"}>Block</MenuItem>
                        <MenuItem value={"Fail"}>Fail</MenuItem>
                  </Select>
          </FormControl>

          <div className = {classes.btnGroup}>
          {isExecute && <Button variant="contained" color="primary" disabled={enableCreateBtn ? false : true } startIcon={<SaveIcon />} onClick={handleSave}>
            Save
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>}
          {!isExecute && testExecInfo?.status === 'Untest' && (testExecInfo?.tester?.username === '' || testExecInfo.tester?.username === accountInfo?.username) && <Button variant="contained" color="primary" startIcon={<HourglassEmptyIcon />} onClick={handleExecute}>
                Execute
          </Button>}
          {!isExecute && (testExecInfo?.status !== 'Untest') && (testExecInfo?.tester?.username === '' || testExecInfo.tester?.username === accountInfo?.username) && <Button variant="contained" color="primary" startIcon={<HourglassEmptyIcon />} onClick={handleRetest}>
                Re-test
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
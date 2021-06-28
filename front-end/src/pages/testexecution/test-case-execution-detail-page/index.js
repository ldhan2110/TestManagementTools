import React, { useState, useEffect } from "react";
//import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
//import Helmet from 'react-helmet';
import { connect } from 'react-redux';
//import DragList from '../../../components/DragList';
//import Selectbox from '../../../components/Selectbox';
import { useLocation } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { blue } from '@material-ui/core/colors';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import ArrorBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import {
  Grid,
  Typography,
  Divider,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  List, ListItem
} from '@material-ui/core';

import {
  Save as SaveIcon
} from "@material-ui/icons";
import { DISPLAY_MESSAGE } from "../../../redux/message/constants";
import { EXECUTE_TEST_CASE_REQ, GET_ALL_TESTEXEC_REQ, SELECT_TEST_CASE_REQ, RESET_EXECUTE_TEST_CASE } from "../../../redux/test-execution/constants";

//MAP STATES TO PROPS - REDUX
function mapStateToProps(state) {
  return {
    listTestExec: state.testexec.listTestExec,
    execTest: state.testexec.execTest,
    updTestCaseExec: state.testexec.updTestCaseExec
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    updTestcaseResultReq: (payload) => dispatch({type: EXECUTE_TEST_CASE_REQ, payload}),
    getAllTestExecReq: () => dispatch({ type: GET_ALL_TESTEXEC_REQ}),
    selectTestcaseReq: (payload) => dispatch({type: SELECT_TEST_CASE_REQ, payload}),
    resetRedux: ()=> dispatch({type: RESET_EXECUTE_TEST_CASE})
  }
}

const TestCaseExecDetail = (props) => {
  const {listTestExec, updTestcaseResultReq, getAllTestExecReq,execTest, displayMsg, selectTestcaseReq, updTestCaseExec, resetRedux} = props;

  const history = useHistory();

  const location = useLocation();
   
  const filterTestCase = (execId, testcaseId) => {
    var subItem = null;
    const result =  listTestExec.find((item) => {
      if (item._id === execId){
        subItem = item.exectestcases.find(subItem => subItem._id === testcaseId);
      } 
    });
    return subItem;
  }


  const filterTestExec = (execId) => {
    return listTestExec.find((item) => item._id === execId);
  }

  const getIdxTestCase = (testcaseId) => {
     return execTest.listTestCase.findIndex(item => item._id === testcaseId);
  }
  
  const findNextIdx = (currentIdx) => {
    return execTest.listTestCase.findIndex((item,index) => index > currentIdx && item.status === 'Untest' );
  }

  const findPrevIdx = (currentIdx) => {
    for (var idx = currentIdx-1; idx >= 0; idx--){
      if (execTest.listTestCase[idx].status === 'Untest') return idx;
    }
    return -1;
  }



  const [testCaseDetail, setTestcaseDetail] = useState(filterTestCase(props.match.params.testExecutionId, props.match.params.id));

  const [testExecDetail, setTestExecDetail] = useState(filterTestExec(props.match.params.testExecutionId));

  const [currentIdx, setCurrentIdx] = useState(getIdxTestCase(props.match.params.id));

  const [viewMode,setViewMode] = useState(location.pathname.substring(location.pathname.lastIndexOf("/") + 1) === 'execute-result' ? false : true);

  const [enableCreateBtn, setEnableCreateBtn] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if (currentIdx > execTest.listTestCase.length || currentIdx < 0) return;
    else {
      selectTestcaseReq(props.match.params.id);
      setCurrentIdx(getIdxTestCase(props.match.params.id));
      setTestcaseDetail(filterTestCase(props.match.params.testExecutionId, props.match.params.id));
    }
  },[currentIdx])



  useEffect(()=>{
    if (updTestCaseExec.sucess===true){
      setLoading(false);
      displayMsg({
        content: "Update result successfully !",
        type: 'success'
      });
      setEnableCreateBtn(true);
      setLoading(false);
      getAllTestExecReq();
      resetRedux();
     // history.goBack();
    } else if (updTestCaseExec.sucess === false) {
      setLoading(false);
      displayMsg({
        content: updTestCaseExec.errMsg,
        type: 'error'
      });
      setEnableCreateBtn(true);
      setLoading(false);
      resetRedux();
    }
  },[updTestCaseExec.sucess])
  
  const handleChange = (event) => {
    if (viewMode) return;
    setTestcaseDetail({...testCaseDetail, status: event.target.value});
  }

  const filterUpdateStep = (id, type, data) => {
    var tempData = testCaseDetail.listStep.slice();
    const result = testCaseDetail.listStep.findIndex(item => item._id === id);
    tempData[result][type] = data;
    setTestcaseDetail({...testCaseDetail,listStep: tempData});
  }

  const handleSave = () => {
    var submitResult = {
      testexecid: props.match.params.testExecutionId,
      testcaseid: testCaseDetail._id,
      status: testCaseDetail.status,
      note: 'Test',
      listStep: testCaseDetail.listStep
    }
    setEnableCreateBtn(false);
    setLoading(true);
    updTestcaseResultReq(submitResult);
  }

  const handleNavigateForward = () => {
    var url = location.pathname.substring(0,location.pathname.lastIndexOf("/"));
    url = url.substring(0,url.lastIndexOf("/"));
    if (currentIdx === execTest.listTestCase.length-1) {
      url = url.substr(0,url.lastIndexOf("/"));
      history.push(url+'/execute-result');
      return;
    }
    if (currentIdx+1 >= execTest.listTestCase.length || findNextIdx(currentIdx) === -1) return;
    else {
      history.replace(url+'/'+execTest.listTestCase[findNextIdx(currentIdx)]._id+'/execute-result');
      setCurrentIdx(findNextIdx(currentIdx));
    }
  }
  
  const handleNavigateBackward = () => {
    var url = location.pathname.substring(0,location.pathname.lastIndexOf("/"));
    url = url.substring(0,url.lastIndexOf("/"));
    if (currentIdx-1 < 0 || findPrevIdx(currentIdx) === -1) return;
    else {
      history.replace(url+'/'+execTest.listTestCase[findPrevIdx(currentIdx)]._id+'/execute-result');
      setCurrentIdx(findPrevIdx(currentIdx));
    }
  }

  const handleClose = () => {
    history.goBack();
  }

  return(
    <React.Fragment>
      <Grid container spacing={3} >
        <Grid item xs={12}>
            <Typography variant="h4" gutterBottom display="inline">
                Test Case Detail
            </Typography>
            <Divider/>
        </Grid>
        
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}><TextField id="testSuiteName" label="Test Case Name" disabled={true} variant="outlined"  value={testCaseDetail.testcaseName} fullWidth required/></Grid>
            <Grid item xs={12}><TextField id="description" label="Description" disabled={true} variant="outlined"  value = {testCaseDetail.description} fullWidth required/></Grid>
            <Grid item xs={6}><TextField id="testSuite" label="Test Suite" disabled={true} variant="outlined" value = {testCaseDetail.testsuite} fullWidth required/></Grid>
                <Grid item xs={6}>
                  <TextField id="description" label="Importance" disabled={true} variant="outlined" value={testCaseDetail.priority} fullWidth required/>
                </Grid>
                {/*<Grid item xs={6}>
                  <TextField id="description" label="Type" variant="outlined" disabled={true} value={testCaseDetail.priority} fullWidth required/>
  </Grid>*/}
  <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={6}><TextField id="preCondition" label="Pre-condition" disabled={true} variant="outlined" value = {testCaseDetail.precondition} fullWidth multiline rows={2.5} rowsMax={3}/></Grid>
                <Grid item xs={6}><TextField id="postCondition" label="Post-condition" disabled={true} variant="outlined" value = {testCaseDetail.postcondition} fullWidth multiline rows={2.5} rowsMax={3}/></Grid>
              </Grid>
              
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} style={{marginTop: '3.5vh'}}>
          <Typography variant="h6" gutterBottom display="inline">
                Steps Definition
          </Typography>
          <Divider/>
        </Grid>

        <Grid item xs={12}>
          <List style={{maxHeight: '100%', overflow: 'auto'}}>
            {testCaseDetail.listStep.map((item) => (
                    <ListItem key={item.id}>
                      <Grid container spacing={1}>
                        <Grid item style={{margin: 'auto 0'}}><div>{item.id}</div></Grid>
                        <Grid item xs={3}><TextField id="definition" variant="outlined" label='Definition' disabled={true} value={item.stepDefine} required  fullWidth multiline rows={4}/></Grid>
                        <Grid item xs={3}><TextField id="expectResult"  variant="outlined" label='Expected Result' disabled={true} required value={item.expectResult}  multiline fullWidth rows={4}/></Grid>
                        <Grid item xs={1.5}><FormControl variant="outlined" fullWidth>
                              <InputLabel id="type">Type</InputLabel>
                                <Select
                                  labelId="type"
                                  id="type"
                                  value={item.type}
                                  //onChange={handleChange}
                                  label="Type" 
                                  disabled={true}
                                  
                                >
                               <MenuItem value='manual'><em>Manual</em></MenuItem>
                               <MenuItem value='auto'>Auto</MenuItem>
                              </Select>
                        </FormControl></Grid>
                        <Grid item xs={3}><TextField id="execNote"  variant="outlined" label='Execution Note' required  value= {item.note} onChange={(event)=>{filterUpdateStep(item._id, "note", event.target.value)}} multiline fullWidth rows={4}/></Grid>
                        <Grid item xs={1.5}><FormControl variant="outlined" fullWidth>
                              <InputLabel id="status">Result</InputLabel>
                                <Select
                                  labelId="status"
                                  id="status"
                                  value={item.status}
                                  onChange={(event)=>{filterUpdateStep(item._id, "status", event.target.value)}}
                                  label="status"
                                >
                               <MenuItem value="Pass"><em>Pass</em></MenuItem>
                               <MenuItem value="Fail">Fail</MenuItem>
                              </Select>
                        </FormControl></Grid>
                      </Grid>
                    </ListItem>
                ))}
          </List>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify='space-between' styles={{display: 'inline'}}>
              <Grid item>
                <Typography variant="h5" gutterBottom display="inline">
                   Result
                </Typography>
              </Grid>

              
            
               
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined"  fullWidth>
              <InputLabel id="status">Status</InputLabel>
                  <Select
                    labelId="status"
                    id="status"
                    value={testCaseDetail.status}
                    onChange={handleChange}
                    label="status" >
                        <MenuItem value={'Untest'}>Untest</MenuItem>
                        <MenuItem value={"Pass"}>Pass</MenuItem>
                        <MenuItem value={"Blocked"}>Blocked</MenuItem>
                        <MenuItem value={"Fail"}>Fail</MenuItem>
                  </Select>
          </FormControl>
        </Grid>
        {!viewMode && <Grid item>
                    <Button variant="contained"  color="primary" disabled={enableCreateBtn ? false : true } fullWidth startIcon={<SaveIcon />} onClick={handleSave}>
                       Save Result
                      {loading && <CircularProgress size={24} style={{color: blue[500],position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}} />}
                    </Button>
                </Grid>}

        <Grid item xs={12} style={{marginTop: 10}}>
          {!viewMode && <Grid container justify ='space-between'>
            <Grid item>
              {currentIdx !== 0 && findPrevIdx(currentIdx) !== -1 && <Button variant="contained" color="primary" fullWidth startIcon={<ArrorBackIcon />} onClick={handleNavigateBackward}> Previous Test Case</Button>}  
            </Grid>

            <Grid item>
             <Button variant="contained" color="primary" fullWidth endIcon={<ArrowForwardIcon />} onClick={handleNavigateForward}> {currentIdx !== execTest.listTestCase.length-1  && findNextIdx(currentIdx) ? 'Next Test Case': 'Finish'}</Button>
            </Grid>
          </Grid>}
          { viewMode &&  <Grid container justify ='flex-end'><Grid item xs={1}> <Button variant="contained"  fullWidth startIcon={<KeyboardReturnIcon />} onClick={handleClose}>Return</Button></Grid></Grid>}
        </Grid>
        
      </Grid>
    </React.Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TestCaseExecDetail);
import React, { useState, useEffect } from "react";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import DragList from '../../../components/DragList';
import Selectbox from '../../../components/Selectbox';
import { useLocation } from 'react-router-dom';
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
  Add as AddIcon,
} from "@material-ui/icons";
import { DISPLAY_MESSAGE } from "../../../redux/message/constants";
import { EXECUTE_TEST_CASE_REQ, GET_ALL_TESTEXEC_REQ, SELECT_TEST_CASE_REQ } from "../../../redux/test-execution/constants";

//MAP STATES TO PROPS - REDUX
function mapStateToProps(state) {
  return {
    listTestExec: state.testexec.listTestExec,
    execTest: state.testexec.execTest
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    updTestcaseResultReq: (payload) => dispatch({type: EXECUTE_TEST_CASE_REQ, payload}),
    getAllTestExecReq: () => dispatch({ type: GET_ALL_TESTEXEC_REQ}),
    selectTestcaseReq: (payload) => dispatch({type: SELECT_TEST_CASE_REQ, payload})
  }
}

const TestCaseExecDetail = (props) => {
  const {listTestExec, updTestcaseResultReq, getAllTestExecReq,execTest, displayMsg, selectTestcaseReq} = props;

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

  const [submitResult, setSubmitResult] = useState({
      testcaseid: testCaseDetail._id,
      testexecid: props.match.params.testExecutionId,
      status: testCaseDetail.status,
      note: 'test'
  })

  useEffect(()=>{
    if (currentIdx > execTest.listTestCase.length || currentIdx < 0) return;
    else {
      selectTestcaseReq(props.match.params.id);
      setCurrentIdx(getIdxTestCase(props.match.params.id));
      setTestcaseDetail(filterTestCase(props.match.params.testExecutionId, props.match.params.id));
    }
  },[currentIdx])


  useEffect(()=>{
    if (execTest.sucess===true){
      displayMsg({
        content: "Update result successfully !",
        type: 'success'
      });
      getAllTestExecReq();
      history.goBack();
    } else if (execTest.sucess === false) {
      displayMsg({
        content: execTest.errMsg,
        type: 'error'
      });
    }
  },[execTest.sucess])
  
  const handleChange = (event) => {
    if (viewMode) return;
    setSubmitResult({...submitResult, status: event.target.value});
    setTestcaseDetail({...testCaseDetail, status: event.target.value});
  }

  const handleSave = () => {
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
            <Grid item xs={12}><TextField id="testSuiteName" label="Test Case Name" variant="outlined"  value={testCaseDetail.testcaseName} fullWidth required/></Grid>
            <Grid item xs={12}><TextField id="description" label="Description" variant="outlined"  value = {testCaseDetail.description} fullWidth required/></Grid>
            <Grid item xs={12}><TextField id="parent" label="Test Suite" variant="outlined"  fullWidth required/></Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField id="description" label="Importance" variant="outlined" value={testCaseDetail.priority}  fullWidth required/>
                </Grid>
                <Grid item xs={6}>
                  <TextField id="description" label="Type" variant="outlined"  fullWidth required/>
                </Grid>
                <Grid item xs={12}><TextField id="preCondition" label="Pre-condition" variant="outlined"  fullWidth multiline rows={3} rowsMax={3}/></Grid>
                <Grid item xs={12}><TextField id="postCondition" label="Post-condition" variant="outlined"  fullWidth multiline rows={3} rowsMax={3}/></Grid>
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
                        <Grid item xs={3}><TextField id="definition" variant="outlined" label='Definition' value={item.stepDefine} required  fullWidth multiline rows={3}/></Grid>
                        <Grid item xs={3}><TextField id="expectResult"  variant="outlined" label='Expected Result' required value={item.expectResult}  multiline fullWidth rows={3}/></Grid>
                        <Grid item xs={1}><FormControl variant="outlined" fullWidth>
                              <InputLabel id="type">Type</InputLabel>
                                <Select
                                  labelId="type"
                                  id="type"
                                  value={item.type}
                                  //onChange={handleChange}
                                  label="Type"
                                >
                               <MenuItem value='manual'><em>Manual</em></MenuItem>
                               <MenuItem value='auto'>Auto</MenuItem>
                              </Select>
                        </FormControl></Grid>
                        <Grid item xs={3}><TextField id="execNote"  variant="outlined" label='Execution Note' required  multiline fullWidth rows={3}/></Grid>
                        <Grid item xs={1}><FormControl variant="outlined" fullWidth>
                              <InputLabel id="type">Result</InputLabel>
                                <Select
                                  labelId="type"
                                  id="type"
                                  //value={age}
                                  //onChange={handleChange}
                                  label="Type"
                                >
                               <MenuItem value=""><em>Pass</em></MenuItem>
                               <MenuItem value={10}>Fail</MenuItem>
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
              {!viewMode && <Grid item>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                      <AddIcon />Save Result
                    </Button>
                </Grid>}
               
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
                    label="status">
                        <MenuItem value={'Untest'}>Untest</MenuItem>
                        <MenuItem value={"Pass"}>Pass</MenuItem>
                        <MenuItem value={"Block"}>Blocked</MenuItem>
                        <MenuItem value={"Fail"}>Fail</MenuItem>
                  </Select>
          </FormControl>
        </Grid>


        <Grid item xs={12} style={{marginTop: 10}}>
          {!viewMode && <Grid container justify ='space-between'>
            <Grid item>
              {currentIdx !== 0 && <Button variant="contained" color="primary" fullWidth onClick={handleNavigateBackward}>Previous Test Case</Button>}  
            </Grid>
            <Grid item>
             <Button variant="contained" color="primary" fullWidth onClick={handleNavigateForward}> {currentIdx !== execTest.listTestCase.length-1 ? 'Next Test Case': 'Finish'}</Button>
            </Grid>
          </Grid>}
          { viewMode &&  <Grid container justify ='flex-end'><Grid item xs={1}> <Button variant="contained"  fullWidth onClick={handleClose}>Return</Button></Grid></Grid>}
        </Grid>
        
      </Grid>
    </React.Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TestCaseExecDetail);
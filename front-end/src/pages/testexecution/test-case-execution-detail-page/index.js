import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { blue } from '@material-ui/core/colors';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import ArrorBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Helmet from 'react-helmet';
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
import BugReportIcon from '@material-ui/icons/BugReport';
import {
  Save as SaveIcon
} from "@material-ui/icons";
import { DISPLAY_MESSAGE } from "../../../redux/message/constants";
import { EXECUTE_TEST_CASE_REQ, GET_ALL_TESTEXEC_REQ, SELECT_TEST_CASE_REQ, RESET_EXECUTE_TEST_CASE } from "../../../redux/test-execution/constants";
import MarkedInput from "../../../components/markdown-input/MarkedInput";
import MarkedResult from "../../../components/markdown-input/MarkedResult";
import NewIssuePage from "../../issues/new-issue-page/index.js";
import ViewIssueTCPopup from './viewissuetc';


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

  const [openIssue, setOpenIssuePopup] = useState(false);
   
  const filterTestCase = (execId, testcaseId) => {
    var subItem = null;
    listTestExec.find((item) => {
      if (item._id === execId){
        subItem = item.exectestcases.find(subItem => subItem._id === testcaseId);
      } 
    });
    //console.log(subItem);
    return subItem;
  }


  const getIdxTestCase = (testcaseId) => {
     return execTest.listTestCase.findIndex(item => item._id === testcaseId);
  }
  
  const findNextIdx = (currentIdx) => {
    if (isRetest)
      return execTest.listTestCase.findIndex((item,index) => index > currentIdx);
    return execTest.listTestCase.findIndex((item,index) => index > currentIdx && item.status === 'Untest' );
  }

  const findPrevIdx = (currentIdx) => {
    if (isRetest){
      return currentIdx-1;
    } else {
      for (var idx = currentIdx-1; idx >= 0; idx--){
        if (execTest.listTestCase[idx].status === 'Untest') return idx;
      }
    }
    return -1;
  }



  const [testCaseDetail, setTestcaseDetail] = useState(filterTestCase(props.match.params.testExecutionId, props.match.params.id));

  const [currentIdx, setCurrentIdx] = useState(getIdxTestCase(props.match.params.id));

  const [viewMode,setViewMode] = useState(location.pathname.substring(location.pathname.lastIndexOf("/") + 1) === 'execute-result' || location.pathname.substring(location.pathname.lastIndexOf("/") + 1) === 're-execute-result'  ? false : true);
  const [isRetest,setRetest] = useState(location.pathname.substring(location.pathname.lastIndexOf("/") + 1) === 're-execute-result'  ? true : false);
  const [enableCreateBtn, setEnableCreateBtn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openNewIssue,setOpenNewIssue] = useState(false); 

  useEffect(()=>{
    if (currentIdx > execTest.listTestCase.length || currentIdx < 0) return;
    else {
      selectTestcaseReq(props.match.params.id);
      setCurrentIdx(getIdxTestCase(props.match.params.id));
      setTestcaseDetail(filterTestCase(props.match.params.testExecutionId, props.match.params.id));
    }
  },[currentIdx])

  useEffect(()=>{
    //console.log(testCaseDetail);
  },[testCaseDetail])


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
      if (isRetest)
        history.replace(url+'/'+execTest.listTestCase[findNextIdx(currentIdx)]._id+'/re-execute-result');
      else
        history.replace(url+'/'+execTest.listTestCase[findNextIdx(currentIdx)]._id+'/execute-result');
      setCurrentIdx(findNextIdx(currentIdx));
    }
  }
  
  const handleNavigateBackward = () => {
    var url = location.pathname.substring(0,location.pathname.lastIndexOf("/"));
    url = url.substring(0,url.lastIndexOf("/"));
    if (currentIdx-1 < 0 || findPrevIdx(currentIdx) === -1) return;
    else {
      if (!isRetest)
        history.replace(url+'/'+execTest.listTestCase[findPrevIdx(currentIdx)]._id+'/execute-result');
      else
        history.replace(url+'/'+execTest.listTestCase[findPrevIdx(currentIdx)]._id+'/re-execute-result');
      setCurrentIdx(findPrevIdx(currentIdx));
    }
  }

  const handleClose = () => {
    history.goBack();
  }
  
  const handleOpenNewIssue = () => {
    setOpenNewIssue(true);
  }

  const handleOpenIssue = () => {
    setOpenIssuePopup(true);
  }

  return(
    <React.Fragment>
      <Helmet title="Executing Test Cases" />

      <Grid container spacing={3} >
        <Grid item xs={12}>
            <Typography variant="h4" gutterBottom display="inline">
                Test Case Details
            </Typography>
            <Divider/>
        </Grid>
        
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}><TextField id="testSuiteName" label="Test Case Name"  variant="outlined"  value={testCaseDetail.testcaseName} fullWidth required/></Grid>
            <Grid item xs={12}><TextField id="description" label="Descriptions"  variant="outlined"  value = {testCaseDetail.description} fullWidth required multiline rows={3}/></Grid>
            {/* <Grid item xs={6}>
              <TextField id="testSuite" label="Test Suite"  variant="outlined" value = {testCaseDetail.testsuite} 
              fullWidth required/>
              </Grid> */}
            <Grid item xs={6}>
              <TextField id="important" label="Importance"  variant="outlined" value={testCaseDetail.priority} 
              fullWidth required/>
            </Grid>
            <Grid item xs={6}>
              <TextField id="requirement" label="Requirement"  variant="outlined" value={testCaseDetail.requirement.projectrequirementname} 
              fullWidth/>
            </Grid>
                
        <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" gutterBottom display="inline" >
                    Preconditions
                  </Typography>
                  <MarkedResult id="preCondition" markdown={testCaseDetail.precondition} />
                  {/* <TextField id="preCondition" label="Pre-condition" variant="outlined" 
                  value = {testCaseDetail.precondition} fullWidth multiline rows={2.5} rowsMax={3}/> */}
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" gutterBottom display="inline" >
                    Postconditions
                  </Typography>
                  <MarkedResult id="postCondition" markdown={testCaseDetail.postcondition} />
                  {/* <TextField id="postCondition" label="Post-condition"  variant="outlined" 
                  value = {testCaseDetail.postcondition} fullWidth multiline rows={2.5} rowsMax={3}/> */}
                </Grid>
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
            {testCaseDetail.listStep.map((item, index) => (
                    <ListItem key={item.id}>
                      <Grid container spacing={1}>
                        <Grid item style={{margin: 'auto 0'}}><div style={{marginLeft:'-10px', marginRight: 5}}>{index+1}</div></Grid>
                        <Grid item xs={3} style={{marginTop: '12px'}}>
                          <Typography variant="subtitle2" gutterBottom display="inline" >
                            Definition
                          </Typography>
                          <MarkedResult id="definition" height={180} markdown={item.stepDefine} />
                          {/* <TextField id="definition" variant="outlined" label='Definition' 
                          value={item.stepDefine} required  fullWidth multiline rows={4}/> */}
                        </Grid>
                        <Grid item xs={3} style={{marginTop: '12px'}}>
                          <Typography variant="subtitle2" gutterBottom display="inline" >
                            Expected Result
                          </Typography>
                          <MarkedResult id="expectResult" height={180} markdown={item.expectResult} />
                         {/*  <TextField id="expectResult"  variant="outlined" label='Expected Result' required 
                          value={item.expectResult}  multiline fullWidth rows={4}/> */}
                        </Grid>
                        <Grid item xs>
                        {viewMode ? 
                        <div style={{marginTop: '12px'}}>
                          <Typography variant="subtitle2" display="inline" >
                            Actual Result
                          </Typography>
                          <MarkedResult id="expectResult" height={180} markdown={item.note} />
                        </div>                        
                        :
                          <MarkedInput idOfInput={"definition-execNote"+item._id} setTxt={item.note} title="Actual Result"
                            handleChange={(text)=>{filterUpdateStep(item._id, "note", text)}}
                          />}
                          {/* <TextField id="execNote"  variant="outlined" label='Execution Note' required  value= {item.note} 
                          onChange={(event)=>{filterUpdateStep(item._id, "note", event.target.value)}} 
                          multiline fullWidth rows={4}/> */}
                        </Grid>
                        <Grid item xs={2} style={{marginTop: '33px'}}><FormControl variant="outlined" fullWidth>
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
          <Grid container direction='row' justify='space-between' styles={{display: 'inline'}}>
              <Grid item xs={12}>
              <Grid container justify='space-between' spacing={1}>
                <Grid item>
                  <Typography variant="h5" gutterBottom display="inline">
                   Result
                  </Typography>
                </Grid>
                <Grid item>
                  <ViewIssueTCPopup
                  isOpen={openIssue}
                  setOpen={setOpenIssuePopup}
                  listIssueOfExec={testCaseDetail.issue ? testCaseDetail.issue : []}
                  execid={props.match.params.testExecutionId}
                  //refreshWhenDelIssue={refreshWhenDelIssue}
                  />
                  <Button variant="contained" onClick={handleOpenIssue}>View Defects</Button>
                
              
              <NewIssuePage isOpen={openNewIssue} setOpen={setOpenNewIssue} tc_id={location.pathname.split('/')[6]}
                listStep={testCaseDetail.listStep}
              />
                {!viewMode &&
                  <Button variant="contained" color="primary" endIcon={<BugReportIcon />}
                  onClick={handleOpenNewIssue} style={{marginLeft: '10px'}}> Report Defect</Button>
                }</Grid>
              </Grid>
                
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
          { viewMode && 
          <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
              <Button variant="contained" startIcon={<KeyboardReturnIcon />} onClick={handleClose}>
                Return
              </Button>
          </div>}
        </Grid>
        
      </Grid>
    </React.Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TestCaseExecDetail);
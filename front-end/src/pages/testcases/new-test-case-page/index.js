import React, { useState, useEffect } from "react";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Helmet from 'react-helmet';
import DragList from '../../../components/DragList';
import { connect } from 'react-redux';
import {ADD_TEST_CASE_REQ, GET_ALL_TESTCASE_REQ} from '../../../redux/test-case/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import {
  Grid,
  Typography,
  Divider,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@material-ui/core';

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { 
    insTestcase: state.testcase.insTestcase,
    listTestsuite: state.testcase.listTestsuite
   }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    getAllTestcaseReq: (payload) => dispatch({type: GET_ALL_TESTCASE_REQ, payload}),
    addTestcaseReq: (payload) => dispatch({type: ADD_TEST_CASE_REQ, payload})
  }
}

const TestCaseDetail = (props) => {
  const {node, addTestcaseReq, displayMsg, insTestcase, getAllTestcaseReq, listTestsuite} = props;

  const history = useHistory();
  
  const [testcase, setTestcase] = useState({
    testcaseName: '',
    description: '',
    testsuite: props.match.params.testsuiteName,
    priority: 'medium',
    type: 'manual',
    precondition: '',
    postCondition: '',
    listStep:[]
  });

  const [listSteps, setListSteps] = useState([]);

  useEffect(()=>{
    setTestcase({...testcase, listStep: listSteps});
  },[listSteps]);


  useEffect(()=>{
    if (insTestcase.sucess === false){
      displayMsg({
        content: insTestcase.errMsg,
        type: 'error'
      });
    } else if (insTestcase.sucess === true) {
      displayMsg({
        content: "Create Testcase successfully !",
        type: 'success'
      });
      getAllTestcaseReq();
      history.goBack();
    }
  },[insTestcase.sucess]);

  const handleChange = (prop) => (event) => {
    setTestcase({ ...testcase, [prop]: event.target.value });
  };

  const handleCancel = (event) => {
    history.goBack();
  }

  const handleSave = () => {
    addTestcaseReq(testcase);
  }

  const updateListStep = (Data) => {
    setListSteps(Data);
  };

  return(
    <React.Fragment>
      <Grid container spacing={3} >
        <Grid item xs={12}>
            <Typography variant="h4" gutterBottom display="inline">
                New Test Case
            </Typography>
            <Divider/>
        </Grid>
        
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}><TextField id="testSuiteName" label="Test Case Name" variant="outlined" value={testcase.testcaseName}  onChange={handleChange('testcaseName')} fullWidth required/></Grid>
            <Grid item xs={12}><TextField id="description" label="Description" variant="outlined" value={testcase.description} onChange={handleChange('description')} fullWidth required/></Grid>
            <Grid item xs={12}>
             <FormControl variant="outlined"  fullWidth>
                              <InputLabel id="testSuite">Test Suite</InputLabel>
                                <Select
                                  labelId="testSuite"
                                  id="testSuite"
                                  value={testcase.testsuite}
                                  onChange={handleChange('testsuite')}
                                  label="Test Suite"
                                >
                               {listTestsuite.map((item) => (
                                    <MenuItem value={item.name}>{item.name}</MenuItem>
                               ))}
                              </Select>
              </FormControl> 
                
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                    <FormControl variant="outlined"  fullWidth>
                              <InputLabel id="Importance">Importance</InputLabel>
                                <Select
                                  labelId="Importance"
                                  id="Importance"
                                  value={testcase.priority}
                                  onChange={handleChange('priority')}
                                  label="Importance"
                                >
                               <MenuItem value=""><em>Any</em></MenuItem>
                               <MenuItem value={'low'}>Low</MenuItem>
                               <MenuItem value={'medium'}>Medium</MenuItem>
                               <MenuItem value={'high'}>High</MenuItem>
                              </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                <FormControl variant="outlined"  fullWidth>
                              <InputLabel id="type">Type</InputLabel>
                                <Select
                                  labelId="type"
                                  id="type"
                                  value={testcase.type}
                                  onChange={handleChange('type')}
                                  label="Type"
                                >
                               <MenuItem value={"manual"}><em>Manual</em></MenuItem>
                               <MenuItem value={"auto"}>Auto</MenuItem>
                              </Select>
                            </FormControl>
                </Grid>
              </Grid>      
            </Grid>

            <Grid item xs={12}><TextField id="preCondition" label="Pre-condition" value={testcase.preCond} onChange={handleChange('precondition')} variant="outlined"  fullWidth multiline rows={3} rowsMax={3}/></Grid>
            <Grid item xs={12}><TextField id="postCondition" label="Post-condition" variant="outlined" value={testcase.postCond} onChange={handleChange('postCondition')} fullWidth multiline rows={3} rowsMax={3}/></Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} style={{marginTop: '3.5vh'}}>
          <Typography variant="h6" gutterBottom display="inline">
                Steps Definition
          </Typography>
          <Divider/>
        </Grid>

        <Grid item xs={12}>
          <DragList data = {listSteps} setData={setListSteps} parentCallback={updateListStep}/>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify ='flex-end' spacing={1}>
            <Grid item>
              <Button variant="contained" color="primary" fullWidth onClick={handleSave}>Save</Button>
            </Grid>
            <Grid item>
              <Button variant="contained"  fullWidth onClick={handleCancel}>Cancel</Button>
            </Grid>
          </Grid>
        </Grid>
        
      </Grid>
    </React.Fragment>
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(TestCaseDetail);
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
    testsuite: state.testcase.insTestsuite
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
  const {node} = props;
  
  const [testcase, setTestcase] = useState({
    name: '',
    description: '',
    testSuite: '',
    importance: '',
    preCond: '',
    postCond: '',
    listSteps:[]
  });

  useEffect(()=>{
    // if (node){
    //   setTestSuite({
    //     ...testSuite,
    //     name: node.name,
    //     children: node.children
    //   });
    // }
  },[node]);


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
            <Grid item xs={12}><TextField id="testSuiteName" label="Test Case Name" variant="outlined" value={testcase.name}  fullWidth required/></Grid>
            <Grid item xs={12}><TextField id="description" label="Description" variant="outlined"  fullWidth required/></Grid>
            <Grid item xs={12}>
            <FormControl variant="outlined"  fullWidth>
                              <InputLabel id="testSuite">Test Suite</InputLabel>
                                <Select
                                  labelId="testSuite"
                                  id="testSuite"
                                  //value={age}
                                  //onChange={handleChange}
                                  label="Test Suite"
                                >
                               <MenuItem value=""><em>Any</em></MenuItem>
                               <MenuItem value={10}>Low</MenuItem>
                               <MenuItem value={20}>Medium</MenuItem>
                               <MenuItem value={30}>High</MenuItem>
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
                                  //value={age}
                                  //onChange={handleChange}
                                  label="Importance"
                                >
                               <MenuItem value=""><em>Any</em></MenuItem>
                               <MenuItem value={10}>Low</MenuItem>
                               <MenuItem value={20}>Medium</MenuItem>
                               <MenuItem value={30}>High</MenuItem>
                              </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                <FormControl variant="outlined"  fullWidth>
                              <InputLabel id="type">Type</InputLabel>
                                <Select
                                  labelId="type"
                                  id="type"
                                  //value={age}
                                  //onChange={handleChange}
                                  label="Type"
                                >
                               <MenuItem value=""><em>Manual</em></MenuItem>
                               <MenuItem value={10}>Auto</MenuItem>
                              </Select>
                            </FormControl>
                </Grid>
              </Grid>      
            </Grid>

            <Grid item xs={12}><TextField id="preCondition" label="Pre-condition" variant="outlined"  fullWidth multiline rows={3} rowsMax={3}/></Grid>
            <Grid item xs={12}><TextField id="postCondition" label="Post-condition" variant="outlined"  fullWidth multiline rows={3} rowsMax={3}/></Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} style={{marginTop: '3.5vh'}}>
          <Typography variant="h6" gutterBottom display="inline">
                Steps Definition
          </Typography>
          <Divider/>
        </Grid>

        <Grid item xs={12}>
          <DragList/>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify ='flex-end'>
            <Grid item>
              <Button variant="contained" color="primary" fullWidth>Save</Button>
            </Grid>
          </Grid>
        </Grid>
        
      </Grid>
    </React.Fragment>
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(TestCaseDetail);
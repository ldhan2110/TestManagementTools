import React, { useState, useEffect } from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Helmet from 'react-helmet';
import TreeView from '../../../components/TreeView';
import TestSuiteDetail from './TestSuitePage';
import TestCaseDetail from "./TestCasePage";
import {GET_ALL_TESTCASE_REQ} from '../../../redux/test-case/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
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




// const tempData = {
//   id: 'root',
//   name: "Test Project",
//   type: 'F',
//   children: [
//     {id: 'TF-01', name: 'Test Suite 01', type: 'F', children:[]},
//     {id: 'TF-02', name: 'Test Suite 02', type: 'F', children:[
//       {id: 'TC-01', name: 'Test Login Page', type: 'C'},
//       {id: 'TC-02', name: 'Test Register Page', type: 'C'},
//       {id: 'TC-03', name: 'Test Forgot Password  Page', type: 'C'},
//       {id: 'TC-04', name: 'Test Login API', type: 'C'},
//     ]},
//     {id: 'TF-03', name: 'Test Suite 03', type: 'F', children:[
//       {id: 'TC-05', name: 'Test Back-end', type: 'C'},
//       {id: 'TC-06', name: 'Test UI', type: 'C'},
//       {id: 'TC-07', name: 'Test Performance', type: 'C'},
//       {id: 'TC-08', name: 'Test Responsive', type: 'C'},
//     ]},
//   ]
// }


//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { 
    project: state.project.currentSelectedProject,
    testcase: state.testcase
   }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    getAllTestcaseReq: (payload) => dispatch({type: GET_ALL_TESTCASE_REQ, payload})
  }
}




const TestCaseListPage = (props) => {
    const {classes} = props;
  
    const history = useHistory();

    const[selectedNode, setSelectNode] = useState('');

    const[displayNode,setDisplayNode] = useState({});

    const {project, testcase, displayMsg, getAllTestcaseReq} = props;


    useEffect(()=>{
      setDisplayNode(searchTree(testcase,selectedNode));
    },[selectedNode,testcase]);


    useEffect(()=>{
      getAllTestcaseReq(project);
    },[]);

    useEffect(()=>{
      console.log(testcase);
    },[testcase]);
  
    const handleClickNewTestPlan = () => {
      history.push(window.location.pathname+"/create-test-plan");
    }

    const searchTree = (root,selectedNode)=>{
      var stack = [], node, ii;
      stack.push(root);

      while (stack.length > 0) {
        node = stack.pop();
        if (node.id == selectedNode) {
        // Found it!
          return node;
        } else if (node.children && node.children.length) {
        for (ii = 0; ii < node.children.length; ii += 1) {
              stack.push(node.children[ii]);
        }
      }
    }

// Didn't find it. Return null.
return null;
    }
  
    const navigateToDetailPage = (params) => {
      if (params)
        history.push(window.location.pathname+"/"+params);
    }
  
    return(
      <div> 
        <Helmet title="Service Management" />
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Grid container spacing={8} className={classes.contentContainer}>
                <Grid item xs ={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="h4" gutterBottom display="inline">
                        Filters
                      </Typography>
                      <Divider/>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField id="testCaseName" label="Test Case Name" variant="outlined"  fullWidth required/>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl} fullWidth>
                        <InputLabel id="testSuite">Test Suite</InputLabel>
                        <Select
                            labelId="testSuite"
                            id="testSuite"
                            //value={age}
                            //onChange={handleChange}
                            label="Test Suite"
                        >
                          <MenuItem value="">
                              <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>


                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                          <Grid item xs ={6}>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth>
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
                          <Grid item xs ={6}>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth>
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

                  <Grid item xs={12}><Button variant="contained" color="primary" fullWidth>Search</Button></Grid>

                  <Grid item xs={12} style={{marginTop: '5vh'}}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}><Typography variant="h4" gutterBottom display="inline">Test Cases</Typography> <Divider /></Grid>
                      <Grid item xs={12}><TreeView data={testcase.listTestcase} setSelectNode={setSelectNode}/></Grid>
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>

              <Divider orientation="vertical" flexItem />

              <Grid item xs={8}>
                {displayNode !== null && displayNode.type === 'F' && <TestSuiteDetail node={displayNode}/>}
                {displayNode !== null && displayNode.type === 'C' && <TestCaseDetail node={displayNode}/>}
              </Grid>
            </Grid>
          </Grid> 
        </Grid>
      </div>
    );
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TestCaseListPage));
import React, { useState, useEffect } from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Helmet from 'react-helmet';
import TreeView from '../../../components/TreeView';
import TestSuiteDetail from './TestSuitePage';
import TestCaseDetail from "./TestCasePage";
import {GET_ALL_TESTCASE_REQ, GET_ALL_TESTSUITE_REQ, GET_ALL_TESTSUITE_NO_TREE_REQ} from '../../../redux/test-case/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
import NewTestSuitePopup from '../new-test-suite-page/index';
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
  //IconButton
} from '@material-ui/core';



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
    getAllTestcaseReq: (payload) => dispatch({type: GET_ALL_TESTCASE_REQ, payload}),
    getAllTestsuiteReq: (payload) => dispatch({type: GET_ALL_TESTSUITE_REQ,payload}),
    getAllTestsuiteNoTreeReq: (payload) => dispatch({type: GET_ALL_TESTSUITE_NO_TREE_REQ,payload})

  }
}


const TestCaseListPage = (props) => {
    const {classes} = props;
  
    const history = useHistory();

    const[selectedNode, setSelectNode] = useState('');

    const[displayNode,setDisplayNode] = useState({});

    const[selected,setSelected] = useState('');

    const {project, testcase, getAllTestcaseReq, 
      getAllTestsuiteReq, getAllTestsuiteNoTreeReq} = props; //displayMsg

    const [listTestCase, setListTestCase] = useState([]);

    const [listTestCaseNoTree, setListTestCaseNoTree] = useState([]);

    const [openNewTS, setOpenTS] = useState(false);

    const [suiteNum, setSuiteNum] = useState(0);

    useEffect(()=>{
      setDisplayNode(searchTree(testcase.listTestcase,selectedNode));
    },[selectedNode,testcase]);


    useEffect(()=>{
      getAllTestcaseReq(project);
      getAllTestsuiteReq(project);
      getAllTestsuiteNoTreeReq(project);
    },[]);

    useEffect(()=>{
      setListTestCase(testcase.listTestcase);
      if(listTestCase.length !== 0)
        setSuiteNum(listTestCase.children.length);
    },[testcase.listTestcase]);

    //refresh newly added suite
    useEffect(()=>{
      getAllTestsuiteReq(project);
      getAllTestsuiteNoTreeReq(project);
    },[suiteNum]);

    useEffect(()=>{
      setListTestCaseNoTree(testcase.listTestcase);
    },[testcase.listTestcaseNoTree]);
  

    const searchTree = (root,selectedNode)=>{
      var stack = [], node, ii;
      stack.push(root);

      while (stack.length > 0) {
        node = stack.pop();
        if (node._id === selectedNode) {
        // Found it!
          return node;
        } else if (node.children && node.children.length) {
        for (ii = 0; ii < node.children.length; ii += 1) {
              stack.push(node.children[ii]);
        }
      }
    }// Didn't find it. Return null.
      return null;
    }
  
    const navigateToDetailPage = (params) => {
      if (params)
        history.push(window.location.pathname+"/"+params);
    }

    const handleAddTestSuite = () => {
      setOpenTS(true);
    }


  
    return(
      <div> 
        <Helmet title="Service Management" />
        <NewTestSuitePopup isOpen={openNewTS} setOpen={setOpenTS} selected={selected}/>
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
                      <Grid item xs={12}>                 
                            <Typography variant="h4" gutterBottom display="inline">Test Cases</Typography> 
                      <Divider />
                    </Grid>
                      <Grid item xs={12}><TreeView data={listTestCase} setSelectNode={setSelectNode}/></Grid>
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>

              <Divider orientation="vertical" flexItem />

              <Grid item xs={8}>
                {displayNode !== null && (displayNode.type === 'TS' || displayNode.type === 'root') && <TestSuiteDetail node={displayNode}/>}
                {displayNode !== null && displayNode.type === 'TC' && <TestCaseDetail key={displayNode._id} node={displayNode}/>}
              </Grid>
            </Grid>
          </Grid> 
        </Grid>
      </div>
    );
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TestCaseListPage));
import React, { useState, useEffect } from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Helmet from 'react-helmet';
import TreeView from '../../../components/TreeView';
import TestSuiteDetail from './TestSuitePage';
import TestCaseDetail from "./TestCasePage";
import {GET_ALL_TESTCASE_REQ, GET_ALL_TESTSUITE_REQ, GET_ALL_TESTSUITE_NO_TREE_REQ, SEARCH_TESTCASE_REQ} from '../../../redux/test-case/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
import { red } from '@material-ui/core/colors';
import Backdrop from '@material-ui/core/Backdrop';
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
  InputLabel, Tooltip,
  //IconButton
} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import InfoIcon from '@material-ui/icons/Info';


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
    getAllTestsuiteNoTreeReq: (payload) => dispatch({type: GET_ALL_TESTSUITE_NO_TREE_REQ,payload}),
    searchTestCaseReq: (payload) => dispatch({type: SEARCH_TESTCASE_REQ, payload})

  }
}


const TestCaseListPage = (props) => {
    const {classes} = props;
  
    const history = useHistory();

    const[selectedNode, setSelectNode] = useState('');

    const[displayNode,setDisplayNode] = useState({});

    const[selected,setSelected] = useState('');

    const {project, testcase, getAllTestcaseReq, 
      getAllTestsuiteReq, getAllTestsuiteNoTreeReq, searchTestCaseReq} = props; //displayMsg

    const [listTestCase, setListTestCase] = useState([]);

    const [listTestCaseNoTree, setListTestCaseNoTree] = useState([]);

    const [openNewTS, setOpenTS] = useState(false);

    const [suiteNum, setSuiteNum] = useState(0);
    const [search, setSearch] = useState({
      testcasename: '',
      testsuite: '',
      priority: ''
    });

    const [enableCancelSearch, setEnableCancelSearch] = useState(false);

    useEffect(()=>{
      setDisplayNode(searchTree(testcase.listTestcase,selectedNode));
    },[selectedNode,testcase]);


    useEffect(()=>{
      testcase.searchSuccess = null;
      testcase.success = null;
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
  
    

    const handleChangeSearch = (prop) => (event) => {
      setSearch({...search, [prop]: event.target.value});
    }

    const handleSearchButton = () => {
      if(search.testcasename === '' && search.testsuite === '' && search.priority === '' && enableCancelSearch === true){
        searchTestCaseReq(search);
        setEnableCancelSearch(false);
      }
      if(search.testcasename !== '' || search.testsuite !== '' || search.priority !== '')
        searchTestCaseReq(search);
      if(enableCancelSearch === false && (search.testcasename !== '' || search.testsuite !== '' || search.priority !== ''))
        setEnableCancelSearch(true);
    }
    
    const handleSearchCancel = () => {
      setSearch({testcasename: '', testsuite: '', priority: ''})
      getAllTestcaseReq(project);
      getAllTestsuiteReq(project);
      getAllTestsuiteNoTreeReq(project);
      setEnableCancelSearch(false);
    }
    return(
      <div> 
        <Helmet title="Test Cases Management" />
        <NewTestSuitePopup isOpen={openNewTS} setOpen={setOpenTS} selected={selected}/>
        <Grid container>
          <Grid item xs={12}>
            <Grid container spacing={8} className={classes.contentContainer}>
                <Grid item className={classes.filterAndTCtree}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="h4" gutterBottom display="inline">
                        Filters
                      </Typography>
                      <Divider/>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField 
                      id="testCaseName" 
                      label="Test Case Name" 
                      variant="outlined" 
                      value={search.testcasename}
                      onChange={handleChangeSearch('testcasename')} 
                      fullWidth required/>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl} fullWidth>
                        <InputLabel id="testSuite">Test Suite</InputLabel>
                        <Select
                            labelId="testSuite"
                            id="testSuite"
                            value={search.testsuite}
                            onChange={handleChangeSearch('testsuite')}
                            label="Test Suite"
                        >
                          <MenuItem value="">Any</MenuItem>
                          {testcase.listTestsuite.map((item) => (
                                    <MenuItem value={item.name}>{item.name}</MenuItem>
                               ))}
                        </Select>
                      </FormControl>
                    </Grid>


                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                              <InputLabel id="Importance">Importance</InputLabel>
                                <Select
                                  labelId="Importance"
                                  id="Importance"
                                  value={search.priority}
                                  onChange={handleChangeSearch('priority')}
                                  label="Importance"
                                >
                               <MenuItem value=""><em>Any</em></MenuItem>
                               <MenuItem value="Low">Low</MenuItem>
                               <MenuItem value="Medium">Medium</MenuItem>
                               <MenuItem value="High">High</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          
                      </Grid>
                    </Grid>

                  <Grid item xs={6}>                  
                    <Button variant="contained" color="primary" onClick={handleSearchButton} fullWidth>Search</Button>
                    </Grid>
                  <Grid item xs={6}>
                    <Button variant="contained" color="default" disabled={enableCancelSearch ? false : true } onClick={handleSearchCancel} fullWidth>Clear</Button>
                  </Grid>                  
                  <Grid item xs={12} style={{marginTop: '5vh'}}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>                 
                            <Typography variant="h4" display="inline">Test Cases</Typography>
                            <Tooltip classes={{tooltip: classes.tooltip}}
                            placement="right-start"
                            title={<div>
                              <Typography variant="subtitle2" display="inline">- </Typography>
                              <Typography variant="subtitle2" gutterBottom display="inline" style={{color: red[400]}}> Red </Typography>  
                              <Typography variant="subtitle2" display="inline"> suite means all child TC assigned.</Typography>
                              <Typography variant="subtitle2" display="outline">- ( , , , ) are the number of </Typography>
                              <Typography variant="subtitle2" display="outline">(Suite, Total TC, Unassigned TC).</Typography>
                              </div>}><InfoIcon style={{fontSize:22, marginLeft: 7}}/></Tooltip>
                            {(testcase.success === "" || testcase.searchSuccess === "") && <LinearProgress/>}
                      <Divider />
                    </Grid>
                      <div style={(testcase.success === "" || testcase.searchSuccess === "") ?
                      {opacity: 0.5, pointerEvents: 'none', width: "100%"}:{opacity: 1, pointerEvents: 'initial', width: "100%"}}>
                        <Grid item xs={12}>
                          <TreeView data={listTestCase} setSelectNode={setSelectNode}/>
                        </Grid>
                      </div>
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>

              <Divider orientation="vertical" flexItem />

              <Grid item className={classes.tcDetails}>
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
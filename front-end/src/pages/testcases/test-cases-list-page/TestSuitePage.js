import React, { useState, useEffect } from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Helmet from 'react-helmet';
import EnhancedTable from '../../../components/Table/index';
import NewTestSuitePopup from '../new-test-suite-page/index';
import {TEST_SUITE_DETAIL_HEADERS} from '../../../components/Table/DefineHeader';
import { connect } from 'react-redux';
import {UPDATE_TESTSUITE_REQ, DELETE_TESTSUITE_REQ} from '../../../redux/test-case/constants';
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

import {
  Add as AddIcon,
} from "@material-ui/icons";
import SelectTestCasePopup from "../select-test-case-page";


//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { 
    listTestsuite: state.testcase.listTestsuite,
    project:state.project.currentSelectedProject,
   }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    updateTestsuiteReq: (payload) => dispatch({type: UPDATE_TESTSUITE_REQ, payload}),
    deleteTestsuiteReq: (payload) => dispatch({type: DELETE_TESTSUITE_REQ, payload})
  }
}

const TestSuiteDetail = (props) => {
  const {node, listTestsuite, project, updateTestsuiteReq, deleteTestsuiteReq, displayMsg} = props;
  
  const [testSuite, setTestSuite] = useState({
    id: '',
    name: '',
    description: '',
    parent: '',
    priority: node.priority,
    children: [],
    projectid: project,
    
  });

  const [openNewTS, setOpenTS] = useState(false);

  const [openNewTC, setOpenTC] = useState(false);


  const history = useHistory();

  useEffect(()=>{
    if (node && node.parent === undefined){
      console.log('no parent');
      setTestSuite({
        ...node,
        id: node.id,
        name: node.name,
        description: node.description,
        parent: "",
        priority: node.priority,
        children: node.children,
        projectid: project
      });
    }
    else if(node && node.parent !== undefined){
      console.log('have a parent');
      setTestSuite({
        ...node,
        id: node.id,
        name: node.name,
        description: node.description,
        parent: node.parent.testsuitename,
        priority: node.priority,
        children: node.children,
        projectid: project
      });      
    }
  },[node])

  const handleOpenTS = ()=>{
    console.log('testsuite: ' + JSON.stringify(node));
    setOpenTS(true);
  }

  const handleOpenTC = ()=>{
    history.push(window.location.pathname+"/"+node.name+"/new-test-case");
  }

  const handleChange = (prop) => (event) => {
    setTestSuite({ ...testSuite, [prop]: event.target.value });
  };

  const handleSave = ()=>{
    console.log('testsuite_infor: ' + JSON.stringify(testSuite));
  }

  useEffect(()=>{

      console.log('testsuite: ' + JSON.stringify(node));
    
  },[])

  return(
    <React.Fragment>
      <NewTestSuitePopup isOpen={openNewTS} setOpen={setOpenTS} selected={node.type !== 'root' ? node.name : ''}/>
      {/* <SelectTestCasePopup isOpen={openNewTS} setOpen = {setOpenTS}/> */}
      <Grid container spacing={3} >
        <Grid item xs={12}>
              <Typography variant="h4" gutterBottom display="inline">
                Test Suite Detail
              </Typography>
              <Divider/>
          </Grid>
            
        
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}><TextField id="testSuiteName" label="Test Suite Name" variant="outlined" onChange={handleChange('name')} value={testSuite.name || ''} fullWidth required/></Grid>
            <Grid item xs={12}><TextField id="description" label="Description" variant="outlined" onChange={handleChange('description')} fullWidth required value={testSuite.description || ''}/></Grid>
            <Grid item xs={12}>
                  <FormControl variant="outlined"  fullWidth>
                              <InputLabel id="testSuite">Test Suite</InputLabel>
                                <Select
                                  labelId="testSuite"
                                  id="testSuite"
                                  onChange={handleChange('parent')} 
                                  value={testSuite.parent || ''}
                                  label="Test Suite"
                                  disabled={testSuite.type === "root" ? true : false}
                                >
                                  {listTestsuite.map((item) => (
                                    <MenuItem value={item.name}>{item.name}</MenuItem>
                                  ))}
                              </Select>
                  </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} style={{marginTop: '17vh'}}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom display="inline">Detail</Typography>
              </Grid>

              <Grid item xs={6}> 
                {testSuite.type !== "root" ?
                <Grid container spacing={1} justify='flex-end'>
                   <Grid item>
                    <Button variant="contained" color="primary" onClick={handleOpenTC} >
                      <AddIcon />Add Test Case
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button variant="contained" color="secondary" onClick={handleOpenTS}>
                      <AddIcon />Add Test Suite
                    </Button> 
                  </Grid>
                </Grid>
                :
                <Grid container justify='flex-end'>
                  <Grid item>
                    <Button variant="contained" color="secondary" onClick={handleOpenTS}>
                      <AddIcon />Add Test Suite
                    </Button> 
                  </Grid>
                </Grid>
                }
              </Grid>

        
            </Grid>
            <Divider/>      
        </Grid>

        <Grid item xs={12}>
          <EnhancedTable
            rows={testSuite.children}
            headerList = {TEST_SUITE_DETAIL_HEADERS}
            //viewAction={navigateToDetailPage}
          />
        </Grid>
        

        <Grid item xs={12}>
          <Grid container justify ='flex-end'>
            <Grid item>
              <Button variant="contained" color="primary" fullWidth onClick={handleSave}>Save</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default connect(mapStateToProps,null)(TestSuiteDetail);
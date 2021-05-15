import React, { useState, useEffect } from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Helmet from 'react-helmet';
import EnhancedTable from '../../../components/Table/index';
import NewTestSuitePopup from '../new-test-suite-page/index';
import {TEST_SUITE_DETAIL_HEADERS} from '../../../components/Table/DefineHeader';
import { connect } from 'react-redux';
import {UPDATE_TESTSUITE_REQ, DELETE_TESTSUITE_REQ, RESET_UPDATE_TESTSUITE, RESET_DELETE_TESTSUITE} from '../../../redux/test-case/constants';
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
  InputLabel,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog
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
    insTestsuite: state.testcase.insTestsuite,
    insTestsuiteDelete: state.testcase.insTestsuiteDelete
   }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    updateTestsuiteReq: (payload) => dispatch({type: UPDATE_TESTSUITE_REQ, payload}),
    deleteTestsuiteReq: (payload) => dispatch({type: DELETE_TESTSUITE_REQ, payload}),
    resetUpdateRedux: () => dispatch({type: RESET_UPDATE_TESTSUITE}),
    resetDeleteRedux: () => dispatch({type: RESET_DELETE_TESTSUITE})
  }
}

const TestSuiteDetail = (props) => {
  const {node, listTestsuite, project, updateTestsuiteReq, deleteTestsuiteReq, displayMsg, insTestsuite, resetUpdateRedux, resetDeleteRedux, insTestsuiteDelete} = props;
  
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
  const [open, setOpen] = React.useState(false);
  const [checkError, setCheckError] = useState(false);
  const [error, setError] = useState({
    name: 'ss',
    description: 'ss',
  });
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

  useEffect(()=>{
    if (insTestsuite.sucess === false){
      displayMsg({
        content: insTestsuite.errMsg,
        type: 'error'
      });
      resetUpdateRedux();
    } else if (insTestsuite.sucess === true) {
      displayMsg({
        content: "Update testsuite successfully !",
        type: 'success'
      });
      resetUpdateRedux();
    }
  },[insTestsuite.sucess]);

  useEffect(()=>{
    if (insTestsuiteDelete.sucess === false){
      displayMsg({
        content: insTestsuiteDelete.errMsg,
        type: 'error'
      });
      resetDeleteRedux();
    } else if (insTestsuiteDelete.sucess === true) {
      displayMsg({
        content: "Delete testsuite successfully !",
        type: 'success'
      });
      resetDeleteRedux();
    }
  },[insTestsuiteDelete.sucess]);

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
    setCheckError(true);

    if(testSuite.description === "")
    setError({ ...testSuite, description: "" });

    if(testSuite.name === "")
    setError({ ...testSuite, name: "" });

    if(testSuite.testsuitename !== "" && testSuite.description !== ""){
      if(testSuite.name !== testSuite.parent)
        updateTestsuiteReq(testSuite);
    }
    //console.log('testsuite_infor: ' + JSON.stringify(testSuite));

  }

  const handleDelete = ()=>{
    console.log('testsuite_infor: ' + JSON.stringify(testSuite));
    //if(testSuite.name !== testSuite.parent){
      deleteTestsuiteReq(testSuite);
      setOpen(false);
    //}
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }


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
            <Grid item xs={12}><TextField id="testSuiteName" label="Test Suite Name" variant="outlined" 
              onChange={handleChange('name')} value={testSuite.name || ''} fullWidth required
              error={!testSuite.name && !error.name ? true : false}
              helperText={!testSuite.name && !error.name ? 'testsuite name is required' : ' '}/></Grid>
            
            <Grid item xs={12}><TextField id="description" label="Description" variant="outlined" 
              onChange={handleChange('description')} fullWidth required value={testSuite.description || ''}
              error={!testSuite.description && !error.description ? true : false}
              helperText={!testSuite.description && !error.description ? 'description is required' : ' '}/></Grid>
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
                                  <MenuItem value=''>root</MenuItem>
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
            <Grid item>
              <Button variant="contained" color="primary" fullWidth onClick={handleOpen}>Delete</Button>
            </Grid>
            <Grid item>
                <Dialog open={open} >
                  <DialogTitle>Confirm</DialogTitle>
                  <DialogContent>Are you sure want to delete this testsuite?</DialogContent>
                  <DialogActions>
                    <Button onClick={handleDelete} color="primary">Yes</Button>
                    <Button onClick={handleClose} color="primary">No</Button>
                  </DialogActions>
                </Dialog>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </React.Fragment>
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(TestSuiteDetail));
import React, { useState, useEffect } from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Helmet from 'react-helmet';
import DragList from '../../../components/DragList';
import { connect } from 'react-redux';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import {UPDATE_TESTCASE_REQ, DELETE_TESTCASE_REQ} from '../../../redux/test-case/constants';
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

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => { 
  return { 
    listTestsuite: state.testcase.listTestsuite,
    project:state.project.currentSelectedProject,
    insTestcase: state.testcase.insTestcase,
    insTestcaseDelete: state.testcase.insTestcaseDelete
   }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    updateTestcaseReq: (payload) => dispatch({type: UPDATE_TESTCASE_REQ, payload}),
    deleteTestcaseReq: (payload) => dispatch({type: DELETE_TESTCASE_REQ, payload})
  }
}

const TestCaseDetail = (props) => {
  const {node, listTestsuite, project, updateTestcaseReq, displayMsg, deleteTestcaseReq, insTestcase, insTestcaseDelete} = props;
  const [checkError, setCheckError] = useState(false);
  const [error, setError] = useState({
    testcasename: 'ss',
    description: 'ss',
  });
  const [testCase, setTestCase] = useState({
    name: node.name,
    description: node.description,
    priority: node.priority,
    listStep: node.listStep
  });

  const [newtestCase, setNewTestCase] = useState({
    testcaseid: node._id,
    testcasename: node.name,
    description: node.description,
    testsuite: node.testsuite,
    priority: node.priority,
    listStep: node.listStep,
    precondition: node.precondition,
    postcondition: node.postcondition,
    projectid: project
  });

  const [listSteps, setListSteps] = useState(node.listStep);
  const [open, setOpen] = React.useState(false);

  useEffect(()=>{
    if (node){
      setTestCase({
        ...testCase,
        name: node.name,
        children: node.children
      });
    }
  },[node]);

  useEffect(()=>{
    if (insTestcase.sucess === false){
      displayMsg({
        content: insTestcase.errMsg,
        type: 'error'
      });
    } else if (insTestcase.sucess === true) {
      displayMsg({
        content: "Update testcase successfully !",
        type: 'success'
      });
    }
  },[insTestcase.sucess]);

  useEffect(()=>{
    if (insTestcaseDelete.sucess === false){
      displayMsg({
        content: insTestcaseDelete.errMsg,
        type: 'error'
      });
    } else if (insTestcaseDelete.sucess === true) {
      displayMsg({
        content: "Delete testcase successfully !",
        type: 'success'
      });
    }
  },[insTestcaseDelete.sucess]);


  const handleUpdate = () => {
    setCheckError(true);

    if(newtestCase.description === "")
    setError({ ...newtestCase, description: "" });

    if(newtestCase.testcasename === "")
    setError({ ...newtestCase, testcasename: "" });

    if(newtestCase.testcasename !== "" && newtestCase.description !== "")
    updateTestcaseReq(newtestCase);
  };

  const handleDelete = () => {
    deleteTestcaseReq(newtestCase);
    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (prop) => (event) => {
    setNewTestCase({ ...newtestCase, [prop]: event.target.value });

    if(checkError == true)
    setError({ ...error, [prop]: event.target.value });
  };

  const updateListStep = (Data) => {
    setNewTestCase({ ...newtestCase, listStep: Data });
    setListSteps(Data);
  };

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
            <Grid item xs={12}><TextField id="testSuiteName" label="Test Case Name" variant="outlined"  fullWidth required 
            onChange={handleChange('testcasename')} defaultValue={newtestCase.testcasename || ''}
            error={!newtestCase.testcasename && !error.testcasename ? true : false}
            helperText={!newtestCase.testcasename && !error.testcasename ? 'testcase name is required' : ' '}/></Grid>

            <Grid item xs={12}><TextField id="description" label="Description" variant="outlined" fullWidth required 
            onChange={handleChange('description')} defaultValue={newtestCase.description || ''}
            error={!newtestCase.description && !error.description ? true : false}
            helperText={!newtestCase.description && !error.description ? 'testcase name is required' : ' '}/></Grid>
            <Grid item xs={12}>
            <FormControl variant="outlined"  fullWidth>
                              <InputLabel id="testSuite">Test Suite</InputLabel> 
                                <Select
                                  labelId="testSuite"
                                  id="testSuite"
                                  value={newtestCase.testsuite || ''}
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
                                  defaultValue={newtestCase.priority}
                                  onChange={handleChange('priority')}
                                  label="Importance"
                                >
                               <MenuItem value={"low"}>Low</MenuItem>
                               <MenuItem value={"medium"}>Medium</MenuItem>
                               <MenuItem value={"high"}>High</MenuItem>
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
                               <MenuItem value={"manual"}><em>Manual</em></MenuItem>
                               <MenuItem value={"auto"}>Auto</MenuItem>
                              </Select>
                            </FormControl>
                </Grid>
              </Grid>      
            </Grid>

            <Grid item xs={12}><TextField id="preCondition" label="Pre-condition" variant="outlined" fullWidth multiline rows={3} 
            rowsMax={3} value={newtestCase.precondition} onChange={handleChange('precondition')}/></Grid>
            <Grid item xs={12}><TextField id="postCondition" label="Post-condition" variant="outlined"  fullWidth multiline rows={3} 
            rowsMax={3} value={newtestCase.postcondition} onChange={handleChange('postcondition')}/></Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} style={{marginTop: '3.5vh'}}>
          <Typography variant="h6" gutterBottom display="inline">
                Steps Definition
          </Typography>
          <Divider/>
        </Grid>

        <Grid item xs={12}>
          <DragList data = {listSteps} parentCallback={updateListStep} />
        </Grid>

        <Grid item xs={12}>
          <Grid container justify ='flex-end'>
            <Grid item>
              <Button variant="contained" color="primary" fullWidth onClick={handleUpdate}>Save</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" fullWidth onClick={handleOpen}>Delete</Button>
            </Grid>
            <Grid item>
                <Dialog open={open} >
                  <DialogTitle>Confirm</DialogTitle>
                  <DialogContent>Are you sure want to delete this testcase?</DialogContent>
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

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(TestCaseDetail));
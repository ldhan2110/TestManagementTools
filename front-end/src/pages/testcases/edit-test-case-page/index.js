import React, { useState, useEffect } from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import DragList from '../../../components/DragList';
import styled from "styled-components";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import {UPDATE_TESTCASE_REQ, DELETE_TESTCASE_REQ, RESET_UPDATE_TESTCASE, RESET_DELETE_TESTCASE, GET_ALL_TESTCASE_REQ} from '../../../redux/test-case/constants';
import Helmet from 'react-helmet';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import ExportExcel from '../../../components/ExportExcel/ExportExcel';
import CircularProgress from '@material-ui/core/CircularProgress';
import { spacing } from "@material-ui/system";
import { green, orange, red, blue } from "@material-ui/core/colors";
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
  Dialog,
  Chip as MuiChip
} from '@material-ui/core';
import MarkedInput from '../../../components/markdown-input/MarkedInput';
import MarkedResult from '../../../components/markdown-input/MarkedResult'
import ReactMarkdown from 'react-markdown';
import Editor from 'react-markdown-editor-lite';
import CancelIcon from '@material-ui/icons/Cancel';
import { GET_ALL_ACTIVE_REQUIREMENTS_REQ } from "../../../redux/requirements/constants";


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const Chip = styled(MuiChip)`
  ${spacing};

  background: ${props => props.is_active && green[500]};
  background: ${props => props.pass && green[500]};
  background: ${props => props.fail && red[500]};
  background: ${props => props.block && orange[500]};
  background: ${props => props.sent && orange[700]};
  color: ${props => (props.is_active || props.sent) && props.theme.palette.common.white};
  color: ${props => (props.pass || props.sent) && props.theme.palette.common.white};
  color: ${props => (props.fail || props.sent) && props.theme.palette.common.white};
  color: ${props => (props.block || props.sent) && props.theme.palette.common.white};
`


//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => { 
  return { 
    listTestsuite: state.testcase.listTestsuite,
    project:state.project.currentSelectedProject,
    insTestcase: state.testcase.insTestcase,
    insTestcaseDelete: state.testcase.insTestcaseDelete,
    listRequirements: state.requirements.listActiveRequirements
   }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    updateTestcaseReq: (payload) => dispatch({type: UPDATE_TESTCASE_REQ, payload}),
    deleteTestcaseReq: (payload) => dispatch({type: DELETE_TESTCASE_REQ, payload}),
    getAllTestcaseReq: (payload) => dispatch({type: GET_ALL_TESTCASE_REQ, payload}),
    resetUpdateRedux: () => dispatch({type: RESET_UPDATE_TESTCASE}),
    resetDeleteRedux: () => dispatch({type: RESET_DELETE_TESTCASE}),
    getAllActiveRequirementReq: (payload) => dispatch({type: GET_ALL_ACTIVE_REQUIREMENTS_REQ}),
  }
}

const EditTestCasePage = (props) => {
  const {node, listTestsuite, project, updateTestcaseReq, getAllTestcaseReq, displayMsg, deleteTestcaseReq, insTestcase, insTestcaseDelete, resetDeleteRedux, resetUpdateRedux, listRequirements, getAllActiveRequirementReq} = props;
  const [checkError, setCheckError] = useState(false);
  const classes = useStyles();

  const history = useHistory();
  const historyPushedState = history.location.state;

  const [error, setError] = useState({
    testcasename: 'ss',
    description: 'ss',
  });
  /* const [testCase, setTestCase] = useState({
    name: props.match.params.name,
    description: props.match.params.description,
    priority: props.match.params.priority,
    listStep: props.match.params.listStep
  }); */  

  const [newtestCase, setNewTestCase] = useState({
    testcaseid: historyPushedState._id,
    testcasename: historyPushedState.name,
    description: historyPushedState.description,
    testsuite: historyPushedState.testsuite,
    priority: historyPushedState.priority,
    listStep: historyPushedState.listStep,
    requirement: historyPushedState.requirement,
    precondition: historyPushedState.precondition,
    postcondition: historyPushedState.postcondition,
    testexecution: historyPushedState.testexecution,
    projectid: project
  });

  const originalName = historyPushedState.name;

  const [listSteps, setListSteps] = useState(historyPushedState.listStep);
  const [open, setOpen] = React.useState(false);
  const [enableCreateBtn, setEnableCreateBtn] = useState(true);
  const [enableDeleteBtn, setEnableDeleteBtn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingg, setLoadingg] = useState(false);
  const [pressUpdateButton, setPressUpdateButton] = useState(false);

  useEffect(()=>{
    getAllActiveRequirementReq();
  },[])

  useEffect(()=>{ 
    if (insTestcase.sucess === false){
      displayMsg({
        content: insTestcase.errMsg,
        type: 'error'
      });
      setEnableCreateBtn(true);
      setLoading(false);
      setPressUpdateButton(false);
      resetUpdateRedux();
    } else if (insTestcase.sucess === true) {
      getAllTestcaseReq();
      displayMsg({
        content: "Update testcase successfully !",
        type: 'success'
      });
      handleCancel();
      setEnableCreateBtn(true);
      setLoading(false);            
      setPressUpdateButton(false);
      resetUpdateRedux();
    }
  },[insTestcase.sucess]);

  useEffect(()=>{
    if (insTestcaseDelete.sucess === false){
      displayMsg({
        content: insTestcaseDelete.errMsg,
        type: 'error'
      });
      setEnableDeleteBtn(true);
      setLoadingg(false);
      resetDeleteRedux();
    } else if (insTestcaseDelete.sucess === true) {
      displayMsg({
        content: "Delete testcase successfully !",
        type: 'success'
      });
      handleCancel();
      setEnableDeleteBtn(true);
      setLoadingg(false);
      getAllTestcaseReq();
      resetDeleteRedux();
    }
  },[insTestcaseDelete.sucess]);

  const isEmpty = (currentValue) => {
    if(typeof currentValue !== "string")
      return currentValue === 0;
    else
      return currentValue.trim().length === 0;
  }
  const handleSteps = (Data) =>{
    for (let i = 0; i < Data.length; i++)
    {
        if(!Object.values(Data[i]).some(isEmpty) === false)
        {
            return true;            
        }
    }
  }

  const handleUpdate = () => {
    setCheckError(true);
    if(newtestCase.description === ""){
    setError({ ...newtestCase, description: "" });
    }

    if(newtestCase.testcasename === "")
    setError({ ...newtestCase, testcasename: "" });

    if(newtestCase.description.trim().length === 0 || newtestCase.testcasename.trim().length === 0
        ||newtestCase.description.trim().length !== newtestCase.description.length 
        || newtestCase.testcasename.trim().length !== newtestCase.testcasename.length){
        displayMsg({
          content: "Testcase name or Descriptions should not contain spaces before and after !",
          type: 'error'
        });
    }

    else if (handleSteps(listSteps)) {
      setPressUpdateButton(true);
      displayMsg({
        content: "Steps cannot have empty field(s)",
        type: 'error'
      });
    }

    else if(newtestCase.testcasename.trim().length !== 0 && newtestCase.description.trim().length !== 0){
      setEnableCreateBtn(false);
      setLoading(true);
      updateTestcaseReq(newtestCase);
    }

  
  };
  const handleCancel = (event) => {
    history.goBack();
  }

  const handleDelete = () => {
    setEnableDeleteBtn(false);
    setLoadingg(true);
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
    if (prop === 'requirement' ){
      if (event.target.value !== '')
      setNewTestCase({...newtestCase, requirement: {_id: event.target.value, projectrequirementname: listRequirements.find(item => item._id === event.target.value).projectrequirementname} });
      else
      setNewTestCase({...newtestCase, requirement: {_id: event.target.value, projectrequirementname: ''} });
    }

    if(checkError === true)
    setError({ ...error, [prop]: event.target.value });
  };

  
  const updateListStep = (Data) => {
    setNewTestCase({ ...newtestCase, listStep: Data });
    setListSteps(Data);
  };

  const PreconChange = (text) => {
    setNewTestCase({ ...newtestCase, precondition: text });
  };

  const PostconChange = (text) => {
    setNewTestCase({ ...newtestCase, postcondition: text });
  };

  return(
    <React.Fragment>
      <Helmet title="Edit Test Case" />
      <Grid container spacing={3} >
        <Grid item xs={12}>
        <Grid container justify='space-between' wrap="nowrap">
          <Grid item xs zeroMinWidth>
            <Typography variant="h5" noWrap style={{marginTop: 6}}>
               Edit Test Case - {originalName}
            </Typography> 
          </Grid>
          <Grid item>
              <Button variant="contained"  disabled={enableDeleteBtn ? false : true } startIcon={<DeleteIcon />}  fullWidth  style={enableDeleteBtn ? { color: red[500] } : {} } onClick={handleOpen}>
                Delete test case
              {loadingg && <CircularProgress size={24} style={{color: blue[500],position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}} />}</Button>
            </Grid>
        </Grid>
        <Divider/>
        </Grid>
        
        
        
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField id="testSuiteName" inputProps={{maxLength : 100}} style={{marginTop:'1em'}} 
                label="Test Case Name" variant="outlined"  fullWidth required 
                onChange={handleChange('testcasename')} defaultValue={newtestCase.testcasename || ''}
                error={newtestCase.testcasename.trim().length === 0 && 
                error.testcasename.trim().length === 0 ? true : false}
                helperText={newtestCase.testcasename.trim().length === 0 && 
                error.testcasename.trim().length === 0 ? 'Testcase name is required' : ' '}
              />
            </Grid>

            <Grid item xs={12}>
      <FormControl variant="outlined" fullWidth style={{marginTop: '-1em'}}>   
          <InputLabel id="demo-simple-select-outlined-label">Requirement</InputLabel>
          <Select
           labelId="requirement"
           id="requirement"
           value={newtestCase.requirement._id}
           onChange={handleChange('requirement')} 
           label="Requirement">
        
          <MenuItem key={''} value={''}>&nbsp;</MenuItem>
                        {listRequirements?.map((item,index) => (
                            <MenuItem key={index} value={item._id}>{item.projectrequirementname}</MenuItem>
                        ))}
        </Select>
      </FormControl></Grid> 

            
            <Grid item xs={12}>
              <Grid container spacing={3} style={{marginTop: '0.5em'}}>
                <Grid item xs={6}>
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
                </Grid>
            </Grid>
            

            {/* <Grid item xs={6}><TextField id="preCondition" label="Pre-condition" variant="outlined" fullWidth multiline rows={3} 
            rowsMax={3} value={newtestCase.precondition} onChange={handleChange('precondition')}/></Grid>
            <Grid item xs={6}><TextField id="postCondition" label="Post-condition" variant="outlined"  fullWidth multiline rows={3} 
                               rowsMax={3} value={newtestCase.postcondition} onChange={handleChange('postcondition')}/></Grid> */}

            <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth  style={{marginTop: '0.5em'}}>
        <InputLabel id="demo-mutiple-chip-label">Assigned Test Executions</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          variant="outlined"
          value={newtestCase.testexecution}
          label="Assigned Test Executions"
          disabled
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => {
                if (value.status === 'Untest') return (<Chip key={value.testexecutionname} label={value.testexecutionname} className={classes.chip} />);
                else if (value.status === 'Pass') return (<Chip key={value.testexecutionname} label={value.testexecutionname} className={classes.chip} pass={1}/>);
                else if (value.status === 'Fail') return (<Chip key={value.testexecutionname} label={value.testexecutionname} className={classes.chip} fail={1}/>);
                else if (value.status === 'Block') return (<Chip key={value.testexecutionname} label={value.testexecutionname} className={classes.chip} block={1}/>);
              })}
            </div>
          )}
          MenuProps={MenuProps}
        >
        </Select>
      </FormControl></Grid> 

         <Grid item xs={12}>
              <TextField id="description" label="Descriptions" variant="outlined" fullWidth required multiline rows={3} 
                onChange={handleChange('description')} defaultValue={newtestCase.description || ''}
                error={!newtestCase.description && !error.description ? true : false}
                helperText={!newtestCase.description &&
                 !error.description ? 'Descriptions is required' : ' '}
                 style={{marginTop: '0.5em'}}
              />
            </Grid>

            <Typography variant="subtitle1" style={{fontWeight: 700, marginTop:10}} gutterBottom display="inline">
                Preconditions
            </Typography> 
            <Grid item xs={12}>
            <MarkedInput idOfInput="preconedit" handleChange={PreconChange} setTxt={newtestCase.precondition} />
            </Grid>

            <Typography variant="subtitle1" style={{fontWeight: 700, marginTop:10}} gutterBottom display="inline">
                Postconditions
            </Typography> 
            <Grid item xs={12}>
              <MarkedInput idOfInput="postconedit" handleChange={PostconChange} setTxt={newtestCase.postcondition} />
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
          <DragList data = {listSteps} parentCallback={updateListStep} pressUpdateButton={pressUpdateButton}/>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify ='flex-end' spacing={1}>
            <Grid item>
              <Button variant="contained" color="primary" disabled={enableCreateBtn ? false : true } startIcon={<UpdateIcon/>}  fullWidth onClick={handleUpdate}>Update
              {loading && <CircularProgress size={24} style={{color: blue[500],position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}} />}</Button>
            </Grid>            
            <Grid item>
              <Button variant="contained" startIcon={<CancelIcon/>} onClick={handleCancel}>Cancel</Button>
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

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(EditTestCasePage));
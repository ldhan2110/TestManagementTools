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
  Dialog, IconButton , Tooltip,
  Chip as MuiChip
} from '@material-ui/core';
import MarkedResult from '../../../components/markdown-input/MarkedResult'
import BorderColorIcon from '@material-ui/icons/BorderColor';
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

const TestCaseDetail = (props) => {
  const {node, listTestsuite, project, updateTestcaseReq, getAllTestcaseReq, displayMsg, deleteTestcaseReq, insTestcase, insTestcaseDelete, resetDeleteRedux, resetUpdateRedux, listRequirements, getAllActiveRequirementReq} = props;
  const [checkError, setCheckError] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState({
    testcasename: 'ss',
    description: 'ss',
  });
  const [testCase, setTestCase] = useState({
    name: node.name,
    description: node.description,
    priority: node.priority,
    listStep: node.listStep,
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
    requirement: node.requirement,
    testexecution: node.testexecution,
    projectid: project
  });


  const [listSteps, setListSteps] = useState(node.listStep);
  const [open, setOpen] = React.useState(false);
  const [enableCreateBtn, setEnableCreateBtn] = useState(true);
  const [enableDeleteBtn, setEnableDeleteBtn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingg, setLoadingg] = useState(false);
  const [pressUpdateButton, setPressUpdateButton] = useState(false);
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
      setEnableCreateBtn(true);
      setLoading(false);            
      setPressUpdateButton(false);
      resetUpdateRedux();
    }
  },[insTestcase.sucess]);

  useEffect(()=>{
    if (insTestcaseDelete.sucess === false){
      setLoadingg(false);
      displayMsg({
        content: insTestcaseDelete.errMsg,
        type: 'error'
      });
      setEnableDeleteBtn(true);
      setLoadingg(false);
      resetDeleteRedux();
    } else if (insTestcaseDelete.sucess === true) {
      setLoadingg(false);
      displayMsg({
        content: "Delete testcase successfully !",
        type: 'success'
      });
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

  const handleClickEditTestCase = () => {
    //console.log(node);
    history.push({
      pathname: window.location.pathname+"/"+node._id+"/edit-test-case",
      state: node});
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
    setNewTestCase({ ...newtestCase, [prop]: event.target.value });

    if(checkError === true)
    setError({ ...error, [prop]: event.target.value });
  };

  
  const updateListStep = (Data) => {
    setNewTestCase({ ...newtestCase, listStep: Data });
    setListSteps(Data);
  };

  const [disableHoverTooltip, setDisableHoverTooltip] = useState(false);
  useEffect(()=>{isEllipsisActive()},[newtestCase.testcasename])

  function isEllipsisActive() {
    var offsetWidthContainer = document.getElementById('gridtclist-name').offsetWidth;
    
    var offsetWidth = document.getElementById('gridtclist-typography').offsetWidth;
    //not long enough
    if(offsetWidth < (offsetWidthContainer*0.7))
      setDisableHoverTooltip(true);
    // long enough
    else{
      setDisableHoverTooltip(false);
    }
  }

  return(
    <React.Fragment>
      <Grid container spacing={3} >
        <Grid item xs={12} >
          <div style={{maxWidth: '100%'}} id="gridtclist-name" >
        <Grid container spacing={1} wrap="nowrap" direction="row" justify ='space-between'>
          <Grid item zeroMinWidth>
            <Tooltip title={<div style={{fontSize:15, lineHeight:'1.4rem'}}>{newtestCase.testcasename}</div>} 
            arrow interactive enterDelay={500} leaveTouchDelay={2000} disableHoverListener={disableHoverTooltip}
             >
            <Typography variant="h5" noWrap style={{marginTop: 15}} id="gridtclist-typography">
                Test Case Details - {newtestCase.testcasename}
            </Typography> 
            </Tooltip>
          </Grid>
          <Grid item xs={3}>
            <Grid container spacing={1} justify ='flex-end' alignItems="flex-start">
            <Grid item>
              <ExportExcel dataSet={newtestCase} type='TC'/>
            </Grid>
            <Grid item>
              <Tooltip title="Edit this test case">
                <IconButton onClick={handleClickEditTestCase}>
                  <BorderColorIcon color="primary" />
                </IconButton>
              </Tooltip>
            </Grid>          
          </Grid>
          </Grid>
    
        </Grid></div>
        </Grid>
        <Divider/>
        
        
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}><TextField id="testSuiteName" label="Test Case Name" variant="outlined"  fullWidth inputProps={{maxLength : 100}}
            defaultValue={newtestCase.testcasename || ''}
            InputProps={{
              readOnly: true,
            }}
            style={{marginTop: '1em'}}
            /></Grid>

        <Grid item xs={12}>
          <TextField id="requirement" label="Requirement" variant="outlined"  fullWidth
            defaultValue={newtestCase.requirement.projectrequirementname}
            InputProps={{
              readOnly: true,
            }}
            style={{marginTop: '0.5em'}}
            /></Grid>

            
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormControl variant="outlined"  fullWidth style={{marginTop: '0.5em'}}>
                      <InputLabel id="testSuite">Test Suite</InputLabel> 
                                <Select
                                  labelId="testSuite"
                                  id="testSuite"
                                  value={newtestCase.testsuite || ''}
                                  label="Test Suite"
                                  disabled
                                >
                               {listTestsuite.map((item) => (
                                    <MenuItem value={item.name}>{item.name}</MenuItem>
                               ))}
                              </Select>
                    </FormControl>
                  </Grid>
                <Grid item xs={6}>
                    <FormControl variant="outlined" fullWidth style={{marginTop: '0.5em'}}>
                              <InputLabel id="Importance">Importance</InputLabel>
                                <Select
                                  labelId="Importance"
                                  id="Importance"
                                  defaultValue={newtestCase.priority}
                                  label="Importance"
                                  disabled
                                >
                               <MenuItem value={"low"}>Low</MenuItem>
                               <MenuItem value={"medium"}>Medium</MenuItem>
                               <MenuItem value={"high"}>High</MenuItem>
                              </Select>
                    </FormControl>
                </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth style={{marginTop: '0.5em'}}>
        <InputLabel id="demo-mutiple-chip-label">Assigned Test Executions</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          variant="outlined"
          label="Assigned Test Execution"
          value={newtestCase.testexecution}
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

      {/*<Grid item xs={12}>
      <FormControl variant="outlined"  fullWidth>
                              <InputLabel id="requirement">Requirement</InputLabel>
                                <Select
                                  labelId="requirement"
                                  id="requirement"
                                  defaultValue={newtestCase.requirement.projectrequirementname}
                                  label="Requirement"
                                  disabled
                                >
                               {listRequirements.map((item) => (
                                    <MenuItem value={item.projectrequirementname}>{item.projectrequirementname}</MenuItem>
                               ))}
                              </Select>
          </FormControl></Grid> */}        

            <Grid item xs={12}><TextField id="description" label="Descriptions" variant="outlined" fullWidth multiline rows={3} 
            defaultValue={newtestCase.description || ''}            
            InputProps={{
              readOnly: true,
            }}
            style={{marginTop: '0.5em'}}
            /></Grid>

            <Typography variant="subtitle1" style={{fontWeight: 600, marginTop: '2em', marginBottom: '1.5em'}} gutterBottom display="inline">
                Preconditions
            </Typography>
            <Grid item xs={12}>
              <MarkedResult id='preconreview' markdown={newtestCase.precondition}/>
            </Grid>

            <Typography variant="subtitle1" style={{fontWeight: 600, marginTop: '2em', marginBottom: '1.5em'}} gutterBottom display="inline">
                Postconditions
            </Typography> 
            <Grid item xs={12}>
              <MarkedResult id='postconreview' markdown={newtestCase.postcondition}/>
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
          <DragList data = {listSteps} parentCallback={updateListStep} pressUpdateButton={pressUpdateButton} viewMode={true}/>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify ='flex-end' spacing={1}>
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
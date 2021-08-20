import React, {useEffect, useState} from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { GET_INFO_MANTIS_REQ,
  CREATE_AND_SWITCH_MANTIS_REQ, SWITCH_MANTIS_REQ,
  RESET_CREATE_AND_SWITCH_MANTIS, RESET_SWITCH_MANTIS, 
  CHANGE_API_KEY_REQ, RESET_CHANGE_API_KEY,
  GET_ALL_MANTIS_OF_PROJECT_REQ, GET_ALL_CATEGORY_REQ, RESET_GET_INFO_MANTIS} from '../../../redux/issue/constants';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import { red } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Grid,
  Typography,
  Divider, 
  Button,
  TextField,
  FormControl,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog, FormHelperText,
} from '@material-ui/core';

/* import {
  Add as AddIcon,
} from "@material-ui/icons";
 */

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return {
    issue: state.issue,
    project:state.project.currentSelectedProject,
    role: state.project.currentRole
  }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),

    getInfoMantisReq: (payload) => dispatch({ type: GET_INFO_MANTIS_REQ, payload }),
    createAndSwitchMantisReq: (payload) => dispatch({ type: CREATE_AND_SWITCH_MANTIS_REQ, payload}),
    switchMantisReq: (payload) => dispatch({ type: SWITCH_MANTIS_REQ, payload}),
    changeAPIReq: (payload) => dispatch({ type: CHANGE_API_KEY_REQ, payload}),
    getAllMantisOfProjectReq: (payload) => dispatch({ type: GET_ALL_MANTIS_OF_PROJECT_REQ, payload}),
    getAllCategoryReq: (payload) => dispatch({ type: GET_ALL_CATEGORY_REQ, payload}),

    resetCreateAndSwitchRedux: () => dispatch({type: RESET_CREATE_AND_SWITCH_MANTIS}),
    resetSwitchMantisRedux: () => dispatch({type: RESET_SWITCH_MANTIS}),
    resetChangeAPIKeyRedux: () => dispatch({type: RESET_CHANGE_API_KEY}),
    resetGetInfoMantisRedux: () => dispatch({type: RESET_GET_INFO_MANTIS}),
  }
}


const SettingProjectPage = (props) => {
    const {classes, issue, createAndSwitchMantisReq, switchMantisReq, changeAPIReq, 
      getAllMantisOfProjectReq, resetGetInfoMantisRedux,
      resetCreateAndSwitchRedux, resetSwitchMantisRedux, resetChangeAPIKeyRedux, 
      getAllCategoryReq, getInfoMantisReq,
      project, role, displayMsg} = props;
  const history = useHistory();

  //Create and switch (CaS)
  const [loadCaS, setLoadCaS] = useState(false);
  const [enableCaSbtn, setEnableCaSbtn] = useState(true);
  const [checkErrorCaS, setCheckErrorCaS] = useState(false);
  const [createMantisInfo, setCreateMantisInfo] = useState({
    url: "",
    apikey: "", //no need for this api but keep
    mantisname: "",
    projectid: project
  });

  const handleChangeCaS = (prop) => (event) => {
    setCreateMantisInfo({ ...createMantisInfo, [prop]: event.target.value });
  }

  const createAndSwitch = () => {
    setCheckErrorCaS(true);
    if(createMantisInfo.url.trim().length === 0 || createMantisInfo.mantisname.trim().length === 0){
      displayMsg({
        content: "Mantis name or URL should not contain spaces before and after !",
        type: 'error'
      });
    }
    else{
      setLoadCaS(true);
      setEnableCaSbtn(false);
      createAndSwitchMantisReq(createMantisInfo);
    }
  }

  useEffect(()=>{
    if(issue.insCreateAndSwitchMantis?.sucess === true){
      displayMsg({
        content: "Create and switched to new mantis successfully!",
        type: 'success'
      });
      setLoadCaS(false);
      setEnableCaSbtn(true);
      setCheckErrorCaS(false);
      getAllMantisOfProjectReq(project);
      resetCreateAndSwitchRedux();
    }
    if(issue.insCreateAndSwitchMantis?.sucess === false){
      displayMsg({
        content: issue.insCreateAndSwitchMantis?.errMsg,
        type: 'error'
      });
      setLoadCaS(false);
      setEnableCaSbtn(true);
      setCheckErrorCaS(false);
      resetCreateAndSwitchRedux();
    }

  },[issue.insCreateAndSwitchMantis])


  //Change API key (cAk)
  const [loadcAk, setLoadcAk] = useState(false);
  const [enablecAkbtn, setEnablecAkbtn] = useState(true);
  const [checkErrorcAk, setCheckErrorcAk] = useState(false);
  const [changeAPIinfo, setChangeAPIinfo] = useState({
    apikey: "",
    projectid: project
  });

  const handleChangecAk = (prop) => (event) => {
    setChangeAPIinfo({ ...changeAPIinfo, [prop]: event.target.value });
  }

  const changeAPIkey = () => {
    setCheckErrorcAk(true);
    if(changeAPIinfo.apikey.trim().length === 0){
      displayMsg({
        content: "API key cannot be empty !",
        type: 'error'
      });
    }
    else{
      setLoadcAk(true);
      setEnablecAkbtn(false);
      changeAPIReq(changeAPIinfo);
    }
  }

  useEffect(()=>{
    if(issue.insAPI?.sucess === true){
      displayMsg({
        content: "Change API key successfully!",
        type: 'success'
      });
      setLoadcAk(false);
      setEnablecAkbtn(true);
      setCheckErrorcAk(false);
      resetChangeAPIKeyRedux();
    }
    if(issue.insAPI?.sucess === false){
      displayMsg({
        content: issue.insAPI?.errMsg,
        type: 'error'
      });
      setLoadcAk(false);
      setEnablecAkbtn(true);
      setCheckErrorcAk(false);
      resetChangeAPIKeyRedux();
    }

  },[issue.insAPI])


  //Switch mantis (SM)
  const [loadSM, setLoadSM] = useState(false);
  const [enableSMbtn, setEnableSMbtn] = useState(true);
  const [checkErrorSM, setCheckErrorSM] = useState(false);
  const [switchMantisInfo, setSwitchMantisInfo] = useState({
    mantisname: "",
    mantisid: "",
    projectid: project
  });

  const handleChangeSM = (prop) => (event, child) => {
    setSwitchMantisInfo({ ...switchMantisInfo, mantisid: child.props.value, mantisname: child.props.children });
  }

  const switchMantis = () => {
    setCheckErrorSM(true);
    if(switchMantisInfo.mantisid === "") {
      displayMsg({
        content: "Please choose a mantis project !",
        type: 'error'
      });
    }
    else{
      setLoadSM(true);
      setEnableSMbtn(false);
      switchMantisReq(switchMantisInfo);
    }
  }

  useEffect(()=>{
    if(issue.insSwitchMantis?.sucess === true){
      displayMsg({
        content: "Switch mantis successfully!",
        type: 'success'
      });
      getAllCategoryReq(project);
      setLoadSM(false);
      setEnableSMbtn(true);
      setCheckErrorSM(false);
      resetSwitchMantisRedux();
    }
    if(issue.insSwitchMantis?.sucess === false){
      displayMsg({
        content: issue.insCategoryDelete?.errMsg,
        type: 'error'
      });
      setLoadSM(false);
      setEnableSMbtn(true);
      setCheckErrorSM(false);
      resetSwitchMantisRedux();
    }
  },[issue.insSwitchMantis])


  useEffect(()=>{    
    if(role === "Project Manager"){
      issue.insMantis.sucess = null;    
      getAllMantisOfProjectReq(project);
      getInfoMantisReq(project);
      setEnableCaSbtn(false);
      setEnablecAkbtn(false);
      setEnableSMbtn(false);      
    }  
  },[]);

  useEffect(()=>{
    if(issue.insMantis.sucess === true){
      setEnableCaSbtn(true);
      setEnablecAkbtn(true);
      setEnableSMbtn(true);      
    } else if(issue.insMantis.sucess === false){
      setEnableCaSbtn(false);
      setEnablecAkbtn(false);
      setEnableSMbtn(false);   
    }
  },[issue.insMantis?.sucess])

  useEffect(()=>{
    if(role === "Project Manager")
    if (issue?.insMantis.sucess === false) {
      displayMsg({
        content: issue?.insMantis.errMsg + ", please connect in Mantis Connect page.",
        type: 'error'
      });
      resetGetInfoMantisRedux();
    }
  },[issue?.insMantis]);  

  useEffect(()=>{
    setTimeout(()=>{if(role === "Project Manager"){
      if(issue.insMantis.sucess === true)
      {
        setCreateMantisInfo({...createMantisInfo, url: issue.mantisInfo.url});
      }
    }}, 50)
        
  },[issue.mantisInfo])

  const handleBack = () => {    
    history.goBack();
  };
  
  if(role !== 'Project Manager') {return(
    <div>
      <Helmet title="Mantis Management" />
      <div>
        <Typography variant="h3" gutterBottom display="inline">
            You need to be a project manager to access this page!
        </Typography>
      </div>
    </div>
  )} else{
  return(
    <div>

      <Helmet title="Mantis Management" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h4" gutterBottom display="inline">
            Mantis settings - {issue.mantisInfo?.mantisname}
          </Typography>

          
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>

          {/* Create and Switch */}
        <form className={classes.content}>
          <TextField id="projectName" label="Mantis Project Name" variant="outlined"  fullWidth required inputProps={{maxLength : 100}} 
           value={createMantisInfo.mantisname || ''}
           onChange={handleChangeCaS('mantisname')}
           error={checkErrorCaS && createMantisInfo.mantisname.trim().length === 0 ? true : false}
          helperText={checkErrorCaS && createMantisInfo.mantisname.trim().length === 0 ? 'Mantis name is required!' : ''}/>

        <div className={classes.onlyurl}>       
        <TextField id="url" label="URL" variant="outlined"  fullWidth inputProps={{maxLength : 250, readOnly: true}}
          value={createMantisInfo.url || ''}
          onChange={handleChangeCaS('url')}
          error={checkErrorCaS && createMantisInfo.url.trim().length === 0 ? true : false}
          helperText={checkErrorCaS && createMantisInfo.url.trim().length === 0 ? 'URL is required!' : ' '}/>
          </div>

          <div className = {classes.btnGroup}>
          
          <Button variant="contained" color="primary"
          disabled={(enableCaSbtn) ? false : true } 
          startIcon={<UpdateIcon />} onClick={createAndSwitch}>
            Create And Switch Project
            {loadCaS && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>
          </div>
        
        <Grid container spacing={2} style={{marginTop: 10}}>
        <Grid item xs={6}>
        <form className={classes.other}>

          {/* Change API */}
          <TextField id="API-Key" label="API-Key" variant="outlined"  fullWidth required  inputProps={{maxLength : 100}} 
           value={changeAPIinfo.apikey || ''}
           onChange={handleChangecAk('apikey')}
           error={checkErrorcAk && changeAPIinfo.apikey.trim().length === 0 ? true : false}
          helperText={checkErrorcAk && changeAPIinfo.apikey.trim().length === 0 ? 'API key is required!' : ' '}/>
          </form>

          <div className = {classes.btnGroup}>          
          <Button variant="contained" color="primary"
          disabled={(enablecAkbtn)  ? false : true } 
          startIcon={<UpdateIcon />}  onClick={changeAPIkey}>
            Change API
            {loadcAk && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>
        </div></Grid> 
        <Grid item xs={6}>

          {/* Switch Mantis */}
          <form className={classes.other}>
          <FormControl variant="outlined" //className={classes.formControl}
          fullWidth>
            <InputLabel id="switchM">Select Mantis project to switch to</InputLabel>
            <Select
              labelId="switchMantis"
              id="switchMantiss"              
              value={switchMantisInfo.mantisid}
              error={(checkErrorSM && 
                switchMantisInfo.mantisid === "") ? true : false} 
              onChange={handleChangeSM('mantisid')}
              label="Select Mantis to switch to"
            >
            <MenuItem value="" disabled></MenuItem>
              {issue.listAllMantis?.map((item) => (
                <MenuItem value={item._id}>{item.mantisname}</MenuItem>
              ))}
            </Select>
            <FormHelperText 
            style={(checkErrorSM && switchMantisInfo.mantisid === "") ?
              {color: 'red'}:{opacity:0, pointerEvents: 'none'}}            
            >Select a Mantis Project!</FormHelperText>
            </FormControl>            
            </form>

        <Grid item>
        
        <div >
        <Button variant="contained" color="primary" disabled={enableSMbtn ? false : true } startIcon={<UpdateIcon />} size="medium"
         onClick={switchMantis}>
            Switch Mantis Project
            {loadSM && <CircularProgress size={24} className={classes.buttonProgress} />}
            </Button>
          </div></Grid>
        </Grid></Grid>
         <div className = {classes.btnBack}>
          <Button variant="contained" startIcon={<ArrowBackIcon/>} onClick={handleBack}>
            Back
          </Button>
          </div>
        </form>
        </Grid>
      </Grid>
    </div>
  )}
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SettingProjectPage));

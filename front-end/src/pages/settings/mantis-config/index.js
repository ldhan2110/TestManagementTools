import React, {useEffect, useState} from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import {GET_INFO_MANTIS_REQ, CREATE_NEW_MANTIS_REQ, RESET_CREATE_NEW_MANTIS, CHANGE_API_KEY_REQ,
  RESET_CHANGE_API_KEY, RESET_GET_INFO_MANTIS, GET_ALL_CONNECTED_MANTIS_REQ,
  SWITCH_CONNECTED_MANTIS_REQ, RESET_SWITCH_CONNECTED_MANTIS} from '../../../redux/issue/constants';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import CancelIcon from '@material-ui/icons/Cancel';
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
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog
} from '@material-ui/core';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

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
    getInfoMantisReq: (payload) => dispatch({ type: GET_INFO_MANTIS_REQ, payload }),
    getAllConnectedMantisReq: (payload) => dispatch({ type:GET_ALL_CONNECTED_MANTIS_REQ, payload}),
    switchConnectedMantisReq: (payload) => dispatch({ type:SWITCH_CONNECTED_MANTIS_REQ, payload}),
    createNewMantisReq: (payload) => dispatch({ type: CREATE_NEW_MANTIS_REQ, payload }),

    resetSwitchConnectedMantis: () => dispatch({type:RESET_SWITCH_CONNECTED_MANTIS}),
    resetCreateMantisRedux: () => dispatch({type: RESET_CREATE_NEW_MANTIS}),
    changeAPIKeyReq: (payload) => dispatch({ type: CHANGE_API_KEY_REQ, payload }),
    resetChangeAPIKeyRedux: () => dispatch({type: RESET_CHANGE_API_KEY}),
    resetGetInfoMantisRedux: () => dispatch({type: RESET_GET_INFO_MANTIS}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
  }
}


const MantisConfigPage = (props) => {
    const {classes, issue, getInfoMantisReq, createNewMantisReq, resetCreateMantisRedux, changeAPIKeyReq, resetChangeAPIKeyRedux, projectsettings, insProjects, project, insProjectsDelete, updateProjectReq, deleteProjectReq,
      displayMsg, getAllConnectedMantisReq, switchConnectedMantisReq, resetSwitchConnectedMantis,
      resetGetInfoMantisRedux, role} = props;
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [checkError, setCheckError] = useState(false);
  const [textCurrent, setTextCurrent] = useState("");
  const [error, setError] = useState({
    url: "",
    apikey: "",
    mantisname: "",
  });

  const [mantisInfo, setMantisInfo] = useState({
    url: "",
    apikey: "",
    mantisname: "",
    projectid: project,
  });

  const [switchMantisInfo, setSwitchMantisInfo] = useState({
    projectid: project,
    mantis_id: ''
  })

  const [checkErrorSM, setCheckErrorSM] = useState(false);
  const [loadSM, setLoadSM] = useState(false);
  const [enableSMbtn, setEnableSMbtn] = useState(true);

  const [enableCreateBtn, setEnableCreateBtn] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    issue.mantisInfo = {};
    if(issue.insMantis.sucess)
      issue.insMantis.sucess = "";
    if(role === "Project Manager"){
      setEnableSMbtn(false);
      setEnableCreateBtn(false);
      getInfoMantisReq(project);
      getAllConnectedMantisReq(project);
    }  
  },[]);

  useEffect(()=>{
    if(issue.insMantis.sucess === false || issue.insMantis.sucess === true) {
      setTextCurrent(' none');
      setEnableCreateBtn(true);
    }
  },[issue.insMantis?.sucess])

  useEffect(()=>{
    if(issue.insConnectedMantis.sucess === false || issue.insConnectedMantis.sucess === true) {
      setEnableSMbtn(true);
    }
  },[issue.insConnectedMantis?.sucess])

  // useEffect(()=>{
  //   if(role === "Project Manager"){
  //     if(issue.insMantis.sucess === true)
  //     {
  //       setSwitchMantisInfo({...switchMantisInfo, mantis_id: issue.mantisInfo._id});
  //       setMantisInfo({...mantisInfo, mantisname: issue.mantisInfo.mantisname, url: issue.mantisInfo.url});
  //     }
  //   }
        
  // },[issue.mantisInfo])

  useEffect(()=>{
    if (issue.insCreateMantis?.sucess === false){
      displayMsg({
        content: issue.insCreateMantis.errMsg,
        type: 'error'
      });
      setEnableCreateBtn(true);
      setLoading(false);
      resetCreateMantisRedux();
    } else if (issue.insCreateMantis?.sucess === true) {
      displayMsg({
        content: "Connect to mantis successfully !",
        type: 'success'
      });
      setMantisInfo({
        url: "",
        apikey: "",
        mantisname: "",
        projectid: project,
      });
      setCheckError(false);
      getInfoMantisReq(project);
      getAllConnectedMantisReq(project);
      setEnableCreateBtn(true);
      setLoading(false);
      resetCreateMantisRedux();
    }
  },[issue.insCreateMantis?.sucess]);

  useEffect(()=>{
    if(issue.insAPI?.sucess === true){
      displayMsg({
        content: "Update API key successfully!",
        type: 'success'
      });
      setEnableCreateBtn(true);
      setLoading(false);
      resetChangeAPIKeyRedux();
    }
    if(issue.insAPI?.sucess === false){
      displayMsg({
        content: issue.insAPI?.errMsg,
        type: 'error'
      });
      setEnableCreateBtn(true);
      setLoading(false);
      resetChangeAPIKeyRedux();
    }

  },[issue.insAPI])

  const handleUpdate = () => {
    setCheckError(true);
    if(role === "Project Manager"){
    if(mantisInfo.mantisname === "")
    setError({ ...mantisInfo, mantisname: "" });

    if(mantisInfo.apikey === "")
    setError({ ...mantisInfo, apikey: "" });

    if(mantisInfo.url === "")
    setError({ ...mantisInfo, url: "" });

    if(mantisInfo.mantisname.trim().length === 0 || mantisInfo.apikey.trim().length === 0 || mantisInfo.url.trim().length === 0
        || mantisInfo.mantisname.trim().length !== mantisInfo.mantisname.length 
        || mantisInfo.apikey.trim().length !== mantisInfo.apikey.length
        || mantisInfo.url.trim().length !== mantisInfo.url.length
        ){
        displayMsg({
          content: "Fields should not contain spaces before and after !",
          type: 'error'
        });
    } else{
      if(mantisInfo.url.lastIndexOf('/') === (mantisInfo.url.length - 1)) {
        setTextCurrent('');
        setEnableCreateBtn(false);
        setLoading(true);
        createNewMantisReq({ ...mantisInfo, url: mantisInfo.url.substring(0, mantisInfo.url.length-1)});
      } else {
      setTextCurrent('');
      setEnableCreateBtn(false);
      setLoading(true);
      createNewMantisReq(mantisInfo);
      }
    }
  }
  else{
    if(mantisInfo.apikey === "")
      setError({ ...mantisInfo, apikey: "" });

    if(mantisInfo.apikey.trim().length === 0
    || mantisInfo.apikey.trim().length !== mantisInfo.apikey.length
    ){
      displayMsg({
        content: "Fields should not contain spaces before and after !",
        type: 'error'
      });
    }
    else{
      setEnableCreateBtn(false);
      setLoading(true);
      changeAPIKeyReq({projectid: project, apikey: mantisInfo.apikey});
    }
  }
};
  
  const handleChange = (prop) => (event) => {
    setMantisInfo({ ...mantisInfo, [prop]: event.target.value });

    if(checkError === true)
    setError({ ...error, [prop]: event.target.value });
  }

  useEffect(()=>{
    if(role === "Project Manager")
    if (issue?.insMantis.sucess === false) {
      displayMsg({
        content: issue?.insMantis.errMsg + ", please connect to one",
        type: 'error'
      });
      resetGetInfoMantisRedux();
    }
  },[issue?.insMantis]);  


  const handleSwitch = () => {    
    setCheckErrorSM(true);
    if(switchMantisInfo.mantis_id !== ''){
      setTextCurrent('');
      setEnableSMbtn(false);
      setLoadSM(true);
      switchConnectedMantisReq(switchMantisInfo);
    }
  }

  useEffect(()=>{
    if(issue.insSwitchConnectedMantis?.sucess === true){
      displayMsg({
        content: "Switch Mantis successfully!",
        type: 'success'
      });
      setCheckErrorSM(false);
      getInfoMantisReq(project);
      getAllConnectedMantisReq(project);
      setEnableSMbtn(true);
      setLoadSM(false);
      setSwitchMantisInfo({
        projectid: project,
        mantis_id: ''
      });
      resetSwitchConnectedMantis();
    }
    if(issue.insSwitchConnectedMantis?.sucess === false){
      displayMsg({
        content: issue.insSwitchConnectedMantis?.errMsg,
        type: 'error'
      });
      setEnableSMbtn(true);
      setLoadSM(false);
      resetSwitchConnectedMantis();
    }

  },[issue.insSwitchConnectedMantis])
  
  return(
    <div>

      <Helmet title="Mantis Connect" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
           Mantis Connect
          </Typography>

          
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
        <form className={classes.content}>

          {role === "Project Manager" && <div>
          <TextField id="mantisName" label="Mantis project name" variant="outlined" fullWidth required
          value={mantisInfo.mantisname || ''} onChange={handleChange('mantisname')}          
          error={checkError && mantisInfo.mantisname.trim().length === 0 && error.mantisname.trim().length === 0 ? true : false}
          helperText={checkError && mantisInfo.mantisname.trim().length === 0 && error.mantisname.trim().length === 0 ? 'Mantis name is required!' : ' '}/>
          </div>}


          <TextField id="API-Key" label="API-Key" variant="outlined"  fullWidth required
           value={mantisInfo.apikey || ''} onChange={handleChange('apikey')}
           error={checkError && mantisInfo.apikey.trim().length === 0 && error.apikey.trim().length === 0 ? true : false}
          helperText={checkError && mantisInfo.apikey.trim().length === 0 && error.apikey.trim().length === 0 ? 'API key is required' : ' '}/>

          {role === "Project Manager" && <div>          
          <TextField id="url" label="URL" variant="outlined"  fullWidth required
          value={mantisInfo.url || ''} onChange={handleChange('url')}
          error={checkError && mantisInfo.url.trim().length === 0 && error.url.trim().length === 0 ? true : false}
          helperText={checkError && mantisInfo.url.trim().length === 0 && error.url.trim().length === 0 ? 'URL is required!' : ' '}/>
          <FormHelperText>
            URL should look like this: https://(yourmantis).mantishub.io
          </FormHelperText>
          </div>}
          
          <div className = {classes.btnGroup}>
          <Button variant="contained" color="primary" disabled={(enableCreateBtn) ? false : true } 
          startIcon={<UpdateIcon />}  onClick={handleUpdate}>
           Connect
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>          
        </div>
        {role === "Project Manager" &&
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginTop: 30}}>
          <Typography variant="subtitle2">
            Currently connected to: {issue.mantisInfo.mantisname ?
             issue.mantisInfo.mantisname + ' - ' + issue.mantisInfo.url : textCurrent}
          </Typography>
          <FormControl error={(checkErrorSM && 
              switchMantisInfo.mantis_id === "") ? true : false} fullWidth className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Switch between connected mantishub url</InputLabel>
          <Select
            label="Switch between connected mantishub url"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={switchMantisInfo.mantis_id}            
            onChange={(e) => {setSwitchMantisInfo({...switchMantisInfo, mantis_id: e.target.value})}}
          > 
          <MenuItem value="" disabled></MenuItem>
              {issue?.listConnectedMantis?.map((item) => (
                <MenuItem value={item._id}>{item.mantisname} - {item.url}</MenuItem>
              ))}
          </Select>
          <FormHelperText 
            style={(checkErrorSM && switchMantisInfo.mantis_id === "") ?
              {color: 'red'}:{opacity:0, pointerEvents: 'none'}}            
            >Please select a Mantis project!</FormHelperText>
          </FormControl>
          <div className = {classes.btnGroup}>
          <Button variant="contained" color="primary" startIcon={<SwapHorizIcon/>} 
          disabled={enableSMbtn ? false : true } onClick={handleSwitch}>
            Switch
            {loadSM && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>
          </div>
          </div>}      
        </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(MantisConfigPage));

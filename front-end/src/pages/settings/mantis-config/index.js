import React, {useEffect, useState} from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import {UPDATE_PROJECT_REQ, DELETE_PROJECT_REQ, RESET_UPDATE_PROJECT, RESET_DELETE_PROJECT, GET_PROJECTS_BY_ID_REQ} from '../../../redux/projects/constants';
import {GET_INFO_MANTIS_REQ, CREATE_NEW_MANTIS_REQ, RESET_CREATE_NEW_MANTIS, CHANGE_API_KEY_REQ, RESET_CHANGE_API_KEY} from '../../../redux/issue/constants';
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
  InputLabel,
  MenuItem,
  Select,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog
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
    getInfoMantisReq: (payload) => dispatch({ type: GET_INFO_MANTIS_REQ, payload }),
    createNewMantisReq: (payload) => dispatch({ type: CREATE_NEW_MANTIS_REQ, payload }),
    resetCreateMantisRedux: () => dispatch({type: RESET_CREATE_NEW_MANTIS}),
    changeAPIKeyReq: (payload) => dispatch({ type: CHANGE_API_KEY_REQ, payload }),
    resetChangeAPIKeyRedux: () => dispatch({type: RESET_CHANGE_API_KEY}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
  }
}


const MantisConfigPage = (props) => {
    const {classes, issue, getInfoMantisReq, createNewMantisReq, resetCreateMantisRedux, changeAPIKeyReq, resetChangeAPIKeyRedux, projectsettings, insProjects, project, insProjectsDelete, updateProjectReq, deleteProjectReq,
      displayMsg, resetUpdateRedux, resetDeleteRedux, getProjectByIdReq, inforProject, role} = props;
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [checkError, setCheckError] = useState(false);
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

  const [enableCreateBtn, setEnableCreateBtn] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    issue.mantisInfo = {};
    issue.insMantis.sucess = "";
    if(role === "Project Manager"){
      setEnableCreateBtn(false);
      getInfoMantisReq(project);
    }  
  },[]);

  useEffect(()=>{
    if(role === "Project Manager"){
      if(issue.insMantis.sucess === false)
        setEnableCreateBtn(true);
    }
    else {
      setEnableCreateBtn(true);
    }    
  },[issue.insMantis?.sucess])

  useEffect(()=>{
    if(role === "Project Manager"){
      if(issue.insMantis.sucess === true)
      {
        setMantisInfo({...mantisInfo, mantisname: issue.mantisInfo.mantisname, url: issue.mantisInfo.url});
      }
    }
        
  },[issue.mantisInfo])

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
      setEnableCreateBtn(true);
      setLoading(false);
      resetCreateMantisRedux();
      //history.goBack();
    }
  },[issue.insCreateMantis?.sucess]);

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
      setEnableCreateBtn(false);
      setLoading(true);
      createNewMantisReq(mantisInfo);
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
      changeAPIKeyReq(mantisInfo.apikey);
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
        content: issue?.insMantis.errMsg,
        type: 'error'
      });        
    }
  },[issue?.insMantis]);  


  const handleBack = () => {    
    history.goBack();
    //setOpen(false);
  };
  
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
          <TextField id="mantisName" label="Mantis project name" variant="outlined"  fullWidth required
          InputProps={issue.insMantis.sucess !== false ? {readOnly: true}:{}}
          value={mantisInfo.mantisname || ''} onChange={handleChange('mantisname')}          
          error={checkError && mantisInfo.mantisname.trim().length === 0 && error.mantisname.trim().length === 0 ? true : false}
          helperText={checkError && mantisInfo.mantisname.trim().length === 0 && error.mantisname.trim().length === 0 ? 'Mantis name is required!' : ' '}/>
          </div>}


          <TextField id="API-Key" label="API-Key" variant="outlined"  fullWidth required
          InputProps={(issue.insMantis.sucess !== false && role === "Project Manager") ? {readOnly: true}:{}}
           value={mantisInfo.apikey || ''} onChange={handleChange('apikey')}
           error={checkError && mantisInfo.apikey.trim().length === 0 && error.apikey.trim().length === 0 ? true : false}
          helperText={checkError && mantisInfo.apikey.trim().length === 0 && error.apikey.trim().length === 0 ? 'API key is required' : ' '}/>

          {role === "Project Manager" && <div>
              <TextField id="url" label="URL" variant="outlined"  fullWidth required
          InputProps={issue.insMantis.sucess !== false ? {readOnly: true}:{}}
          value={mantisInfo.url || ''} onChange={handleChange('url')}
          error={checkError && mantisInfo.url.trim().length === 0 && error.url.trim().length === 0 ? true : false}
          helperText={checkError && mantisInfo.url.trim().length === 0 && error.url.trim().length === 0 ? 'URL is required!' : ' '}/>
          </div>}
        
          <div className = {classes.btnGroup}>
          <Button variant="contained" color="primary" disabled={(enableCreateBtn) ? false : true } 
          startIcon={<UpdateIcon />}  onClick={handleUpdate}>
           Save
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>
          
        </div>               
        </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(MantisConfigPage));

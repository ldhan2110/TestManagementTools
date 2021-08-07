import React, {useEffect, useState} from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import {UPDATE_PROJECT_REQ, DELETE_PROJECT_REQ, RESET_UPDATE_PROJECT, RESET_DELETE_PROJECT, GET_PROJECTS_BY_ID_REQ} from '../../../redux/projects/constants';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
    projectsettings: state.project,
    insProjects: state.project.insProjects,  
    project:state.project.currentSelectedProject,
    insProjectsDelete: state.project.insProjectsDelete,
    inforProject: state.project.projectInfo,
    role: state.project.currentRole
  }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    updateProjectReq: (payload) => dispatch({ type: UPDATE_PROJECT_REQ, payload }),
    getProjectByIdReq: (payload) => dispatch({ type: GET_PROJECTS_BY_ID_REQ, payload}),
    deleteProjectReq: (payload) => dispatch({ type: DELETE_PROJECT_REQ, payload}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    resetUpdateRedux: () => dispatch({type: RESET_UPDATE_PROJECT}),
    resetDeleteRedux: () => dispatch({type: RESET_DELETE_PROJECT})
  }
}


const SettingProjectPage = (props) => {
    const {classes, projectsettings, insProjects, project, insProjectsDelete, updateProjectReq, deleteProjectReq,
      displayMsg, resetUpdateRedux, resetDeleteRedux, getProjectByIdReq, inforProject, role} = props;
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [checkError, setCheckError] = useState(false);
  const [error, setError] = useState({
    APIkey: 'ss',
    projectname: 'ss',
    url: 'ss',
    categoryname: 'ss',
    addcategoryname: 'ss',
  });
  const [projectInfo, setProjectInfo] = useState({
    projectname: '',
    APIkey: '',
    url: '',
    is_public: false,
    active: false,
    status: '',
    use_mantis: false,
    url: "",
    token: "",
    categoryname: '',
    addcategoryname: '',
    projectid: project
  });

  const[isUseMantis, setUseMantis] = useState(false);

  const [enableCreateBtn, setEnableCreateBtn] = useState(true);
  const [enableDeleteBtn, setEnableDeleteBtn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingg, setLoadingg] = useState(false);

  useEffect(()=>{
    projectsettings.byIDsuccess = null;
    getProjectByIdReq(project);
  },[]);

  useEffect(()=>{
    if(inforProject !== undefined)
    setProjectInfo({...projectInfo,
      projectname: inforProject.projectname,
      url: inforProject.url,
      APIkey: inforProject.APIkey,
      is_public: inforProject.is_public,
      active: inforProject.active,
      status: inforProject.status,
      projectid: project,
      categoryname: inforProject.categoryname,
      addcategoryname: inforProject.addcategoryname,
    })
  },[inforProject]);

  useEffect(()=>{
    if (insProjects.sucess === false){
      setLoading(false);
      displayMsg({
        content: insProjects.errMsg,
        type: 'error'
      });
      setEnableCreateBtn(true);
      setLoading(false);
      resetUpdateRedux();
    } else if (insProjects.sucess === true) {
      setLoading(false);
      displayMsg({
        content: "Save mantis successfully !",
        type: 'success'
      });
      setEnableCreateBtn(true);
      setLoading(false);
      resetUpdateRedux();
      history.goBack();
    }
  },[insProjects.sucess]);

  useEffect(()=>{
    if (insProjectsDelete.sucess === false){
      setLoadingg(false);
      displayMsg({
        content: insProjectsDelete.errMsg,
        type: 'error'
      });
      setEnableDeleteBtn(true);
      setLoadingg(false);
      resetDeleteRedux();
    } else if (insProjectsDelete.sucess === true) {
      setLoadingg(false);
      displayMsg({
        content: "Delete category successfully !",
        type: 'success'
      });
      setEnableDeleteBtn(true);
      setLoadingg(false);
      resetDeleteRedux();
      history.replace('/projects');
    }
  },[insProjectsDelete.sucess]);

  const handleDelete=()=>{
    
    setEnableDeleteBtn(false);
    setLoadingg(true);
    deleteProjectReq(projectInfo);
    setOpen(false);
  }

  const handleUpdateMantis = () => {
    setCheckError(true);

    if(projectInfo.url === "")
    setError({ ...projectInfo, url: "" });

    if(projectInfo.APIkey === "")
    setError({ ...projectInfo, APIkey: "" });

    if(projectInfo.url.trim().length === 0 || projectInfo.projectname.trim().length === 0
        ||projectInfo.url.trim().length !== projectInfo.url.length 
        || projectInfo.projectname.trim().length !== projectInfo.projectname.length){
        displayMsg({
          content: "Project name or url should not contain spaces before and after !",
          type: 'error'
        });
    }
  
    else{
      setEnableCreateBtn(false);
      setLoading(true);
      updateProjectReq(projectInfo);
    }
  };

  const handleUpdateAPI = () => {

};

  const handleAdd = () => {

  };
  
  const handleChange = (prop) => (event) => {
    setProjectInfo({ ...projectInfo, [prop]: event.target.value });

    if(checkError === true)
    setError({ ...error, [prop]: event.target.value });
  }

  const handleIsActive = () =>{

    if(projectInfo.active === true || projectInfo.active === 0){
      setProjectInfo({ ...projectInfo, active: false });
    }
    else{
      setProjectInfo({ ...projectInfo, active: true });
    }  };

  const handleIsPublic = () =>{

    if(projectInfo.is_public === true || projectInfo.is_public === 0){
      setProjectInfo({ ...projectInfo, is_public: false });
    }
    else{
      setProjectInfo({ ...projectInfo, is_public: true });
    }
  };

  const handleUseMantis = () =>{
    if(projectInfo.use_mantis === true || projectInfo.use_mantis === 0){
      setProjectInfo({ ...projectInfo, use_mantis: false });
      setUseMantis(false);
    }
    else{
      setProjectInfo({ ...projectInfo, use_mantis: true });
      setUseMantis(true);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleBack = () => {    
    history.goBack();
    //setOpen(false);
  };
  
  return(
    <div>

      <Helmet title="Project Settings" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Settings Mantis
          </Typography>

          
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
        <form className={classes.content}>
          <TextField id="projectName" label="Mantis Project Name" variant="outlined"  fullWidth required  inputProps={{maxLength : 100}} 
           value={projectInfo.projectname || ''} onChange={handleChange('projectname')}
           error={projectInfo.projectname === 0 && error.projectname === 0 ? true : false}
          helperText={projectInfo.projectname === 0 && error.projectname === 0 ? 'Project Name is required' : ' '}/>

        <div className={classes.onlyurl}>       
        <TextField id="url" label="url" variant="outlined"  fullWidth required inputProps={{maxLength : 100}} 
          value={projectInfo.url || ''} onChange={handleChange('url')}
          error={projectInfo.url === 0 && error.url === 0 ? true : false}
          helperText={projectInfo.url === 0 && error.url === 0 ? 'url is required!' : ' '}/>
          </div>

          <div className = {classes.btnGroup}>
          {(role === 'Project Manager') &&
          <Button variant="contained" color="primary" disabled={(enableCreateBtn && projectsettings.byIDsuccess === true)  ? false : true } 
          startIcon={<UpdateIcon />}  onClick={handleUpdateMantis}>
            Save Mantis Information
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>} 
          </div>

        <form className={classes.other}>
          <TextField id="API-Key" label="API-Key" variant="outlined"  fullWidth required  inputProps={{maxLength : 100}} 
           value={projectInfo.APIkey || ''} onChange={handleChange('APIkey')}
           error={projectInfo.APIkey === 0 && error.APIkey === 0 ? true : false}
          helperText={projectInfo.APIkey === 0 && error.APIkey === 0 ? 'API key is required' : ' '}/>
          </form>

          <div className = {classes.btnGroup}>
          {(role === 'Project Manager') &&
          <Button variant="contained" color="primary" disabled={(enableCreateBtn && projectsettings.byIDsuccess === true)  ? false : true } 
          startIcon={<UpdateIcon />}  onClick={handleUpdateAPI}>
            Save API
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>}
        </div>       

        <form className={classes.other}>
          <TextField id="addCategory" label="Add Category" variant="outlined" fullWidth required  inputProps={{maxLength : 100}} 
           value={projectInfo.addcategoryname || ''} onChange={handleChange('addcategoryname')}
           error={projectInfo.addcategoryname === 0 && error.addcategoryname === 0 ? true : false}
          helperText={projectInfo.addcategoryname === 0 && error.addcategoryname === 0 ? 'Category Name is required' : ' '}/> 
          </form>
          
        <div className = {classes.btnGroup}>
          {(role === 'Project Manager') &&
          <Button variant="contained" color="primary" disabled={(enableCreateBtn && projectsettings.byIDsuccess === true)  ? false : true } 
          onClick={handleAdd}>
            Add Category
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>}
        </div>


        <form className={classes.other}>
        <FormControl variant="outlined" //className={classes.formControl}
          fullWidth>
            <InputLabel id="IssueCategory">Select Category to Delete</InputLabel>
            <Select
              labelId="testSuite"
              id="testSuite"
              value={projectInfo.category}
              onChange={handleChange('category')}
              label="Select Category to Delete"
            >
            <MenuItem value="" disabled></MenuItem>
              {project.listCategory?.categories?.map((item) => (
                <MenuItem value={item.categoryname}>{item.categoryname}</MenuItem>
              ))}
            </Select>
            </FormControl>
            </form>


        <form className={classes.other}>
        <Grid item>
        <div>
        {(role === 'Project Manager') && <Button variant="contained" disabled={enableDeleteBtn ? false : true } startIcon={<DeleteIcon />} size="medium" style={enableDeleteBtn ? {color: red[500] } : {}} onClick={handleOpen}>
            Delete Category
            {loadingg && <CircularProgress size={24} className={classes.buttonProgress} />}
            </Button>}
          </div>
          <Grid item>
                <Dialog open={open} >
                  <DialogTitle>Confirm</DialogTitle>
                  <DialogContent>Are you sure want to delete this category?</DialogContent>
                  <DialogActions>
                    <Button onClick={handleDelete} color="primary">Yes</Button>
                    <Button onClick={handleClose} color="primary">No</Button>
                  </DialogActions>
                </Dialog>
          </Grid>
        </Grid>
        <div className = {classes.btnBack}>
        <Button variant="contained" startIcon={<ArrowBackIcon/>} onClick={handleBack}>
            Back
          </Button>
          </div>
         </form>
        </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SettingProjectPage));

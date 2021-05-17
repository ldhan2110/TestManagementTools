import React, {useEffect, useState} from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import {UPDATE_PROJECT_REQ, DELETE_PROJECT_REQ, RESET_UPDATE_PROJECT, RESET_DELETE_PROJECT, GET_PROJECTS_BY_ID_REQ} from '../../../redux/projects/constants';
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

import {
  Add as AddIcon,
} from "@material-ui/icons";

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { 
    insProjects: state.project.insProjects,  
    project:state.project.currentSelectedProject,
    insProjectsDelete: state.project.insProjectsDelete
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
    const {classes, insProjects, project, insProjectsDelete, updateProjectReq, deleteProjectReq,
      displayMsg, resetUpdateRedux, resetDeleteRedux, getProjectByIdReq} = props;
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [checkError, setCheckError] = useState(false);
  const [error, setError] = useState({
    projectname: 'ss',
    description: 'ss',
  });
  const [projectInfo, setProjectInfo] = useState({
    projectname: '',
    description: '',
    is_public: false,
    active: false,
    status: '',
    projectid: project
  });

  useEffect(()=>{
    //getProjectByIdReq(project);
  },[]);

  useEffect(()=>{
    if (insProjects.sucess === false){
      displayMsg({
        content: insProjects.errMsg,
        type: 'error'
      });
      resetUpdateRedux();
    } else if (insProjects.sucess == true) {
      displayMsg({
        content: "Update project successfully !",
        type: 'success'
      });
      resetUpdateRedux();
      history.goBack();
    }
  },[insProjects.sucess]);

  /*useEffect(()=>{
    if (insProjectsDelete.sucess === false){
      displayMsg({
        content: insProjectsDelete.errMsg,
        type: 'error'
      });
      resetDeleteRedux();
    } else if (insProjectsDelete.sucess == true) {
      displayMsg({
        content: "Delete project successfully !",
        type: 'success'
      });
      resetDeleteRedux();
      history.goBack();
    }
  },[insProjectsDelete.sucess]);*/

  const handleDelete=()=>{
    console.log('delete successfully!'+JSON.stringify(projectInfo, null, '  '));
    //deleteProjectReq(projectInfo);
    setOpen(false);
  }

  const handleUpdate = () => {
    setCheckError(true);

    if(projectInfo.description === "")
    setError({ ...error, description: "" });

    if(projectInfo.projectname === "")
    setError({ ...error, projectname: "" });

    if(projectInfo.description.trim().length == 0 || projectInfo.projectname.trim().length == 0
        ||projectInfo.description.trim().length !== projectInfo.description.length 
        || projectInfo.projectname.trim().length !== projectInfo.projectname.length){
        displayMsg({
          content: "Project name or description should not contain spaces",
          type: 'error'
        });
    }

    else if(projectInfo.projectname !== "" && projectInfo.description !== "")
    //updateProjectReq(projectInfo);
    console.log('update successfully: '+JSON.stringify(projectInfo, null, '  '));    
  };
  
  const handleChange = (prop) => (event) => {
    setProjectInfo({ ...projectInfo, [prop]: event.target.value });

    if(checkError == true)
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

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  
  return(
    <div>

      <Helmet title="Settings" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Setting Project
          </Typography>

          
        </Grid>
        <Grid item>
          <div>
            <Button variant="contained"  styles={{color: 'red'}} onClick={handleOpen}>
              <AddIcon />
              Delete Project
            </Button>
          </div>
          <Grid item>
                <Dialog open={open} >
                  <DialogTitle>Confirm</DialogTitle>
                  <DialogContent>Are you sure want to delete this project?</DialogContent>
                  <DialogActions>
                    <Button onClick={handleDelete} color="primary">Yes</Button>
                    <Button onClick={handleClose} color="primary">No</Button>
                  </DialogActions>
                </Dialog>
          </Grid>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
        <form className={classes.content}>
          <TextField id="projectName" label="Project Name" variant="outlined"  fullWidth required  inputProps={{maxLength : 16}} 
           value={projectInfo.projectname || ''} onChange={handleChange('projectname')}
           error={!projectInfo.projectname && !error.projectname ? true : false}
           helperText={!projectInfo.projectname && !error.projectname ? 'project name is required' : ' '}/>

          <TextField id="descriptions" label="Descriptions" variant="outlined"  fullWidth required multiline rows={20} 
          value={projectInfo.description || ''} onChange={handleChange('description')}
          error={!projectInfo.description && !error.description ? true : false}
          helperText={!projectInfo.description && !error.description ? 'description name is required' : ' '}/>
          <div>
             <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" />}
              label="Public"
              labelPlacement="start"
              value={projectInfo.is_public}  onChange={handleIsPublic}
              checked={projectInfo.is_public}
            />
          </div>
          <div>
            <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary"/>}
              label="Active"
              labelPlacement="start"
              value={projectInfo.active}  onChange={handleIsActive}
              checked={projectInfo.active}
            />
          </div>

          <div>
          <FormControl variant="outlined"  fullWidth>
              <InputLabel id="status">Status</InputLabel>
                  <Select
                    labelId="status"
                    id="status"
                    onChange={handleChange('status')} 
                    value={projectInfo.status || ''}
                    label="status">
                        <MenuItem value={'Progressing'}>Progressing</MenuItem>
                        <MenuItem value={"Blocked"}>Blocked</MenuItem>
                        <MenuItem value={"Closed"}>Closed</MenuItem>
                  </Select>
          </FormControl>
          </div>
          <div className = {classes.btnGroup}>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="contained" >
            Cancel
          </Button>
        </div>
        </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SettingProjectPage));

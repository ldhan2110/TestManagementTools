import React, {useEffect, useState} from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import {ADD_NEW_PROJECT_REQ, GET_ALL_PROJECTS_REQ, RESET_ADD_NEW_PROJECT} from '../../../redux/projects/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import {TransitionEffect} from './TransitionEffect';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Snackbar from '../../../components/SnackBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { insProjects: state.project.insProjects }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    addProjectReq: (payload) => dispatch({ type: ADD_NEW_PROJECT_REQ, payload }),
    getAllProjectReq: () => dispatch({ type: GET_ALL_PROJECTS_REQ}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    resetAddRedux: () => dispatch({type: RESET_ADD_NEW_PROJECT}),
  }
}

const NewProjectPopup = (props) => {

  const {isOpen, setOpen, classes} = props; 

  const {insProjects, addProjectReq, displayMsg, getAllProjectReq, resetAddRedux} = props;

  const [open, setOpenPopup] = React.useState(isOpen); 
  const [checkError, setCheckError] = useState(false);
  const [error, setError] = useState({
    projectname: 'ss',
    description: 'ss',
  });


  const [projectInfo, setProjectInfo] = useState({
    projectname: '',
    description: '',
    is_public: false,
    active: false
  });

  const [enableCreateBtn, setEnableCreateBtn] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
      setOpenPopup(isOpen);
  },[isOpen, open])

  
  useEffect(()=>{
    if (insProjects.sucess === false){
      setLoading(false);
      displayMsg({
        content: insProjects.errMsg,
        type: 'error'
      });
      resetAddRedux(); 
      setEnableCreateBtn(true);
      setLoading(false);
    } else if (insProjects.sucess === true) {
      setLoading(false);
      displayMsg({
        content: "Create project successfully !",
        type: 'success'
      });
      resetAddRedux();
      setEnableCreateBtn(true);
      setLoading(false);
      getAllProjectReq();
      handleClose();
    }
  },[insProjects.sucess]);


  const handleClose = () => {
    setProjectInfo({
      projectname: '',
      description: '',
      is_public: false,
      active: false
    })
    setCheckError(false);
    setOpen(false);
  };

  const handleCreate = () => {
    setCheckError(true);

    if(projectInfo.description === "")
    setError({ ...projectInfo, description: "" });

    if(projectInfo.projectname === "")
    setError({ ...projectInfo, projectname: "" });

    if(projectInfo.description.trim().length === 0 || projectInfo.projectname.trim().length === 0
        ||projectInfo.description.trim().length !== projectInfo.description.length 
        || projectInfo.projectname.trim().length !== projectInfo.projectname.length){
        displayMsg({
          content: "Project Name or Descriptions should not contain spaces before and after !",
          type: 'error'
        });
    }
  
    else{
      setEnableCreateBtn(false);
      setLoading(true);
      addProjectReq(projectInfo);
    }

  }

  const handleChange = (prop) => (event) => {
    setProjectInfo({ ...projectInfo, [prop]: event.target.value });

    if(checkError === true)
    setError({ ...error, [prop]: event.target.value });
  };

  const handlePublic = () =>{
    setProjectInfo({ ...projectInfo, is_public: !projectInfo.is_public });
  };

  const handleActive = () => {
    setProjectInfo({ ...projectInfo, active: !projectInfo.active });
  };

  return (
      <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose} TransitionComponent={TransitionEffect}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h3" className={classes.title}>
              Create New Project
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <form className={classes.content}>
          <TextField id="projectName" label="Project Name" variant="outlined"  fullWidth required inputProps={{maxLength : 100}} 
          value={projectInfo.projectname || ''} onChange={handleChange('projectname')} 
          error={checkError && projectInfo.projectname.trim().length === 0 && error.projectname.trim().length === 0 ? true : false}
          helperText={checkError && projectInfo.projectname.trim().length === 0 && error.projectname.trim().length === 0 ? 'Project Name is required' : ' '}/>

          <TextField id="descriptions" label="Descriptions" variant="outlined"  fullWidth required multiline rows={15}  
          value={projectInfo.description || ''} onChange={handleChange('description')}
          error={checkError && projectInfo.description.trim().length === 0 && error.description.trim().length === 0 ? true : false}
          helperText={checkError && projectInfo.description.trim().length === 0 && error.description.trim().length === 0 ? 'Descriptions is required' : ' '}/>
          <div>
             <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary"  value={projectInfo.is_public} onChange={handlePublic}/>}
              label="Public"
              labelPlacement="start"
            />
          </div>
          <div>
            <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" value={projectInfo.active}  onChange={handleActive}/>}
              label="Active"
              labelPlacement="start"
            />
          </div>
          <div className = {classes.btnGroup}>
          <Button variant="contained" color="primary" disabled={enableCreateBtn ? false : true } startIcon={<AddIcon/>} onClick={handleCreate}>
            Create
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>
          <Button variant="contained" startIcon={<CancelIcon/>} onClick={handleClose}>
            Cancel
          </Button>
        </div>
        </form>
      </Dialog>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(NewProjectPopup));
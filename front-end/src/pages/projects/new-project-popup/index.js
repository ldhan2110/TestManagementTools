import React, {useEffect, useState} from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import {ADD_NEW_PROJECT_REQ} from '../../../redux/projects/constants';
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


//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { project: state.project }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    addProjectReq: (payload) => dispatch({ type: ADD_NEW_PROJECT_REQ, payload }),
  }
}

const NewProjectPopup = (props) => {

  const {isOpen, setOpen, classes} = props;

  const {project, addProjectReq} = props;

  const [open, setOpenPopup] = React.useState(isOpen);

  const [projectInfo, setProjectInfo] = useState({
    projectName: '',
    description: '',
    is_public: false,
    active: false
  });

  useEffect(()=>{
      setOpenPopup(isOpen);
  },[isOpen, open])

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    addProjectReq(projectInfo);
  }

  const handleChange = (prop) => (event) => {
    setProjectInfo({ ...projectInfo, [prop]: event.target.value });
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
          <TextField id="projectName" label="Project Name" variant="outlined"  fullWidth required  value={projectInfo.projectName || ''} onChange={handleChange('projectName')}/>
          <TextField id="descriptions" label="Descriptions" variant="outlined"  fullWidth required multiline rows={20}  value={projectInfo.description || ''} onChange={handleChange('description')}/>
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
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Create
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </div>
        </form>
      </Dialog>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(NewProjectPopup));
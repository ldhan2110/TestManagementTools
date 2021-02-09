import React, {useEffect} from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
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


const NewProjectPopup = (props) => {

  const {isOpen, setOpen, classes} = props;

  const [open, setOpenPopup] = React.useState(isOpen);

  useEffect(()=>{
      setOpenPopup(isOpen);
  },[isOpen, open])


  const handleClose = () => {
    setOpen(false);
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
          <TextField id="projectName" label="Project Name" variant="outlined"  fullWidth required/>
          <TextField id="descriptions" label="Descriptions" variant="outlined"  fullWidth required multiline rows={20}/>
          <div>
             <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" />}
              label="Public"
              labelPlacement="start"
            />
          </div>
          <div>
            <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" />}
              label="Active"
              labelPlacement="start"
            />
          </div>
          <div className = {classes.btnGroup}>
          <Button variant="contained" color="primary" onClick={handleClose}>
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

export default withStyles(styles)(NewProjectPopup);
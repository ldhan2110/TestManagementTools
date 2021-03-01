import React, {useState, useEffect} from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  createStyles,
  Theme,
  withStyles,
  useTheme
} from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  IconButton
} from '@material-ui/core';



import CloseIcon from '@material-ui/icons/Close';

const styles = {
  rootError: {
    backgroundColor: "red",
    color: "white"
  }, 

  rootInfo: {
    backgroundColor: "#3f51b5",
    color: "white"
  }, 

  rootWarn: {
    backgroundColor: "##ffc400",
    color: "white"
  }
}
  



const MessagePopup = (props) => {

  const {classes} = props;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { open, type, content, openMethod } = props;

  const [isOpen,setOpen] = useState(open);

  useEffect(()=>{
    setOpen(open);
  },[open]);

  const handleClose = () => {
    openMethod(false);
  };
  
  return (
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    fullScreen={fullScreen}
  >
    {type==="E" && <DialogTitle id="customized-dialog-title" onClose={handleClose} className={ classes.rootError}>Error</DialogTitle>}
    {type==="I" && <DialogTitle id="customized-dialog-title" onClose={handleClose} className={ classes.rootInfo}>Error</DialogTitle>}
    {type==="W" && <DialogTitle id="customized-dialog-title" onClose={handleClose} className={ classes.rootWarn}>Error</DialogTitle>}

    <DialogContent dividers>
      <DialogContentText id="alert-dialog-description">
        {content}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        OK
      </Button>
    </DialogActions>
  </Dialog>
  );
}

export default  withStyles(styles)(MessagePopup);
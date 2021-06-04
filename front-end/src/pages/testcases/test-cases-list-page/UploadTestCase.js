import React, {useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  ListItemText
} from '@material-ui/core'

import MailOutlineIcon from '@material-ui/icons/MailOutline';

function mapStateToProps(state) {
  return {
   
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
   
  }
}

const UploadTestCase = (props) => {

  const {isOpen, setOpen, selected} = props;

  const [open,setOpenMethod] = useState(isOpen);
  
  useEffect(()=>{
    setOpenMethod(isOpen);
  },[isOpen])

  const handleClose = () => {
    setOpen(false);
    //openMethod(false);
  }

  

    return(
      <Dialog open={open} onClose={handleClose}  fullWidth={false} maxWidth={'sm'}>
        <DialogTitle>Upload Test Case</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Please input files to upload your test case. <br></br>
            For the template file, please click <a href='/template/example.txt' download>here</a>
          </DialogContentText>
          <Grid container>
              <Grid item xs={6}>
                <Button onClick={handleClose} color="primary" variant="contained">Upload File</Button>
              </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(UploadTestCase));
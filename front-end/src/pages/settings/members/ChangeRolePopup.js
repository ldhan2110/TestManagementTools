import React, {useState,useEffect} from 'react';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem, Select
} from '@material-ui/core'


function mapStateToProps(state) {
  return {
   
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
  
  }
}

const ChangRolePopup = (props) => {

  const {isOpen, openMethod, selected} = props;

  const [open, setOpen] = useState(isOpen);

  const [userInfo, setUserInfo] = useState(selected);
  

  useEffect(()=>{
    setOpen(isOpen);
  },[isOpen])

  useEffect(()=>{
    setUserInfo(selected);
  },[selected])

  useEffect(()=>{
    console.log(userInfo);
  },[userInfo])

  const handleClose = () => {
    setOpen(false);
    openMethod(false);
  }

  const handleChangeRole = (event) => {
    setUserInfo({...userInfo, role: event.target.value});
  }

 

    return(
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Role</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select a role for this member
          </DialogContentText>
          <FormControl variant="outlined"  fullWidth>
              <InputLabel id="status">Role</InputLabel>
                  <Select
                    labelId="role"
                    id="role"
                    label="role"
                    value={userInfo ? userInfo.role : ''}
                    onChange={handleChangeRole}
                   >
                        <MenuItem value={'projectmanager'}>Project Manager</MenuItem>
                        <MenuItem value={'testlead'}>Test Lead</MenuItem>
                        <MenuItem value={"tester"}>Tester</MenuItem>
                  </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Confirm
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ChangRolePopup));
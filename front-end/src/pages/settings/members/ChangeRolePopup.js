import React, {useState,useEffect} from 'react';
import {ADD_USERS_TO_PROJECT_REQ, GET_ALL_USERS_REQ, GET_ALL_USERS_OF_PROJECT_REQ} from '../../../redux/users/constants';
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
    insUsers: state.user.insUsers,
    listUsers: state.user.listUsers,
    project: state.project.currentSelectedProject
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    addUserToProjectReq: (payload) => dispatch({ type: ADD_USERS_TO_PROJECT_REQ, payload }),
    getAllUserReq: (payload) => dispatch({ type: GET_ALL_USERS_REQ, payload}),
    getAllUserOfProjectReq: (payload) => dispatch({ type: GET_ALL_USERS_OF_PROJECT_REQ, payload}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload })
  }
}

const ChangRolePopup = (props) => {

  const {isOpen, openMethod} = props;

  const [open, setOpen] = useState(isOpen);
  

  useEffect(()=>{
    setOpen(isOpen);
  },[isOpen])

  const handleClose = () => {
    setOpen(false);
    openMethod(false);
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
                    label="role">
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
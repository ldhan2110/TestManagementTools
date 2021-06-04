import React, {useState,useEffect} from 'react';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import {CHANGE_ROLE_MEMBER_REQ, RESET_CHANGE_ROLE_MEMBER} from '../../../redux/projects/constants';
import {GET_ALL_USERS_OF_PROJECT_REQ} from '../../../redux/users/constants';
import { useHistory } from "react-router";
import CircularProgress from '@material-ui/core/CircularProgress';
import { blue } from '@material-ui/core/colors';
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
    insProjects: state.project.insProjects,
    project: state.project.currentSelectedProject
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    changeRoleMember: (payload) => dispatch({ type: CHANGE_ROLE_MEMBER_REQ, payload }),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    ResetRedux: (payload) => dispatch({ type: RESET_CHANGE_ROLE_MEMBER, payload }),
    getAllUserOfProjectReq: (payload) => dispatch({ type: GET_ALL_USERS_OF_PROJECT_REQ, payload}),
  }
}

const ChangRolePopup = (props) => {

  const {isOpen, openMethod, selected, changeRoleMember, displayMsg, insProjects, ResetRedux, getAllUserOfProjectReq, project} = props;

  const [open, setOpen] = useState(isOpen);

  const [userInfo, setUserInfo] = useState(selected);
  const history = useHistory();
  const [enableCreateBtn, setEnableCreateBtn] = useState(true);
  const [loading, setLoading] = useState(false);


  useEffect(()=>{
    setOpen(isOpen);
  },[isOpen])

  useEffect(()=>{
    setUserInfo(selected);
  },[selected])

  useEffect(()=>{
    console.log('infor: '+JSON.stringify(userInfo, null, ' '));
  },[userInfo])

  useEffect(()=>{
    if (insProjects.sucess === false){
      setLoading(false);
      displayMsg({
        content: insProjects.errMsg,
        type: 'error'
      });
      setEnableCreateBtn(true);
      setLoading(false);
      ResetRedux(); 
    } else if (insProjects.sucess == true) {
      setLoading(false);
      displayMsg({
        content: "Change role member successfully !",
        type: 'success'
      });
      setEnableCreateBtn(true);
      setLoading(false);
      ResetRedux();
      //handleClose();
      getAllUserOfProjectReq(project);
      setOpen(false);
      //history.goBack();
    }
  },[insProjects.sucess]);

  const handleClose = () => {
    setOpen(false);
    openMethod(false);
  }

  const handleConfirm = () => {
    setEnableCreateBtn(false);
    setLoading(true);
    changeRoleMember(userInfo);
    //setOpen(false);
    //openMethod(false);
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
          <Button onClick={handleConfirm} color="primary" disabled={enableCreateBtn == true ? false : true }>
            Confirm
            {loading && <CircularProgress size={24} style={{color: blue[500],position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
          </Button>
          <Button  onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ChangRolePopup));
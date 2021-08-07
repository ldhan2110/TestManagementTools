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
    project: state.project.currentSelectedProject,
    role: state.project.currentRole,
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

  const {isOpen, openMethod, selected, changeRoleMember, displayMsg, insProjects, ResetRedux, getAllUserOfProjectReq, project, role} = props;

  const [open, setOpen] = useState(isOpen);

  const [userInfo, setUserInfo] = useState(selected);
  //const history = useHistory();
  const [enableCreateBtn, setEnableCreateBtn] = useState(true);
  const [loading, setLoading] = useState(false);


  useEffect(()=>{
    setOpen(isOpen);
  },[isOpen])

  useEffect(()=>{
    setUserInfo(selected);
  },[selected])


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
    } else if (insProjects.sucess === true) {
      setLoading(false);
      displayMsg({
        content: "Change role member successfully !",
        type: 'success'
      });
      setEnableCreateBtn(true);
      setLoading(false);
      ResetRedux();
      getAllUserOfProjectReq(project);
      setOpen(false);
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
        {(role === 'Project Manager' || role === 'Test Lead') && 
        <DialogContent>
          <DialogContentText>
            Please select an access level for this member
          </DialogContentText>
          <FormControl variant="outlined"  fullWidth>
              <InputLabel id="status">Role</InputLabel>
                  <Select
                    labelId="role"
                    id="role"
                    label="Access level"
                    value={userInfo ? userInfo.role : ''}
                    onChange={handleChangeRole}
                   >
                        <MenuItem value={'viewer'}>viewer</MenuItem>
                        <MenuItem value={'reporter'}>reporter</MenuItem>
                        <MenuItem value={"updater"}>updater</MenuItem>
                        <MenuItem value={"developer"}>developer</MenuItem>
                        <MenuItem value={"manager"}>manager</MenuItem>
                        <MenuItem value={"administrator"}>administrator</MenuItem>
                  </Select>
          </FormControl>
        </DialogContent>}

        {(role === 'Project Manager' || role === 'Test Lead') &&
        <DialogActions>
          <Button  onClick={handleClose} color="primary">
            Cancel
          </Button>
         <Button onClick={handleConfirm} color="primary" disabled={enableCreateBtn ? false : true }>
            Confirm
            {loading && <CircularProgress size={24} style={{color: blue[500],position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
          </Button>           
        </DialogActions>}

        {(role === 'Tester') && 
        <DialogContent>    
            Do not allow Tester role !
        </DialogContent>}

        {(role === 'Tester') &&
        <DialogActions>
          <Button  onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>}

      </Dialog>
    );
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ChangRolePopup));
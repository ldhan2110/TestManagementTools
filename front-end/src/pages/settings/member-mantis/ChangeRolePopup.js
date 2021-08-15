import React, {useState,useEffect} from 'react';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import {GET_ALL_MEMBERMANTIS_REQ, CHANGE_ROLE_MEMBER_MANTIS_REQ, RESET_CHANGE_ROLE_MEMBER_MANTIS} from '../../../redux/users/constants';
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
    insChangeRoleMantis: state.user.insChangeRoleMantis,
    project: state.project.currentSelectedProject,
    role: state.project.currentRole,
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    changeRoleMemberMantisReq: (payload) => dispatch({ type: CHANGE_ROLE_MEMBER_MANTIS_REQ, payload }),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    resetChangeRoleMantisRedux: (payload) => dispatch({ type: RESET_CHANGE_ROLE_MEMBER_MANTIS, payload }),
    getAllMemberMantisReq: (payload) => dispatch({ type: GET_ALL_MEMBERMANTIS_REQ, payload}),
  }
}

const ChangRolePopup = (props) => {

  const {isOpen, openMethod, selected, displayMsg,
    changeRoleMemberMantisReq, insChangeRoleMantis, resetChangeRoleMantisRedux, getAllMemberMantisReq,
     project, role} = props;

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
    if (insChangeRoleMantis?.sucess === false){
      displayMsg({
        content: insChangeRoleMantis.errMsg,
        type: 'error'
      });
      setEnableCreateBtn(true);
      setLoading(false);
      resetChangeRoleMantisRedux();
    } else if (insChangeRoleMantis?.sucess === true) {
      displayMsg({
        content: "Change role member successfully !",
        type: 'success'
      });
      setEnableCreateBtn(true);
      setLoading(false);
      getAllMemberMantisReq(project);
      setOpen(false);
      resetChangeRoleMantisRedux();
    }
  },[insChangeRoleMantis?.sucess]);

  const handleClose = () => {
    setOpen(false);
    openMethod(false);
  }

  const handleConfirm = () => {
    setEnableCreateBtn(false);
    setLoading(true);
    changeRoleMemberMantisReq(userInfo);
    //setOpen(false);
    //openMethod(false);
  }


  const handleChangeRole = (event) => {
    setUserInfo({...userInfo, role_mantis: event.target.value});
  }
 

    return(
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Access Level</DialogTitle>
        {(role === 'Project Manager' || role === 'Test Lead') && 
        <DialogContent>
          <DialogContentText>
            Please select an access level for this member
          </DialogContentText>
          <FormControl variant="outlined"  fullWidth>
              <InputLabel id="status">Access Level</InputLabel>
                  <Select
                    labelId="role"
                    id="role"
                    label="Access level"
                    value={userInfo ? userInfo.role_mantis : ''}
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
import React, {useState,useEffect} from 'react';
import SearchInput from '../../../components/SearchInput';
import {ADD_USERS_TO_PROJECT_REQ, GET_ALL_USERS_REQ, GET_ALL_USERS_OF_PROJECT_REQ, RESET_ADD_USERS_TO_PROJECT_REQ, RESET_ADD_USERS_TO_PROJECT} from '../../../redux/users/constants';
import {INVITE_MEMBERS_SEARCH} from '../../../components/Table/DefineSearch'
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core'

function mapStateToProps(state) {
  return {
    insUsers: state.user.insUsers,
    listUsers: state.user.listUsersOfProject,
    project: state.project.currentSelectedProject,
    role: state.project.currentRole
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    addUserToProjectReq: (payload) => dispatch({ type: ADD_USERS_TO_PROJECT_REQ, payload }),
    getAllUserOfProjectReq: (payload) => dispatch({ type: GET_ALL_USERS_OF_PROJECT_REQ, payload}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    resetAddUser: () => dispatch({type: RESET_ADD_USERS_TO_PROJECT}),
  }
}

const CreateNewMantisAccountDialog = (props) => {

  const {isOpen, openMethod} = props;

  const {insUsers, listUsers, project, getAllUserOfProjectReq, displayMsg, resetAddUser} = props;


  const [open, setOpen] = useState(isOpen);

  const [checkError, setCheckError] = useState(false);
  const [error, setError] = useState({
    email: 'ss',
    username: 'ss',
    projectid: project,
  }); 

  const [inputData, setInput] = useState('');

  const [resultData, setResultData] = useState([]);

  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
    projectid: project,
  });

  const [enableCreateBtn, setEnableCreateBtn] = useState(true);
  const [loading, setLoading] = useState(false);

  const [array, setArray] = React.useState([]);

  const handleArray = () => {   

  setArray([]);
  for(let i in listUsers){
    setArray(array => [...array, {
      name: listUsers[i].username,
      email: listUsers[i].email
    }]);
  }
 }





  useEffect(()=>{
    setOpen(isOpen);
  },[isOpen])

  useEffect(()=>{
    getAllUserOfProjectReq(project);
    setArray([]);
  },[]);

  useEffect(()=>{
    handleArray();
  },[listUsers])

  useEffect(()=>{
 if (insUsers.sucess === true) {
      displayMsg({
        content: "Invitation sent successfully !",
        type: 'success'
      });
      setEnableCreateBtn(true);
      setLoading(false);
      resetAddUser();
      handleClose();
    }
  else if(insUsers.sucess === false){
    displayMsg({
      content: insUsers.errMsg,
      type: 'error'
    });
    setEnableCreateBtn(true);
    setLoading(false);
    resetAddUser();
    handleClose();
  }
  },[insUsers.sucess]);
  

  const handleClose = () => {
    setResultData([]);
    setInput('');
    setOpen(false);
    openMethod(false);
  }

  const handleChange = (prop) => (event) => {
    setUserInfo({ ...userInfo, [prop]: event.target.value });
    if(checkError === true)
    setError({ ...error, [prop]: event.target.value });
  };

  const handleCreate = () => {
    setCheckError(true);

    if(userInfo.username === "")
    setError({ ...userInfo, username: "" });

    if(userInfo.email === "")
    setError({ ...userInfo, email: "" });

    else if(userInfo.email !== "" && userInfo.username !== ""){
      setEnableCreateBtn(false);
      setLoading(true);
    //   addBuildReq(buildInfo);
        console.log(userInfo);
    }
  }


    return(
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new account</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField id="username" label="Username" variant="outlined"  fullWidth required
                value={userInfo.username || ''} onChange={handleChange('username')}
                error={userInfo.username.trim().length === 0 && error.username.trim().length === 0 ? true : false}
                helperText={userInfo.username.trim().length === 0 && error.username.trim().length === 0 ? 'Username is required' : null} />
            </Grid>
            <Grid item xs={12}>
            <FormControl variant="outlined"  fullWidth required>
                              <InputLabel id="member">Member</InputLabel>
                                <Select
                                  labelId="member"
                                  id="member"
                                  value={userInfo.email}
                                  onChange={handleChange('email')}
                                  label="Member"
                                >
                               {listUsers.map((item) => (
                                    <MenuItem value={item.email}>{item.username}</MenuItem>
                               ))}
                              </Select>
          </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleCreate} color="primary">
            Create
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(CreateNewMantisAccountDialog));
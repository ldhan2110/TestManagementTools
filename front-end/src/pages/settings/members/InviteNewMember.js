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
  List,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItemText
} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import { blue } from '@material-ui/core/colors';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

function mapStateToProps(state) {
  return {
    insUsers: state.user.insUsers,
    listUsers: state.user.listUsers,
    project: state.project.currentSelectedProject,
    role: state.project.currentRole
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    addUserToProjectReq: (payload) => dispatch({ type: ADD_USERS_TO_PROJECT_REQ, payload }),
    getAllUserReq: (payload) => dispatch({ type: GET_ALL_USERS_REQ, payload}),
    getAllUserOfProjectReq: (payload) => dispatch({ type: GET_ALL_USERS_OF_PROJECT_REQ, payload}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    resetAddUser: () => dispatch({type: RESET_ADD_USERS_TO_PROJECT}),
  }
}

const InviteNewMemberDialog = (props) => {

  const {isOpen, openMethod} = props;

  const {insUsers, listUsers, addUserToProjectReq, project, getAllUserReq, getAllUserOfProjectReq, displayMsg, role, resetAddUser} = props;


  const [open, setOpen] = useState(isOpen);

  const [inputData, setInput] = useState('');

  const [resultData, setResultData] = useState([]);

  const [userInfo, setUserInfo] = useState({
    email: '',
    role: 'Tester',
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


  const checkValidCollab = (queryString) => {
    var result = [];
    if (queryString !== '') {
      for (let idx of array){
        if (idx.email === queryString){
          result.push(idx);
        }          
      }
    }
    return result;
  }

  const handleSearch = () => {
    if (inputData ==='') {
      setResultData([]);
    }
   setResultData(checkValidCollab(inputData));
  }


  useEffect(()=>{
    setOpen(isOpen);
  },[isOpen])

  useEffect(()=>{
    getAllUserReq(project);
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

  const handleSendButton = () => {
    setEnableCreateBtn(false);
    setLoading(true);
    addUserToProjectReq(userInfo);
  }

  const handleInputChange = (props, values) => {
    setInput(values);
    setUserInfo({ ...userInfo, [props]: values });
  }

    return(
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Invite new collaborator</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To invite new collaborator, please enter email to send invitation.
          </DialogContentText>
          <SearchInput type="member" setConditions={handleInputChange} searchMethod={handleSearch} conditions={INVITE_MEMBERS_SEARCH}/>
          <List>
          {resultData.length !==0 ? resultData.map((item,index) =>(
              <ListItem key={index}>
                <ListItemText
                  primary={item.name}
                  secondary={item.email}/>
                  <ListItemSecondaryAction>
                
                    <IconButton edge="end" aria-label="delete" disabled={enableCreateBtn ? false : true } onClick={handleSendButton}>
                      <MailOutlineIcon />
                      {loading && <CircularProgress size={24} style={{color: blue[500],position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}} />}
                    </IconButton>
                  </ListItemSecondaryAction>
              </ListItem>
          )):<ListItem><ListItemText secondary={"No Result"}/></ListItem>}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(InviteNewMemberDialog));
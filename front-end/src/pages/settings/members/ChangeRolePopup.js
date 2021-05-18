import React, {useState,useEffect} from 'react';
import SearchInput from '../../../components/SearchInput';
import {ADD_USERS_TO_PROJECT_REQ, GET_ALL_USERS_REQ, GET_ALL_USERS_OF_PROJECT_REQ} from '../../../redux/users/constants';
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

import MailOutlineIcon from '@material-ui/icons/MailOutline';

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

const InviteNewMemberDialog = (props) => {

  const {isOpen, openMethod} = props;

  const {insUsers, listUsers, addUserToProjectReq, project, getAllUserReq, getAllUserOfProjectReq, displayMsg} = props;


  const [open, setOpen] = useState(isOpen);

  const [inputData, setInput] = useState('');

  const [resultData, setResultData] = useState([]);

  const [userInfo, setUserInfo] = useState({
    email: '',
    role: 'tester',
    projectid: project,
  });

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
        content: "Add user to project successfully !",
        type: 'success'
      });
      getAllUserOfProjectReq(project);
      handleClose();
    }
  else if(insUsers.sucess === false){
    displayMsg({
      content: insUsers.errMsg,
      type: 'error'
    });
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
    addUserToProjectReq(userInfo);
  }

  const handleInputChange = (values) => {
    setInput(values);
    setUserInfo({ ...userInfo, email: values });
  }

    return(
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Invite new collaborator</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To invite new collaborator, please enter username or email to send invitation.
          </DialogContentText>
          <SearchInput inputMethod={handleInputChange} searchMethod={handleSearch}/>
          <List>
          {resultData.length !==0 ? resultData.map((item,index) =>(
              <ListItem key={index}>
                <ListItemText
                  primary={item.name}
                  secondary={item.email}/>
                  <ListItemSecondaryAction>

                    <IconButton edge="end" aria-label="delete" onClick={handleSendButton}>
                      <MailOutlineIcon />
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
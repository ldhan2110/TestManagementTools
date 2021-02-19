import React, {useState,useEffect} from 'react';
import SearchInput from '../../../components/SearchInput';
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


const data = [
  {name: "An Le", email:"ldhan@gmail.com"},
  {name: "An Dang", email:"ldhan@gmail.com"},
  {name: "Tuc Tran", email:"ldhan@gmail.com"},
  {name: "Trieu Duong", email:"ldhan@gmail.com"},
  {name: "Le Cuong", email:"ldhan@gmail.com"},
  {name: "Doan Phan", email:"ldhan@gmail.com"},
]

const InviteNewMemberDialog = (props) => {

  const {isOpen, openMethod} = props;

  const [open, setOpen] = useState(isOpen);

  const [inputData, setInput] = useState('');

  const [resultData, setResultData] = useState([]);


  const checkValidCollab = (queryString) => {
    var result = [];
    if (queryString !== '') {
      for (var idx in data){
        if (data[idx].name.includes(queryString) || data[idx].email.includes(queryString))
          result.push(data[idx]);
      }
    }
    return result;
  }

  const handleSearch = () => {
    if (inputData ==='') {
      console.log("Empty")
      setResultData([]);
    }
   setResultData(checkValidCollab(inputData));
  }


  useEffect(()=>{
    setOpen(isOpen);
  },[isOpen])

  

  const handleClose = () => {
    setResultData([]);
    setInput('');
    setOpen(false);
    openMethod(false);
  }

  const handleInputChange = (values) => {
    setInput(values);
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

                    <IconButton edge="end" aria-label="delete">
                      <MailOutlineIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
              </ListItem>
          )):<ListItem><ListItemText primary={"No Result"}/></ListItem>}
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

export default (InviteNewMemberDialog);
import React, {useState,useEffect} from 'react';
import SearchInput from '../../../components/SearchInput';
import {ADD_MEMBERMANTIS_REQ, GET_ALL_USERS_OF_PROJECT_REQ, GET_ALL_MEMBERMANTIS_REQ, RESET_ADD_MEMBERMANTIS_REQ, RESET_ADD_MEMBERMANTIS} from '../../../redux/users/constants';
//import {INVITE_MEMBERS_SEARCH} from '../../../components/Table/DefineSearch'
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
  TextField,
  FormControl,
  InputLabel,
  Grid,
  Select,
  MenuItem,
  ListItemText,
  FormHelperText,
} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import { blue } from '@material-ui/core/colors';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

function mapStateToProps(state) {
  return {
    insMemberMantis: state.user.insMemberMantis,
    listUsersOfProject: state.user.listUsersOfProject,
    project: state.project.currentSelectedProject,
    role: state.project.currentRole
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    addMemberMantisReq: (payload) => dispatch({ type: ADD_MEMBERMANTIS_REQ, payload }),
    getAllUsersOfProjectReq: (payload) => dispatch({ type: GET_ALL_USERS_OF_PROJECT_REQ, payload}),
    getAllMemberMantisReq: (payload) => dispatch({ type: GET_ALL_MEMBERMANTIS_REQ, payload}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    resetAddMemberMantis: () => dispatch({type: RESET_ADD_MEMBERMANTIS}),
  }
}

const InviteMemberMantisDialog = (props) => {

  const {isOpen, openMethod} = props;

  const {classes,insMemberMantis, listUsersOfProject, addMemberMantisReq, project, getAllUsersOfProjectReq, getAllMemberMantisReq, displayMsg, role, resetAddMemberMantis} = props;


  const [open, setOpen] = useState(isOpen);

  const [inputData, setInput] = useState('');

  const [resultData, setResultData] = useState([]);

  const [userInfo, setUserInfo] = useState({
    projectid: project,
    username: '',
    email: '',
    access_level: '',
  });

  const [checkError, setCheckError] = useState(false);
    const [error, setError] = useState({
      username: 'ss',
      email: 'ss',
      access_level: 'ss',
    });

  const [enableCreateBtn, setEnableCreateBtn] = useState(true);
  const [loading, setLoading] = useState(false);

  const [array, setArray] = React.useState([]);

  const handleArray = () => {   

  setArray([]);
  for(let i in listUsersOfProject){
    setArray(array => [...array, {
      projectid: project,
      username: listUsersOfProject[i].username,
      email: listUsersOfProject[i].email,
      access_level: listUsersOfProject[i].access_level,
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

  /*const handleSearch = () => {
    if (inputData ==='') {
      setResultData([]);
    }
   setResultData(checkValidCollab(inputData));
  }*/


  useEffect(()=>{
    setOpen(isOpen);
  },[isOpen])

  useEffect(()=>{
    getAllUsersOfProjectReq(project);
    setArray([]);
  },[]);

  useEffect(()=>{
    handleArray();
  },[listUsersOfProject])

  useEffect(()=>{
 if (insMemberMantis?.sucess === true) {
      displayMsg({
        content: "Send invitation successfully !",
        type: 'success'
      });
      getAllMemberMantisReq(project);
      setEnableCreateBtn(true);
      setLoading(false);
      resetAddMemberMantis();
      handleClose();
    }
  else if(insMemberMantis?.sucess === false){
    displayMsg({
      content: insMemberMantis.errMsg,
      type: 'error'
    });
    setEnableCreateBtn(true);
    setLoading(false);
    resetAddMemberMantis();
    handleClose();
  }
  },[insMemberMantis?.sucess]);
  

  const handleClose = () => {
    //setResultData([]);
   // setInput('');
    setOpen(false);
    openMethod(false);
    setUserInfo({
      projectid: project,
      username: '',
      email: '',
      access_level: '',
    })
  }

  const handleChange = (prop) => (event) => {
    setUserInfo({ ...userInfo, [prop]: event.target.value });

    if(checkError === true)
    setError({ ...error, [prop]: event.target.value });
  }

 /* const handleSendButton = () => {
    setEnableCreateBtn(false);
    setLoading(true);
    addMemberMantisReq(userInfo);
  }

  const handleInputChange = (props, values) => {
    setInput(values);
    setUserInfo({ ...userInfo, [props]: values });
  }*/

  const handleAdd = () => {
    setCheckError(true);

    if(userInfo.description === "")
    setError({ ...userInfo, description: "" });

    if(userInfo.username === "")
    setError({ ...userInfo, username: "" });

    if(userInfo.username.trim().length === 0 || userInfo.username.trim().length !== userInfo.username.length){
        displayMsg({
          content: "Username mantis should not contain spaces before and after !",
          type: 'error'
        });
    }

    else if(userInfo.email === ""){
      displayMsg({
        content: "Member is required!",
        type: 'error'
      });
    }

    else if(userInfo.access_level=== ""){
      displayMsg({
        content: "Access level is required!",
        type: 'error'
      });
    }

    else if(userInfo.username !== "") {
      setEnableCreateBtn(false);
      setLoading(true);
      addMemberMantisReq(userInfo);
    }
  };

    return(
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Invite member mantis</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To invite new member mantis, please enter username mantis, select member's email and select role mantis
          </DialogContentText>
          {/*<SearchInput type="member" setConditions={handleInputChange} searchMethod={handleSearch} conditions={INVITE_MEMBERS_SEARCH}/>
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
          </List>*/}
          <TextField id="usernamemantis" label="Username Mantis" variant="outlined"  fullWidth required inputProps={{maxLength : 100}}
          value={userInfo.username || ''} onChange={handleChange('username')}
          error={userInfo.username.trim().length === 0 && error.username.trim().length === 0 ? true : false}
          helperText={userInfo.username.trim().length === 0 && error.username.trim().length === 0 ? 'Username mantis is required' : ' '}/> 
        
        <form className={classes.content}>
        <Grid container>
              <FormControl variant="outlined" fullWidth>
              <InputLabel id="Select member" >Select member</InputLabel>
            <Select
          labelId="Select member"
          id="Select member"
          error={(userInfo.email === "" && error.email === "") ? true : false}
          onChange={handleChange('email')}
          label="Select member">
            
          <MenuItem key={''} value={''}>&nbsp;</MenuItem>
          {listUsersOfProject?.map((item, index) =>
          <MenuItem key={index} value={item.email}>{item.email}</MenuItem>)}  
        </Select>
        {(userInfo.email === "" && error.email === "") && 
            <FormHelperText style={{color: 'red'}} >Select a category!</FormHelperText>}
      </FormControl>
      </Grid>

      <Grid container>
              <FormControl variant="outlined" fullWidth>
              <InputLabel id="Select access level" >Select access level</InputLabel>
            <Select
          labelId="Select access level"
          id="Select access level"
          onChange={handleChange('access_level')}
          label="Select access level"
          value={userInfo.access_level}
          >            
          <MenuItem value={'viewer'}>viewer</MenuItem>
          <MenuItem value={'reporter'}>reporter</MenuItem>
          <MenuItem value={"updater"}>updater</MenuItem>
          <MenuItem value={"developer"}>developer</MenuItem>
          <MenuItem value={"manager"}>manager</MenuItem>
          <MenuItem value={"administrator"}>administrator</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      </form>

        </DialogContent>
        <DialogActions>
        <Button variant="contained" color="primary" disabled={enableCreateBtn ? false : true } onClick={handleAdd}>
            Add
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(InviteMemberMantisDialog));
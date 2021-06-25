import React, {useState, useEffect} from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import EnhancedTable from '../../../components/Table/index';
import ChangeRolePopup from './ChangeRolePopup';
import Helmet from 'react-helmet';
import {MEMBERS_HEADERS} from '../../../components/Table/DefineHeader';
import {MEMBER_SEARCH} from '../../../components/Table/DefineSearch';
import NewMemberDialog from './InviteNewMember';
import {ADD_USERS_TO_PROJECT_REQ, GET_ALL_USERS_REQ, GET_ALL_USERS_OF_PROJECT_REQ, DELETE_USER_OF_PROJECT_REQ, RESET_DELETE_USER_OF_PROJECT} from '../../../redux/users/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
import {
  Grid,
  Typography,
  Divider,
  Button,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog
} from '@material-ui/core';

import {
  Add as AddIcon,
} from "@material-ui/icons";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LinearProgress from '@material-ui/core/LinearProgress';
// const NavLink = React.forwardRef((props, ref) => (
//   <RouterNavLink innerRef={ref} {...props} />
// ));

function mapStateToProps(state) {
  return {
    listUsers: state.user.listUsers,
    listUsersOfProject: state.user.listUsersOfProject,
    project: state.project.currentSelectedProject,
    insDeleteMember: state.user.insDeleteMember,
    role: state.project.currentRole,
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    addUserToProjectReq: (payload) => dispatch({ type: ADD_USERS_TO_PROJECT_REQ, payload }),
    getAllUserReq: (payload) => dispatch({ type: GET_ALL_USERS_REQ, payload}),
    getAllUserOfProjectReq: (payload) => dispatch({ type: GET_ALL_USERS_OF_PROJECT_REQ, payload}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    deleteUserOfProject: (payload) => dispatch({ type: DELETE_USER_OF_PROJECT_REQ, payload }),
    resetDelUserOfProjectRedux: () => dispatch({ type: RESET_DELETE_USER_OF_PROJECT})
  }
}


const MemberListPage = (props) => {
  //const {classes} = props;

  const {listUsersOfProject, project, getAllUserOfProjectReq, listUsers, addUserToProjectReq, getAllUserReq, displayMsg, insDeleteMember, deleteUserOfProject, resetDelUserOfProjectRedux, role} = props;

  const [openDialog,setOpenDialog] = useState(false);

  const [openRoleDialog,setOpenRoleDialog] = useState(false);

  const [searchConditions, setConditions] = useState({
    username: '',
    role: -1
  });

  const [open, setOpen] = useState(false);
  const [delMember, setDelMember] = useState({
    projectid: project,
    userid: ''
  });

  //const history = useHistory();

  const [array, setArray] = React.useState([]);

  const [listMember, setListMember] = React.useState([]);

  const [selected,setSelected] = useState({});

  //load TP bar
  const [count, setCount] = React.useState(0);
  const [count1, setCount1] = React.useState(0);

  const handleArray = () => {   
    if(listUsersOfProject !== undefined){
      setArray([]);
      for(let i in listUsersOfProject){
        setArray(array => [...array, { 
          id: listUsersOfProject[i].user,
          name: listUsersOfProject[i].username,
          role: listUsersOfProject[i].role,
          projectid: project
        }]);
      }
    }
    else{
    }

 }

  const handleClickNewMemberDialog = () => {
    setOpenDialog(true);
  }

  const handleOpenChangeRole = (props) => {
    setSelected(props);
    setOpenRoleDialog(true);
  }


  const handleChangeConditions = (props, data) => {
    setConditions({...searchConditions, [props]: data });
  }

  const searchMember = () =>{

  }

  useEffect(()=>{
    getAllUserOfProjectReq(project);
    setArray([]);
  },[]);

  useEffect(()=>{
    handleArray();
    //load bar
    if(count < 3){
      setCount(count+1);
      setTimeout(()=>{
        setCount1(count1+1);
      },200);}
  },[listUsersOfProject])

  useEffect(()=>{
    setListMember(array);
    setOpenRoleDialog(false);
  },[array])

  useEffect(()=>{
    if (searchConditions.username === '' && searchConditions.role === -1){
      setListMember(array);
    } 
    else{
      if(searchConditions.role === -1)
      setListMember(array.filter((item) => {
        if(item.name.toLowerCase().includes(searchConditions.username.toLowerCase()))
          return array;}))
      else
      setListMember(array.filter((item) => {
        if(item.name.toLowerCase().includes(searchConditions.username.toLowerCase()) && searchConditions.role === item.role)
          return array;}))
    }
  },[searchConditions]);

  //delete member -->
  
  const deleteMember = (id) =>{
    setDelMember({...delMember, userid: id});
    setOpen(true);
  };
  
  const handleDelMember = () =>{
    setCount(-2);
      setCount1(-2);
    deleteUserOfProject(delMember);
    setOpen(false);
  }

  const handleCloseDelMember = () =>{
    setOpen(false);
  }

  useEffect(()=>{
    if (insDeleteMember?.sucess === false){
      displayMsg({
        content: insDeleteMember.errMsg,
        type: 'error'
      });
      setCount(1);
        setCount1(1);
      getAllUserOfProjectReq(project);
      resetDelUserOfProjectRedux();
    } else if (insDeleteMember?.sucess === true) {
      displayMsg({
        content: "Removed user from project successfully !",
        type: 'success'
      });
      setCount(1);
        setCount1(1);
      getAllUserOfProjectReq(project);
      resetDelUserOfProjectRedux();
    }
  },[insDeleteMember?.sucess])

  // <-- delete member 
  return(
    <div>
      <ChangeRolePopup/>
      <Helmet title="Service Management" />
      <ChangeRolePopup isOpen={openRoleDialog} openMethod={setOpenRoleDialog} selected={selected}/>
      <NewMemberDialog isOpen={openDialog} openMethod={setOpenDialog}/>
      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Members
          </Typography>

        </Grid>
        <Grid item>
          <div>
          {(role === 'Project Manager' || role === 'Test Lead') && <Button variant="contained" color="primary" onClick={handleClickNewMemberDialog} startIcon={<PersonAddIcon/>}>
              Invite collaborator
            </Button>}
          </div>
          <Grid item>
                <Dialog open={open} >
                  <DialogTitle>Confirm</DialogTitle>
                  <DialogContent>Are you sure you want to remove this user from project?</DialogContent>
                  <DialogActions>
            <Button onClick={handleDelMember} color="primary">Yes </Button>
                    <Button onClick={handleCloseDelMember} color="primary">No</Button>
                  </DialogActions>
                </Dialog>
            </Grid>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
           {/* Load bar */}
        {count1 < 2 && <LinearProgress />}
          <EnhancedTable
            rows={listMember}
            headerList = {MEMBERS_HEADERS}
            viewAction={handleOpenChangeRole}
            conditions={MEMBER_SEARCH}
            setConditions={handleChangeConditions}
            searchMethod={searchMember}
            handleDefaultDeleteAction={deleteMember}
            type='member'
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(MemberListPage));

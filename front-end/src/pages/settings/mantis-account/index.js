import React, {useState, useEffect} from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import EnhancedTable from '../../../components/Table/index';
import Helmet from 'react-helmet';
import {MANTIS_HEADER} from '../../../components/Table/DefineHeader';
import {MANTIS_SEARCH} from '../../../components/Table/DefineSearch';
import NewMemberDialog from './NewMantisAccount';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import {ADD_USERS_TO_PROJECT_REQ, GET_ALL_USERS_REQ, GET_ALL_USERS_OF_PROJECT_REQ, DELETE_USER_OF_PROJECT_REQ, RESET_DELETE_USER_OF_PROJECT} from '../../../redux/users/constants';
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

import PersonAddIcon from '@material-ui/icons/PersonAdd';


function mapStateToProps(state) {
  return {
    user: state.user,
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
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
  }
}


const MemberListPage = (props) => {
  //const {classes} = props;

  const {listUsersOfProject, user, project, getAllUserOfProjectReq, displayMsg, insDeleteMember, deleteUserOfProject, resetDelUserOfProjectRedux, role} = props;

  const [openDialog,setOpenDialog] = useState(false);

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


  const handleChangeConditions = (props, data) => {
    setConditions({...searchConditions, [props]: data });
  }

  const searchMember = () =>{

  }

  useEffect(()=>{
  },[]);

  useEffect(()=>{    
      handleArray();
  },[listUsersOfProject])

  useEffect(()=>{
    if(user.success === true)
      setListMember(array);
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
    user.success = "";
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
      user.success = true;
      resetDelUserOfProjectRedux();
    } else if (insDeleteMember?.sucess === true) {
      displayMsg({
        content: "Removed user from project successfully !",
        type: 'success'
      });
      getAllUserOfProjectReq(project);
      resetDelUserOfProjectRedux();
    }
  },[insDeleteMember?.sucess])

  // <-- delete member 
  return(
    <div>
      <Helmet title=" Mantis Account Management" />
      <NewMemberDialog isOpen={openDialog} openMethod={setOpenDialog}/>
      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Mantis Account Management
          </Typography>

        </Grid>
        <Grid item>
          <div>
          {(role === 'Project Manager' || role === 'Test Lead') && <Button variant="contained" color="primary" onClick={handleClickNewMemberDialog} startIcon={<PersonAddIcon/>}>
              Create new account
            </Button>}
          </div>
          <Grid item>
          {(role === 'Project Manager' || role === 'Test Lead') &&
                <Dialog open={open} >
                  <DialogTitle>Confirm</DialogTitle>
                  <DialogContent>Are you sure you want to remove this user from project?</DialogContent>
                  <DialogActions>
            <Button onClick={handleDelMember} color="primary">Yes </Button>
                    <Button onClick={handleCloseDelMember} color="primary">No</Button>
                  </DialogActions>
                </Dialog>}

                {(role === 'Tester') &&
                <Dialog open={open} >
                  <DialogTitle>Remove member</DialogTitle>
                  <DialogContent>Do not allow Tester role !</DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDelMember} color="primary">OK</Button>
                  </DialogActions>
                </Dialog>}

                
            </Grid>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
           {/* Load bar */}
           {user.success !== true ? <EnhancedTable
            rows={[]}
            headerList = {MANTIS_HEADER}
            conditions={MANTIS_SEARCH}
            type='member'
            load={user.success}
          />
          :<EnhancedTable
            rows={listMember}
            headerList = {MANTIS_HEADER}
            conditions={MANTIS_SEARCH}
            setConditions={handleChangeConditions}
            searchMethod={searchMember}
            handleDefaultDeleteAction={deleteMember}
            type='member'
            load={user.success}
          />}
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(MemberListPage));

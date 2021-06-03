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
import {ADD_USERS_TO_PROJECT_REQ, GET_ALL_USERS_REQ, GET_ALL_USERS_OF_PROJECT_REQ} from '../../../redux/users/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
import {
  Grid,
  Typography,
  Divider,
  Button
} from '@material-ui/core';

import {
  Add as AddIcon,
} from "@material-ui/icons";


// const NavLink = React.forwardRef((props, ref) => (
//   <RouterNavLink innerRef={ref} {...props} />
// ));

function mapStateToProps(state) {
  return {
    listUsers: state.user.listUsers,
    listUsersOfProject: state.user.listUsersOfProject,
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


const MemberListPage = (props) => {
  const {classes} = props;

  const {listUsers, listUsersOfProject, addUserToProjectReq, project, getAllUserReq, getAllUserOfProjectReq, displayMsg} = props;


  const [openDialog,setOpenDialog] = useState(false);

  const [openRoleDialog,setOpenRoleDialog] = useState(false);

  const [searchConditions, setConditions] = useState({
    username: '',
    role: -1
  });

  const history = useHistory();

  const [array, setArray] = React.useState([]);

  const [listMember, setListMember] = React.useState([]);

  const [selected,setSelected] = useState({});

  const handleArray = () => {   
    if(listUsersOfProject !== undefined){
      setArray([]);
      for(let i in listUsersOfProject){
        setArray(array => [...array, { 
          id: listUsersOfProject[i]._id,
          name: listUsersOfProject[i].username,
          role: listUsersOfProject[i].role
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
  },[listUsersOfProject])

  useEffect(()=>{
    setListMember(array)
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
            <Button variant="contained" color="primary" onClick={handleClickNewMemberDialog}>
              <AddIcon />
              Invite collaborator
            </Button>
          </div>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable
            rows={listMember}
            headerList = {MEMBERS_HEADERS}
            viewAction={handleOpenChangeRole}
            conditions={MEMBER_SEARCH}
            setConditions={handleChangeConditions}
            searchMethod={searchMember}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(MemberListPage));

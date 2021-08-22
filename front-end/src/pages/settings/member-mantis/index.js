import React, {useState, useEffect} from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import EnhancedTable from '../../../components/Table/index';
import ChangeRolePopup from './ChangeRolePopup';
import Helmet from 'react-helmet';
import {MANTIS_HEADER} from '../../../components/Table/DefineHeader';
import {MANTIS_SEARCH} from '../../../components/Table/DefineSearch';
import NewMemberDialog from './InviteMemberMantis';
import {ADD_MEMBERMANTIS_REQ, GET_ALL_USERS_REQ, GET_ALL_MEMBERMANTIS_REQ, DELETE_MEMBERMANTIS_REQ, RESET_DELETE_MEMBERMANTIS} from '../../../redux/users/constants';
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
    user: state.user,
    listUsers: state.user.listUsers,
    listMemberMantis: state.user.listMemberMantis,
    project: state.project.currentSelectedProject,
    insDeleteMemberMantis: state.user.insDeleteMemberMantis,
    role: state.project.currentRole,
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    addMemberMantisReq: (payload) => dispatch({ type: ADD_MEMBERMANTIS_REQ, payload }),
    getAllUserReq: (payload) => dispatch({ type: GET_ALL_USERS_REQ, payload}),
    getAllMemberMantisReq: (payload) => dispatch({ type: GET_ALL_MEMBERMANTIS_REQ, payload}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    deleteMemberMantis: (payload) => dispatch({ type: DELETE_MEMBERMANTIS_REQ, payload }),
    resetDelMemberMantisRedux: () => dispatch({ type: RESET_DELETE_MEMBERMANTIS})
  }
}


const MemberListPage = (props) => {
  //const {classes} = props;

  const {listMemberMantis, user, project, getAllMemberMantisReq, listUsers, addMemberMantisReq, getAllUserReq, displayMsg, insDeleteMemberMantis, deleteMemberMantis, resetDelMemberMantisRedux, role} = props;

  const [openDialog,setOpenDialog] = useState(false);

  const [openRoleDialog,setOpenRoleDialog] = useState(false);

  const [searchConditions, setConditions] = useState({
    username_mantis: '',
    role_mantis: -1
  });

  const [open, setOpen] = useState(false);
  const [delMember, setDelMember] = useState({
    projectid: project,
    username: '',
    email: '',
    access_level: '',
  });

  //const history = useHistory();

  const [array, setArray] = React.useState([]);

  const [listMember, setListMember] = React.useState([]);

  const [selected,setSelected] = useState({});

  const handleArray = () => {   
    if(listMemberMantis !== undefined){      
      for(let i in listMemberMantis){
        setArray(array => [...array, { 
          //_id: listMemberMantis[i].user,
          username_mantis: listMemberMantis[i].username_mantis,
          role_mantis: listMemberMantis[i].role_mantis,
          email: listMemberMantis[i].email,
          projectid: project,
          is_active_backend: listMemberMantis[i].is_active_backend === true ? "Yes":"No",
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
    user.successMantis = "";
    getAllMemberMantisReq(project);
  },[]);

  useEffect(()=>{
    if(user.successMantis === true){
      setArray([]);
      setTimeout(handleArray,50);
    }
  },[user.successMantis])

  useEffect(()=>{
    if(user.successMantis === true)
      setListMember(array);
    setOpenRoleDialog(false);
  },[array])

  useEffect(()=>{
    if (searchConditions.username_mantis === '' && searchConditions.role_mantis === -1){
      setListMember(array);
    } 
    else{
      if(searchConditions.role_mantis === -1)
      setListMember(array.filter((item) => {
        if(item.username_mantis.toLowerCase().includes(searchConditions.username_mantis.toLowerCase()))
          return array;}))
      else
      setListMember(array.filter((item) => {
        if(item.username_mantis.toLowerCase().includes(searchConditions.username_mantis.toLowerCase()) && searchConditions.role_mantis === item.role_mantis)
          return array;}))
    }
  },[searchConditions]);

  //delete member -->
  
  const deleteMember = (id) =>{
    setDelMember({...delMember, username: id.username_mantis, email: id.email, access_level: id.role_mantis});
    setOpen(true);
  };
  
  const handleDelMember = () =>{    
    user.successMantis = "";
    deleteMemberMantis(delMember);
    setOpen(false);
  }

  const handleCloseDelMember = () =>{
    setOpen(false);
  }

  useEffect(()=>{
    if (insDeleteMemberMantis?.sucess === false){
      displayMsg({
        content: insDeleteMemberMantis.errMsg,
        type: 'error'
      });
      user.successMantis = true;
      resetDelMemberMantisRedux();
    } else if (insDeleteMemberMantis?.sucess === true) {
      displayMsg({
        content: "Removed member from mantis successfully !",
        type: 'success'
      });
      getAllMemberMantisReq(project);
      resetDelMemberMantisRedux();
    }
  },[insDeleteMemberMantis?.sucess])


  useEffect(()=>{
    if (user?.successMantis === null && user.error === true) {
      displayMsg({
        content: user.errorMsg,
        type: 'error'
      });        
    }
  },[user?.error]);  

  // <-- delete member 
  return(
    <div>
      <ChangeRolePopup/>
      <Helmet title="Mantis Members Management" />
      <ChangeRolePopup isOpen={openRoleDialog} openMethod={setOpenRoleDialog} selected={selected}/>
      <NewMemberDialog isOpen={openDialog} openMethod={setOpenDialog}/>
      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Members Mantis
          </Typography>

        </Grid>
        <Grid item>
          <div>
          {(role === 'Project Manager' || role === 'Test Lead') && <Button variant="contained" color="primary" onClick={handleClickNewMemberDialog} startIcon={<PersonAddIcon/>}>
              Invite member mantis
            </Button>}
          </div>
          <Grid item>
          {(role === 'Project Manager' || role === 'Test Lead') &&
                <Dialog open={open} >
                  <DialogTitle>Confirm</DialogTitle>
                  <DialogContent>Are you sure you want to remove this member from mantis?</DialogContent>
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
           {user.successMantis === true ? 
          <EnhancedTable
            rows={listMember}
            headerList = {MANTIS_HEADER}
            viewAction={handleOpenChangeRole}
            conditions={MANTIS_SEARCH}
            setConditions={handleChangeConditions}
            searchMethod={searchMember}
            handleDefaultDeleteAction={deleteMember}
            type='membermantis'
            load={user.successMantis}
          />:
          <EnhancedTable
            rows={[]}
            headerList = {MANTIS_HEADER}
            //conditions={MANTIS_SEARCH}
            type='membermantis'
            load={user.successMantis}
          />}
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(MemberListPage));

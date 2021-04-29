import React, {useState, useEffect} from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import EnhancedTable from '../../../components/Table/index';
import Helmet from 'react-helmet';
import {MEMBERS_HEADERS} from '../../../components/Table/DefineHeader';
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

  const history = useHistory();

  const [array, setArray] = React.useState([]);

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

  const navigateToDetailPage = (params) => {
    if (params)
      history.push(window.location.pathname+"/"+params);
  }

  useEffect(()=>{
    getAllUserOfProjectReq(project);
    setArray([]);
  },[]);

  useEffect(()=>{
    handleArray();
  },[listUsersOfProject])


  return(
    <div>

      <Helmet title="Service Management" />
      <NewMemberDialog isOpen={openDialog} openMethod={setOpenDialog}/>
      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Members
          </Typography>

          {/* <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} exact to="/">
              Dashboard
            </Link>
            <Link component={NavLink} exact to="/">
              Pages
            </Link>
            <Typography>Invoices</Typography>
          </Breadcrumbs> */}
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
            rows={array}
            headerList = {MEMBERS_HEADERS}
            viewAction={navigateToDetailPage}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(MemberListPage));

import React, {useEffect, useState} from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import EnhancedTable from '../../../components/Table/index';
import Helmet from 'react-helmet';
import {REQUIREMENTS_HEADER} from '../../../components/Table/DefineHeader';
import {REQUIREMENT_SEARCH} from '../../../components/Table/DefineSearch';
import { connect } from 'react-redux';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import {ADD_NEW_REQUIREMENTS_REQ, GET_ALL_REQUIREMENTS_REQ, DELETE_REQUIREMENTS_REQ, RESET_DELETE_REQUIREMENTS} from '../../../redux/requirements/constants';

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

//MAP STATES TO PROPS - REDUX
function mapStateToProps(state) {
  return {
    requirements: state.requirements,
    listRequirements: state.requirements.listRequirements,
    project: state.project.currentSelectedProject,
    role: state.project.currentRole,
    insRequirementsDelete: state.requirements.insRequirementsDelete
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    addNewRequirementsReq: (payload) => dispatch({ type: ADD_NEW_REQUIREMENTS_REQ, payload }),
    getAllRequirementsReq: (payload) => dispatch({ type: GET_ALL_REQUIREMENTS_REQ, payload}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    deleteRequirementsReq: (payload) => dispatch({ type: DELETE_REQUIREMENTS_REQ, payload }),
    resetDeleteRedux: () => dispatch({type: RESET_DELETE_REQUIREMENTS})
  }
}


const RequirementListPage = (props) => {
  //const {classes} = props;

  const {listRequirements, requirements, getAllRequirementsReq, project, role, deleteRequirementsReq, resetDeleteRedux, insRequirementsDelete, displayMsg} = props;

  const [array, setArray] = React.useState(listRequirements);

  //delete TP dialog
  const [open, setOpen] = React.useState(false);

  //Delete TP infor
  const [requirementsInfor, setRequirementsInfor] = React.useState({
    requirementsid: '',
    projectid: project
  });

  const [searchConditions, setConditions] = useState({
    requirementName: '',
    active: -1
  });   

  const history = useHistory();


  const handleClickNewRequirements = () => {
    history.push({pathname: window.location.pathname+"/new-requirement",});
  }

  const navigateToDetailPage = () => {
      history.push(window.location.pathname+"/requirement-detail");
  }


  const searchRequirements = () => {
    if (searchConditions.active === -1 && searchConditions.requirementName === ''){
      setArray(listRequirements);
    } 
    else{
      if(searchConditions.active === -1)
        setArray(listRequirements.filter((item) => {
          if(item.projectrequirementname.toLowerCase().includes(searchConditions.requirementName.toLowerCase()))
            return listRequirements;}))
      else
        setArray(listRequirements.filter((item) => {
          if(item.projectrequirementname.toLowerCase().includes(searchConditions.requirementName.toLowerCase()) && searchConditions.active === item.is_active)
            return listRequirements;}))
    }
  }

  useEffect(()=>{
    requirements.success = "";
    getAllRequirementsReq(project);
  },[])


  useEffect(()=>{
    if(requirements.success === true)
      setArray(listRequirements);
  },[listRequirements])

  const handleChangeConditions = (props, data) => {
    setConditions({...searchConditions, [props]: data });
  }

  useEffect(()=>{ 
    if (searchConditions.active === -1 && searchConditions.requirementName === ''){
      setArray(listRequirements);
    } 
    else{
      if(searchConditions.active === -1)
      setArray(listRequirements.filter((item) => {
        if(item.projectrequirementname.toLowerCase().includes(searchConditions.requirementName.toLowerCase()))
          return listRequirements;}))
      else
      setArray(listRequirements.filter((item) => {
        if(item.projectrequirementname.toLowerCase().includes(searchConditions.requirementName.toLowerCase()) && searchConditions.active === item.is_active)
          return listRequirements;}))
    }
  },[searchConditions]);
  // --> delete TP
  try {
    useEffect(()=>{
      if (insRequirementsDelete.sucess === false){
        displayMsg({
          content: insRequirementsDelete.errMsg,
          type: 'error'
        });
        requirements.success = true;
        resetDeleteRedux();
      } else if (insRequirementsDelete.sucess === true) {
        displayMsg({
          content: "Delete requirement successfully !",
          type: 'success'
        });
        getAllRequirementsReq(project);
        resetDeleteRedux();
      }
    },[insRequirementsDelete.sucess]);      
  } catch (error) {
    //console.log('error: '+error);
  }

    const deleteTP = (id) => {
      setRequirementsInfor({...requirementsInfor, requirementsid: id});
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleDelete=()=>{
      requirements.success = "";
      deleteRequirementsReq(requirementsInfor);
      setOpen(false);
    };
  // <-- delete TP


  return(
    <div>

      <Helmet title="Requirements Management" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Requirements List
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
          {(role === 'Project Manager' || role === 'Test Lead') &&
           <Button variant="contained" color="primary" onClick={handleClickNewRequirements}>
              <AddIcon />
              New Requirement
            </Button>}
          </div>
          {/* Delete TP dialog */}
          <Grid item>
          {(role === 'Project Manager' || role === 'Test Lead') &&
                <Dialog open={open} >
                  <DialogTitle>Confirm</DialogTitle>
                  <DialogContent>Are you sure want to delete this requirement?</DialogContent>
                  <DialogActions>
                    <Button onClick={handleDelete} color="primary">Yes</Button>
                    <Button onClick={handleClose} color="primary">No</Button>
                  </DialogActions>
                </Dialog>}

                {(role === 'Tester') &&
                <Dialog open={open} >
                  <DialogTitle>Delete</DialogTitle>
                  <DialogContent>Do not allow Tester role !</DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">OK</Button>
                  </DialogActions>
                </Dialog>}
          </Grid>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
        {requirements.success === true ? 
          <EnhancedTable
            rows={array}
            headerList = {REQUIREMENTS_HEADER}
            onClick={navigateToDetailPage}
            conditions={REQUIREMENT_SEARCH}
            setConditions={handleChangeConditions}
            searchMethod={searchRequirements}
            handleDefaultDeleteAction={deleteTP}
            type='requirements'
            load={requirements.success}
          />
          : <EnhancedTable
          rows={[]}
          headerList = {REQUIREMENTS_HEADER}
          //conditions={REQUIREMENT_SEARCH}
          type='requirements'
          load={requirements.success}
        />}
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(RequirementListPage));

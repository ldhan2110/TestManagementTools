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
import LinearProgress from '@material-ui/core/LinearProgress';

//MAP STATES TO PROPS - REDUX
function mapStateToProps(state) {
  return {
    listBuilds: state.build.listBuilds,
    project: state.project.currentSelectedProject,
    listTestPlan: state.testplan.listActiveTestplan,
    role: state.project.currentRole,
    insBuildsDelete: state.build.insBuildsDelete
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
  }
}


const RequirementListPage = (props) => {

  const history = useHistory();

  //const {classes} = props;

  const {displayMsg} = props;

  const handleClickNewRequirements = () => {
    history.push({pathname: window.location.pathname+"/new-requirement",});
  }

  const navigateToDetailPage = () => {
      history.push(window.location.pathname+"/requirement-detail");
  }


  const handleChangeConditions = (props, data) => {
    
  }

  // --> delete TP

  const deleteBuild = (id) => {
    
  };
 
  const handleDelete=()=>{
    
  };


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
           <Button variant="contained" color="primary" onClick={handleClickNewRequirements}>
              <AddIcon />
              New Requirement
            </Button>
          </div>
          {/* Delete TP dialog */}
          {/* <Grid item>
                <Dialog open={open} >
                  <DialogTitle>Confirm</DialogTitle>
                  <DialogContent>Are you sure want to delete this requirement?</DialogContent>
                  <DialogActions>
                  <Button onClick={handleDelete} color="primary">Yes</Button>
                    <Button onClick={handleClose} color="primary">No</Button>
                  </DialogActions>
                </Dialog>}
              
                <Dialog open={open} >
                  <DialogTitle>Delete</DialogTitle>
                  <DialogContent>Do not allow Tester role !</DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">OK</Button>
                  </DialogActions>
                </Dialog>
          </Grid> */}
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable
            rows={[]}
            headerList = {REQUIREMENTS_HEADER}
            onClick={navigateToDetailPage}
            conditions={REQUIREMENT_SEARCH}
            setConditions={handleChangeConditions}
            //searchMethod={searchRequirements}
            type='requirements'
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(RequirementListPage));

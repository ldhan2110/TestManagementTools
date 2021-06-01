import React, { useEffect, useState } from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import EnhancedTable from '../../../components/Table/index';
import Helmet from 'react-helmet';
import {TEST_PLAN_HEADERS} from '../../../components/Table/DefineHeader';
import {TEST_PLANS_SEARCH} from '../../../components/Table/DefineSearch';
import {ADD_NEW_TESTPLAN_REQ, GET_ALL_TESTPLAN_REQ} from '../../../redux/test-plan/constants';
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



//MAP STATES TO PROPS - REDUX
function mapStateToProps(state) {
  return {
    listTestplan: state.testplan.listTestplan,
    project: state.project.currentSelectedProject
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    addNewTestplanReq: (payload) => dispatch({ type: ADD_NEW_TESTPLAN_REQ, payload }),
    getAllTestplanReq: (payload) => dispatch({ type: GET_ALL_TESTPLAN_REQ, payload}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload })
  }
}


const TestPlanListPage = (props) => {
  const {classes} = props;

  const {listTestplan, getAllTestplanReq, project} = props;

  const [array, setArray] = React.useState(listTestplan);

  const [searchConditions, setConditions] = useState({
    testplanName: '',
    active: -1
  });

  const history = useHistory();

  const handleClickNewTestPlan = () => {
    console.log('array before: ');
    history.push({
      pathname: window.location.pathname+"/create-test-plan",
      state: array});
  }

  const navigateToDetailPage = (params) => {
    if (params)
      history.push(window.location.pathname+"/"+params);
  }

  const searchTestPlan = () => {
    console.log(searchConditions);
    if (searchConditions.active === -1 && searchConditions.testplanName === ''){
      setArray(listTestplan);
    } 
    else{
      if(searchConditions.active === -1)
        setArray(listTestplan.filter((item) => {
          if(item.testplanname.toLowerCase().includes(searchConditions.testplanName.toLowerCase()))
            return listTestplan;}))
      else
        setArray(listTestplan.filter((item) => {
          if(item.testplanname.toLowerCase().includes(searchConditions.testplanName.toLowerCase()) && searchConditions.active === item.is_active)
            return listTestplan;}))
    }
  }

  useEffect(()=>{
    getAllTestplanReq(project);
  },[])

  useEffect(()=>{
    setArray(listTestplan);
  },[listTestplan])

  const handleChangeConditions = (props, data) => {
    setConditions({...searchConditions, [props]: data });
  }

  useEffect(()=>{ 
    console.log('keyword: '+searchConditions.testplanName + '   ' + searchConditions.active);
    if (searchConditions.active === -1 && searchConditions.testplanName === ''){
      setArray(listTestplan);
    } 
    else{
      console.log('not empty');
      if(searchConditions.active === -1)
      setArray(listTestplan.filter((item) => {
        if(item.testplanname.toLowerCase().includes(searchConditions.testplanName.toLowerCase()))
          return listTestplan;}))
      else
      setArray(listTestplan.filter((item) => {
        if(item.testplanname.toLowerCase().includes(searchConditions.testplanName.toLowerCase()) && searchConditions.active === item.is_active)
          return listTestplan;}))
    }
  },[searchConditions]);
  

  return(
    <div>

      <Helmet title="Service Management" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Test Plan List
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
            <Button variant="contained" color="primary" onClick={handleClickNewTestPlan}>
              <AddIcon />
              New Test Plan
            </Button>
          </div>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable
            rows={array}
            headerList = {TEST_PLAN_HEADERS}
            conditions={TEST_PLANS_SEARCH}
            setConditions={handleChangeConditions}
            searchMethod={searchTestPlan}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(TestPlanListPage));
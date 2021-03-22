import React, { useEffect } from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import EnhancedTable from '../../../components/Table/index';
import Helmet from 'react-helmet';
import {TEST_PLAN_HEADERS} from '../../../components/Table/DefineHeader';
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


// const NavLink = React.forwardRef((props, ref) => (
//   <RouterNavLink innerRef={ref} {...props} />
// ));

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { listTestplan: state.testplan.listTestplan, 
                    project:state.project.currentSelectedProject }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    addNewTestplanReq: (payload) => dispatch({ type: ADD_NEW_TESTPLAN_REQ, payload }),
    getAllTestplanReq: (payload) => dispatch({ type: GET_ALL_TESTPLAN_REQ, payload}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload })
  }
}



function createData(_id, testplanname, description, status, created_date) {
  console.log({_id, testplanname, description, status, created_date});
  return {_id, testplanname, description, status, created_date};
}

const rows = [
  createData('#1001', 'Test Plan Zero', 'Adsadsadasdsa', 0,   '2020-01-02'),
  createData('#1002', 'Test Plan Zero', 'Adsadsadas', 1,   '2020-01-02'),
  createData('#1003', 'Test Plan Zero', 'Adsadas', 1,   '2020-01-02'),
  createData('#1004', 'Test Plan Zero', 'Adsdada', 0,   '2020-01-02'),
  createData('#1005', 'Test Plan Zero', 'Adsadas', 1,   '2020-01-02'),
  createData('#1006', 'Test Plan Zero', 'Adsada', 1,   '2020-01-02'),
  createData('#1007', 'Test Plan Zero', 'Adsada', 0,   '2020-01-02'),
  createData('#1008', 'Test Plan Zero', 'Adsad', 1,   '2020-01-02'),
  createData('#1009', 'Test Plan Zero', 'Adsa', 0,   '2020-01-02'),
  createData('#1010', 'Test Plan Zero', 'Adsa', 1,   '2020-01-02'),
  createData('#1011', 'Test Plan Zero', 'Adsa', 0,   '2020-01-02'),
  createData('#1012', 'Test Plan Zero', 'Adsa', 1,   '2020-01-02'),
  createData('#1013', 'Test Plan Zero', 'Adsa', 1,   '2020-01-02'),

];

const headCells = [
  { id: '_id', alignment: 'left', label: 'ID' },
  { id: 'testplanname', alignment: 'left', label: 'Name' },
  { id: 'description', alignment: 'left', label: 'Description' },
  { id: 'status', alignment: 'left', label: 'Status' },
  { id: 'created_date', alignment: 'left', label: 'Create Date' },
  { id: 'actions', alignment: 'left', label: 'Actions' },
];


const TestPlanListPage = (props) => {
  const {classes} = props;

  const {listTestplan, getAllTestplanReq, project} = props;

  const history = useHistory();

  const handleClickNewTestPlan = () => {
    history.push(window.location.pathname+"/create-test-plan");
  }

  const navigateToDetailPage = (params) => {
    if (params)
      history.push(window.location.pathname+"/"+params);
  }

  useEffect(()=>{
    getAllTestplanReq(project);

  },[])

  useEffect(()=>{
    console.log(listTestplan);
  },[listTestplan])

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
            rows={rows}
            headerList = {TEST_PLAN_HEADERS}
            viewAction={navigateToDetailPage}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(TestPlanListPage));
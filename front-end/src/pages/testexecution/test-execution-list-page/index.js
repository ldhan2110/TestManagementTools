import React, { useEffect } from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import EnhancedTable from '../../../components/Table/index';
import Helmet from 'react-helmet';
import {TEST_EXECUTION_HEADERS} from '../../../components/Table/DefineHeader';
import { GET_ALL_TESTEXEC_REQ} from '../../../redux/test-execution/constants';
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
function mapStateToProps(state) {
  return {
    listTestExec: state.testexec.listTestExec
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    //addNewBuildReq: (payload) => dispatch({ type: ADD_NEW_BUILD_REQ, payload }),
    getAllTestExecReq: () => dispatch({ type: GET_ALL_TESTEXEC_REQ}),
  }
}



function createData(id, name, description, status, testexecutiontime, testdate) {
  return { id, name, description, status, testexecutiontime, testdate };
}

const rows = [
  createData('#1001', 'Test Execution Zero', 'Adsadsadasdsa', 2, '00:06:25', '2020-01-02'),
  createData('#1002', 'Test Execution Zero', 'Adsadsadas', 4, '00:06:25', '2020-01-02'),
  createData('#1003', 'Test Execution Zero', 'Adsadas', 3, '00:06:25', '2020-01-02'),
  createData('#1004', 'Test Execution Zero', 'Adsdada', 2, '00:06:25', '2020-01-02'),
  createData('#1005', 'Test Execution Zero', 'Adsadas', 2, '00:06:25', '2020-01-02'),
  createData('#1006', 'Test Execution Zero', 'Adsada', 4, '00:06:25', '2020-01-02'),
  createData('#1007', 'Test Execution Zero', 'Adsada', 3, '00:06:25', '2020-01-02'),
  createData('#1008', 'Test Execution Zero', 'Adsad', 2, '00:06:25', '2020-01-02'),
  createData('#1009', 'Test Execution Zero', 'Adsa', 4, '00:06:25', '2020-01-02'),
  createData('#1010', 'Test Execution Zero', 'Adsa', 3, '00:06:25', '2020-01-02'),
  createData('#1011', 'Test Execution Zero', 'Adsa', 2, '00:06:25', '2020-01-02'),
  createData('#1012', 'Test Execution Zero', 'Adsa', 4,'00:06:25', '2020-01-02'),
  createData('#1013', 'Test Execution Zero', 'Adsa', 2, '00:06:25', '2020-01-02'),
];

// const headerCells = [
//   { id: 'id', alignment: 'left', label: 'ID' },
//   { id: 'name', alignment: 'left', label: 'Name' },
//   { id: 'description', alignment: 'left', label: 'Description' },
//   { id: 'status', alignment: 'left', label: 'Status' },
//   { id: 'testexecutiontime', alignment: 'left', label: 'Test Execution Time' },
//   { id: 'testdate', alignment: 'left', label: 'Test Date' },
//   { id: 'actions', alignment: 'left', label: 'Actions' },
// ];


const TestExecutionListPage = (props) => {
  const {classes} = props;

  const {listTestExec, getAllTestExecReq} = props;

  const history = useHistory();

  const handleClickNewTestExecution = () => {
    history.push(window.location.pathname+"/create-test-execution");
  }

  const navigateToDetailPage = (params) => {
    if (params)
      history.push(window.location.pathname+"/"+params);
  }

  useEffect(()=>{
    getAllTestExecReq();
  },[]);

  useEffect(()=>{
    console.log(listTestExec);
  },[listTestExec]);

  return(
    <div>

      <Helmet title="Service Management" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Test Execution List
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
            <Button variant="contained" color="primary" onClick={handleClickNewTestExecution}>
              <AddIcon />
              New Test Execution
            </Button>
          </div>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable
            rows={rows}
            headerList = {TEST_EXECUTION_HEADERS}
            viewAction={navigateToDetailPage}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TestExecutionListPage));
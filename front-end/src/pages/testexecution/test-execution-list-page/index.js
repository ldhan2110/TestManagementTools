import React, { useEffect, useState } from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import EnhancedTable from '../../../components/Table/index';
import Helmet from 'react-helmet';
import {TEST_EXECUTION_HEADERS} from '../../../components/Table/DefineHeader';
import {TEST_EXEC_SEARCH} from '../../../components/Table/DefineSearch';
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



const TestExecutionListPage = (props) => {
  const {classes} = props;

  const {listTestExec, getAllTestExecReq} = props;

  const [listTestexec, setListTestExec] = useState([]);

  const [searchConditions, setConditions] = useState({
    username: '',
    role: ''
  });

  const history = useHistory();

  const handleClickNewTestExecution = () => {
    history.push(window.location.pathname+"/create-test-execution");
  }

  const navigateToDetailPage = (params) => {
    if (params){
      history.push(window.location.pathname+"/"+params);
    }
  }

  const searchTestExec = () =>{

  }

  const handleChangeConditions = (props, data) => {
    setConditions({...searchConditions, [props]: data });
  }

  useEffect(()=>{
    getAllTestExecReq();
  },[]);

  useEffect(()=>{
    var tempArr = [];
    listTestExec.forEach((item)=>{
      tempArr.push({_id: item._id, status: item.status, testexecutionname: item.testexecutionname, description: item.description, tester: item.tester.username, testplanname: item.testplan.testplanname })
    });
    setListTestExec(tempArr);
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
            rows={listTestexec}
            headerList = {TEST_EXECUTION_HEADERS}
            viewAction={navigateToDetailPage}
            conditions={TEST_EXEC_SEARCH}
            setConditions={handleChangeConditions}
            searchMethod={searchTestExec}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TestExecutionListPage));
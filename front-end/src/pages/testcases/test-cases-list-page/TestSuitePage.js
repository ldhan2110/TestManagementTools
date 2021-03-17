import React, { useState, useEffect } from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Helmet from 'react-helmet';
import EnhancedTable from '../../../components/Table/index';
import {TEST_SUITE_DETAIL_HEADERS} from '../../../components/Table/DefineHeader';
import {
  Grid,
  Typography,
  Divider,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@material-ui/core';

const TestSuiteDetail = (props) => {
  const {node} = props;
  
  const [testSuite, setTestSuite] = useState({
    name: '',
    description: '',
    children: [],
  });

  useEffect(()=>{
    if (node){
      setTestSuite({
        ...testSuite,
        name: node.name,
        children: node.children
      });
    }
  },[node])

  return(
    <React.Fragment>
      <Grid container spacing={3} >
        <Grid item xs={12}>
            <Typography variant="h4" gutterBottom display="inline">
                Test Suite Detail
            </Typography>
            <Divider/>
        </Grid>
        
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}><TextField id="testSuiteName" label="Test Suite Name" variant="outlined"  value={testSuite.name} fullWidth required/></Grid>
            <Grid item xs={12}><TextField id="description" label="Description" variant="outlined"  fullWidth required/></Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} style={{marginTop: '17vh'}}>
          <Typography variant="h6" gutterBottom display="inline">
                Detail
          </Typography>
          <Divider/>
        </Grid>

        <Grid item xs={12}>
          <EnhancedTable
            rows={testSuite.children}
            headerList = {TEST_SUITE_DETAIL_HEADERS}
            //viewAction={navigateToDetailPage}
          />
        </Grid>

      </Grid>
    </React.Fragment>
  )
}

export default TestSuiteDetail;
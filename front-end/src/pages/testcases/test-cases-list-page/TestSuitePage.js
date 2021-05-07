import React, { useState, useEffect } from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Helmet from 'react-helmet';
import EnhancedTable from '../../../components/Table/index';
import NewTestSuitePopup from '../new-test-suite-page/index';
import {TEST_SUITE_DETAIL_HEADERS} from '../../../components/Table/DefineHeader';
import { connect } from 'react-redux';
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

import {
  Add as AddIcon,
} from "@material-ui/icons";
import SelectTestCasePopup from "../select-test-case-page";


//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { 
    listTestsuite: state.testcase.listTestsuite
   }
}

const TestSuiteDetail = (props) => {
  const {node, listTestsuite} = props;
  
  const [testSuite, setTestSuite] = useState({
    id: '',
    name: '',
    description: '',
    children: [],
  });

  const [openNewTS, setOpenTS] = useState(false);

  const [openNewTC, setOpenTC] = useState(false);


  const history = useHistory();

  useEffect(()=>{
    if (node){
      setTestSuite({
        ...node,
        id: node.id,
        name: node.name,
        description: node.description,
        children: node.children
      });
    }
  },[node])

  const handleOpenTS = ()=>{
    setOpenTS(true);
  }

  const handleOpenTC = ()=>{
    history.push(window.location.pathname+"/"+node.name+"/new-test-case");
  }

  return(
    <React.Fragment>
      <NewTestSuitePopup isOpen={openNewTS} setOpen={setOpenTS} selected={node.type !== 'root' ? node.name : ''}/>
      {/* <SelectTestCasePopup isOpen={openNewTS} setOpen = {setOpenTS}/> */}
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
            <Grid item xs={12}><TextField id="description" label="Description" variant="outlined"  value={testSuite.description} fullWidth required/></Grid>
            <Grid item xs={12}>
                  <FormControl variant="outlined"  fullWidth>
                              <InputLabel id="testSuite">Test Suite</InputLabel>
                                <Select
                                  labelId="testSuite"
                                  id="testSuite"
                                  //value={age}
                                  //onChange={handleChange}
                                  label="Test Suite"
                                  disabled={testSuite.type === "root" ? true : false}
                                >
                                  <MenuItem value=''>root</MenuItem>
                                  {listTestsuite.map((item) => (
                                    <MenuItem value={item.name}>{item.name}</MenuItem>
                                  ))}
                              </Select>
                  </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} style={{marginTop: '17vh'}}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom display="inline">Detail</Typography>
              </Grid>

              <Grid item xs={6}> 
                {testSuite.type !== "root" ?
                <Grid container spacing={1} justify='flex-end'>
                   <Grid item>
                    <Button variant="contained" color="primary" onClick={handleOpenTC} >
                      <AddIcon />Add Test Case
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button variant="contained" color="secondary" onClick={handleOpenTS}>
                      <AddIcon />Add Test Suite
                    </Button> 
                  </Grid>
                </Grid>
                :
                <Grid container justify='flex-end'>
                  <Grid item>
                    <Button variant="contained" color="secondary" onClick={handleOpenTS}>
                      <AddIcon />Add Test Suite
                    </Button> 
                  </Grid>
                </Grid>
                }
              </Grid>

        
            </Grid>
            <Divider/>      
        </Grid>

        <Grid item xs={12}>
          <EnhancedTable
            rows={testSuite.children}
            headerList = {TEST_SUITE_DETAIL_HEADERS}
            //viewAction={navigateToDetailPage}
          />
        </Grid>
        

        <Grid item xs={12}>
          <Grid container justify ='flex-end'>
            <Grid item>
              <Button variant="contained" color="primary" fullWidth>Save</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default connect(mapStateToProps,null)(TestSuiteDetail);
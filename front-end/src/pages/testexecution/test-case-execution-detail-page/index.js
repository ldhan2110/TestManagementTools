import React, { useState, useEffect } from "react";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import DragList from '../../../components/DragList';
import Selectbox from '../../../components/Selectbox';
import {
  Grid,
  Typography,
  Divider,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  List, ListItem
} from '@material-ui/core';

import {
  Add as AddIcon,
} from "@material-ui/icons";

//MAP STATES TO PROPS - REDUX
function mapStateToProps(state) {
  return {
    listTestExec: state.testexec.listTestExec
  };
}

// //MAP DISPATCH ACTIONS TO PROPS - REDUX
// const mapDispatchToProps = dispatch => {
//   return {
//     //addNewBuildReq: (payload) => dispatch({ type: ADD_NEW_BUILD_REQ, payload }),
//     getAllTestExecReq: () => dispatch({ type: GET_ALL_TESTEXEC_REQ}),
//   }
// }

const TestCaseExecDetail = (props) => {
  const {listTestExec} = props;

  const [listData, setListData] = useState([
    {id: '1', name: '123', expectResult: 'Open Google'},
    {id: '2', name: '456', expectResult: 'Open Google'},
    {id: '3', name: '789', expectResult: 'Open Google'},
  ]);

  const filterTestCase = (execId, testcaseId) => {
    var subItem = null;
    const result =  listTestExec.find((item) => {
      if (item._id === execId){
        subItem = item.exectestcases.find(subItem => subItem._id === testcaseId);
      } 
    });

    return subItem;
  }
  
  const [testCaseDetail, setTestcaseDetail] = useState(filterTestCase(props.match.params.testExecutionId, props.match.params.id));


  useEffect(()=>{
    console.log(testCaseDetail);
  },[testCaseDetail])
  


  return(
    <React.Fragment>
      <Grid container spacing={3} >
        <Grid item xs={12}>
            <Typography variant="h4" gutterBottom display="inline">
                Test Case Detail
            </Typography>
            <Divider/>
        </Grid>
        
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}><TextField id="testSuiteName" label="Test Case Name" variant="outlined"  value={testCaseDetail.testcaseid.testcaseName} fullWidth required/></Grid>
            <Grid item xs={12}><TextField id="description" label="Description" variant="outlined"  value = {testCaseDetail.testcaseid.description} fullWidth required/></Grid>
            <Grid item xs={12}><TextField id="parent" label="Test Suite" variant="outlined"  fullWidth required/></Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField id="description" label="Importance" variant="outlined" value={testCaseDetail.testcaseid.priority}  fullWidth required/>
                </Grid>
                <Grid item xs={6}>
                  <TextField id="description" label="Type" variant="outlined"  fullWidth required/>
                </Grid>
                <Grid item xs={12}><TextField id="preCondition" label="Pre-condition" variant="outlined"  fullWidth multiline rows={3} rowsMax={3}/></Grid>
                <Grid item xs={12}><TextField id="postCondition" label="Post-condition" variant="outlined"  fullWidth multiline rows={3} rowsMax={3}/></Grid>
              </Grid>
              
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} style={{marginTop: '3.5vh'}}>
          <Typography variant="h6" gutterBottom display="inline">
                Steps Definition
          </Typography>
          <Divider/>
        </Grid>

        <Grid item xs={12}>
          <List style={{maxHeight: '100%', overflow: 'auto'}}>
            {testCaseDetail.testcaseid.listStep.map((item) => (
                    <ListItem key={item.id}>
                      <Grid container spacing={1}>
                        <Grid item style={{margin: 'auto 0'}}><div>{item.id}</div></Grid>
                        <Grid item xs={3}><TextField id="definition" variant="outlined" label='Definition' value={item.stepDefine} required  fullWidth multiline rows={3}/></Grid>
                        <Grid item xs={3}><TextField id="expectResult"  variant="outlined" label='Expected Result' required value={item.expectResult}  multiline fullWidth rows={3}/></Grid>
                        <Grid item xs={1}><FormControl variant="outlined" fullWidth>
                              <InputLabel id="type">Type</InputLabel>
                                <Select
                                  labelId="type"
                                  id="type"
                                  value={item.type}
                                  //onChange={handleChange}
                                  label="Type"
                                >
                               <MenuItem value='manual'><em>Manual</em></MenuItem>
                               <MenuItem value='auto'>Auto</MenuItem>
                              </Select>
                        </FormControl></Grid>
                        <Grid item xs={3}><TextField id="execNote"  variant="outlined" label='Execution Note' required  multiline fullWidth rows={3}/></Grid>
                        <Grid item xs={1}><FormControl variant="outlined" fullWidth>
                              <InputLabel id="type">Result</InputLabel>
                                <Select
                                  labelId="type"
                                  id="type"
                                  //value={age}
                                  //onChange={handleChange}
                                  label="Type"
                                >
                               <MenuItem value=""><em>Pass</em></MenuItem>
                               <MenuItem value={10}>Fail</MenuItem>
                              </Select>
                        </FormControl></Grid>
                      </Grid>
                    </ListItem>
                ))}
          </List>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom display="inline">
                Result
          </Typography>
          <Grid container justify='flex-end' styles={{display: 'inline'}}>
                <Grid item>
                    <Button variant="contained" color="primary" >
                      <AddIcon />Report Issue
                    </Button>
                </Grid>
          </Grid>
            <Divider/>
        </Grid>
        <Grid item xs={12}>
            <Selectbox labelTitle="Result" 
            value={testCaseDetail.status}
            listItems={[{value: 'Untest', title: 'Untest'},{value: 'Pass', title: 'Pass'},{value: 'Fail', title: 'Fail'},{value: 'Blocked', title: 'Blocked'},]}/>
        </Grid>


        <Grid item xs={12} style={{marginTop: 10}}>
          <Grid container justify ='space-between'>
            <Grid item>
              <Button variant="contained" color="primary" fullWidth>Previous Test Case</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" fullWidth>Next Test Case</Button>
            </Grid>
          </Grid>
        </Grid>
        
      </Grid>
    </React.Fragment>
  )
}

export default connect(mapStateToProps,null)(TestCaseExecDetail);
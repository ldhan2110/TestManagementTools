import React, { useState, useEffect } from "react";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Helmet from 'react-helmet';
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

const TestCaseExecDetail = (props) => {
  const {node} = props;

  const [listData, setListData] = useState([
    {id: '1', name: '123', expectResult: 'Open Google'},
    {id: '2', name: '456', expectResult: 'Open Google'},
    {id: '3', name: '789', expectResult: 'Open Google'},
  ]);
  
  const [testSuite, setTestSuite] = useState({
    name: '',
    description: '',
    children: [],
  });

  useEffect(()=>{
    console.log(listData);
  },[listData]);


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
            <Grid item xs={12}><TextField id="testSuiteName" label="Test Case Name" variant="outlined"  value={testSuite.name} fullWidth required/></Grid>
            <Grid item xs={12}><TextField id="description" label="Description" variant="outlined"  fullWidth required/></Grid>
            <Grid item xs={12}><TextField id="description" label="Test Suite" variant="outlined"  fullWidth required/></Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField id="description" label="Importance" variant="outlined"  fullWidth required/>
                </Grid>
                <Grid item xs={6}>
                  <TextField id="description" label="Type" variant="outlined"  fullWidth required/>
                </Grid>
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
            {listData.map((item) => (
                    <ListItem key={item.id}>
                      <Grid container spacing={1}>
                        <Grid item style={{margin: 'auto 0'}}><div>{item.id}</div></Grid>
                        <Grid item xs={4}><TextField id="definition" variant="outlined" label='Definition' required  fullWidth multiline  rows={3}/></Grid>
                        <Grid item xs={4}><TextField id="expectResult"  variant="outlined" label='Expected Result' required  multiline fullWidth rows={3}/></Grid>
                        <Grid item xs={2}><FormControl variant="outlined" fullWidth>
                              <InputLabel id="type">Type</InputLabel>
                                <Select
                                  labelId="type"
                                  id="type"
                                  //value={age}
                                  //onChange={handleChange}
                                  label="Type"
                                >
                               <MenuItem value=""><em>Manual</em></MenuItem>
                               <MenuItem value={10}>Auto</MenuItem>
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
            <Divider/>
        </Grid>
        <Grid item xs={12}>
            <Selectbox labelTitle="Result" listItems={[{value: '', title: 'Untested'},{value: 'Pass', title: 'Pass'},{value: 'Fail', title: 'Fail'},{value: 'Blocked', title: 'Blocked'},]}/>
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

export default TestCaseExecDetail;
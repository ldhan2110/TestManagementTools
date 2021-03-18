import React, { useState, useEffect } from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Helmet from 'react-helmet';
import DragList from '../../../components/DragList';
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

const TestCaseDetail = (props) => {
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
                Test Case Detail
            </Typography>
            <Divider/>
        </Grid>
        
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}><TextField id="testSuiteName" label="Test Case Name" variant="outlined"  value={testSuite.name} fullWidth required/></Grid>
            <Grid item xs={12}><TextField id="description" label="Description" variant="outlined"  fullWidth required/></Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                    <FormControl variant="outlined"  fullWidth>
                              <InputLabel id="Importance">Importance</InputLabel>
                                <Select
                                  labelId="Importance"
                                  id="Importance"
                                  //value={age}
                                  //onChange={handleChange}
                                  label="Importance"
                                >
                               <MenuItem value=""><em>Any</em></MenuItem>
                               <MenuItem value={10}>Low</MenuItem>
                               <MenuItem value={20}>Medium</MenuItem>
                               <MenuItem value={30}>High</MenuItem>
                              </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                <FormControl variant="outlined"  fullWidth>
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
                            </FormControl>
                </Grid>
              </Grid>
              
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} style={{marginTop: '10vh'}}>
          <Typography variant="h6" gutterBottom display="inline">
                Steps Definition
          </Typography>
          <Divider/>
        </Grid>

        <Grid item xs={12}>
          <DragList/>
        </Grid>

      </Grid>
    </React.Fragment>
  )
}

export default TestCaseDetail;
import React from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Helmet from 'react-helmet';
import TreeView from '../../../components/TreeView';
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

const TestCaseListPage = (props) => {
    const {classes} = props;
  
    const history = useHistory();
  
    const handleClickNewTestPlan = () => {
      history.push(window.location.pathname+"/create-test-plan");
    }
  
    const navigateToDetailPage = (params) => {
      if (params)
        history.push(window.location.pathname+"/"+params);
    }
  
    return(
      <div>
  
        <Helmet title="Service Management" />
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Grid container spacing={6} className={classes.contentContainer}>
                <Grid item xs ={3}>
                  <Grid container spacing={6}>
                    <Grid item xs={12}>
                      <Typography variant="h4" gutterBottom display="inline">
                        Filters
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField id="testCaseName" label="Test Case Name" variant="outlined"  fullWidth required/>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl} fullWidth>
                        <InputLabel id="testSuite">Test Suite</InputLabel>
                        <Select
                            labelId="testSuite"
                            id="testSuite"
                            //value={age}
                            //onChange={handleChange}
                            label="Test Suite"
                        >
                          <MenuItem value="">
                              <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>


                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                          <Grid item xs ={6}>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth>
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
                          <Grid item xs ={6}>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                              <InputLabel id="type">Type</InputLabel>
                                <Select
                                  labelId="type"
                                  id="type"
                                  //value={age}
                                  //onChange={handleChange}
                                  label="Type"
                                >
                               <MenuItem value=""><em>Manual</em></MenuItem>
                               <MenuItem value={10}>Ten</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                      </Grid>
                    </Grid>

                  <Grid item xs={12}><Button variant="contained" color="primary" fullWidth>Search</Button></Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}><Typography variant="h4" gutterBottom display="inline">Test Cases</Typography></Grid>
                      <Grid item xs={12}><TreeView/></Grid>
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>

              <Divider orientation="vertical" flexItem />

              <Grid item xs={8}>
                  <h1>Hello Susan</h1>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
              <Typography variant="h3" gutterBottom display="inline">
                        Filters
              </Typography>
          </Grid>  
        </Grid>
      </div>
    );
  }
  
  export default withStyles(styles)(TestCaseListPage);
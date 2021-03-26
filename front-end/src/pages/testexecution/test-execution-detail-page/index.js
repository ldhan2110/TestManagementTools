import React, {useEffect} from "react";
import styles from "./styles";
import styled from "styled-components";
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import { useHistory } from "react-router-dom";
import { green, orange, red } from "@material-ui/core/colors";
import { spacing } from "@material-ui/system";
import { useLocation } from 'react-router-dom';
import {
  Grid,
  Typography,
  Button,
  Divider,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  List, ListItem, ListItemText, ListItemSecondaryAction,
  Chip as MuiChip,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from '@material-ui/core';


const tempData = [
  {id: '01', name: 'TestCase01', status: 'Untested'},
  {id: '02', name: 'TestCase02', status: 'Blocked'},
  {id: '03', name: 'TestCase03', status: 'Pass'},
  {id: '04', name: 'TestCase04', status: 'Untested'},
  {id: '05', name: 'TestCase05', status: 'Untested'},
  {id: '06', name: 'TestCase06', status: 'Untested'},
  {id: '07', name: 'TestCase07', status: 'Untested'},
  {id: '08', name: 'TestCase08', status: 'Untested'},
  {id: '09', name: 'TestCase09', status: 'Untested'},
]

const Chip = styled(MuiChip)`
  ${spacing};

  background: ${props => props.active && green[500]};
  background: ${props => props.pass && green[500]};
  background: ${props => props.fail && red[500]};
  background: ${props => props.block && orange[500]};
  background: ${props => props.sent && orange[700]};
  color: ${props => (props.active || props.sent) && props.theme.palette.common.white};
  color: ${props => (props.pass || props.sent) && props.theme.palette.common.white};
  color: ${props => (props.fail || props.sent) && props.theme.palette.common.white};
  color: ${props => (props.block || props.sent) && props.theme.palette.common.white};
`



const TestExecutionDetailPage = (props) => {
    const {classes, listTestExecution, name, match} = props;
    const history = useHistory();
    const location = useLocation();

    const handleClose=()=>{
      history.goBack();
    }  
  
    return (
    <div>
        <Helmet title="Test Execution Detail" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Test Execution Detail - {props.match.params.testExecutionName}
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
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
        <form className={classes.content}>
          <TextField id="testExecutionName" label="Test Execution Name" variant="outlined"  fullWidth required/>
          <TextField id="descriptions" label="Descriptions" variant="outlined"  fullWidth required multiline rows={20}/>
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
              <InputLabel id="status">Status</InputLabel>
                  <Select
                    labelId="status"
                    id="status"
                    //value={age}
                    //onChange={handleChange}
                    label="status">
                        <MenuItem value=""><em>Untested</em></MenuItem>
                        <MenuItem value={10}>Pass</MenuItem>
                        <MenuItem value={20}>Blocked</MenuItem>
                        <MenuItem value={30}>Fail</MenuItem>
                  </Select>
          </FormControl>

          <div>
             <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" />}
              label="Public"
              labelPlacement="start"
            />
          </div>
          <div>
            <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" />}
              label="Active"
              labelPlacement="start"
            />
          </div>

            <Grid container spacing={1}>
              <Grid item xs={12}><Typography variant="h4" gutterBottom display="inline">List Executed Test Cases</Typography></Grid> 
              <Grid item xs={12}>
                <Paper style={{maxHeight: 200, overflow: 'auto'}}>
                <List>
                  {tempData.map((item,index) => 
                    <ListItem key={index} dense button  selected onClick={()=>{history.push(location.pathname+'/test-exec/'+item.id)}}>
                      <ListItemText id={item.id} primary={item.name} />
                      <ListItemSecondaryAction>
                        {item.status === 'Untested' && <Chip size="small" mr={1} mb={1} label={item.status} />}
                        {item.status === 'Pass' && <Chip size="small" mr={1} mb={1} label={item.status} pass={1}/>}
                        {item.status === 'Blocked' && <Chip size="small" mr={1} mb={1} label={item.status} block={1}/>}
                        {item.status === 'Fail' && <Chip size="small" mr={1} mb={1} label={item.status} fail={1}/>}
                      </ListItemSecondaryAction>
                    </ListItem>
                  )}
                </List>
                </Paper>
              </Grid> 
            </Grid>


          <Typography variant="subtitle1" gutterBottom display="inline" style={{margin: '150px 0'}}><b>Total exec.time: 00:00:01s</b></Typography>

          <div className = {classes.btnGroup}>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Execute
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </div>
        </form>
        </Grid>
      </Grid>
    </div>
    );
  }
  
  export default withStyles(styles)(TestExecutionDetailPage);
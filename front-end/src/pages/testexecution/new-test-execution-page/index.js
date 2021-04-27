import React, {useState} from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import { useHistory } from "react-router-dom";
import SelectBox from '../../../components/Selectbox';
import SelectTestCasePopup from '../../testcases/select-test-case-page/index';
import {
  Grid,
  Typography,
  FormControl,
  Button,
  Divider,
  TextField,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select, MenuItem
} from '@material-ui/core';

import {
  Add as AddIcon,
} from "@material-ui/icons";

const NewTestExecutionPage = (props) => {
    const {classes, listTestExecution} = props;

    const [open,setOpenPopup] = useState(false);
    const history = useHistory();

    const handleClose = () =>{
      history.goBack();      
    }

    const handleOpenSelectTC = () => {
      setOpenPopup(true);
    }
    
    return (
    <div>
        <Helmet title="New Test Execution" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            New Test Execution
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

          <FormControl variant="outlined" fullWidth>
           <InputLabel id="demo-simple-select-outlined-label">Test Plan</InputLabel>
            <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>

      </FormControl>
          <Grid container fullWidth>
              <Grid item xs={3}>
                <p>Create from existing test execution ?</p>
              </Grid>
              <Grid item xs={9}>
                <SelectBox labelTitle="Create from existing test execution ?" listItems={listTestExecution ? listTestExecution : null} />
              </Grid>
          </Grid>

          <div>
            <Grid container spacing={3}>
              <Grid item>
                <p>Select Test Case: <b>0 selected</b></p>
              </Grid>
              <Grid item>
                <SelectTestCasePopup isOpen={open} setOpen={setOpenPopup}/>
                <Button variant="contained" onClick={handleOpenSelectTC}>Add Test Case</Button>
              </Grid>
            </Grid>
          </div>
            
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


          <FormControl variant="outlined" fullWidth>
           <InputLabel id="tester">Assign Tester</InputLabel>
            <Select
          labelId="tester"
          id="tester"
          label="Tester"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </FormControl>

        
          <div className = {classes.btnGroup}>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Create
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
  
  export default withStyles(styles)(NewTestExecutionPage);
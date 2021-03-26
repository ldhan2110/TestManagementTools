import React from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import { useHistory } from "react-router-dom";
import DatePicker from '../../../components/DatePicker';
import {
  Grid,
  Typography,
  Breadcrumbs,
  Button,
  Divider,
  TextField,
} from '@material-ui/core';

const NewMileStonePage = (props) => {
    const {classes} = props;
    
    const history = useHistory();

    const handleClose = () =>{
      history.goBack();
    }
    return (
    <div>
        <Helmet title="New Milestone" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Create Milestone
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
          <TextField id="milestoneName" label="Name" variant="outlined"  fullWidth required/>
          <TextField id="descriptions" label="Descriptions" variant="outlined"  fullWidth required multiline rows={20}/>                      
                  
          <Grid container spacing={3}> 
              <Grid item xs={12}>
                 <DatePicker label="Start Date"/>
              </Grid>
              <Grid item xs={12}>
                 <DatePicker label="End Date" />
              </Grid>
          </Grid>                  
          
          <div className = {classes.btnGroup}>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Create
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Back
          </Button>
        </div>
        </form>
        </Grid>
      </Grid>
    </div>
    );
  }
  
  export default withStyles(styles)(NewMileStonePage);
import React, {useState} from "react";
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import {
  FormControlLabel,
  TextField,
  Button,
  Typography,
  Divider,
  Grid,
  Avatar
} from "@material-ui/core";
import UploadButton from "../../../components/UploadButton";

const ProfilePage = (props)=>{

  const {classes} = props;

    return (
      <div className={classes.root}>
          <Typography component="h1" variant="h1" gutterBottom className = {classes.title}>
                Profile
          </Typography>
          <Divider my={6}/>
          <Grid container justify="space-between" className={classes.content}>
              <Grid item xs={6}>
                <form className={classes.formContent}>
                  <div className={classes.nameContainer}>
                    <TextField id="firstName" label="First Name" variant="outlined"  fullWidth/>
                    <TextField id="lastName" label="Last Name" variant="outlined"  fullWidth/>
                  </div>

                  <TextField id="email" label="Email" variant="outlined"  fullWidth required/>
                  <TextField id="country" label="Country" variant="outlined"  fullWidth />
                  <TextField id="Introductions" label="Introductions" variant="outlined"  fullWidth multiline rows={10}/>
                  <div className = {classes.btnGroup}>
                      <Button variant="contained" color="primary" >Save Changes</Button>
                  </div>
                </form>
              </Grid>
              <Grid item xs className={classes.avatarContainer}>
                <Avatar alt="Remy Sharp" src="" className={classes.avatar} />
                <UploadButton/>
              </Grid>
          </Grid>
      </div>
    );
}

export default  withStyles(styles)(ProfilePage);
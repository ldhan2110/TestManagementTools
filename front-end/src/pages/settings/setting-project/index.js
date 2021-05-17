import React, {useEffect, useState} from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import {
  Grid,
  Typography,
  Divider, 
  Button,
  TextField,
  FormControl,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core';

import {
  Add as AddIcon,
} from "@material-ui/icons";




const SettingProjectPage = (props) => {

  const history = useHistory();

  const {classes} = props;

  
  return(
    <div>

      <Helmet title="Settings" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Setting Project
          </Typography>

          
        </Grid>
        <Grid item>
          <div>
            <Button variant="contained"  styles={{color: 'red'}} >
              <AddIcon />
              Delete Project
            </Button>
          </div>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
        <form className={classes.content}>
          <TextField id="projectName" label="Project Name" variant="outlined"  fullWidth required  inputProps={{maxLength : 16}} />
          <TextField id="descriptions" label="Descriptions" variant="outlined"  fullWidth required multiline rows={20} />
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
              control={<Checkbox color="primary"/>}
              label="Active"
              labelPlacement="start"
            />
          </div>

          <div>
          <FormControl variant="outlined"  fullWidth>
              <InputLabel id="status">Status</InputLabel>
                  <Select
                    labelId="status"
                    id="status"
                    label="status">
                        <MenuItem value={'Progressing'}>Progressing</MenuItem>
                        <MenuItem value={"Blocked"}>Blocked</MenuItem>
                        <MenuItem value={"Closed"}>Closed</MenuItem>
                  </Select>
          </FormControl>
          </div>
          <div className = {classes.btnGroup}>
          <Button variant="contained" color="primary">
            Update
          </Button>
          <Button variant="contained" >
            Cancel
          </Button>
        </div>
        </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default (withStyles(styles)(SettingProjectPage));

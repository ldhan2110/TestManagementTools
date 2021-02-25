import React from 'react';
import Helmet from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  Typography
} from '@material-ui/core';

import Milestone from '../../../components/Milestones/Milestone';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const sampleData = {
  listMilestone: [
    {title: "Initial", descriptions: "Complete setup", status: "completed"},
    {title: "Phase 01", descriptions: "Complete setup", status: "failed"},
    {title: "Phase 02", descriptions: "Complete setup", status: "failed"},
    {title: "Phase 03", descriptions: "Complete setup", status: "inprogress"},
    {title: "Phase 04", descriptions: "Complete setup", status: "inprogress"},
    {title: "Deploy", descriptions: "Complete setup", status: "inprogress"},
    {title: "Contract", descriptions: "Complete setup", status: "inprogress"},
  ]
};

export default function CustomizedTimeline() {
  const classes = useStyles();

  return (

    <React.Fragment>

      <Helmet title="Service Management" />

      <Grid
        justify="space-between"
        container 
        direction="column"
      > 
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Test Plan List
          </Typography>
        </Grid>

        <Grid item>
        <Milestone listData = {sampleData}/>
        </Grid>
      </Grid>
    </React.Fragment>

    
  );
}
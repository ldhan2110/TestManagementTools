import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {
  Paper,
  Typography
} from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));



const Compeleted = (props) => {
  return (
    <TimelineSeparator>
      <TimelineDot color="primary" >
        <CheckCircleIcon />
      </TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
  );
}

const InProgress = (props) => {
  return (
    <TimelineSeparator>
      <TimelineDot  >
        <CheckCircleIcon />
      </TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
  );
}

const Failed = (props) => {
  return (
    <TimelineSeparator>
    <TimelineDot color="secondary" >
      <CheckCircleIcon />
    </TimelineDot>
    <TimelineConnector />
  </TimelineSeparator>
  );
}


const Milestone = (props) => {

  const classes = useStyles();

  const {status, title, descriptions} = props;

    return (
      <TimelineItem>

      {status === "completed" && <Compeleted/>}
      {status === "inprogress" && <InProgress/>}
      {status === "failed" && <Failed/>}

      <TimelineContent>
        <Paper elevation={3}  className={classes.paper}>
          <Typography variant="h6" component="h1">
            {title}
          </Typography>
          <Typography>{descriptions}</Typography>
        </Paper>
      </TimelineContent>
    </TimelineItem>
    )
};

export default Milestone;
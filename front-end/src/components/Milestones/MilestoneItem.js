import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import DoneIcon from '@material-ui/icons/Done';
import FlagIcon from '@material-ui/icons/Flag';
import ClearIcon from '@material-ui/icons/Clear';
import {
  Card,
  CardContent,
  Typography,
  CardActionArea
} from '@material-ui/core';




const useStyles = makeStyles((theme) => ({
  secondaryTail: {
    backgroundColor: "red"
  }, 

  cardRoot: {
    maxWidth: "300px"
  }
}));



const Compeleted = (props) => {

  const {final} = props;

  return (
    <TimelineSeparator>
      <TimelineDot color="primary" >
        <DoneIcon />
      </TimelineDot>
      {!final && <TimelineConnector />}
    </TimelineSeparator>
  );
}

const InProgress = (props) => {
  const {final} = props;

  return (
    <TimelineSeparator>
      <TimelineDot  >
        <FlagIcon />
      </TimelineDot>
      {!final && <TimelineConnector />}
    </TimelineSeparator>
  );
}

const Failed = (props) => {

  const {final} = props;

  const classes = useStyles();

  return (
    <TimelineSeparator>
    <TimelineDot classes={{root:classes.secondaryTail}} >
      <ClearIcon />
    </TimelineDot>
    {!final && <TimelineConnector />}
  </TimelineSeparator>
  );
}


const MilestoneCard = (props)=>{
  const {title, descriptions} = props;

  const classes = useStyles();

  return(
    <Card variant="outlined" className={{root: classes.cardRoot}} elevation={3}>
      <CardActionArea>
        <CardContent>
          <div>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          </div>
          <Typography variant="body2" color="textSecondary" component={'div'}>
            {descriptions}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}


const Milestone = (props) => {

  const classes = useStyles();

  const {status, title, descriptions, isFinal} = props;


    return (
      <TimelineItem >

      {status === "completed" && <Compeleted final={isFinal}/>}
      {status === "inprogress" && <InProgress final={isFinal}/>}
      {status === "failed" && <Failed final={isFinal}/>}

      <TimelineContent>
        <MilestoneCard title={title} descriptions={descriptions}/>
      </TimelineContent>
    </TimelineItem>
    )
};



export default Milestone;
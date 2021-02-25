import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Milestone from './MilestoneItem';
import FlagIcon from '@material-ui/icons/Flag';

import {
  Grid,
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

const MilestoneLine = (props) => {

  const classes = useStyles();

  const { listData } = props;

  return (
    <Timeline align="alternate">
    {listData ? listData.listMilestone.map((item,index) => 
        <Milestone 
          status = {item.status}
          title = {item.title}
          descriptions = {item.descriptions} />):
    
    <div>
      
      
    </div>}
  </Timeline>

  )



}

export default MilestoneLine;
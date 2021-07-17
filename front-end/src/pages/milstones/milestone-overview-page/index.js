import React, {useEffect} from 'react'; //,useState
import Helmet from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import {ADD_NEW_MILESTONE_REQ, GET_ALL_MILESTONES_REQ} from '../../../redux/milestones/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  Typography
} from '@material-ui/core';

import Milestone from '../../../components/Milestones/Milestone';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
/* const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  }, 
})); */

//MAP STATES TO PROPS - REDUX
function mapStateToProps(state) {
  return {
    milestone: state.milestone,
    listMilestones: state.milestone.listMilestones,
    project: state.project.currentSelectedProject,
    role: state.project.currentRole
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    addNewMilestoneReq: (payload) => dispatch({ type: ADD_NEW_MILESTONE_REQ, payload }),
    getAllMilestoneReq: (payload) => dispatch({ type: GET_ALL_MILESTONES_REQ, payload}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload })
  }
}

// const sampleData = {
//   listMilestone: [
//     {title: "Initial", descriptions: "Complete setup", status: "completed"},
//     {title: "Phase 01", descriptions: "Complete setup", status: "failed"},
//     {title: "Phase 02", descriptions: "Complete setup", status: "completed"},
//     {title: "Phase 03", descriptions: "Complete setup", status: "failed"},
//     {title: "Phase 04", descriptions: "Complete setup", status: "completed"},
//     {title: "Deploy", descriptions: "Complete setup", status: "inprogress"},
//     {title: "Contract", descriptions: "Complete setup", status: "inprogress"},
//   ]
// };

const CustomizedTimeline = (props) => {
  const history = useHistory();
  
  const handleClickNewMilestone = () => {
    history.push(window.location.pathname+"/new-milestone");
  }
  //const {classes} = props;

  const {listMilestones, milestone, getAllMilestoneReq, project, role} = props;

  const [array, setArray] = React.useState([]);

  const handleArray = () => {   

  setArray([]);
  for(let i in listMilestones){
    let temp_status = 'new';
    if(listMilestones[i].is_completed !== undefined){
      if(listMilestones[i].is_completed === true)
      temp_status = 'completed'
      else
      temp_status = 'failed'
    }


    // setArray(array => [...array, {
    //     title: listMilestones[i].milestonetitle,
    //     descriptions: listMilestones[i].description,
    //     status: temp_status
    //   }]);

    setArray(array => [...array, {
      title: listMilestones[i].milestonetitle,
      descriptions: listMilestones[i].description,
      status: temp_status,
      milestoneid: listMilestones[i]._id,
      startdate: listMilestones[i].start_date,
      enddate: listMilestones[i].end_date
    }]);

  }
}

  useEffect(()=>{
    milestone.success = "";
    getAllMilestoneReq(project);
    setArray([]);
  },[]);

  useEffect(()=>{
    if(milestone.success === true)
      handleArray();
  },[listMilestones])
  

  return (

    <React.Fragment>

      <Helmet title="Milestones" />
      <Grid
        justify="space-between"
        container 
      > 
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Milestone Overview
          </Typography>
        </Grid>

        <Grid item>
          {(role === 'Project Manager' || role === 'Test Lead')   &&<div>
            <Button variant="contained" style={{marginRight: 32}} color="primary" onClick={handleClickNewMilestone}>
              <AddIcon />
              New Milestone
            </Button>
          </div>}
        </Grid>
      </Grid>
      {milestone.success === true ? <Milestone listData={{listMilestone:array}}/>:
        <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><CircularProgress/></div>
        }
    </React.Fragment>

    
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(CustomizedTimeline));
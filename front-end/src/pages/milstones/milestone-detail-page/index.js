import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import DatePicker from '../../../components/DatePicker';
import {GET_ALL_MILESTONES_REQ, GET_MILESTONE_BYID_REQ, UPDATE_MILESTONE_REQ, DELETE_MILESTONE_REQ, RESET_UPDATE_MILESTONE, RESET_DELETE_MILESTONE} from '../../../redux/milestones/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from "react-router";

import {
  Grid,
  Breadcrumbs,
  Divider,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog
} from '@material-ui/core';
import { deleteMilestoneEpic } from "../../../redux/milestones/milestoneEpics";

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { 
    insMilestones: state.milestone.insMilestones,  
    project:state.project.currentSelectedProject,
    milestone:state.milestone.currentSelectedMilestone, 
    listMilestones: state.milestone.listMilestones,
    milestones: state.milestone,
    insMilestonesDelete: state.milestone.insMilestonesDelete
  }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    updateMilestoneReq: (payload) => dispatch({ type: UPDATE_MILESTONE_REQ, payload }),
    getMilestoneByIdReq: (payload) => dispatch({ type: GET_MILESTONE_BYID_REQ, payload}),
    deleteMilestoneReq: (payload) => dispatch({ type: DELETE_MILESTONE_REQ, payload}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    resetUpdateRedux: () => dispatch({type: RESET_UPDATE_MILESTONE}),
    resetDeleteRedux: () => dispatch({type: RESET_DELETE_MILESTONE})
  }
}

const DetailMileStonePage = (props) => {
  const {classes} = props;
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const {insMilestones, updateMilestoneReq, displayMsg,listMilestones,deleteMilestoneReq, getMilestoneByIdReq, project, milestone, resetUpdateRedux, resetDeleteRedux, insMilestonesDelete, milestones} = props;
  const [selectedDateStart, setSelectedDateStart] = React.useState(new Date());
  const [selectedDateEnd, setSelectedDateEnd] = React.useState(new Date());
  const [checkError, setCheckError] = useState(false);
  const [error, setError] = useState({
    milestonetitle: 'ss',
    description: 'ss',
  });

  const [milestoneInfo, setMilestoneInfo] = useState({
    milestonetitle: '',
    projectid: project,
    milestoneid: milestone,
    description: '',
    start_date: new Date(),
    end_date: new Date(),
    is_completed: true
  });

  const [milestonebyid, setMilestonebyid] = useState({
    projectid: project,
    milestoneid: milestone
  });

  useEffect(()=>{
    getMilestoneByIdReq(milestonebyid);
    console.log(milestones);
  },[]);

  useEffect(()=>{
    setMilestoneInfo({ ...milestoneInfo, 
      milestonetitle: listMilestones.milestonetitle,
      description:listMilestones.description,
      start_date: listMilestones.start_date,
      end_date: listMilestones.end_date,
      is_completed: listMilestones.is_completed
    });
  },[listMilestones])


  useEffect(()=>{
    setMilestoneInfo({ ...milestoneInfo, start_date: selectedDateStart });
},[selectedDateStart])

  useEffect(()=>{
    setMilestoneInfo({ ...milestoneInfo, end_date: selectedDateEnd });
},[selectedDateEnd])

  useEffect(()=>{
    if (insMilestones.sucess === false){
      displayMsg({
        content: insMilestones.errMsg,
        type: 'error'
      });
    } else if (insMilestones.sucess == true) {
      displayMsg({
        content: "Update milestone successfully !",
        type: 'success'
      });
      resetUpdateRedux();
      history.goBack();
    }
   },[insMilestones.sucess]);

  useEffect(()=>{
    if (insMilestonesDelete.sucess === false){
      displayMsg({
        content: insMilestonesDelete.errMsg,
        type: 'error'
      });
    } else if (insMilestonesDelete.sucess == true) {
      displayMsg({
        content: "Delete milestone successfully !",
        type: 'success'
      });
      resetDeleteRedux();
      history.goBack();
    }
  },[insMilestonesDelete.sucess]);

  const handleDelete = async () => {
    await deleteMilestoneReq(milestonebyid);
    setOpen(false);
  };

  const handleUpdate = () => {
    setCheckError(true);

    if(milestoneInfo.description === "")
    setError({ ...milestoneInfo, description: "" });

    if(milestoneInfo.milestonetitle === "")
    setError({ ...milestoneInfo, milestonetitle: "" });

    if(milestoneInfo.milestonetitle !== "" && milestoneInfo.description !== "")
    updateMilestoneReq(milestoneInfo);
    //console.log(JSON.stringify(milestoneInfo, null, '  '));   
  };

  const handleChange = (prop) => (event) => {
    setMilestoneInfo({ ...milestoneInfo, [prop]: event.target.value });

    if(checkError == true)
    setError({ ...error, [prop]: event.target.value });
  };

  const handleDateStart = (date) => {
    setSelectedDateStart(date);
  };

  const handleDateEnd = (date) => {
    setSelectedDateEnd(date);
  };

  const handleCompleted = () =>{
    setMilestoneInfo({ ...milestoneInfo, is_completed: !milestoneInfo.is_completed });
  };

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
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
            Detail Milestone
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

          <TextField id="milestoneName" label="Name" variant="outlined"  fullWidth required inputProps={{maxLength : 16}} 
          value={milestoneInfo.milestonetitle || ''} onChange={handleChange('milestonetitle')} 
          error={!milestoneInfo.milestonetitle && !error.milestonetitle ? true : false}
          helperText={!milestoneInfo.milestonetitle && !error.milestonetitle ? 'milestone name is required' : ' '}/>

          <TextField id="descriptions" label="Descriptions" variant="outlined" fullWidth required multiline rows={20} 
          value={milestoneInfo.description || ''} onChange={handleChange('description')}
          error={!milestoneInfo.description && !error.description ? true : false}
          helperText={!milestoneInfo.description && !error.description ? 'description is required' : ' '}/>                      
                  
          <Grid container spacing={3}> 
              <Grid item xs={12}>
                 <DatePicker label="Start Date"
                 value={milestoneInfo.start_date}
                 onChange={handleDateStart}
                 />
              </Grid>
              <Grid item xs={12}>
                 <DatePicker label="End Date"
                 value={milestoneInfo.end_date}
                 onChange={handleDateEnd}
                  />
              </Grid>
          </Grid>

          <div>
             <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" value={milestoneInfo.is_completed}  onChange={handleCompleted}/>}
              label="This milestone is completed?"
              labelPlacement="start"
              checked={milestoneInfo.is_completed}
            />
          </div>                  
          
          <div className = {classes.btnGroup}>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="contained" onClick={handleOpen}>
            Delete
          </Button>
          <Grid item>
                <Dialog open={open} >
                  <DialogTitle>Confirm</DialogTitle>
                  <DialogContent>Are you sure want to delete this milestone?</DialogContent>
                  <DialogActions>
                    <Button onClick={handleDelete} color="primary">Yes</Button>
                    <Button onClick={handleClose} color="primary">No</Button>
                  </DialogActions>
                </Dialog>
            </Grid>
        </div>
        </form>
        </Grid>
      </Grid>
    </div>
    );
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(DetailMileStonePage));
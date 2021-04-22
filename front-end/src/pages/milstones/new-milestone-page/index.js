import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import DatePicker from '../../../components/DatePicker';
import {ADD_NEW_MILESTONE_REQ, GET_ALL_MILESTONES_REQ} from '../../../redux/milestones/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


import {
  Grid,
  Breadcrumbs,
  Divider,
} from '@material-ui/core';
import { useHistory } from "react-router";

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { insMilestones: state.milestone.insMilestones,  project:state.project.currentSelectedProject }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    addMilestoneReq: (payload) => dispatch({ type: ADD_NEW_MILESTONE_REQ, payload }),
    getAllMilestoneReq: () => dispatch({ type: GET_ALL_MILESTONES_REQ}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload })
  }
}

const NewMileStonePage = (props) => {
  const {isOpen, setOpen, classes} = props;

  const {insMilestones, addMilestoneReq, displayMsg, getAllMilestoneReq, project} = props;

  const [open, setOpenPopup] = React.useState(isOpen);
  const [selectedDateStart, setSelectedDateStart] = React.useState(new Date());
  const [selectedDateEnd, setSelectedDateEnd] = React.useState(new Date());

  const history = useHistory();

  const [milestoneInfo, setMilestoneInfo] = useState({
    milestonetitle: '',
    projectid: project,
    description: '',
    start_date: new Date(),
    end_date: new Date(),
    is_completed: false
  });

  useEffect(()=>{
      setOpenPopup(isOpen);
  },[isOpen, open])

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
        content: "Create milestone successfully !",
        type: 'success'
      });
      getAllMilestoneReq();
      handleClose();
    }
  },[insMilestones.sucess]);
    
  const handleClose = () => {
    setMilestoneInfo({
      milestonetitle: '',
      projectid: project,
      description: '',
      start_date: '',
      end_date: '',
      is_completed: false
    })
    history.goBack();
  };

  const handleCreate = () => {
    addMilestoneReq(milestoneInfo);
  }

  const handleChange = (prop) => (event) => {
    setMilestoneInfo({ ...milestoneInfo, [prop]: event.target.value });
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
          <TextField id="milestoneName" label="Name" variant="outlined"  fullWidth required value={milestoneInfo.milestonetitle || ''} onChange={handleChange('milestonetitle')} inputProps={{maxLength : 16}}/>
          <TextField id="descriptions" label="Descriptions" variant="outlined"  fullWidth required multiline rows={20} value={milestoneInfo.description || ''} onChange={handleChange('description')}/>                      
                  
          <Grid container spacing={3}> 
              <Grid item xs={12}>
                 <DatePicker label="Start Date"
                 value={selectedDateStart}
                 onChange={handleDateStart}
                 />
              </Grid>
              <Grid item xs={12}>
                 <DatePicker label="End Date"
                 value={selectedDateEnd}
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
            />
          </div>                  
          
          <div className = {classes.btnGroup}>
          <Button variant="contained" color="primary" onClick={handleCreate}>
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
  
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(NewMileStonePage));
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import DatePicker from '../../../components/DatePicker';
import {ADD_NEW_MILESTONE_REQ, GET_ALL_MILESTONES_REQ, RESET_ADD_NEW_MILESTONE} from '../../../redux/milestones/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';

import {
  Grid,
  //Breadcrumbs,
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
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    resetAddRedux: () => dispatch({type: RESET_ADD_NEW_MILESTONE}) 
  }
}

const NewMileStonePage = (props) => {
  const {isOpen, classes} = props; //,setOpen
  const {insMilestones, addMilestoneReq, displayMsg, getAllMilestoneReq, project, resetAddRedux} = props;
  const [open, setOpenPopup] = React.useState(isOpen);
  const [selectedDateStart, setSelectedDateStart] = React.useState(new Date());
  const [selectedDateEnd, setSelectedDateEnd] = React.useState(new Date());
  const [checkError, setCheckError] = useState(false);
  const history = useHistory();
  const [enableCreateBtn, setEnableCreateBtn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [milestoneInfo, setMilestoneInfo] = useState({
    milestonetitle: '',
    projectid: project,
    description: '',
    start_date: new Date(),
    end_date: new Date(),
    is_completed: false
  });
  const [error, setError] = useState({
    milestonetitle: 'ss',
    description: 'ss',
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
      setLoading(false);
      displayMsg({
        //content: "Milestone name already exists !",
        content: insMilestones.errMsg,
        type: 'error'
      });
      setEnableCreateBtn(true);
      setLoading(false);
      resetAddRedux();
    } else if (insMilestones.sucess === true) {
      setLoading(false);
      displayMsg({
        content: "Create milestone successfully !",
        type: 'success'
      });
      setEnableCreateBtn(true);
      setLoading(false);
      resetAddRedux();
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
    setCheckError(true);

    if(milestoneInfo.description === "")
    setError({ ...milestoneInfo, description: "" });

    if(milestoneInfo.milestonetitle === "")
    setError({ ...milestoneInfo, milestonetitle: "" });

    if(milestoneInfo.description.trim().length === 0 || milestoneInfo.milestonetitle.trim().length === 0
            ||milestoneInfo.description.trim().length !== milestoneInfo.description.length 
            || milestoneInfo.milestonetitle.trim().length !== milestoneInfo.milestonetitle.length){
            displayMsg({
              content: "Milestone Name or Descriptions should not contain spaces before and after !",
              type: 'error'
            });
    }

    

    else if(milestoneInfo.milestonetitle !== "" && milestoneInfo.description !== ""){
      setEnableCreateBtn(false);
      setLoading(true);
      addMilestoneReq(milestoneInfo);
    }
  }

  const handleChange = (prop) => (event) => {
    setMilestoneInfo({ ...milestoneInfo, [prop]: event.target.value });
    if(checkError === true)
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
          <TextField id="milestoneName" label="Milestone Name" variant="outlined"  fullWidth required inputProps={{maxLength : 100}} 
          value={milestoneInfo.milestonetitle || ''} onChange={handleChange('milestonetitle')} 
          error={milestoneInfo.milestonetitle.trim().length === 0 && error.milestonetitle.trim().length === 0 ? true : false}
          helperText={milestoneInfo.milestonetitle.trim().length === 0 && error.milestonetitle.trim().length === 0 ? 'Milestone Name is required' : ' '}/>                     

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
          
          <TextField id="descriptions" label="Descriptions" 
          variant="outlined"  fullWidth required multiline rows={3} 
          value={milestoneInfo.description || ''} onChange={handleChange('description')} 
          error={milestoneInfo.description.trim().length === 0 && error.description.trim().length === 0 ? true : false}
          helperText={milestoneInfo.description.trim().length === 0 && error.description.trim().length === 0 ? 'Descriptions is required' : ' '}/> 
          
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
          <Button variant="contained" color="primary" disabled={enableCreateBtn ? false : true } startIcon={<AddIcon/>} onClick={handleCreate}>
            Create
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>
          <Button variant="contained" startIcon={<CancelIcon/>} onClick={handleClose}>
            Cancel
          </Button>
        </div>
        </form>
        </Grid>
      </Grid>
    </div>
    );
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(NewMileStonePage));
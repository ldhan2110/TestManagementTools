import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import DatePicker from '../../../components/DatePicker';
import { 
  GET_MILESTONE_BYID_REQ, 
  UPDATE_MILESTONE_REQ, 
  DELETE_MILESTONE_REQ, 
  RESET_UPDATE_MILESTONE, 
  RESET_DELETE_MILESTONE} from '../../../redux/milestones/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from "react-router";
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import CancelIcon from '@material-ui/icons/Cancel';
import { red } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  Grid,
  Divider,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog
} from '@material-ui/core';


//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { 
    insMilestones: state.milestone.insMilestones,  
    project:state.project.currentSelectedProject,
    milestone:state.milestone.currentSelectedMilestone, 
    listMilestones: state.milestone.listMilestones,
    milestones: state.milestone,
    insMilestonesDelete: state.milestone.insMilestonesDelete,
    role: state.project.currentRole
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
  const [open, setOpen] = React.useState(false);
  const {insMilestones, updateMilestoneReq, displayMsg,listMilestones,deleteMilestoneReq, getMilestoneByIdReq, project, milestone, resetUpdateRedux, resetDeleteRedux, insMilestonesDelete, milestones, role} = props;
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

  const history = useHistory();
  const [enableCreateBtn, setEnableCreateBtn] = useState(false);
  const [enableDeleteBtn, setEnableDeleteBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingg, setLoadingg] = useState(false);
  

  const [milestonebyid, setMilestonebyid] = useState({
    projectid: project,
    milestoneid: milestone
  });

  useEffect(()=>{
    getMilestoneByIdReq(milestonebyid);
  },[]);

  useEffect(() =>{
    if(milestoneInfo.milestonetitle !== undefined && milestoneInfo.milestonetitle !== ""){
    setEnableCreateBtn(true);
    setEnableDeleteBtn(true);
    }
  },[milestoneInfo])

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
      setEnableCreateBtn(true);
      setLoading(false);
      resetUpdateRedux();
    } else if (insMilestones.sucess === true) {
      displayMsg({
        content: "Update milestone successfully !",
        type: 'success'
      });
      setLoading(false);
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
      setEnableDeleteBtn(true);
      setLoadingg(false);
      resetDeleteRedux();
    } else if (insMilestonesDelete.sucess === true) {
      displayMsg({
        content: "Delete milestone successfully !",
        type: 'success'
      });
      setLoadingg(false);
      resetDeleteRedux();
      history.goBack();
    }
  },[insMilestonesDelete.sucess]);

  const handleDelete = async () => {
    setEnableDeleteBtn(false);
    setLoadingg(true);
    await deleteMilestoneReq(milestonebyid);
    setOpen(false);
  };

  const handleUpdate = () => {
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
      updateMilestoneReq(milestoneInfo);
    }
  };

  const handleChange = (prop) => (event) => {
    setMilestoneInfo({ ...milestoneInfo, [prop]: event.target.value });

    if(checkError === true)
    setError({ ...error, [prop]: event.target.value });
  };

  const handleBack = () => {    
    history.goBack();
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
        <Helmet title="Milestone Details" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Milestone Detail {/*- {milestoneInfo.milestonetitle}*/}
          </Typography>

          </Grid>
        <Grid item>
        <div>
        {(role === 'Project Manager' || role === 'Test Lead')  &&
          <Button variant="contained" disabled={enableDeleteBtn ? false : true } startIcon={<DeleteIcon />} size="large" style={enableDeleteBtn ? { color: red[500] } : {}} onClick={handleOpen}>
            Delete Milestone
            {loadingg && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>}
          </div>
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
          <TextField id="milestonetitle" label="Milestone Name" 
          variant="outlined"  fullWidth required inputProps={{maxLength : 100}} 
          value={milestoneInfo.milestonetitle || ''} onChange={handleChange('milestonetitle')}
          error={milestoneInfo.milestonetitle === 0 && error.milestonetitle === 0 ? true : false}
          disabled={enableDeleteBtn ? false : true }
          helperText={milestoneInfo.milestonetitle === 0 && error.milestonetitle === 0 ? 'Milestone Name is required' : ' '}/>                     
                  
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

          <TextField id="descriptions" label="Descriptions" 
          variant="outlined" fullWidth required multiline rows={3}
          value={milestoneInfo.description || ''} onChange={handleChange('description')}
          error={milestoneInfo.description === 0 && error.description === 0 ? true : false}
          disabled={enableDeleteBtn ? false : true }
          helperText={milestoneInfo.description === 0 && error.description === 0 ? 'Descriptions is required' : ' '}/>   

          <div>
             <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" value={milestoneInfo.is_completed}  onChange={handleCompleted}/>}
              label="This milestone is completed?"
              labelPlacement="start"
              disabled={enableDeleteBtn ? false : true }
              checked={milestoneInfo.is_completed}
            />
          </div>                  
          
        <div className = {classes.btnGroup}>
        {(role === 'Project Manager' || role === 'Test Lead')  && 
          <Button variant="contained" color="primary" disabled={enableCreateBtn ? false : true } startIcon={<UpdateIcon/>} onClick={handleUpdate}>
            Update
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>}
          <Button variant="contained" startIcon={<CancelIcon/>} onClick={handleBack}>
            Cancel
          </Button>
        </div>
        </form>
        </Grid>
      </Grid>
    </div>
    );
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(DetailMileStonePage));
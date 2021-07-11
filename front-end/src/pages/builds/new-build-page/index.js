import React, {useEffect, useState} from 'react';
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import Helmet from 'react-helmet';
import SelectBox from '../../../components/Selectbox';
import DatePicker from '../../../components/DatePicker';
import {ADD_NEW_BUILD_REQ, GET_ALL_BUILDS_REQ, RESET_ADD_NEW_BUILD} from '../../../redux/build-release/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import {GET_ALL_TESTPLAN_REQ} from '../../../redux/test-plan/constants';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';

import {
  Grid,
  Typography,
  Button,
  Divider,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from '@material-ui/core';
//import build from '@date-io/date-fns';


//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { insBuilds: state.build.insBuilds,  
    project:state.project.currentSelectedProject,
    listBuilds: state.build.listBuilds,
    listTestplan: state.testplan.listTestplan }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    addBuildReq: (payload) => dispatch({ type: ADD_NEW_BUILD_REQ, payload }),
    getAllBuildReq: () => dispatch({ type: GET_ALL_BUILDS_REQ}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload,}),
    getAllTestplanReq: (payload) => dispatch({ type: GET_ALL_TESTPLAN_REQ, payload}),
    resetAddRedux: () => dispatch({type: RESET_ADD_NEW_BUILD})
  }
}

const NewBuildPage = (props) => {
    
  const {isOpen, setOpen, classes} = props;
  const {insBuilds, addBuildReq, displayMsg, getAllBuildReq, project, listBuilds, listTestplan, getAllTestplanReq, resetAddRedux} = props;
  const [open, setOpenPopup] = React.useState(isOpen);
  const [selectedDateStart, setSelectedDateStart] = React.useState(new Date());
  const history = useHistory();
  const [checkError, setCheckError] = useState(false);
  const [error, setError] = useState({
    buildname: 'ss',
    description: 'ss',
    testplan: 'ss'
  }); 


  const [buildInfo, setBuildInfo] = useState({
    buildname: '',
    projectid: project,
    description: '',
    isActive: false,
    isPublic: false,
    releasedate: new Date(),
    testplan: '',
    id_exist_build: ''
  });

  const [enableCreateBtn, setEnableCreateBtn] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    getAllTestplanReq(project);
  },[])

  useEffect(()=>{
      setOpenPopup(isOpen);
  },[isOpen, open])

  useEffect(()=>{
    setBuildInfo({ ...buildInfo, releasedate: selectedDateStart });
  },[selectedDateStart])

  try {
    useEffect(()=>{
      if (insBuilds.sucess === false){
        setLoading(false);
        displayMsg({
          content: "Build name already exists in this test plan !",
          type: 'error'
        });
        setEnableCreateBtn(true);
        setLoading(false);
        resetAddRedux();
      } else if (insBuilds.sucess === true) {
        setLoading(false);
        displayMsg({
          content: "Create build successfully !",
          type: 'success'
        });
        setEnableCreateBtn(true);
        setLoading(false);
        resetAddRedux();
        //getAllBuildReq();
        handleClose();
      }
    },[insBuilds.sucess]);    
  } catch (error) {
    console.log("error: "+error);
  }

    
  const handleClose = () => {
    setBuildInfo({
      buildname: '',
      projectid: project,
      description: '',
      isActive: false,
      isPublic: false,
      releasedate: new Date(),
      testplan: ''
    })
    history.goBack();
    //setOpen(false);
  };

  const handleCreate = () => {
    setCheckError(true);

    if(buildInfo.description === "")
    setError({ ...buildInfo, description: "" });

    if(buildInfo.buildname === "")
    setError({ ...buildInfo, buildname: "" });

    if(buildInfo.description.trim().length === 0 || buildInfo.buildname.trim().length === 0
    ||buildInfo.description.trim().length !== buildInfo.description.length 
    || buildInfo.buildname.trim().length !== buildInfo.buildname.length){
      displayMsg({
        content: "Build Name or Description should not contain spaces !",
        type: 'error'
      });
    }

    if(buildInfo.testplan === ""){
      displayMsg({
        content: "Test Plan is required !",
        type: 'error'
      });
    }

    else if(buildInfo.buildname !== "" && buildInfo.description !== ""){
      setEnableCreateBtn(false);
      setLoading(true);
      addBuildReq(buildInfo);
    }
  }

  const handleChange = (prop) => (event) => {
    setBuildInfo({ ...buildInfo, [prop]: event.target.value });
    if(checkError === true)
    setError({ ...error, [prop]: event.target.value });
  };

  const handleDateStart = (date) => {
    setSelectedDateStart(date);
  };

  const handleIsActive = () =>{
    setBuildInfo({ ...buildInfo, isActive: !buildInfo.isActive });
  };

  const handleIsPublic = () =>{
    setBuildInfo({ ...buildInfo, isPublic: !buildInfo.isPublic });
  };

    return (
    <div>
        <Helmet title="New Test Plan" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            New Build/Release
          </Typography>

        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
        <form className={classes.content}>
          <TextField id="buildName" label="Build Name" variant="outlined" fullWidth required 
          value={buildInfo.buildname || ''} onChange={handleChange('buildname')}
          error={buildInfo.buildname.trim().length === 0 && error.buildname.trim().length === 0 ? true : false}
          helperText={buildInfo.buildname.trim().length === 0 && error.buildname.trim().length === 0 ? 'Build Name is required' : null}/>

          <FormControl variant="outlined"  fullWidth required>
                              <InputLabel id="testPlan">Test Plan</InputLabel>
                                <Select
                                  labelId="testPlan"
                                  id="testPlan"
                                  value={buildInfo.testplan || ''}
                                  onChange={handleChange('testplan')}
                                  label="Test Plan"
                                  error={!buildInfo.testplan && !error.testplan ? true : false}
                                  helperText={!buildInfo.testplan && !error.testplan ? 'Test Plan is required' : ' '}
                                >
                               {listTestplan.map((item) => (
                                    <MenuItem value={item.testplanname}>{item.testplanname}</MenuItem>
                               ))}
                              </Select>
          </FormControl>

          <Grid container fullWidth>
              {/*<Grid item xs={3}>
                <p>Create from existing build ?</p>
              </Grid>*/}
              <FormControl variant="outlined" fullWidth>
              <InputLabel id="buildexec" >Create from existing build ?</InputLabel>
            <Select
          labelId="buildexec"
          id="buildexec"
          onChange={handleChange('id_exist_build')}
          label="buildexec">
            
          <MenuItem key={''} value={''}>&nbsp;</MenuItem>
          {props.history.location.state.map((item, index) => <MenuItem key={index} value={item._id}>{item.buildname}</MenuItem>)}    
        </Select>
      </FormControl>

              
          </Grid>
            
          <div>
             <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" value={buildInfo.isActive} onChange={handleIsActive}/>}
              label="Active"
              labelPlacement="start"
              checked={buildInfo.isActive}
            />
          </div>
          <div>
            <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" value={buildInfo.isPublic} onChange={handleIsPublic}/>}
              label="Open"
              labelPlacement="start"
              checked={buildInfo.isPublic}
            />
          </div>
          <Grid container spacing={3}>
              <Grid item xs={12}>
                 <DatePicker id="Release Date"
                 value={selectedDateStart}
                 onChange={handleDateStart}
                  />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField id="buildName" label="Branch" variant="outlined" fullWidth   />  
              </Grid>
              <Grid item xs={12}>
                <TextField id="buildName" label="Name" variant="outlined" fullWidth/>
              </Grid> */}
          </Grid>

                <TextField id="descriptions" label="Description" variant="outlined" fullWidth required multiline 
                rows={2} value={buildInfo.description || ''} onChange={handleChange('description')}
                error={buildInfo.description.trim().length === 0 && error.description.trim().length === 0 ? true : false}
                helperText={buildInfo.description.trim().length === 0 && error.description.trim().length === 0 ? 'Description is required' : null}/>

                   
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
  
//export default withStyles(styles)(NewBuildPage);
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(NewBuildPage));
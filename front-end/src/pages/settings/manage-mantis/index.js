import React, {useEffect, useState} from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import {
  CREATE_AND_SWITCH_MANTIS_REQ, SWITCH_MANTIS_REQ,
  RESET_CREATE_AND_SWITCH_MANTIS, RESET_SWITCH_MANTIS, 
  CHANGE_API_KEY_REQ, RESET_CHANGE_API_KEY,
  ADD_CATEGORY_REQ, REMOVE_CATEGORY_REQ, 
  RESET_ADD_CATEGORY, RESET_REMOVE_CATEGORY,
  GET_ALL_MANTIS_OF_PROJECT_REQ, GET_ALL_CATEGORY_REQ } from '../../../redux/issue/constants';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import { red } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Grid,
  Typography,
  Divider, 
  Button,
  TextField,
  FormControl,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog, FormHelperText,
} from '@material-ui/core';

/* import {
  Add as AddIcon,
} from "@material-ui/icons";
 */

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return {
    issue: state.issue,
    project:state.project.currentSelectedProject,
    role: state.project.currentRole
  }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),

    createAndSwitchMantisReq: (payload) => dispatch({ type: CREATE_AND_SWITCH_MANTIS_REQ, payload}),
    switchMantisReq: (payload) => dispatch({ type: SWITCH_MANTIS_REQ, payload}),
    changeAPIReq: (payload) => dispatch({ type: CHANGE_API_KEY_REQ, payload}),
    addCategoryReq: (payload) => dispatch({ type: ADD_CATEGORY_REQ, payload}),
    removeCategoryReq: (payload) => dispatch({ type: REMOVE_CATEGORY_REQ, payload}),
    getAllMantisOfProjectReq: (payload) => dispatch({ type: GET_ALL_MANTIS_OF_PROJECT_REQ, payload}),
    getAllCategoryReq: (payload) => dispatch({ type: GET_ALL_CATEGORY_REQ, payload}),

    resetCreateAndSwitchRedux: () => dispatch({type: RESET_CREATE_AND_SWITCH_MANTIS}),
    resetSwitchMantisRedux: () => dispatch({type: RESET_SWITCH_MANTIS}),
    resetChangeAPIKeyRedux: () => dispatch({type: RESET_CHANGE_API_KEY}),
    resetAddCategoryRedux: () => dispatch({type: RESET_ADD_CATEGORY}),
    resetRemoveCategoryRedux: () => dispatch({type: RESET_REMOVE_CATEGORY}),
  }
}


const SettingProjectPage = (props) => {
    const {classes, issue, createAndSwitchMantisReq, switchMantisReq, changeAPIReq, 
      addCategoryReq, removeCategoryReq, getAllMantisOfProjectReq, 
      resetCreateAndSwitchRedux, resetSwitchMantisRedux, resetChangeAPIKeyRedux, 
      resetAddCategoryRedux, resetRemoveCategoryRedux, getAllCategoryReq,
      project, role, displayMsg} = props;
  const history = useHistory();
  const [open, setOpen] = React.useState(false);


  const [enableDeleteBtn, setEnableDeleteBtn] = useState(true);

  //Create and switch (CaS)
  const [loadCaS, setLoadCaS] = useState(false);
  const [enableCaSbtn, setEnableCaSbtn] = useState(true);
  const [checkErrorCaS, setCheckErrorCaS] = useState(false);
  const [createMantisInfo, setCreateMantisInfo] = useState({
    url: "",
    apikey: "", //no need for this api but keep
    mantisname: "",
    projectid: project
  });

  const handleChangeCaS = (prop) => (event) => {
    setCreateMantisInfo({ ...createMantisInfo, [prop]: event.target.value });
  }

  const createAndSwitch = () => {
    setCheckErrorCaS(true);
    if(createMantisInfo.url.trim().length === 0 || createMantisInfo.mantisname.trim().length === 0){
      displayMsg({
        content: "Mantis name or URL should not contain spaces before and after !",
        type: 'error'
      });
    }
    else{
      setLoadCaS(true);
      setEnableCaSbtn(false);
      createAndSwitchMantisReq(createMantisInfo);
    }
  }

  useEffect(()=>{
    if(issue.insCreateAndSwitchMantis?.sucess === true){
      displayMsg({
        content: "Create and switched to new mantis successfully!",
        type: 'success'
      });
      setLoadCaS(false);
      setEnableCaSbtn(true);
      setCheckErrorCaS(false);
      resetCreateAndSwitchRedux();
    }
    if(issue.insCreateAndSwitchMantis?.sucess === false){
      displayMsg({
        content: issue.insCreateAndSwitchMantis?.errMsg,
        type: 'error'
      });
      setLoadCaS(false);
      setEnableCaSbtn(true);
      setCheckErrorCaS(false);
      resetCreateAndSwitchRedux();
    }

  },[issue.insCreateAndSwitchMantis])


  //Change API key (cAk)
  const [loadcAk, setLoadcAk] = useState(false);
  const [enablecAkbtn, setEnablecAkbtn] = useState(true);
  const [checkErrorcAk, setCheckErrorcAk] = useState(false);
  const [changeAPIinfo, setChangeAPIinfo] = useState({
    apikey: "",
    projectid: project
  });

  const handleChangecAk = (prop) => (event) => {
    setChangeAPIinfo({ ...changeAPIinfo, [prop]: event.target.value });
  }

  const changeAPIkey = () => {
    setCheckErrorcAk(true);
    if(changeAPIinfo.apikey.trim().length === 0){
      displayMsg({
        content: "API key cannot be empty !",
        type: 'error'
      });
    }
    else{
      setLoadcAk(true);
      setEnablecAkbtn(false);
      changeAPIReq(changeAPIinfo);
    }
  }

  useEffect(()=>{
    if(issue.insAPI?.sucess === true){
      displayMsg({
        content: "Change API key successfully!",
        type: 'success'
      });
      setLoadcAk(false);
      setEnablecAkbtn(true);
      setCheckErrorcAk(false);
      resetChangeAPIKeyRedux();
    }
    if(issue.insAPI?.sucess === false){
      displayMsg({
        content: issue.insAPI?.errMsg,
        type: 'error'
      });
      setLoadcAk(false);
      setEnablecAkbtn(true);
      setCheckErrorcAk(false);
      resetChangeAPIKeyRedux();
    }

  },[issue.insAPI])


  //Add category (AC)
  const [loadAC, setLoadAC] = useState(false);
  const [enableACbtn, setEnableACbtn] = useState(true);
  const [checkErrorAC, setCheckErrorAC] = useState(false);
  const [addCategoryInfo, setAddCategoryInfo] = useState({
    category: '',
    projectid: project
  });

  const handleChangeAC = (prop) => (event) => {
    setAddCategoryInfo({ ...addCategoryInfo, [prop]: event.target.value });
  }

  const addCategory = () => {
    setCheckErrorAC(true);
    if(addCategoryInfo.category.trim().length === 0){
      displayMsg({
        content: "Category name cannot be empty!",
        type: 'error'
      });
    }
    else{
      setLoadAC(true);
      setEnableACbtn(false);
      addCategoryReq(addCategoryInfo);
    }
  }

  useEffect(()=>{
    if(issue.insCategory?.sucess === true){
      displayMsg({
        content: "Create category successfully!",
        type: 'success'
      });
      setLoadAC(false);
      setEnableACbtn(true);
      setCheckErrorAC(false);
      getAllCategoryReq(project);
      resetAddCategoryRedux();
    }
    if(issue.insCategory?.sucess === false){
      displayMsg({
        content: issue.insAPI?.errMsg,
        type: 'error'
      });
      setLoadAC(false);
      setEnableACbtn(true);
      setCheckErrorAC(false);
      resetAddCategoryRedux();
    }

  },[issue.insCategory])

  //Remove category (selection box) (RC)
  const [loadRC, setLoadRC] = useState(false);
  const [enableRCbtn, setEnableRCbtn] = useState(true);
  const [checkErrorRC, setCheckErrorRC] = useState(false);
  const [removeCategoryInfo, setRemoveCategoryInfo] = useState({
    category: '',
    projectid: project
  });

  const handleChangeRC = (prop) => (event) => {
    setRemoveCategoryInfo({ ...removeCategoryInfo, [prop]: event.target.value });
  }

  const removeCategory = () => {
    setCheckErrorRC(true);
    if(removeCategoryInfo.category === ""){
      displayMsg({
        content: "Please choose a category !",
        type: 'error'
      });
    }
    else{
      setLoadRC(true);
      setEnableRCbtn(false);
      removeCategoryReq(removeCategoryInfo);
    }
  }

  useEffect(()=>{
    if(issue.insCategoryDelete?.sucess === true){
      displayMsg({
        content: "Removed category successfully!",
        type: 'success'
      });
      setLoadRC(false);
      setEnableRCbtn(true);
      setCheckErrorRC(false);
      resetRemoveCategoryRedux();
    }
    if(issue.insCategoryDelete?.sucess === false){
      displayMsg({
        content: issue.insCategoryDelete?.errMsg,
        type: 'error'
      });
      setLoadRC(false);
      setEnableRCbtn(true);
      setCheckErrorRC(false);
      resetRemoveCategoryRedux();
    }
  },[issue.insCategoryDelete])

  //Switch mantis (SM)
  const [loadSM, setLoadSM] = useState(false);
  const [enableSMbtn, setEnableSMbtn] = useState(true);
  const [checkErrorSM, setCheckErrorSM] = useState(false);
  const [switchMantisInfo, setSwitchMantisInfo] = useState({
    mantisid: "",
    projectid: project
  });

  const handleChangeSM = (prop) => (event) => {
    console.log(switchMantisInfo);
    setSwitchMantisInfo({ ...switchMantisInfo, [prop]: event.target.value });
  }

  const switchMantis = () => {
    setCheckErrorSM(true);
    if(switchMantisInfo.mantisid === "") {
      displayMsg({
        content: "Please choose a mantis project !",
        type: 'error'
      });
    }
    else{
      setLoadSM(true);
      setEnableSMbtn(false);
      switchMantisReq(switchMantisInfo);
    }
  }

  useEffect(()=>{
    if(issue.insSwitchMantis?.sucess === true){
      displayMsg({
        content: "Switch mantis successfully!",
        type: 'success'
      });
      setLoadSM(false);
      setEnableSMbtn(true);
      setCheckErrorSM(false);
      resetSwitchMantisRedux();
    }
    if(issue.insSwitchMantis?.sucess === false){
      displayMsg({
        content: issue.insCategoryDelete?.errMsg,
        type: 'error'
      });
      setLoadSM(false);
      setEnableSMbtn(true);
      setCheckErrorSM(false);
      resetSwitchMantisRedux();
    }
  },[issue.insSwitchMantis])



  useEffect(()=>{
    //projectsettings.byIDsuccess = null;
    //getProjectByIdReq(project);
    getAllMantisOfProjectReq(project);
    getAllCategoryReq(project);
  },[]);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleBack = () => {    
    history.goBack();
    //setOpen(false);
  };
  if(role !== 'Project Manager') {return(
    <div>
      <Helmet title="Mantis Management" />
      <div>
        <Typography variant="h3" gutterBottom display="inline">
            You need to be a project manager to access this page!
        </Typography>
      </div>
    </div>
  )} else{
  return(
    <div>

      <Helmet title="Mantis Management" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Mantis settings
          </Typography>

          
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>

          {/* Create and Switch */}
        <form className={classes.content}>
          <TextField id="projectName" label="Mantis Project Name" variant="outlined"  fullWidth required inputProps={{maxLength : 100}} 
           value={createMantisInfo.mantisname || ''}
           onChange={handleChangeCaS('mantisname')}
           error={checkErrorCaS && createMantisInfo.mantisname.trim().length === 0 ? true : false}
          helperText={checkErrorCaS && createMantisInfo.mantisname.trim().length === 0 ? 'Mantis name is required!' : ''}/>

        <div className={classes.onlyurl}>       
        <TextField id="url" label="URL" variant="outlined"  fullWidth required inputProps={{maxLength : 100}} 
          value={createMantisInfo.url || ''}
          onChange={handleChangeCaS('url')}
          error={checkErrorCaS && createMantisInfo.url.trim().length === 0 ? true : false}
          helperText={checkErrorCaS && createMantisInfo.url.trim().length === 0 ? 'URL is required!' : ' '}/>
          </div>

          <div className = {classes.btnGroup}>
          
          <Button variant="contained" color="primary"
          disabled={(enableCaSbtn) ? false : true } 
          startIcon={<UpdateIcon />} onClick={createAndSwitch}>
            Create and switch
            {loadCaS && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>
          </div>
        
        <Grid container spacing={2}>
        <Grid item xs={6}>
        <form className={classes.other}>

          {/* Change API */}
          <TextField id="API-Key" label="API-Key" variant="outlined"  fullWidth required  inputProps={{maxLength : 100}} 
           value={changeAPIinfo.apikey || ''}
           onChange={handleChangecAk('apikey')}
           error={checkErrorcAk && changeAPIinfo.apikey.trim().length === 0 ? true : false}
          helperText={checkErrorcAk && changeAPIinfo.apikey.trim().length === 0 ? 'API key is required!' : ' '}/>
          </form>

          <div className = {classes.btnGroup}>          
          <Button variant="contained" color="primary"
          disabled={(enablecAkbtn)  ? false : true } 
          startIcon={<UpdateIcon />}  onClick={changeAPIkey}>
            Save API
            {loadcAk && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>
        </div></Grid> 
        <Grid item xs={6}>

          {/* Switch Mantis */}
          <form className={classes.other}>
          <FormControl variant="outlined" //className={classes.formControl}
          fullWidth>
            <InputLabel id="switchM">Select Mantis to switch to</InputLabel>
            <Select
              labelId="switchMantis"
              id="switchMantiss"              
              value={switchMantisInfo.mantisid}
              error={(checkErrorSM && 
                switchMantisInfo.mantisid === "") ? true : false} 
              onChange={handleChangeSM('mantisid')}
              //label="Select Category to delete"
            >
            <MenuItem value=""></MenuItem>
              {issue.listAllMantis?.map((item) => (
                <MenuItem value={item._id}>{item.mantisname}</MenuItem>
              ))}
            </Select>
            <FormHelperText 
            style={(checkErrorSM && switchMantisInfo.mantisid === "") ?
              {color: 'red'}:{opacity:0, pointerEvents: 'none'}}            
            >Select a category!</FormHelperText>
            </FormControl>            
            </form>

        <Grid item>
        
        <div >
        <Button variant="contained" color="primary" disabled={enableSMbtn ? false : true } startIcon={<UpdateIcon />} size="medium"
         onClick={switchMantis}>
            Switch Mantis
            {loadSM && <CircularProgress size={24} className={classes.buttonProgress} />}
            </Button>
          </div></Grid>
        </Grid>
        
        <Grid item xs={6}>

          {/* Add category */}
        <form className={classes.other}>
          <TextField id="addCategory" label="Add Category" variant="outlined" fullWidth required  inputProps={{maxLength : 100}} 
           value={addCategoryInfo.category || ''}
           onChange={handleChangeAC('category')}
           error={checkErrorAC && addCategoryInfo.category.trim().length === 0 ? true : false}
          helperText={checkErrorAC && addCategoryInfo.category.trim().length === 0 ? 'Category Name is required' : ' '}/> 
          </form>
          
        <div className = {classes.btnGroup}>
          
          <Button variant="contained" color="primary" startIcon={<AddIcon />}
          disabled={(enableACbtn) ? false : true } 
          onClick={addCategory}>
            Add Category
            {loadAC && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>
        </div></Grid>

        <Grid item xs={6}>

          {/* Remove Category */}
        <form className={classes.other}>
        <FormControl variant="outlined" //className={classes.formControl}
          fullWidth>
            <InputLabel id="delCategory">Select Category to Delete</InputLabel>
            <Select
              labelId="deleteCategory"
              id="removeCategory"
              value={removeCategoryInfo.category}
              error={(checkErrorRC && removeCategoryInfo.category === "") ? true:false}
              onChange={handleChangeRC('category')}
              label="Select Category to delete"
            >
            <MenuItem value="" disabled></MenuItem>
              {issue.listCategory?.categories?.map((item) => (
                <MenuItem value={item.categoryname}>{item.categoryname}</MenuItem>
              ))}
            </Select>
            <FormHelperText 
            style={(checkErrorRC && removeCategoryInfo.category === "") ?
              {color: 'red'}:{opacity:0, pointerEvents: 'none'}}            
            >Select a category!</FormHelperText>
            </FormControl>
            </form>


        <form className={classes.other}>
        <Grid item>
        <div>
        <Button variant="contained" disabled={enableRCbtn ? false : true } startIcon={<DeleteIcon />} size="medium" style={enableDeleteBtn ? {color: red[500] } : {}} onClick={handleOpen}>
            Delete Category
            {loadRC && <CircularProgress size={24} className={classes.buttonProgress} />}
            </Button>
          </div>
          <Grid item>
                <Dialog open={open} >
                  <DialogTitle>Confirm</DialogTitle>
                  <DialogContent>Are you sure want to delete this category?</DialogContent>
                  <DialogActions>
                    <Button onClick={removeCategory} color="primary">Yes</Button>
                    <Button onClick={handleClose} color="primary">No</Button>
                  </DialogActions>
                </Dialog>
          </Grid>
        </Grid>        
         </form></Grid></Grid>
         <div className = {classes.btnBack}>
          <Button variant="contained" startIcon={<ArrowBackIcon/>} onClick={handleBack}>
            Back
          </Button>
          </div>
        </form>
        </Grid>
      </Grid>
    </div>
  )}
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SettingProjectPage));

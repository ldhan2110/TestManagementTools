import React, {useEffect, useState} from 'react';
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import { useHistory } from "react-router-dom";
import {ADD_NEW_TESTPLAN_REQ, GET_ALL_TESTPLAN_REQ, RESET_ADD_NEW_TESTPLAN} from '../../../redux/test-plan/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
import {GET_ALL_BUILD_ACTIVE_REQ } from '../../../redux/build-release/constants';
import {
  Grid,
  Typography,
  Button,
  Divider,
  TextField,
  FormControlLabel,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Checkbox,
  Box,
  Link,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import {
  Add as AddIcon,
} from "@material-ui/icons";
import CancelIcon from '@material-ui/icons/Cancel';
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadButton from '../test-plan-detail-page/upload'


function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="flex" style={{marginLeft: "10px"}}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};




//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { insTestplan: state.testplan.insTestplan, 
           project:state.project.currentSelectedProject,
           listBuilds: state.build.listBuilds }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    addNewTestplanReq: (payload) => dispatch({ type: ADD_NEW_TESTPLAN_REQ, payload }),
    getAllTestplanReq: (payload) => dispatch({ type: GET_ALL_TESTPLAN_REQ, payload}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    getAllBuildActiveReq: (payload) => dispatch({ type: GET_ALL_BUILD_ACTIVE_REQ, payload }),
    resetAddRedux: () => dispatch({type: RESET_ADD_NEW_TESTPLAN}) 
  }
}


const NewTestPlanPage = (props) => {
  const {classes} = props;
    const {isOpen, setOpen} = props;
    const {insTestplan, addNewTestplanReq, displayMsg, getAllTestplanReq, project, resetAddRedux} = props;
    const [open, setOpenPopup] = React.useState(isOpen);
    const history = useHistory();
    const [existTestplans, setExistTestplans] = React.useState(props.history.location.state);
    const [checkError, setCheckError] = useState(false);
    const [error, setError] = useState({
      Testplanname: 'ss',
      description: 'ss',
    });

    const [enableCreateBtn, setEnableCreateBtn] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loadProgress, setLoadProgress] = useState("");
    const [loadEnable, setLoadEnable] = useState(false);
  

  
    const handleClose = () =>{   
      setTestplanInfo({
        Testplanname: '', 
        projectid: project,
        buildname: '',
        description: '',
        is_public: false,
        is_active: false,
        existtestplan: '',
        summaryname: '',
        summaryurl: ''
      });
      history.goBack(); 
    };
    const [TestplanInfo, setTestplanInfo] = useState({
      Testplanname: '',
      projectid: project,
      description: '',
      buildname: '',
      is_public: false,
      is_active: false,
      existtestplan: '',
      summaryname: '',
      summaryurl: ''
    });

  useEffect(()=>{
      setOpenPopup(isOpen);
  },[isOpen, open])

  try {
    useEffect(()=>{
      if (insTestplan.sucess === false){
        setLoading(false);
        displayMsg({
          content: insTestplan.errMsg,
          type: 'error'
        });
        setEnableCreateBtn(true);
        setLoading(false);
         //setLoading(false);
        // Tat thanh loading, tat disable button
        resetAddRedux();
      } else if (insTestplan.sucess === true) {
        setLoading(false);
        displayMsg({
          content: "Create testplan successfully !",
          type: 'success'
        });
        setEnableCreateBtn(true);
        setLoading(false);
        //setLoading(false);
        // Tat thanh loading, tat disable button
        resetAddRedux();
        //getAllTestplanReq();
        handleClose();
      }
    },[insTestplan.sucess]);     
  } catch (error) {
    //console.log('error: '+error);
  }

  const handleCreate = () => {
    setCheckError(true);
    
    if(TestplanInfo.description === "")
    setError({ ...TestplanInfo, description: "" });

    if(TestplanInfo.Testplanname === "")
    setError({ ...TestplanInfo, Testplanname: "" });

    if(TestplanInfo.description.trim().length === 0 || TestplanInfo.Testplanname.trim().length === 0
        ||TestplanInfo.description.trim().length !== TestplanInfo.description.length 
        || TestplanInfo.Testplanname.trim().length !== TestplanInfo.Testplanname.length){
        displayMsg({
          content: "Test Plan Name or Descriptions should not contain spaces before and after !",
          type: 'error'
        });
    }
  
    else if(TestplanInfo.Testplanname !== "" && TestplanInfo.description !== ""){
      setEnableCreateBtn(false);
        setLoading(true);
        addNewTestplanReq(TestplanInfo);
    }
  }

  const handleChange = (prop) => (event) => {
    setTestplanInfo({ ...TestplanInfo, [prop]: event.target.value });

    if(checkError === true)
    setError({ ...error, [prop]: event.target.value });
  };

  const handlePublic = () =>{
    setTestplanInfo({ ...TestplanInfo, is_public: !TestplanInfo.is_public });
  };

  const handleActive = () => {
    setTestplanInfo({ ...TestplanInfo, is_active: !TestplanInfo.is_active });
  };

  const handleNewUrl = (name, url) => {
    setTestplanInfo({ ...TestplanInfo, summaryname: name, summaryurl: url });
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
            New Test Plan
          </Typography>

         
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
        <form className={classes.content}>
          <TextField id="TestplanName" label="Test Plan Name" variant="outlined" fullWidth required inputProps={{maxLength : 100}}
          value={TestplanInfo.Testplanname || ''} onChange={handleChange('Testplanname')}  
          error={TestplanInfo.Testplanname.trim().length === 0 && error.Testplanname.trim().length === 0 ? true : false}
          helperText={TestplanInfo.Testplanname.trim().length === 0 && error.Testplanname.trim().length === 0 ? 'Test Plan Name is required' : ' '}/>

          

          {/*<Grid container fullWidth>
          <FormControl variant="outlined" fullWidth>
           <InputLabel id="demo-simple-select-outlined-label">Create from existing test plan ?</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Create from existing test plan ?"
              onChange={handleChange('testplanname')}
            >
            <MenuItem key={''} value={''}> &nbsp;</MenuItem>
          {existTestplans.map((item, index) => <MenuItem key={index} value={item.testplanname}>{item.testplanname}</MenuItem>)}    
           </Select>
          </FormControl>       
          </Grid>*/}

          <div>
             <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary"  value={TestplanInfo.is_public} onChange={handlePublic}/>}
              label="Public"
              labelPlacement="start"
              checked={TestplanInfo.is_public}
            />
          </div>
          <div>
            <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" value={TestplanInfo.is_active}  onChange={handleActive}/>}
              label="Active"
              labelPlacement="start"
              checked={TestplanInfo.is_active}
            />
          </div>

          <TextField id="descriptions" label="Descriptions" variant="outlined"  fullWidth required multiline rows={5}  
          value={TestplanInfo.description || ''} onChange={handleChange('description')}
          error={TestplanInfo.description.trim().length === 0 && error.description.trim().length === 0 ? true : false}
          helperText={TestplanInfo.description.trim().length === 0 && error.description.trim().length === 0 ? 'Descriptions is required' : ' '}/>

          

          <div>
          <section>
            <aside>                
              <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                <h4>Plan's attachment (Allowed: word, pdf, excel, txt, image)</h4>
                <UploadButton newUrl={handleNewUrl} 
                  setLoadEnable={setLoadEnable} setLoadProgress={setLoadProgress}
                />         
                {loadEnable && <CircularProgressWithLabel value={loadProgress} />}
              </div>
              <ul style={{maxHeight: 100, overflow: 'auto'}}>
                <li style={(TestplanInfo.summaryurl && TestplanInfo.summaryurl !== "") ? {}:{visibility: 'hidden'}}>
                  <Link href={TestplanInfo.summaryurl} target="_blank" rel="noopener">
                  {TestplanInfo.summaryname}
                  </Link>
                </li>
              </ul>
            </aside>
          </section>

          </div>
          
          <div className = {classes.btnGroup}>
          <Button variant="contained" color="primary" disabled={enableCreateBtn ? false : true } startIcon={<AddIcon />} onClick={handleCreate}>
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(NewTestPlanPage));
  
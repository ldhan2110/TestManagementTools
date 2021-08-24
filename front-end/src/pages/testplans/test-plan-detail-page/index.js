import React, {useEffect, useState} from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import { useHistory } from "react-router-dom";
import {UPDATE_TESTPLAN_REQ, DELETE_TESTPLAN_REQ, RESET_UPDATE_TESTPLAN, RESET_DELETE_TESTPLAN, GET_ALL_TESTPLAN_REQ} from '../../../redux/test-plan/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
import {GET_ALL_BUILD_ACTIVE_REQ } from '../../../redux/build-release/constants';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import CancelIcon from '@material-ui/icons/Cancel';
import { red } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadButton from './upload'
import {
  Grid,
  Typography,
  Button,
  Divider,
  TextField,
  FormControlLabel,
  Checkbox,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog,
  Box,
  Link,
} from '@material-ui/core';
import PropTypes from 'prop-types';


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
  return { insTestplan: state.testplan.insTestplan,  project:state.project.currentSelectedProject,
    listBuilds: state.build.listBuilds, insTestplanDelete: state.testplan.insTestplanDelete,
    role: state.project.currentRole }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    updateTestplanReq: (payload) => dispatch({ type: UPDATE_TESTPLAN_REQ, payload }),
    deleteTestplanReq: (payload) => dispatch({ type: DELETE_TESTPLAN_REQ, payload }),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    getAllBuildActiveReq: (payload) => dispatch({ type: GET_ALL_BUILD_ACTIVE_REQ, payload }),
    resetUpdateRedux: () => dispatch({type: RESET_UPDATE_TESTPLAN}),
    getAllTestplanReq: (payload) => dispatch({ type: GET_ALL_TESTPLAN_REQ, payload}),
    resetDeleteRedux: () => dispatch({type: RESET_DELETE_TESTPLAN})
  }
}

const TestPlanDetailPage = (props) => {
    const {classes, updateTestplanReq, insTestplan, role,
           displayMsg, deleteTestplanReq, insTestplanDelete, resetUpdateRedux, resetDeleteRedux, getAllTestplanReq} = props;
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [checkError, setCheckError] = useState(false);
    const [error, setError] = useState({
      testplanname: 'ss',
      description: 'ss',
    });
    const [testplanInfor, setTestplanInfor] = React.useState({
      testplanid: props.match.params.testPlanName,
      projectid: props.match.params.projectName,
      testplanname: props.history.location.state.testplanname,
      buildname: props.history.location.state.buildname,
      description: props.history.location.state.description,
      isActive: props.history.location.state.is_active,
      isPublic: props.history.location.state.is_public,
      created_date: props.history.location.state.created_date,
      summaryname: props.history.location.state.summaryname,
      summaryurl: props.history.location.state.summaryurl,
    });
    
    const [enableCreateBtn, setEnableCreateBtn] = useState(true);
    const [enableDeleteBtn, setEnableDeleteBtn] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loadingg, setLoadingg] = useState(false);
    const [loadProgress, setLoadProgress] = useState("");
    const [loadEnable, setLoadEnable] = useState(false);

    useEffect(()=>{
      if (insTestplan.sucess === false){
        displayMsg({
          content: insTestplan.errMsg,
          type: 'error'
        });
        setEnableCreateBtn(true);
         setLoading(false);
        resetUpdateRedux();
      } else if (insTestplan.sucess === true) {
        displayMsg({
          content: "Update testplan successfully !",
          type: 'success'
        });
        setEnableCreateBtn(true);
        setLoading(false);
        resetUpdateRedux();
        history.goBack();
      }
    },[insTestplan.sucess]);

    try {
      useEffect(()=>{
        if (insTestplanDelete.sucess === false){
          displayMsg({
            content: insTestplanDelete.errMsg,
            type: 'error'
          });
          setEnableDeleteBtn(true);
          setLoadingg(false);
          resetDeleteRedux();
        } else if (insTestplanDelete.sucess === true) {
          displayMsg({
            content: "Delete testplan successfully !",
            type: 'success'
          });

          setEnableDeleteBtn(true);
          setLoadingg(false);
          resetDeleteRedux();
          history.goBack();
        }
      },[insTestplanDelete.sucess]);      
    } catch (error) {
      //console.log('error: '+error);
    }

    

    const handleDelete=()=>{
      setEnableDeleteBtn(false);
    setLoadingg(true);
      deleteTestplanReq(testplanInfor);
      setOpen(false);
    }

    const handleUpdate = () => {
      setCheckError(true);

      if(testplanInfor.description === "")
      setError({ ...testplanInfor, description: "" });
  
      if(testplanInfor.testplanname === "")
      setError({ ...testplanInfor, testplanname: "" });

      if(testplanInfor.description.trim().length === 0 || testplanInfor.testplanname.trim().length === 0
          ||testplanInfor.description.trim().length !== testplanInfor.description.length 
          || testplanInfor.testplanname.trim().length !== testplanInfor.testplanname.length){
          displayMsg({
            content: "Test Plan Name or Descriptions should not contain spaces before and after !",
            type: 'error'
          });
      }
  
      else if(testplanInfor.testplanname !== "" && testplanInfor.description !== "") {
        setEnableCreateBtn(false);
        setLoading(true);
        updateTestplanReq(testplanInfor);
      }
    };
    
    const handleChange = (prop) => (event) => {
      setTestplanInfor({ ...testplanInfor, [prop]: event.target.value });

      if(checkError === true)
      setError({ ...error, [prop]: event.target.value });
    }
  
    const handleIsActive = () =>{
  
      if(testplanInfor.isActive === true || testplanInfor.isActive === 0){
        setTestplanInfor({ ...testplanInfor, isActive: false });
      }
      else{
        setTestplanInfor({ ...testplanInfor, isActive: true });
      }  };
  
    const handleIsPublic = () =>{
  
      if(testplanInfor.isPublic === true || testplanInfor.isPublic === 0){
        setTestplanInfor({ ...testplanInfor, isPublic: false });
      }
      else{
        setTestplanInfor({ ...testplanInfor, isPublic: true });
      }
    };

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleBack = () => {    
      history.goBack();
    };

    const handleNewUrl = (name, url) => {
      setTestplanInfor({ ...testplanInfor, summaryname: name, summaryurl: url });
    };

    return (
    <div>
        <Helmet title="Test Plan Details" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Test Plan Details {/*- {props.history.location.state.testplanname}*/}
          </Typography>
        
          
        </Grid>
        <Grid item>
        <div>
        {(role === 'Project Manager' || role === 'Test Lead') && <Button variant="contained" disabled={enableDeleteBtn ? false : true } startIcon={<DeleteIcon />} size="large" style={enableDeleteBtn ? {color: red[500] } : {}} onClick={handleOpen}>
            Delete Test Plan
            {loadingg && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>}

          </div>
          <Grid item>
                <Dialog open={open} >
                  <DialogTitle>Confirm</DialogTitle>
                  <DialogContent>Are you sure want to delete this test plan?</DialogContent>
                  <DialogActions>
                    <Button onClick={handleDelete} color="primary">Yes</Button>
                    <Button onClick={handleClose} color="primary">No</Button>
                  </DialogActions>
                </Dialog>
          </Grid>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
        <form className={classes.content}>
          <TextField id="testPlanName" label="Test Plan Name" variant="outlined"  fullWidth required inputProps={{maxLength : 100}}
          value={testplanInfor.testplanname || ''} onChange={handleChange('testplanname')}
          error={testplanInfor.testplanname.trim().length === 0 && error.testplanname.trim().length === 0 ? true : false}
          helperText={testplanInfor.testplanname.trim().length === 0 && error.testplanname.trim().length === 0 ? 'Test Plan Name is required' : ' '}/>           

          <div>
             <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" />}
              label="Public"
              labelPlacement="start"
              value={testplanInfor.isPublic}  onChange={handleIsPublic}
              checked={testplanInfor.isPublic}
            />
          </div>
          <div className = {classes.btnSpacingDes}>
            <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" />}
              label="Active"
              labelPlacement="start" 
              value={testplanInfor.isActive}  onChange={handleIsActive}
              checked={testplanInfor.isActive}
            />
          </div>
          <TextField id="descriptions" label="Descriptions" variant="outlined"  fullWidth required multiline rows={5}
          value={testplanInfor.description || ''} onChange={handleChange('description')}
          error={testplanInfor.description.trim().length === 0 && error.description.trim().length === 0 ? true : false}
          helperText={testplanInfor.description.trim().length === 0 && error.description.trim().length === 0 ? 'Descriptions is required' : ' '}/>


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
                <li style={(testplanInfor.summaryurl && testplanInfor.summaryurl !== "") ? {}:{visibility: 'hidden'}}>
                  <Link href={testplanInfor.summaryurl} target="_blank" rel="noopener">
                  {testplanInfor.summaryname}
                  </Link>
                </li>
              </ul>
            </aside>
          </section>

          </div>
          
          
          <div className = {classes.btnGroup}>
          {(role === 'Project Manager' || role === 'Test Lead') && <Button variant="contained" color="primary" disabled={enableCreateBtn ? false : true } startIcon={<UpdateIcon/>} onClick={handleUpdate}>
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(TestPlanDetailPage));

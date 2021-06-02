import React, {useEffect, useState} from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import { useHistory } from "react-router-dom";
import SelectBox from '../../../components/Selectbox';
import DatePicker from '../../../components/DatePicker';
import { connect } from 'react-redux';
import {GET_ALL_BUILDS_REQ, GET_BUILD_BYID_REQ, UPDATE_BUILD_REQ, DELETE_BUILD_REQ, RESET_UPDATE_BUILD, RESET_DELETE_BUILD} from '../../../redux/build-release/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import {GET_ALL_TESTPLAN_REQ} from '../../../redux/test-plan/constants';

import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import CancelIcon from '@material-ui/icons/Cancel';
import { red } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';


import {
  Grid,
  Typography,
  Breadcrumbs,
  Button,
  Divider,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog
} from '@material-ui/core';

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { insBuilds: state.build.insBuilds,  project:state.project.currentSelectedProject,
    build:state.build.currentSelectedBuild, listBuilds: state.build.listBuilds,
    listTestplan: state.testplan.listTestplan, insBuildsDelete: state.build.insBuildsDelete,
    role: state.project.currentRole
  }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    updateBuildReq: (payload) => dispatch({ type: UPDATE_BUILD_REQ, payload }),
    getBuildByIdReq: (payload) => dispatch({ type: GET_BUILD_BYID_REQ, payload}),
    deleteBuildReq: (payload) => dispatch({ type: DELETE_BUILD_REQ, payload}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    getAllTestplanReq: (payload) => dispatch({ type: GET_ALL_TESTPLAN_REQ, payload}),
    resetUpdateRedux: () => dispatch({type: RESET_UPDATE_BUILD}),
    resetDeleteRedux: () => dispatch({type: RESET_DELETE_BUILD})
  }
}

const BuildDetailPage = (props) => {
    const {classes, name} = props;
    const {insBuilds, updateBuildReq, displayMsg,listBuilds,deleteBuildReq, getBuildByIdReq, project, build, listTestplan, getAllTestplanReq, resetUpdateRedux, resetDeleteRedux, insBuildsDelete, role} = props;
    const history = useHistory();
    const [selectedDateStart, setSelectedDateStart] = React.useState(props.history.location.state.releasedate);
    const [checkError, setCheckError] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [error, setError] = useState({
      buildname: 'ss',
      description: 'ss',
      testplan: 'ss'
    });
    const [buildbyid, setBuildbyid] = useState({
      projectid: props.match.params.projectName,
      buildid: props.match.params.buildName
    });  
    const [buildInfor, setBuildInfor] = React.useState({
      buildid: props.match.params.buildName,
      projectid: props.match.params.projectName,
      buildname: props.history.location.state.buildname,
      description: props.history.location.state.descriptions,
      isActive: props.history.location.state.is_active,
      isPublic: props.history.location.state.is_open,
      releasedate: props.history.location.state.releasedate,
      testplan: props.history.location.state.testplanname.testplanname
    });

    const [enableCreateBtn, setEnableCreateBtn] = useState(true);
    const [enableDeleteBtn, setEnableDeleteBtn] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loadingg, setLoadingg] = useState(false);

    useEffect(()=>{
      //if(props.history.location.state.testplanname !== undefined && props.history.location.state.testplanname !== null){ 
        //setBuildInfor({ ...buildInfor, testplan: props.history.location.state.testplanname.testplanname }); 
        //console.log('testplanname: '+JSON.stringify(props.history.location.state.testplanname));
      //}
      getAllTestplanReq(project);
    },[])

    useEffect(()=>{
      setBuildInfor({ ...buildInfor, releasedate: selectedDateStart });
    },[selectedDateStart])

    try {
      useEffect(()=>{
        if (insBuilds.sucess === false){
          setLoading(false);
          displayMsg({
            content: "Build name already exists in this test plan !" ,
            type: 'error'
          });
          setEnableCreateBtn(true);
          setLoading(false);
          resetUpdateRedux();
        } else if (insBuilds.sucess == true) {
          setLoading(false);
          displayMsg({
            content: "Update build successfully !",
            type: 'success'
          });
          setEnableCreateBtn(true);
          setLoading(false);
          resetUpdateRedux();
          history.goBack();
          }
      },[insBuilds.sucess]);   
    } catch (error) {
      console.log("error: "+error);
    }

  useEffect(()=>{
    if (insBuildsDelete.sucess === false){
      setLoadingg(false);
      // displayMsg({
      //   content: insBuildsDelete.errMsg,
      //   type: 'error'
      // }); 
      setEnableDeleteBtn(true);
      setLoadingg(false);
      resetDeleteRedux();
    } else if (insBuildsDelete.sucess == true) {
      setLoadingg(false);
      displayMsg({
        content: "Delete build successfully !",
        type: 'success'
      });
      setEnableDeleteBtn(true);
      setLoadingg(false);
      resetDeleteRedux();
      history.goBack();
      }
  },[insBuildsDelete.sucess]);

    const handleDateStart = (date) => {
      setSelectedDateStart(date);
    };

    const handleUpdate = () => {
      try {
        setCheckError(true);

        if(buildInfor.description === "")
        setError({ ...buildInfor, description: "" });
    
        if(buildInfor.buildname === "")
        setError({ ...buildInfor, buildname: "" });
    
        if(buildInfor.description.trim().length == 0 || buildInfor.buildname.trim().length == 0
            ||buildInfor.description.trim().length !== buildInfor.description.length 
            || buildInfor.buildname.trim().length !== buildInfor.buildname.length){
            displayMsg({
              content: "Build Name or Description should not contain spaces !",
              type: 'error'
            });
        }
    
        else if(buildInfor.buildname !== "" && buildInfor.description !== ""){
          setEnableCreateBtn(false);
          setLoading(true);
          updateBuildReq(buildInfor);
        }
      //console.log('buildInfor: '+JSON.stringify(buildInfor));     
      } catch (error) {
      displayMsg({
          content: 'Build error',
          type: 'error'
        }); 
      }
      
    };

  const handleChange = (prop) => (event) => {
    setBuildInfor({ ...buildInfor, [prop]: event.target.value });
    if(checkError == true)
    setError({ ...error, [prop]: event.target.value });
  }

  const handleIsActive = () =>{
    if(buildInfor.isActive === true || buildInfor.isActive === 0){
      setBuildInfor({ ...buildInfor, isActive: false });
    }
    else{
      setBuildInfor({ ...buildInfor, isActive: true });
    }  };

  const handleIsPublic = () =>{

    if(buildInfor.isPublic === true || buildInfor.isPublic === 0){
      setBuildInfor({ ...buildInfor, isPublic: false });
    }
    else{
      setBuildInfor({ ...buildInfor, isPublic: true });
    }
  };

  const handleDelete = () =>{
    setEnableDeleteBtn(false);
    setLoadingg(true);
    deleteBuildReq(buildbyid);
    setOpen(false);
    //console.log('buildid and projectid: '+buildbyid);
  }

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

    return (
    <div>
        <Helmet title="New Test Plan" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Build Detail - {props.history.location.state.buildname}
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
        <Grid item>
        <div>
          {(role === 'projectmanager' || role === 'testlead') && <Button variant="contained" disabled={enableDeleteBtn == true ? false : true } startIcon={<DeleteIcon />} size="large" style={{ color: red[500] }} onClick={handleOpen}>
            Delete Build
            {loadingg && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>}
          </div>
          <Grid item>
                <Dialog open={open} >
                  <DialogTitle>Confirm</DialogTitle>
                  <DialogContent>Are you sure want to delete this build?</DialogContent>
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
          <TextField id="buildName" label="Build Name" variant="outlined"  fullWidth 
          required value={buildInfor.buildname || ''} onChange={handleChange('buildname')}
          error={buildInfor.buildname.trim().length == 0 && error.buildname.trim().length == 0 ? true : false}
          helperText={buildInfor.buildname.trim().length == 0 && error.buildname.trim().length == 0 ? 'Build Name is required' : ' '}/>

        

          <FormControl variant="outlined"  fullWidth>
                              <InputLabel id="testPlan">Test Plan</InputLabel>
                                <Select
                                  labelId="testPlan"
                                  id="testPlan"
                                  value={buildInfor.testplan || ''}
                                  onChange={handleChange('testplan')}
                                  label="Test Plan"
                                  disabled={true}
                                >
                               {listTestplan.map((item) => (
                                    <MenuItem value={item.testplanname}>{item.testplanname}</MenuItem>
                               ))}
                              </Select>
          </FormControl>
            
          <div>
             <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" 
              value={buildInfor.isPublic}  onChange={handleIsPublic}
              checked={buildInfor.isPublic}
              />}
              label="Public"
              labelPlacement="start"
            />
          </div>
          <div>
            <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" 
              value={buildInfor.isActive}  onChange={handleIsActive}
              checked={buildInfor.isActive} 
              />}
              label="Active"
              labelPlacement="start"
            />
          </div>
          <Grid container spacing={3}>
              <Grid item xs={12}>
                 <DatePicker label="Release Date" 
                 value={buildInfor.releasedate}
                 onChange={handleDateStart}/>
              </Grid>
          </Grid>
         
          
              <TextField id="description" label="Description" variant="outlined"  fullWidth 
              required multiline rows={2} value={buildInfor.description || ''} onChange={handleChange('description')}
              error={buildInfor.description.trim().length == 0 && error.description.trim().length == 0 ? true : false}
              helperText={buildInfor.description.trim().length == 0 && error.description.trim().length == 0 ? 'Description is required' : ' '}/>


          <div className = {classes.btnGroup}>
          {(role === 'projectmanager' || role === 'testlead') && <Button variant="contained" color="primary" disabled={enableCreateBtn == true ? false : true } startIcon={<UpdateIcon />} onClick={handleUpdate}>
            Update
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>}
          <Button variant="contained" startIcon={<CancelIcon />} onClick={handleBack}>
            Cancel
          </Button>

          
          
            
        </div>
        </form>
        </Grid>
      </Grid>
    </div>
    );
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(BuildDetailPage));

import React, {useEffect, useState} from "react";
import styles from "./styles";
import styled from "styled-components";
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import { useHistory, useLocation } from "react-router-dom";
//import SelectBox from '../../../components/Selectbox';
import {UPDATE_REQUIREMENTS_REQ, DELETE_REQUIREMENTS_REQ, RESET_UPDATE_REQUIREMENTS, RESET_DELETE_REQUIREMENTS, GET_ALL_REQUIREMENTS_REQ} from '../../../redux/requirements/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
import {GET_ALL_BUILD_ACTIVE_REQ } from '../../../redux/build-release/constants';
//import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import CancelIcon from '@material-ui/icons/Cancel';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green, orange, red } from "@material-ui/core/colors";
import { spacing } from "@material-ui/system";
import {
  Grid, Paper, List, ListItem, ListItemText, Chip as MuiChip, ListItemSecondaryAction,
  Typography,
  //Breadcrumbs,
  Button,
  Divider,
  TextField,
  //FormControl,
  //MenuItem,
  //InputLabel,
  //Select,
  FormControlLabel,
  Checkbox,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog
} from '@material-ui/core';


const Chip = styled(MuiChip)`
  ${spacing};

  background: ${props => props.active && green[500]};
  background: ${props => props.pass && green[500]};
  background: ${props => props.fail && red[500]};
  background: ${props => props.block && orange[500]};
  background: ${props => props.sent && orange[700]};
  color: ${props => (props.active || props.sent) && props.theme.palette.common.white};
  color: ${props => (props.pass || props.sent) && props.theme.palette.common.white};
  color: ${props => (props.fail || props.sent) && props.theme.palette.common.white};
  color: ${props => (props.block || props.sent) && props.theme.palette.common.white};
`

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { insRequirements: state.requirements.insRequirements,  project:state.project.currentSelectedProject,
    //listBuilds: state.build.listBuilds,
    insRequirementsDelete: state.requirements.insRequirementsDelete,
    role: state.project.currentRole }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    updateRequirementsReq: (payload) => dispatch({ type: UPDATE_REQUIREMENTS_REQ, payload }),
    deleteRequirementsReq: (payload) => dispatch({ type: DELETE_REQUIREMENTS_REQ, payload }),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    getAllBuildActiveReq: (payload) => dispatch({ type: GET_ALL_BUILD_ACTIVE_REQ, payload }),
    resetUpdateRedux: () => dispatch({type: RESET_UPDATE_REQUIREMENTS}),
    getAllRequirementsReq: (payload) => dispatch({ type: GET_ALL_REQUIREMENTS_REQ, payload}),
    resetDeleteRedux: () => dispatch({type: RESET_DELETE_REQUIREMENTS})
  }
}

const DetailRequirementPage = (props) => {
    const {classes, listRequirements, name, match, updateRequirementsReq, insRequirements, role,
           displayMsg, deleteRequirementsReq, insRequirementsDelete, resetUpdateRedux, resetDeleteRedux, getAllRequirementsReq} = props;
    const history = useHistory();
    const location = useLocation();
    const [open, setOpen] = React.useState(false);
    const [checkError, setCheckError] = useState(false);
    const [error, setError] = useState({
      projectrequirementname: 'ss',
      description: 'ss',
    });
    const [requirementsInfor, setRequirementsInfor] = React.useState({
      requirementsid: props.history.location.state._id,
      projectid: props.match.params.projectName,
      projectrequirementname: props.history.location.state.projectrequirementname,
      buildname: props.history.location.state.buildname,
      description: props.history.location.state.description,
      isActive: props.history.location.state.is_active,
      isPublic: props.history.location.state.is_public,
      created_date: props.history.location.state.created_date  
    });

    const [listExec, setListExec] = React.useState(props.history.location.state.testexecution);
    const [listTc, setListTc] = React.useState(props.history.location.state.listtestcase);
    
    const [enableCreateBtn, setEnableCreateBtn] = useState(true);
    const [enableDeleteBtn, setEnableDeleteBtn] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loadingg, setLoadingg] = useState(false);

    useEffect(()=>{
      if (insRequirements.sucess === false){
        displayMsg({
          content: insRequirements.errMsg,
          type: 'error'
        });
        setEnableCreateBtn(true);
         setLoading(false);
        resetUpdateRedux();
      } else if (insRequirements.sucess === true) {
        displayMsg({
          content: "Update requirement successfully !",
          type: 'success'
        });
        setEnableCreateBtn(true);
        setLoading(false);
        resetUpdateRedux();
        history.goBack();
      }
    },[insRequirements.sucess]);

    try {
      useEffect(()=>{
        if (insRequirementsDelete.sucess === false){
          displayMsg({
            content: insRequirementsDelete.errMsg,
            type: 'error'
          });
          setEnableDeleteBtn(true);
          setLoadingg(false);
          resetDeleteRedux();
        } else if (insRequirementsDelete.sucess === true) {
          displayMsg({
            content: "Delete requirement successfully !",
            type: 'success'
          });
          //getAllTestplanReq(props.match.params.projectName);
          setEnableDeleteBtn(true);
          setLoadingg(false);
          resetDeleteRedux();
          history.goBack();
        }
      },[insRequirementsDelete.sucess]);      
    } catch (error) {
      //console.log('error: '+error);
    }

    // useEffect(()=>{
    //   console.log(history);
    //   console.log(location);
    //   getAllBuildActiveReq(project); 
    // },[listExec])

    const handleDelete=()=>{
      setEnableDeleteBtn(false);
      setLoadingg(true);
      deleteRequirementsReq(requirementsInfor);
      setOpen(false);
    }

    const handleUpdate = () => {
      setCheckError(true);

      if(requirementsInfor.description === "")
      setError({ ...requirementsInfor, description: "" });
  
      if(requirementsInfor.projectrequirementname === "")
      setError({ ...requirementsInfor, projectrequirementname: "" });

      if(requirementsInfor.description.trim().length === 0 || requirementsInfor.projectrequirementname.trim().length === 0
          ||requirementsInfor.description.trim().length !== requirementsInfor.description.length 
          || requirementsInfor.projectrequirementname.trim().length !== requirementsInfor.projectrequirementname.length){
          displayMsg({
            content: "Requirement Name or Descriptions should not contain spaces before and after !",
            type: 'error'
          });
      }
  
      else if(requirementsInfor.projectrequirementname !== "" && requirementsInfor.description !== "") {
        setEnableCreateBtn(false);
        setLoading(true);
        updateRequirementsReq(requirementsInfor);
      }   
    };
    
    const handleChange = (prop) => (event) => {
      setRequirementsInfor({ ...requirementsInfor, [prop]: event.target.value });

      if(checkError === true)
      setError({ ...error, [prop]: event.target.value });
    }
  
    const handleIsActive = () =>{
  
      if(requirementsInfor.isActive === true || requirementsInfor.isActive === 0){
        setRequirementsInfor({ ...requirementsInfor, isActive: false });
      }
      else{
        setRequirementsInfor({ ...requirementsInfor, isActive: true });
      }  };
  
    const handleIsPublic = () =>{
  
      if(requirementsInfor.isPublic === true || requirementsInfor.isPublic === 0){
        setRequirementsInfor({ ...requirementsInfor, isPublic: false });
      }
      else{
        setRequirementsInfor({ ...requirementsInfor, isPublic: true });
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
      //setOpen(false);
    };

    return (
    <div>
        <Helmet title="Requirement Details" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Requirement Details {/*- {props.history.location.state.projectrequirementname}*/}
          </Typography>
        </Grid>
        <Grid item>
        <div>
        {(role === 'Project Manager' || role === 'Test Lead') && <Button variant="contained" disabled={enableDeleteBtn ? false : true } startIcon={<DeleteIcon />} size="large" style={enableDeleteBtn ? {color: red[500] } : {}} onClick={handleOpen}>
            Delete Requirement
            {loadingg && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>}

          </div>
          <Grid item>
                <Dialog open={open} >
                  <DialogTitle>Confirm</DialogTitle>
                  <DialogContent>Are you sure want to delete this requirement?</DialogContent>
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
          <TextField id="requirementName" label="Requirement Name" variant="outlined"  fullWidth required inputProps={{maxLength : 100}}
          value={requirementsInfor.projectrequirementname || ''} onChange={handleChange('projectrequirementname')}
          error={requirementsInfor.projectrequirementname.trim().length === 0 && error.projectrequirementname.trim().length === 0 ? true : false}
          helperText={requirementsInfor.projectrequirementname.trim().length === 0 && error.projectrequirementname.trim().length === 0 ? 'Test Plan Name is required' : ' '}/>           

          <div>
             <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" />}
              label="Public"
              labelPlacement="start"
              value={requirementsInfor.isPublic}  onChange={handleIsPublic}
              checked={requirementsInfor.isPublic}
            />
          </div>
          <div className = {classes.btnSpacingDes}>
            <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" />}
              label="Active"
              labelPlacement="start" 
              value={requirementsInfor.isActive}  onChange={handleIsActive}
              checked={requirementsInfor.isActive}
            />
          </div>
          <TextField id="descriptions" label="Descriptions" variant="outlined"  fullWidth required multiline rows={3}
          value={requirementsInfor.description || ''} onChange={handleChange('description')}
          error={requirementsInfor.description.trim().length === 0 && error.description.trim().length === 0 ? true : false}
          helperText={requirementsInfor.description.trim().length === 0 && error.description.trim().length === 0 ? 'Descriptions is required' : ' '}/>
          <Grid container spacing={1}>
              {/* <Grid item xs={12}><Typography variant="h4" gutterBottom display="inline">List Test Executions</Typography></Grid> 
              <Grid item xs={12}>
                <Paper style={{maxHeight: 200, overflow: 'auto'}}>
                <List>
                  {listExec && listExec.map((item,index) => 
                    <ListItem key={index} dense button  selected> */} {/* onClick={()=>{if (!isExecute){history.push(location.pathname+'/test-exec/'+item._id)}}}> */}
                      {/* <ListItemText id={item.id} primary={item.testexecutionname} />
                      <ListItemSecondaryAction>
                        {item.status === 'Untest' && <Chip size="small" mr={1} mb={1} label={item.status} />}
                        {item.status === 'Pass' && <Chip size="small" mr={1} mb={1} label={item.status} pass={1}/>}
                        {item.status === 'Blocked' && <Chip size="small" mr={1} mb={1} label={item.status} block={1}/>}
                        {item.status === 'Fail' && <Chip size="small" mr={1} mb={1} label={item.status} fail={1}/>}
                      </ListItemSecondaryAction>
                    </ListItem>
                  )}
                </List>
                </Paper>
              </Grid> */}
              <Grid item xs={12}><Typography variant="h4" gutterBottom display="inline">List Test Cases</Typography></Grid> 
              <Grid item xs={12}>
                <Paper style={{maxHeight: 200, overflow: 'auto'}}>
                <List>
                  {listTc && listTc.map((item,index) => 
                    <ListItem key={index} dense button  selected> {/* onClick={()=>{if (!isExecute){history.push(location.pathname+'/test-exec/'+item._id)}}}> */}
                      <ListItemText id={item._id} primary={item.testcaseName} />
                      <ListItemSecondaryAction>
                        {item.status === 'Untest' && <Chip size="small" mr={1} mb={1} label={item.status} />}
                        {item.status === 'Pass' && <Chip size="small" mr={1} mb={1} label={item.status} pass={1}/>}
                        {item.status === 'Blocked' && <Chip size="small" mr={1} mb={1} label={item.status} block={1}/>}
                        {item.status === 'Fail' && <Chip size="small" mr={1} mb={1} label={item.status} fail={1}/>}
                      </ListItemSecondaryAction>
                    </ListItem>
                  )}
                </List>
                </Paper>
              </Grid> 
            </Grid>
          
          
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(DetailRequirementPage));

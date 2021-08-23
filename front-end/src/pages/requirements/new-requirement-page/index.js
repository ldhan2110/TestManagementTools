import React, {useEffect, useState} from 'react';
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import { useHistory } from "react-router-dom";
import {ADD_NEW_REQUIREMENTS_REQ, GET_ALL_REQUIREMENTS_REQ, RESET_ADD_NEW_REQUIREMENTS} from '../../../redux/requirements/constants';
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
  Checkbox
} from '@material-ui/core';
import {
  Add as AddIcon,
} from "@material-ui/icons";
import CancelIcon from '@material-ui/icons/Cancel';
import CircularProgress from '@material-ui/core/CircularProgress';




//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { insRequirements: state.requirements.insRequirements, 
           project:state.project.currentSelectedProject,
           listBuilds: state.build.listBuilds }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    addNewRequirementsReq: (payload) => dispatch({ type: ADD_NEW_REQUIREMENTS_REQ, payload }),
    getAllRequirementsReq: (payload) => dispatch({ type: GET_ALL_REQUIREMENTS_REQ, payload}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    getAllBuildActiveReq: (payload) => dispatch({ type: GET_ALL_BUILD_ACTIVE_REQ, payload }),
    resetAddRedux: () => dispatch({type: RESET_ADD_NEW_REQUIREMENTS}) 
  }
}


const NewRequirementPage = (props) => {
  const {classes} = props;
    const {isOpen, setOpen} = props;
    const {insRequirements, addNewRequirementsReq, displayMsg, getAllRequirementsReq, project,  resetAddRedux} = props;
    const [open, setOpenPopup] = React.useState(isOpen);
    const history = useHistory();
    const [checkError, setCheckError] = useState(false);
    const [error, setError] = useState({
      projectrequirementname: 'ss',
      description: 'ss',
    });

    const [enableCreateBtn, setEnableCreateBtn] = useState(true);
    const [loading, setLoading] = useState(false);
  

  
    const handleClose = () =>{   
      setRequirementsInfo({
        projectrequirementname: '', 
        projectid: project,
        description: '',
        is_public: false,
        is_active: false,
      });
      history.goBack(); 
    };
    const [requirementsInfo, setRequirementsInfo] = useState({
      projectrequirementname: '',
      projectid: project,
      description: '',
      is_public: false,
      is_active: false,
    });

  useEffect(()=>{
      setOpenPopup(isOpen);
  },[isOpen, open])

  try {
    useEffect(()=>{
      if (insRequirements.sucess === false){
        setLoading(false);
        displayMsg({
          content: insRequirements.errMsg,
          type: 'error'
        });
        setEnableCreateBtn(true);
        setLoading(false);
         //setLoading(false);
        // Tat thanh loading, tat disable button
        resetAddRedux();
      } else if (insRequirements.sucess === true) {
        setLoading(false);
        displayMsg({
          content: "Create requirement successfully !",
          type: 'success'
        });
        setEnableCreateBtn(true);
        setLoading(false);
        //setLoading(false);
        // Tat thanh loading, tat disable button
        resetAddRedux();
        getAllRequirementsReq();
        handleClose();
      }
    },[insRequirements.sucess]);     
  } catch (error) {
    //console.log('error: '+error);
  }

  const handleCreate = () => {
    setCheckError(true);

    if(requirementsInfo.description === "")
    setError({ ...requirementsInfo, description: "" });

    if(requirementsInfo.projectrequirementname === "")
    setError({ ...requirementsInfo, projectrequirementname: "" });

    if(requirementsInfo.description.trim().length === 0 || requirementsInfo.projectrequirementname.trim().length === 0
        ||requirementsInfo.description.trim().length !== requirementsInfo.description.length 
        || requirementsInfo.projectrequirementname.trim().length !== requirementsInfo.projectrequirementname.length){
        displayMsg({
          content: "Requirement Name or Descriptions should not contain spaces before and after !",
          type: 'error'
        });
    }
  
    else if(requirementsInfo.projectrequirementname !== "" && requirementsInfo.description !== ""){
      setEnableCreateBtn(false);
        setLoading(true);
        addNewRequirementsReq(requirementsInfo);
    }
  }

  
  const handleChange = (prop) => (event) => {
    setRequirementsInfo({ ...requirementsInfo, [prop]: event.target.value });

    if(checkError === true)
    setError({ ...error, [prop]: event.target.value });
  };

  const handlePublic = () =>{
    setRequirementsInfo({ ...requirementsInfo, is_public: !requirementsInfo.is_public });
  };

  const handleActive = () => {
    setRequirementsInfo({ ...requirementsInfo, is_active: !requirementsInfo.is_active });
  };




    return (
    <div>
        <Helmet title="New Requirement" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            New Requirement
          </Typography>

        
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
        <form className={classes.content}>
          <TextField id="RequirementName" label="Requirement Name" variant="outlined" fullWidth required inputProps={{maxLength : 100}}
          value={requirementsInfo.projectrequirementname || ''} onChange={handleChange('projectrequirementname')}  
          error={requirementsInfo.projectrequirementname.trim().length === 0 && error.projectrequirementname.trim().length === 0 ? true : false}
          helperText={requirementsInfo.projectrequirementname.trim().length === 0 && error.projectrequirementname.trim().length === 0 ? 'Requirement Name is required' : ' '}/>
          <div>
             <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary"  value={requirementsInfo.is_public} onChange={handlePublic}/>}
              label="Public"
              labelPlacement="start"
              checked={requirementsInfo.is_public}
            />
          </div>
          <div>
            <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" value={requirementsInfo.is_active}  onChange={handleActive}/>}
              label="Active"
              labelPlacement="start"
              checked={requirementsInfo.is_active}
            />
          </div>

          <TextField id="descriptions" label="Descriptions" variant="outlined"  fullWidth required multiline rows={9}  
          value={requirementsInfo.description || ''} onChange={handleChange('description')}
          error={requirementsInfo.description.trim().length === 0 && error.description.trim().length === 0 ? true : false}
          helperText={requirementsInfo.description.trim().length === 0 && error.description.trim().length === 0 ? 'Descriptions is required' : ' '}/>

          
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(NewRequirementPage));
  
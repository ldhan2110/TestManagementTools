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
  //Breadcrumbs,
  Button,
  Divider,
  TextField,
  FormControlLabel,
  FormControl,
  Checkbox
} from '@material-ui/core';
import {
  Add as AddIcon,
} from "@material-ui/icons";
//import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
  const {classes, listRequirements} = props;
    const {isOpen, setOpen} = props;
    const {insRequirements, addNewRequirementsReq, displayMsg, getAllRequirementsReq, project, listBuilds, getAllBuildActiveReq, resetAddRedux} = props;
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
        //buildname: '',
        description: '',
        is_public: false,
        is_active: false,
        //existtestplan: ''
      });
      history.goBack(); 
    };
    const [requirementsInfo, setRequirementsInfo] = useState({
      projectrequirementname: '',
      projectid: project,
      description: '',
      //buildname: '',
      is_public: false,
      is_active: false,
      //existtestplan: ''
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
    console.log('error: '+error);
  }

  const handleCreate = () => {
    setCheckError(true);
    // Diable button , them thanh loading 
    //setDisableButton(false);
    //if(disableButton === false){
        // disableButton 
        // them thanh loading
        // check dieu kien

    if(requirementsInfo.description === "")
    setError({ ...requirementsInfo, description: "" });

    if(requirementsInfo.projectrequirementname === "")
    setError({ ...requirementsInfo, projectrequirementname: "" });

    if(requirementsInfo.description.trim().length === 0 || requirementsInfo.projectrequirementname.trim().length === 0
        ||requirementsInfo.description.trim().length !== requirementsInfo.description.length 
        || requirementsInfo.projectrequirementname.trim().length !== requirementsInfo.projectrequirementname.length){
        displayMsg({
          content: "Requirement Name or Description should not contain spaces !",
          type: 'error'
        });
    }
  
    else if(requirementsInfo.projectrequirementname !== "" && requirementsInfo.description !== ""){
      setEnableCreateBtn(false);
        setLoading(true);
        addNewRequirementsReq(requirementsInfo);
    }
    //console.log(JSON.stringify(TestplanInfo));
  }

  const handleCloseBackDrop = () => {
    setOpen(false);
  };

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
  
    //const listtestplan = [
      /*{ title: 'Monty Python and the Holy Grail', year: 1975 },
      { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },*/
      
    
    //];

    /*const listtestplan =[{"testplanname":"test1"},{"testplanname":"test2"}];*/
  



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
          <TextField id="RequirementName" label="Requirement Name" variant="outlined" fullWidth required inputProps={{maxLength : 16}}
          value={requirementsInfo.projectrequirementname || ''} onChange={handleChange('projectrequirementname')}  
          error={requirementsInfo.projectrequirementname.trim().length === 0 && error.projectrequirementname.trim().length === 0 ? true : false}
          helperText={requirementsInfo.projectrequirementname.trim().length === 0 && error.projectrequirementname.trim().length === 0 ? 'Requirement Name is required' : ' '}/>

          

          <Grid container fullWidth>
           {/*<Grid item xs={3}>
              <Grid container>
              <Grid item xs={3}>

                <p>Create from existing test plan ?</p>
              </Grid>
              <Grid item xs={9}>
                <SelectBox labelTitle="Create from existing test plan ?" />
                {data.map(function(d, listTestPlan){
                return (<li listItems={listTestPlan} >{d.testplanname}</li> ) 
                
              })}
       
              </Grid>

              
          </Grid>*/}

              {/* render() {
                const data =[{"name":"test1"},{"name":"test2"}];
                const listItems = data.map((d) => <li key={d.name}>{d.name}</li>);

                  return (
                      <div>
                        {listItems }
                      </div>
                         );
                }*/}  
          <FormControl variant="outlined" fullWidth>
           {/*<InputLabel id="demo-simple-select-outlined-label">Create from existing requirement ?</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="testplan"
              onChange={handleChange('testplanname')}
            >
          {existTestplans?.map((item, index) => <MenuItem key={index} value={item.testplanname}>{item.testplanname}</MenuItem>)}    
           </Select>*/} 
          </FormControl>       
          </Grid>

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

          <TextField id="descriptions" label="Description" variant="outlined"  fullWidth required multiline rows={9}  
          value={requirementsInfo.description || ''} onChange={handleChange('description')}
          error={requirementsInfo.description.trim().length === 0 && error.description.trim().length === 0 ? true : false}
          helperText={requirementsInfo.description.trim().length === 0 && error.description.trim().length === 0 ? 'Description is required' : ' '}/>

          
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
  
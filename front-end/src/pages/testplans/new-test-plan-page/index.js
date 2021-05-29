import React, {useEffect, useState} from 'react';
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import { useHistory } from "react-router-dom";
import SelectBox from '../../../components/Selectbox';
import {ADD_NEW_TESTPLAN_REQ, GET_ALL_TESTPLAN_REQ, RESET_ADD_NEW_TESTPLAN} from '../../../redux/test-plan/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
import {GET_ALL_BUILD_ACTIVE_REQ } from '../../../redux/build-release/constants';
import Slide from '@material-ui/core/Slide';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Grid,
  Typography,
  Breadcrumbs,
  Button,
  Divider,
  TextField,
  FormControlLabel,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Checkbox
} from '@material-ui/core';
import {
  Add as AddIcon,
} from "@material-ui/icons";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CancelIcon from '@material-ui/icons/Cancel';
import CircularProgress from '@material-ui/core/CircularProgress';




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
  const {classes, listTestPlan} = props;
    const {isOpen, setOpen} = props;
    const {insTestplan, addNewTestplanReq, displayMsg, getAllTestplanReq, project, listBuilds, getAllBuildActiveReq, resetAddRedux} = props;
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
  

  
    const handleClose = () =>{   
      setTestplanInfo({
        Testplanname: '', 
        projectid: project,
        buildname: '',
        description: '',
        is_public: false,
        is_active: false,
        existtestplan: ''
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
      existtestplan: ''
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
      } else if (insTestplan.sucess == true) {
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
        getAllTestplanReq();
        handleClose();
      }
    },[insTestplan.sucess]);     
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

    if(TestplanInfo.description === "")
    setError({ ...TestplanInfo, description: "" });

    if(TestplanInfo.Testplanname === "")
    setError({ ...TestplanInfo, Testplanname: "" });

    if(TestplanInfo.description.trim().length == 0 || TestplanInfo.Testplanname.trim().length == 0
        ||TestplanInfo.description.trim().length !== TestplanInfo.description.length 
        || TestplanInfo.Testplanname.trim().length !== TestplanInfo.Testplanname.length){
        displayMsg({
          content: "Test Plan Name or Description should not contain spaces !",
          type: 'error'
        });
    }
  
    else if(TestplanInfo.Testplanname !== "" && TestplanInfo.description !== ""){
      setEnableCreateBtn(false);
        setLoading(true);
        addNewTestplanReq(TestplanInfo);
    }
    //console.log(JSON.stringify(TestplanInfo));
  }

  const handleCloseBackDrop = () => {
    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setTestplanInfo({ ...TestplanInfo, [prop]: event.target.value });

    if(checkError == true)
    setError({ ...error, [prop]: event.target.value });
  };

  const handlePublic = () =>{
    setTestplanInfo({ ...TestplanInfo, is_public: !TestplanInfo.is_public });
  };

  const handleActive = () => {
    setTestplanInfo({ ...TestplanInfo, is_active: !TestplanInfo.is_active });
  };
  
    const listtestplan = [
      /*{ title: 'Monty Python and the Holy Grail', year: 1975 },
      { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },*/
      
    
    ];

    /*const listtestplan =[{"testplanname":"test1"},{"testplanname":"test2"}];*/
  



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
          <TextField id="TestplanName" label="Test Plan Name" variant="outlined" fullWidth required inputProps={{maxLength : 16}}
          value={TestplanInfo.Testplanname || ''} onChange={handleChange('Testplanname')}  
          error={TestplanInfo.Testplanname.trim().length==0 && error.Testplanname.trim().length==0 ? true : false}
          helperText={TestplanInfo.Testplanname.trim().length==0 && error.Testplanname.trim().length==0 ? 'Test Plan Name is required' : ' '}/>

          

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
           <InputLabel id="demo-simple-select-outlined-label">Create from existing test plan ?</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="testplan"
              onChange={handleChange('testplanname')}
            >
          {existTestplans.map((item, index) => <MenuItem key={index} value={item.testplanname}>{item.testplanname}</MenuItem>)}    
           </Select>
          </FormControl>       
          </Grid>

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

          <TextField id="descriptions" label="Description" variant="outlined"  fullWidth required multiline rows={9}  
          value={TestplanInfo.description || ''} onChange={handleChange('description')}
          error={TestplanInfo.description.trim().length==0 && error.description.trim().length==0 ? true : false}
          helperText={TestplanInfo.description.trim().length==0 && error.description.trim().length==0 ? 'Description is required' : ' '}/>

          
          <div className = {classes.btnGroup}>
          <Button variant="contained" color="primary" disabled={enableCreateBtn == true ? false : true } startIcon={<AddIcon />} onClick={handleCreate}>
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
  
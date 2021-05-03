import React, {useEffect, useState} from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import { useHistory } from "react-router-dom";
import SelectBox from '../../../components/Selectbox';
import DatePicker from '../../../components/DatePicker';
import { connect } from 'react-redux';
import {GET_ALL_BUILDS_REQ, GET_BUILD_BYID_REQ, UPDATE_BUILD_REQ, DELETE_BUILD_REQ} from '../../../redux/build-release/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import {GET_ALL_TESTPLAN_REQ} from '../../../redux/test-plan/constants';


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
} from '@material-ui/core';

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { insBuilds: state.build.insBuilds,  project:state.project.currentSelectedProject,
    build:state.build.currentSelectedBuild, listBuilds: state.build.listBuilds,
    listTestplan: state.testplan.listTestplan}
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    updateBuildReq: (payload) => dispatch({ type: UPDATE_BUILD_REQ, payload }),
    getBuildByIdReq: (payload) => dispatch({ type: GET_BUILD_BYID_REQ, payload}),
    deleteBuildReq: (payload) => dispatch({ type: DELETE_BUILD_REQ, payload}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    getAllTestplanReq: (payload) => dispatch({ type: GET_ALL_TESTPLAN_REQ, payload}),
  }
}

const BuildDetailPage = (props) => {
    const {classes, name} = props;
    const {insBuilds, updateBuildReq, displayMsg,listBuilds,deleteBuildReq,
       getBuildByIdReq, project, build, listTestplan, getAllTestplanReq} = props;
    const [buildbyid, setBuildbyid] = useState({
      projectid: props.match.params.projectName,
      buildid: props.match.params.buildName
    });
    
    const history = useHistory();
    const [buildInfor, setBuildInfor] = React.useState({
      buildid: props.match.params.buildName,
      projectid: props.match.params.projectName,
      buildname: props.history.location.state.buildname,
      description: props.history.location.state.descriptions,
      isActive: props.history.location.state.is_active,
      isPublic: props.history.location.state.is_open,
      releasedate: props.history.location.state.releasedate,
      testplan: ''
    });
    const [selectedDateStart, setSelectedDateStart] = React.useState(props.history.location.state.releasedate);

    useEffect(()=>{
      if(props.history.location.state.testplanname !== undefined){ 
        console.log('testplanname: '+props.history.location.state.testplanname);
        setBuildInfor({ ...buildInfor, testplan: props.history.location.state.testplanname.testplanname }); 
      }
      getAllTestplanReq(project);
    },[])

    useEffect(()=>{
 
      /*setBuildInfor({ ...buildInfor, 
        buildid: props.match.params.buildName,
        projectid: props.match.params.projectName,
        buildname: props.history.location.state.buildname,
        description: props.history.location.state.descriptions,
        isActive: props.history.location.state.is_active,
        isPublic: props.history.location.state.is_open,
        releasedate: props.history.location.state.releasedate    
      });*/
     
    },[buildInfor]);

    useEffect(()=>{
      setBuildInfor({ ...buildInfor, releasedate: selectedDateStart });
  },[selectedDateStart])

  useEffect(()=>{
    if (insBuilds.sucess === false){
      displayMsg({
        content: insBuilds.errMsg,
        type: 'error'
      });
    } else if (insBuilds.sucess == true) {
      displayMsg({
        content: "Update build successfully !",
        type: 'success'
      });
      history.goBack();
    }
  },[insBuilds.sucess]);

    const handleDateStart = (date) => {
      setSelectedDateStart(date);
      
    };

    const handleUpdate = () => {
      //updateBuildReq(buildInfor);
      console.log('buildInfor: '+JSON.stringify(buildInfor));
    };

    const handleDelete = () =>{
      //deleteBuildReq(buildbyid);
    }

  const handleChange = (prop) => (event) => {
    setBuildInfor({ ...buildInfor, [prop]: event.target.value });
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



    return (
    <div>
        <Helmet title="New Test Plan" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Build/Release - {props.history.location.state.buildname}
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
          <TextField id="buildName" label="Name" variant="outlined"  fullWidth 
          required value={buildInfor.buildname || ''}
          onChange={handleChange('buildname')}/>
          <TextField id="description" label="Descriptions" variant="outlined"  fullWidth 
          required multiline rows={20} value={buildInfor.description || ''}
          onChange={handleChange('description')}/>

          <FormControl variant="outlined"  fullWidth>
                              <InputLabel id="testPlan">Testplan</InputLabel>
                                <Select
                                  labelId="testPlan"
                                  id="testPlan"
                                  value={buildInfor.testplan || ''}
                                  onChange={handleChange('testplan')}
                                  label="Testplan"
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
         
          
          
          <div className = {classes.btnGroup}>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </div>
        </form>
        </Grid>
      </Grid>
    </div>
    );
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(BuildDetailPage));

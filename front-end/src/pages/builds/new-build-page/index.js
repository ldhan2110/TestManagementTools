import React, {useEffect, useState} from 'react';
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import { useHistory } from "react-router-dom";
import SelectBox from '../../../components/Selectbox';
import DatePicker from '../../../components/DatePicker';
import {ADD_NEW_BUILD_REQ, GET_ALL_BUILD_REQ} from '../../../redux/build-release/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
import {
  Grid,
  Typography,
  Breadcrumbs,
  Button,
  Divider,
  TextField,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';


//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { insBuild: state.build.insBuild,
            project:state.project.currentSelectedProject
  }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    addNewBuildReq: (payload) => dispatch({ type: ADD_NEW_BUILD_REQ, payload }),
    getAllBuildReq: () => dispatch({ type: GET_ALL_BUILD_REQ}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload })
  }
}

const NewBuildPage = (props) => {
    const {classes, listBuilds} = props;
    const {isOpen, setOpen} = props;
    const {insBuild, addNewBuildReq, displayMsg, getAllBuildReq, project} = props;
    //const [open, setOpenPopup] = React.useState(isOpen);

    const history = useHistory();

    const handleClose = () =>{
      history.goBack();
      setBuildInfo({
        buildname: '',
        descriptions: '',
        isActive: false,
        isOpen: false,
        releasedate: '',
        projectid: project
      }) 
    };

    const [buildInfo, setBuildInfo] = useState({
      buildname: '',      
      descriptions: '',
      isActive: false,
      isOpen: false,      
      releasedate: '08/18/2014',
      projectid: project
    });

    /* useEffect(()=>{
      setOpenPopup(isOpen);
  },[isOpen, open]) */

    useEffect(()=>{
      if (insBuild.sucess === false){
        displayMsg({
          content: insBuild.errMsg,
          type: 'error'
        });
      } else if (insBuild.sucess == true) {
        displayMsg({
          content: "Create build successfully !",
          type: 'success'
        });
        //getAllBuildReq();
        handleClose();
      }
      /* console.log(insBuild);
      console.log(project); */
    },[insBuild]);

    

  


    const handleCreate = () => {
      //console.log('go here');
      addNewBuildReq(buildInfo);
    };

    const handleChange = (prop) => (event) => {
      setBuildInfo({...buildInfo, [prop]: event.target.value});
    };

    const handleOpen = () => {
      setBuildInfo({...buildInfo, isOpen: !buildInfo.isOpen });
    };

    const handleActive = () => {
      setBuildInfo({...buildInfo, isActive: !buildInfo.isActive });
    };

    //const handleReleaseDate = (prop) => (event) => {
    //  setBuildInfo({...buildInfo, [prop]: event.target.value});
    //};
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
          <TextField id="buildName" label="Build name" variant="outlined"  fullWidth required  value={buildInfo.buildname || ''} onChange={handleChange('buildname')}/>
          <TextField id="descriptions" label="Descriptions" variant="outlined"  fullWidth required multiline rows={20} value={buildInfo.descriptions || ''} onChange={handleChange('descriptions')}/>
          <Grid container fullWidth>
              <Grid item xs={2}>
                <p>Create from existing build ?</p>
              </Grid>
              <Grid item xs={10}>
                <SelectBox labelTitle="Create from existing build ?" listItems={listBuilds ? listBuilds : null} />
              </Grid>
          </Grid>
            
          <div>
             <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" value={buildInfo.isActive} onChange={handleActive}/>}
              label="Active"
              labelPlacement="start"
            />
          </div>
          <div>
            <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" value={buildInfo.isOpen} onChange={handleOpen}/>}
              label="Open"
              labelPlacement="start"
            />
          </div>
          <Grid container spacing={3}>
              <Grid item xs={12}>
                 <DatePicker id="DPreleaseDate" label="Release Date" value={buildInfo.releasedate} />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField id="buildName" label="Branch" variant="outlined" fullWidth   />  
              </Grid>
              <Grid item xs={12}>
                <TextField id="buildName" label="Name" variant="outlined" fullWidth/>
              </Grid> */}
          </Grid>
         
          
          
          <div className = {classes.btnGroup}>
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Create
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Back
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
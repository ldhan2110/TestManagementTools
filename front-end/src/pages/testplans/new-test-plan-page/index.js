import React, {useEffect, useState} from 'react';
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import { useHistory } from "react-router-dom";
import SelectBox from '../../../components/Selectbox';
import {ADD_NEW_TESTPLAN_REQ, GET_ALL_TESTPLAN_REQ} from '../../../redux/test-plan/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
import Slide from '@material-ui/core/Slide';


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

import {
  Add as AddIcon,
} from "@material-ui/icons";




//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { insTestplan: state.project.insTestplan }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    addNewTestplanReq: (payload) => dispatch({ type: ADD_NEW_TESTPLAN_REQ, payload }),
    getAllTestplanReq: () => dispatch({ type: GET_ALL_TESTPLAN_REQ}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload })
  }
}


const NewTestPlanPage = (props) => {
  const {classes, listTestPlans} = props;
    const {isOpen, setOpen} = props;
    const {insTestplan, addNewTestplanReq, displayMsg, getAllTestplanReq} = props;
    const [open, setOpenPopup] = React.useState(isOpen);

    const history = useHistory();

    const handleClose = () =>{
      history.goBack();    
      setTestplanInfo({
        Testplanname: '',
        description: '',
        is_public: false,
        active: false
      }) 
    }

    const [TestplanInfo, setTestplanInfo] = useState({
      Testplanname: '',
      description: '',
      is_public: false,
      active: false
    });

  useEffect(()=>{
      setOpenPopup(isOpen);
  },[isOpen, open])

  useEffect(()=>{
    if (insTestplan.sucess === false){
      displayMsg({
        content: insTestplan.errMsg,
        type: 'error'
      });
    } else if (insTestplan.sucess == true) {
      displayMsg({
        content: "Create testplan successfully !",
        type: 'success'
      });
      getAllTestplanReq();
      handleClose();
    }
  },[insTestplan.sucess]); 


    const handleCreate = () => {
      addNewTestplanReq(TestplanInfo);
    }
  
    const handleChange = (prop) => (event) => {
      setTestplanInfo({ ...TestplanInfo, [prop]: event.target.value });
    };
  
    const handlePublic = () =>{
      setTestplanInfo({ ...TestplanInfo, is_public: !TestplanInfo.is_public });
    };
  
    const handleActive = () => {
      setTestplanInfo({ ...TestplanInfo, active: !TestplanInfo.active });
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
        <TextField id="TestplanName" label="Testplan Name" variant="outlined"  fullWidth required  value={TestplanInfo.Testplanname || ''} onChange={handleChange('Testplanname')} inputProps={{maxLength : 16}} />
          <TextField id="descriptions" label="Descriptions" variant="outlined"  fullWidth required multiline rows={20}  value={TestplanInfo.description || ''} onChange={handleChange('description')}/>
          <Grid container fullWidth>
              <Grid item xs={3}>
                <p>Create from existing test plan ?</p>
              </Grid>
              <Grid item xs={9}>
                <SelectBox labelTitle="Create from existing test plan ?" listItems={listTestPlans ? listTestPlans : null} />
              </Grid>
          </Grid>
            
          <div>
             <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary"  value={TestplanInfo.is_public} onChange={handlePublic}/>}
              label="Public"
              labelPlacement="start"
            />
          </div>
          <div>
            <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" value={TestplanInfo.active}  onChange={handleActive}/>}
              label="Active"
              labelPlacement="start"
            />
          </div>
          <div className = {classes.btnGroup}>
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Create
          </Button>
          <Button variant="contained" onClick={handleClose}>
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
  
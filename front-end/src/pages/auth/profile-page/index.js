import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import {UPDATE_PROFILE_REQ, UPDATE_PASSWORD_REQ, GET_CURRENT_USER_REQ} from '../../../redux/users/constants';
import React, {useEffect, useState} from "react";
import styles from './styles';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Divider,
  Grid,
  Avatar
} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import { CircularProgress } from '@material-ui/core';

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return {
    user: state.user,
    insProfile: state.user.insProfile,
    insPassword: state.user.insPassword,
    inforProfile: state.user.inforProfile}
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    updateProfileReq: (payload) => dispatch({ type: UPDATE_PROFILE_REQ, payload }),
    updatePasswordReq: (payload) => dispatch({ type: UPDATE_PASSWORD_REQ, payload }),
    getCurrentProfileReq: (payload) => dispatch({ type: GET_CURRENT_USER_REQ, payload}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload })
  }
}

const ProfilePage = (props)=>{

  const {insProfile, user, updateProfileReq, updatePasswordReq, inforProfile, getCurrentProfileReq, insPassword, displayMsg,} = props;
  const {classes} = props;
  const [error, setError] = useState({
    fullname: 'ss',
  });
  const [open, setOpen] = React.useState(false);
  const [checkError, setCheckError] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    fullname: '',
    email: '',
    phonenumber: '',
    introduction: ''
  });

  const [passwordInfo, setPasswordInfo] = useState({
    password: '',
    confirmpassword: ''
  });
  const [enableCreateBtn, setEnableCreateBtn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingAva, setLoadingAva] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  const history = useHistory();

  useEffect(()=>{
    user.getCurrentUserSuccess = null;
    getCurrentProfileReq();
  },[]);

    useEffect(()=>{
      try {
      setProfileInfo({ ...profileInfo, 
        fullname: inforProfile.fullname,
        email: inforProfile.email,
        phonenumber: inforProfile.phonenumber,
        introduction: inforProfile.introduction
      });
    } catch (error) {
      //console.log('error: '+ error);
    }
    },[inforProfile])   



  const handleUpdateProfile = () => {
    setCheckError(true);


    if(profileInfo.fullname === "")
    setError({ ...profileInfo, fullname: "" });

    if(profileInfo.fullname.trim().length === 0 ||profileInfo.fullname.trim().length !== profileInfo.fullname.length ){
      displayMsg({
        content: "Fullname should not contain spaces before and after !",
        type: 'error'
      });
    }

    else if(profileInfo.fullname !== ""){
      displayMsg({
        content: "Save profile successfully !",
        type: 'success'
      });
    setEnableCreateBtn(false);
    setLoading(true);
    updateProfileReq(profileInfo);
    handleClose();
  }

  };

  const handleClose = () => {
    history.goBack();
    setOpen(false);
  };

  const handleUpdatePassword = () => {
    updatePasswordReq(passwordInfo);
  };

  const handleChangeProfile = (prop) => (event) => {
    setProfileInfo({ ...profileInfo, [prop]: event.target.value });
    if(checkError === true)
    setError({ ...error, [prop]: event.target.value });
  };

  const handleChangePassword = (prop) => (event) => {
    setPasswordInfo({ ...passwordInfo, [prop]: event.target.value });
  };

  const uploadAvatar = (url) => {
    setAvatarUrl(url);
  }

  const handleLoadAva = (load) => {
    setLoadingAva(load);
  }

    return (
      <div className={classes.root}>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
          <Typography component="h1" variant="h1" gutterBottom className = {classes.title}>
                Profile
          </Typography>
          {user.getCurrentUserSuccess=== "" && <CircularProgress size={35} style={{marginTop:'-15px', marginLeft: 15}}/>}
          </div>
          <Divider my={6}/>
          <Grid container justify="space-between" className={classes.content} spacing={5}>
              <Grid item xs={6}>
                <form className={classes.formContent}>
                    <TextField id="fullname" label="Full Name" 
                    variant="outlined"  fullWidth required inputProps={{maxLength : 100}} 
                    value={profileInfo.fullname || ''} onChange={handleChangeProfile('fullname')}
                    error={profileInfo.fullname==0  && error.fullname==0  ? true : false}
                    helperText={profileInfo.fullname ==0  && error.fullname ==0  ? 'Full Name is required' : ' '}/>  

                  <TextField id="email" label="Email" variant="outlined"  fullWidth required disabled={true}
                  value={profileInfo.email || ''} onChange={handleChangeProfile('email')}/>

                  <TextField id="phone" label="Phone Number" variant="outlined"  fullWidth 
                  value={profileInfo.phonenumber || ''} onChange={handleChangeProfile('phonenumber')}/>

                  <TextField id="Introductions" label="Introductions" variant="outlined"  fullWidth multiline 
                  rows={3} value={profileInfo.introduction || ''} onChange={handleChangeProfile('introduction')}/>
                  <div className = {classes.btnGroup}>
                      <Button variant="contained" color="primary"  startIcon={<SaveIcon/>} onClick={handleUpdateProfile}>Save Changes
                      {/*{loading && <CircularProgress size={24} className={classes.buttonProgress} />} */}
                      </Button>
                  </div>
                </form>
              </Grid>
              <Grid item xs={6} className={classes.avatarContainer}>
                <Avatar alt="Remy Sharp" src="http://assets.pokemon.com/assets/cms2/img/pokedex/detail/796.png" className={classes.avatar} />                
              </Grid>

              <Grid item xs={6}> 
              <Typography variant="h5" component="h5" gutterBottom className = {classes.title}>Change Password</Typography>
                <Grid container spacing={3} >
                  <Grid item xs={12}>
                      <TextField id="password" label="Password" variant="outlined" fullWidth required type="password" value={passwordInfo.password || ''} onChange={handleChangePassword('password')}/>
                  </Grid>
                  <Grid item xs={12}>    
                    <TextField id="confirmpassword" label="Confirm Password" variant="outlined" fullWidth type="password" required value={passwordInfo.confirmpassword || ''} onChange={handleChangePassword('confirmpassword')}/>
                  </Grid>
                  <Grid item xs={12}>   
                      <div className = {classes.btnGroup}>
                        <Button variant="contained" color="primary" onClick={handleUpdatePassword}>Change Password</Button>
                    </div>
                  </Grid>
                </Grid>
               

                


              </Grid>
          </Grid>
      </div>
    );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ProfilePage));
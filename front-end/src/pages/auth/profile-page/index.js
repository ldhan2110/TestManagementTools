import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import {UPDATE_PROFILE_REQ, UPDATE_PASSWORD_REQ, GET_CURRENT_USER_REQ} from '../../../redux/users/constants';
import React, {useEffect, useState} from "react";
import styles from './styles';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  Typography,
  Divider,
  Grid,
  Avatar
} from "@material-ui/core";
import UploadButton from "../../../components/UploadButton";

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return {insProfile: state.user.insProfile,
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

  const {insProfile, insPassword, updateProfileReq, updatePasswordReq, displayMsg, inforProfile, getCurrentProfileReq} = props;
  const {classes} = props;

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

  useEffect(()=>{
    getCurrentProfileReq();
    //console.log('get data');
  },[]);

  useEffect(()=>{
    setProfileInfo({ ...profileInfo, 
      fullname: inforProfile.fullname,
      email: inforProfile.email,
      phonenumber: inforProfile.phonenumber,
      introduction: inforProfile.introduction
    });
  },[inforProfile])

  /*useEffect(()=>{
    if (insProfile.sucess === false){
      displayMsg({
        content: insProfile.errMsg,
        type: 'error'
      });
    } else if (insProfile.sucess == true) {
      displayMsg({
        content: "Update Profile successfully !",
        type: 'success'
      });
    }
  },[insProfile.sucess]);*/

  const handleUpdateProfile = () => {
    updateProfileReq(profileInfo);
    console.log(JSON.stringify(profileInfo, null, '  ')); 
    console.log('inforProfile: '+JSON.stringify(inforProfile, null, '  ')); 
    //console.log('update profile');  
  };

  const handleUpdatePassword = () => {
    updatePasswordReq(passwordInfo);
    console.log(JSON.stringify(passwordInfo, null, '  ')); 
    //console.log('update password');  
  };

  const handleChangeProfile = (prop) => (event) => {
    setProfileInfo({ ...profileInfo, [prop]: event.target.value });
  };

  const handleChangePassword = (prop) => (event) => {
    setPasswordInfo({ ...passwordInfo, [prop]: event.target.value });
  };

    return (
      <div className={classes.root}>
          <Typography component="h1" variant="h1" gutterBottom className = {classes.title}>
                Profile
          </Typography>
          <Divider my={6}/>
          <Grid container justify="space-between" className={classes.content}>
              <Grid item xs={6}>
                <form className={classes.formContent}>
                  <div className={classes.nameContainer}>
                    <TextField id="fullname" label="Full Name" variant="outlined"  fullWidth
                    value={profileInfo.fullname || ''} onChange={handleChangeProfile('fullname')}/>
                  </div>

                  <TextField id="email" label="Email" variant="outlined"  fullWidth required
                  value={profileInfo.email || ''} onChange={handleChangeProfile('email')}/>
                  <TextField id="phone" label="Phone Number" variant="outlined"  fullWidth 
                  value={profileInfo.phonenumber || ''} onChange={handleChangeProfile('phonenumber')}/>
                  <TextField id="Introductions" label="Introductions" variant="outlined"  fullWidth multiline 
                  rows={10} value={profileInfo.introduction || ''} onChange={handleChangeProfile('introduction')}/>
                  <div className = {classes.btnGroup}>
                      <Button variant="contained" color="primary" onClick={handleUpdateProfile}>Save Changes</Button>
                  </div>

                  <TextField id="password" label="Password" variant="outlined"  fullWidth required
                  value={passwordInfo.password || ''} onChange={handleChangePassword('password')}/>
                  <TextField id="confirmpassword" label="Confirm Password" variant="outlined"  fullWidth 
                  required value={passwordInfo.confirmpassword || ''} onChange={handleChangePassword('confirmpassword')}/>
                  <div className = {classes.btnGroup}>
                      <Button variant="contained" color="primary" onClick={handleUpdatePassword}>Change Password</Button>
                  </div>
                </form>
              </Grid>
              <Grid item xs className={classes.avatarContainer}>
                <Avatar alt="Remy Sharp" src="" className={classes.avatar} />
                <UploadButton/>
              </Grid>
          </Grid>
      </div>
    );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ProfilePage));
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

  const {insProfile, updateProfileReq, updatePasswordReq, inforProfile, getCurrentProfileReq, insPassword, displayMsg,} = props;
  const {classes} = props;
  const [error, setError] = useState({
    fullname: 'ss',
  });
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

  useEffect(()=>{
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
      console.log('error: '+ error);
    }
    },[inforProfile])   




  const handleUpdateProfile = () => {
    setCheckError(true);


    if(profileInfo.fullname === "")
    setError({ ...profileInfo, fullname: "" });

    if(profileInfo.fullname !== "")
    updateProfileReq(profileInfo);
  };

  const handleUpdatePassword = () => {
    updatePasswordReq(passwordInfo);
    console.log(JSON.stringify(passwordInfo, null, '  ')); 
    console.log(JSON.stringify('insProfile: '+insProfile, null, '  ')); 
  };

  const handleChangeProfile = (prop) => (event) => {
    if(checkError === true)
    setError({ ...error, [prop]: event.target.value });

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
          <Grid container justify="space-between" className={classes.content} spacing={5}>
              <Grid item xs={6}>
                <form className={classes.formContent}>
                    <TextField id="fullname" label="Full Name" 
                    variant="outlined"  fullWidth required inputProps={{maxLength : 16}} 
                    value={profileInfo.fullname || ''} onChange={handleChangeProfile('fullname')}
                    error={profileInfo.fullname === 0 && error.fullname === 0 ? true : false}
                    helperText={profileInfo.fullname === 0 && error.fullname === 0 ? 'Full Name is required' : ' '}/>  

                    {/*<TextField id="fullname" label="Full Name" 
                    variant="outlined"  fullWidth
                    value={profileInfo.fullname || ''} onChange={handleChangeProfile('fullname')}
                    error={!profileInfo.fullname && !error.fullname ? true : false}
    />*/}

                  <TextField id="email" label="Email" variant="outlined"  fullWidth required disabled={true}
                  value={profileInfo.email || ''} onChange={handleChangeProfile('email')}/>

                  <TextField id="phone" label="Phone Number" variant="outlined"  fullWidth 
                  value={profileInfo.phonenumber || ''} onChange={handleChangeProfile('phonenumber')}/>

                  <TextField id="Introductions" label="Introductions" variant="outlined"  fullWidth multiline 
                  rows={10} value={profileInfo.introduction || ''} onChange={handleChangeProfile('introduction')}/>
                  <div className = {classes.btnGroup}>
                      <Button variant="contained" color="primary" onClick={handleUpdateProfile}>Save Changes</Button>
                  </div>
                </form>
              </Grid>
              <Grid item xs={6} className={classes.avatarContainer}>
                <Avatar alt="Remy Sharp" src="http://assets.pokemon.com/assets/cms2/img/pokedex/detail/796.png" className={classes.avatar} />
                <UploadButton/>
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
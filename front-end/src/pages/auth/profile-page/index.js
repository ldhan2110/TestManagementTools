import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import {UPDATE_PROFILE_REQ, UPDATE_PASSWORD_REQ, GET_CURRENT_USER_REQ, UPDATE_AVATAR_REQ} from '../../../redux/users/constants';
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
import UploadButton from "../../../components/UploadButton.js";
import { Image } from 'cloudinary-react'
import CircularProgress from '@material-ui/core/CircularProgress';
import CancelIcon from '@material-ui/icons/Cancel';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

function CircularProgressWithLabel(props) {
    return (
      <Box position="relative" display="flex" style={{marginLeft: "10px"}}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
  };


//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return {
    user: state.user,
    insAvatar: state.user.insAvatar,
    insProfile: state.user.insProfile,
    insPassword: state.user.insPassword,
    inforProfile: state.user.inforProfile}
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    updateProfileReq: (payload) => dispatch({ type: UPDATE_PROFILE_REQ, payload }),
    updateAvatarReq: (payload) => dispatch({ type: UPDATE_AVATAR_REQ, payload }),
    updatePasswordReq: (payload) => dispatch({ type: UPDATE_PASSWORD_REQ, payload }),
    getCurrentProfileReq: (payload) => dispatch({ type: GET_CURRENT_USER_REQ, payload}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload })
  }
}

const ProfilePage = (props)=>{

  const {insProfile, insAvatar, updateAvatarReq, user, updateProfileReq, updatePasswordReq, inforProfile, getCurrentProfileReq, insPassword, displayMsg,} = props;
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
  const [avatarId, setAvatarId] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loadProgress, setLoadProgress] = useState("");
  const [loadEnable, setLoadEnable] = useState(false);

  const history = useHistory();

  useEffect(()=>{
    user.getCurrentUserSuccess = null;
    getCurrentProfileReq();
  },[]);

    useEffect(()=>{
      try {
      setAvatarId(inforProfile.avatar);
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
    //updateAvatarReq(avatarId);
    setEnableCreateBtn(false);
    setLoading(true);
    updateProfileReq(profileInfo);
    handleClose();
  }
  };

  useEffect(()=>{
    if(insAvatar?.sucess === false)
    {
      displayMsg({
        content: insAvatar.errMsg,
        type: 'error'
      });
    }
    
    else if (insAvatar?.sucess === true) {
      getCurrentProfileReq();
      displayMsg({
        content: "Update avatar successfully!",
        type: 'success'
      });
    }
  },[insAvatar]);

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

  const handleUploadedId = (id) => {
    updateAvatarReq(id);
  }


    return (
      <div className={classes.root}>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
          <Typography component="h1" variant="h1" gutterBottom className = {classes.title}>
                Profile
          </Typography>
          {user.getCurrentUserSuccess === "" && <CircularProgress size={35} style={{marginTop:'-15px', marginLeft: 15}}/>}
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
                      <Button variant="contained" style={{marginLeft: 10}} startIcon={<CancelIcon/>} onClick={handleClose}>Cancel Edit</Button>
                  </div>
                </form>
              </Grid>
              <Grid item xs={6} className={classes.avatarContainer}>
              <Typography variant="h5" component="h5" gutterBottom className = {classes.titleImg}>
                Change profile picture
                </Typography>                
                  {/* <Avatar alt="Remy Sharp" src="http://assets.pokemon.com/assets/cms2/img/pokedex/detail/796.png" className={classes.avatar} /> */}                
                <UploadButton upload={uploadAvatar} uploadedPictureId={handleUploadedId} 
                  setLoadEnable={setLoadEnable} setLoadProgress={setLoadProgress}/>
                <Image cloudName="testcontrol" publicId={avatarId} 
                width="250" height="250" quality="auto" fetchFormat="auto" crop="fill"/>                
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
              <Grid item xs={6} style={{width:'100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
                {loadEnable && <CircularProgressWithLabel value={loadProgress} />}
                </Grid>
          </Grid>
      </div>
    );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ProfilePage));
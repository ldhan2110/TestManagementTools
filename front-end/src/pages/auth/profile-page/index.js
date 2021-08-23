import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import {UPDATE_PROFILE_REQ, UPDATE_PASSWORD_REQ, GET_CURRENT_USER_REQ, UPDATE_AVATAR_REQ} from '../../../redux/users/constants';
import React, {useEffect, useState} from "react";
import Helmet from 'react-helmet';
import styles from './styles';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {
  TextField,
  Button,
  Typography,
  Divider,
  Grid,
  FormControl,
  InputLabel,
  Avatar
} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import UploadButton from "../../../components/UploadButton.js";
import { Image } from 'cloudinary-react'
import CircularProgress from '@material-ui/core/CircularProgress';
import CancelIcon from '@material-ui/icons/Cancel';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {CONFIRM_RESET_PASSWORD_REQ, RESET_CONFIRM_RESET_PASSWORD} from '../../../redux/account/constants';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';

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
    inforProfile: state.user.inforProfile,
    isConfirmPassword: state.account.isConfirmPassword}
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    updateProfileReq: (payload) => dispatch({ type: UPDATE_PROFILE_REQ, payload }),
    updateAvatarReq: (payload) => dispatch({ type: UPDATE_AVATAR_REQ, payload }),
    updatePasswordReq: (payload) => dispatch({ type: UPDATE_PASSWORD_REQ, payload }),
    getCurrentProfileReq: (payload) => dispatch({ type: GET_CURRENT_USER_REQ, payload}),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    resetAddRedux: () => dispatch({type: RESET_CONFIRM_RESET_PASSWORD})
  }
}

const ProfilePage = (props)=>{

  const {insProfile, insAvatar, updateAvatarReq, user, updateProfileReq, updatePasswordReq, inforProfile, getCurrentProfileReq, insPassword, displayMsg,isConfirmPassword, resetAddRedux} = props;
  const {classes} = props;
  const [error, setError] = useState({
    fullname: 'ss',
    password: 'ss',
      confirmpassword: 'ss',
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
    confirmpassword: '',
    showPassword: false,
    showPasswordd: false,
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
    setCheckError(false);
    setOpen(false);
  };

  const handleClear = () => {
    setPasswordInfo({
      password: '',
      confirmpassword: ''
    })
    setCheckError(false);
  };

  useEffect(()=>{
    if (insPassword?.sucess === false){
      displayMsg({
        content: insPassword.errMsg,
        type: 'error'
      });
      //setCheckErrorMsg(false);
      setEnableCreateBtn(true);
      setLoading(false);
      resetAddRedux();
        } 
        
      else if (insPassword?.sucess  === true) {
      displayMsg({
        content: "Change password successfully !",
        type: 'success'
      });
      setEnableCreateBtn(true);
      setLoading(false);
      handleClear();
      resetAddRedux();
    }
  },[insPassword?.sucess]); 

  const handleUpdatePassword = () => {
    setCheckError(true);
        
        if(passwordInfo.password === "")
        setError({ ...passwordInfo, password: "" });

        if(passwordInfo.confirmpassword === "")
        setError({ ...passwordInfo, confirmpassword: "" });

        if(passwordInfo.confirmpassword !== passwordInfo.password)
        setError({ ...passwordInfo, confirmpassword: "" });

       /* if(values.password === "" && values.confirmPassword === "" && values.password.trim().length == values.confirmPassword.trim().length)
        setError({ ...values, password: "" }); */

        /*if(values.password.trim().length == 0 && values.confirmPassword.trim().length == 0
         && isConfirmPassword.sucess == true ){
          setError({ ...values, password: "" });
    }*/
        
        if(passwordInfo.password !== "" && passwordInfo.confirmpassword !== "" 
        && passwordInfo.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/)
        && passwordInfo.confirmpassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/)){
          setEnableCreateBtn(false);
          setLoading(true);
          updatePasswordReq(passwordInfo);
        }

  };

  const handleChangeProfile = (prop) => (event) => {
    setProfileInfo({ ...profileInfo, [prop]: event.target.value });
    if(checkError === true)
    setError({ ...error, [prop]: event.target.value });
  };

  const handleChangePassword = (prop) => (event) => {
    setPasswordInfo({ ...passwordInfo, [prop]: event.target.value });

    if(checkError === true)
setError({ ...error, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setPasswordInfo({ ...passwordInfo, showPassword: !passwordInfo.showPassword });
  };

const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

const handleClickShowPasswordd = () => {
  setPasswordInfo({ ...passwordInfo, showPasswordd: !passwordInfo.showPasswordd });
  };

  const handleMouseDownPasswordd = (event) => {
    event.preventDefault();
   };

  const uploadAvatar = (url) => {
    setAvatarUrl(url);
  }

  const handleUploadedId = (id) => {
    updateAvatarReq(id);
  }


    return (
      
      <div className={classes.root}><Helmet title={profileInfo.fullname} />
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
                  {!avatarId && <Avatar alt="Remy Sharp" src="" className={classes.avatar} />}
                
                <Image cloudName="testcontrol" publicId={avatarId} 
                width="250" height="250" quality="auto" fetchFormat="auto" crop="fit"/>  
                <UploadButton upload={uploadAvatar} uploadedPictureId={handleUploadedId} 
                  setLoadEnable={setLoadEnable} setLoadProgress={setLoadProgress}/>              
              </Grid>

              <Grid item xs={6}> 
              <Typography variant="h5" component="h5" gutterBottom className = {classes.title} >Change Password</Typography>
                <Grid container spacing={3} >
                  <Grid item xs={12}>
                  <FormControl className = {classes.form}  variant="outlined" fullWidth required={true}>
                <InputLabel htmlFor="new password">New Password</InputLabel>
                <OutlinedInput
                    id="new password"
                      //error={error.password === 0 && values.password === 0 ? true : false}
                      
                      error={checkError && error.password.trim().length === 0 && passwordInfo.password.trim().length === 0 ? true : false}
                      error={checkError && !error.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/) && !passwordInfo.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/) ? true : false}
                      
                      value={passwordInfo.password}
                      onChange={handleChangePassword('password')}
                      labelWidth={100}
                      fullWidth
                      required={true}
                      //type="password"
                      type={passwordInfo.showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {passwordInfo.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      } 
                  />
                  {checkError && !error.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/) && !passwordInfo.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/) && <FormHelperText id="component-error-text" error={true}>Password must be 8-16 characters, at least 1 uppercase, 1 lowercase, and 1 number</FormHelperText>} 
            </FormControl>
                      {/*label="Password" variant="outlined" fullWidth required type="password" value={passwordInfo.password || ''} onChange={handleChangePassword('password')}/>*/}
                      <Grid item xs={12}> 
                      <Grid container spacing={3}>
                  <Grid item xs={12}>
                      <FormControl  className = {classes.form} variant="outlined" fullWidth required={true}>
                <InputLabel htmlFor="confirm new password">Confirm New Password</InputLabel>
                <OutlinedInput
                    id="confirm new password"
                    error={error.confirmpassword === 0 && passwordInfo.confirmpassword === 0 ? true : false}
                    // error={!values.password.match(/^.{8,16}$/) && !values.confirmPassword.match(/^.{8,16}$/) ? true : false}
                    
                    error={checkError && error.confirmpassword.trim().length === 0 && passwordInfo.confirmpassword.trim().length === 0 ? true : false}
                    error={checkError && !error.confirmpassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/) && !passwordInfo.confirmpassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/) ? true : false}
        
                     /*error={values.error ? true : false} */
                     value={passwordInfo.confirmpassword}
                     onChange={handleChangePassword('confirmpassword')}
                     labelWidth={150}
                     fullWidth
                     required={true}
                     //type="confirmPassword"
                     type={passwordInfo.showPasswordd ? 'text' : 'password'}
                     endAdornment={
                       <InputAdornment position="end">
                         <IconButton
                           aria-label="toggle password visibility"
                           onClick={handleClickShowPasswordd}
                           onMouseDown={handleMouseDownPasswordd}
                           edge="end"
                         >
                           {passwordInfo.showPasswordd ? <Visibility /> : <VisibilityOff />}
                         </IconButton>
                       </InputAdornment>
                     } 
                 />
                 {checkError && !error.confirmpassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/) && !passwordInfo.confirmpassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/) && <FormHelperText id="component-error-text" error={true}>Confirm New Password must be 8-16 characters, at least 1 uppercase, 1 lowercase, and 1 number</FormHelperText>} 
            
           </FormControl>
           </Grid>
           </Grid>
           </Grid>
                   {/*label="Confirm Password" variant="outlined" fullWidth type="password" required value={passwordInfo.confirmpassword || ''} onChange={handleChangePassword('confirmpassword')}/>*/}
                  </Grid>
                  <Grid item xs={12}>   
                      <div className = {classes.btnGroup}>
                        <Button variant="contained" color="primary"  disabled={enableCreateBtn ? false : true }  onClick={handleUpdatePassword}>Change Password
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </Button>
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
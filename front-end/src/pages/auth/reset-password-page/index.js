import React, {useState, useEffect} from "react";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import { useHistory } from "react-router-dom";
//import styles from "./styles";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
//import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {CONFIRM_RESET_PASSWORD_REQ, RESET_CONFIRM_RESET_PASSWORD} from '../../../redux/account/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReplayIcon from '@material-ui/icons/Replay';
import CancelIcon from '@material-ui/icons/Cancel';

import {
    FormControl,
    //Input,
    InputLabel,
    Button as MuiButton,
    //Paper,
    Typography
  } from "@material-ui/core";

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { isConfirmPassword: state.account.isConfirmPassword }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    confirmResetPasswordReq: (payload) => dispatch({ type: CONFIRM_RESET_PASSWORD_REQ, payload }),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload,}),
    resetAddRedux: () => dispatch({type: RESET_CONFIRM_RESET_PASSWORD})
  }
}


const ResetPassword = (props) => {
    //const {isOpen, setOpenState} = props;

    const {isConfirmPassword, confirmResetPasswordReq, displayMsg, resetAddRedux } = props;

    //const [open,setOpen] = useState(isOpen);

    const history = useHistory();
    const [enableCreateBtn, setEnableCreateBtn] = useState(true);
    const [loading, setLoading] = useState(false);

    //const [isShowPassword,setShowPassword] = useState(false);
    const classes = useStyles();
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        confirmPassword: '',
        weight: '',
        weightRange: '',
        showPassword: false,
        showPasswordd: false,
        resettoken: window.location.pathname.split('/')[3]
    });
    const [checkErrorMsg, setCheckErrorMsg] = useState(false);
    const [checkError, setCheckError] = useState(false);
    const [error, setError] = useState({
      password: 'ss',
      confirmPassword: 'ss',
  });


    useEffect(()=>{
      if (isConfirmPassword.sucess === false){
        setLoading(false);
        displayMsg({
          content: isConfirmPassword.errMsg,
          type: 'error'
        });
        //setCheckErrorMsg(false);
        setEnableCreateBtn(true);
        setLoading(false);
        resetAddRedux();
          } 
          
        else if (isConfirmPassword.sucess  === true) {
        setLoading(false);
        displayMsg({
          content: "Reset password successfully !",
          type: 'success'
        });
        setEnableCreateBtn(true);
        setLoading(false);
        //history.push('/login');
        resetAddRedux();
        history.replace('/login');
      }
    },[isConfirmPassword.sucess]); 
  
      //HANDLE CLOSE POPUP
    const handleClose = () => { 
      history.replace('/login');
      //setCheckErrorMsg(false);
    };
    
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });

        if(checkError === true)
    setError({ ...error, [prop]: event.target.value });
      };
    
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    
    const handleClickShowPasswordd = () => {
       setValues({ ...values, showPasswordd: !values.showPasswordd });
      
      };

      const handleClickResetPassword = () => {
        setCheckError(true);
        
        if(values.password === "")
        setError({ ...values, password: "" });

        if(values.confirmPassword === "")
        setError({ ...values, confirmPassword: "" });

       /* if(values.password === "" && values.confirmPassword === "" && values.password.trim().length == values.confirmPassword.trim().length)
        setError({ ...values, password: "" }); */

        /*if(values.password.trim().length == 0 && values.confirmPassword.trim().length == 0
         && isConfirmPassword.sucess == true ){
          setError({ ...values, password: "" });
    }*/
        
        if(values.password !== "" && values.confirmPassword !== "" 
        && values.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/)
        && values.confirmPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/)){
          setEnableCreateBtn(false);
          setLoading(true);
          confirmResetPasswordReq(values);
        }
       };
    
    const handleMouseDownPasswordd = (event) => {
       event.preventDefault();
      };

    return(
        <form className = {classes.formContainer}>
            
            
            <Typography component="h1" variant="h1" gutterBottom className = {classes.title}>
                Reset Password
            </Typography>
        
            <FormControl className = {classes.form}  variant="outlined" >
                <InputLabel htmlFor="new password">New Password</InputLabel>
                <OutlinedInput
                    id="new password"
                    //error={error.password === 0 && values.password === 0 ? true : false}
                    
                    error={checkError && error.password.trim().length === 0 && values.password.trim().length === 0 ? true : false}
                    error={checkError && !error.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/) && !values.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/) ? true : false}
                    
                    value={values.password}
                    onChange={handleChange('password')}
                    labelWidth={100}
                    fullWidth
                    required={true}
                    //type="password"
                    type={values.showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    } 
                />
                {checkError && !error.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/) && !values.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/) && <FormHelperText id="component-error-text" error={true}>Password must be 8-16 characters, at least 1 uppercase, 1 lowercase, and 1 number</FormHelperText>} 
          {checkError && error.password.trim().length === 0 && values.password.trim().length === 0 && <FormHelperText id="component-error-text" error={true}>Password is required</FormHelperText>}
                {/*{error.password.trim().length === 0 && values.password.trim().length === 0 && <FormHelperText id="component-error-text" error={true}>Password is required</FormHelperText>}*/}
               {/* {!values.password.match(/^.{8,16}$/) && !values.confirmPassword.match(/^.{8,16}$/) && <FormHelperText id="component-error-text" error={true}>Password is required</FormHelperText>} */}
               {/*} <OutlinedInput
                    id="new password"
                    error
                //    value={values.amount}
                //    onChange={handleChange('username')}
                    labelWidth={100}
                    fullWidth
                    type="password"
                    value={values.newpassword}
                    type={values.showPassword ? 'text' : 'password'}
                    onChange={handleChange('password')}
                    required={true}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    } 
                    
                /> */}
                <FormHelperText></FormHelperText>                
                </FormControl>

            <FormControl  className = {classes.form} variant="outlined">
                <InputLabel htmlFor="confirm new password">Confirm New Password</InputLabel>
                <OutlinedInput
                    id="confirm new password"
                    error={error.confirmPassword === 0 && values.confirmPassword === 0 ? true : false}
                   // error={!values.password.match(/^.{8,16}$/) && !values.confirmPassword.match(/^.{8,16}$/) ? true : false}
                   
                   error={checkError && error.confirmPassword.trim().length === 0 && values.confirmPassword.trim().length === 0 ? true : false}
                   error={checkError && !error.confirmPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/) && !values.confirmPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/) ? true : false}
                   
                    /*error={values.error ? true : false} */
                    value={values.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    labelWidth={150}
                    fullWidth
                    required={true}
                    //type="confirmPassword"
                    type={values.showPasswordd ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswordd}
                          onMouseDown={handleMouseDownPasswordd}
                          edge="end"
                        >
                          {values.showPasswordd ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    } 
                />
                {checkError && !error.confirmPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/) && !values.confirmPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/) && <FormHelperText id="component-error-text" error={true}>Confirm New Password must be 8-16 characters, at least 1 uppercase, 1 lowercase, and 1 number</FormHelperText>} 
          {checkError && error.confirmPassword.trim().length === 0 && values.confirmPassword.trim().length === 0 && <FormHelperText id="component-error-text" error={true}>Confirm New Password is required</FormHelperText>}
                {/*{error.confirmPassword.trim().length === 0 && values.confirmPassword.trim().length === 0  && <FormHelperText id="component-error-text" error={true}>Confirm New Password is required</FormHelperText>} */}
                {/* {!values.password.match(/^.{8,16}$/) && !values.confirmPassword.match(/^.{8,16}$/) && <FormHelperText id="component-error-text" error={true}>Confirm New Password is required at least 8 characters (8-16)</FormHelperText>} */}
               {/*} <OutlinedInput
                    id="confirm new password"
                    error
                //    value={values.amount}
                    onChange={handleChange('username')}
                    labelWidth={150}
                    fullWidth
                    type="confirm new password"
                    value={values.confirmnewPassword}
                    type={values.showPasswordd ? 'text' : 'password'}
                    onChange={handleChange('confirmPassword')}
                    required={true}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibilityy"
                          onClick={handleClickShowPasswordd}
                          onMouseDown={handleMouseDownPasswordd}
                          edge="end"
                        >
                          {values.showPasswordd ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }          
                /> */}
                <FormHelperText></FormHelperText>                
                </FormControl>

            
            <div className = {classes.btnGroup}>
                <Button variant="contained" color="primary" disabled={enableCreateBtn ? false : true } startIcon={<ReplayIcon/>} onClick={handleClickResetPassword}>
                    Reset Password
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </Button>  
                <Button variant="contained" startIcon={<CancelIcon/>} color="gray" onClick={handleClose} > 
                    Cancel
                </Button>  
            </div>
            {/*<span>
          <a href="/login">Back to login</a>
        </span> */}
        </form>
        

          
    );
};
export default connect(mapStateToProps,mapDispatchToProps)(ResetPassword);
//export default (ResetPassword);
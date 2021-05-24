import React, {useState, useEffect} from "react";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import { useHistory } from "react-router-dom";
import styles from "./styles";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {CONFIRM_RESET_PASSWORD_REQ, RESET_CONFIRM_RESET_PASSWORD} from '../../../redux/account/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';

import {
    FormControl,
    Input,
    InputLabel,
    Button as MuiButton,
    Paper,
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
    const {isOpen, setOpenState} = props;

    const {isConfirmPassword, confirmResetPasswordReq, displayMsg, resetAddRedux } = props;

    const [open,setOpen] = useState(isOpen);

    const history = useHistory();
    
    const [isShowPassword,setShowPassword] = useState(false);
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

    useEffect(()=>{
      if (isConfirmPassword.sucess === false){
        displayMsg({
          content: isConfirmPassword.errMsg,
          type: 'error'
        });
        resetAddRedux();
      } else if (isConfirmPassword.sucess == true) {
        displayMsg({
          content: "Reset password successfully !",
          type: 'success'
        });
        //history.push('/login');
        resetAddRedux();
      }
    },[isConfirmPassword.sucess]); 
    
  
      //HANDLE CLOSE POPUP
    const handleClose = () => { 
        setOpenState(false);
    };
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
      };
    
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    
    const handleClickShowPasswordd = () => {
       setValues({ ...values, showPasswordd: !values.showPasswordd });
       console.log('new password: '+ JSON.stringify(values, null, ' '));
       console.log('show pass');
      };

      const handleClickResetPassword = () => {
        confirmResetPasswordReq(values);
        console.log('new password: '+ JSON.stringify(values, null, ' '));
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
                    
                /> 
                <FormHelperText></FormHelperText>                
                </FormControl>

            <FormControl  className = {classes.form} variant="outlined">
                <InputLabel htmlFor="confirm new password">Confirm New Password</InputLabel>
                <OutlinedInput
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
                /> 
                <FormHelperText></FormHelperText>                
                </FormControl>

            
            <div className = {classes.btnGroup}>
                <Button variant="contained" color="primary" onClick={handleClickResetPassword}>
                    Reset Password
                </Button>  
                <Button variant="contained" color="gray" > 
                    Cancel
                </Button>  
            </div>
            <span>
          <a href="/login">Back to login</a>
        </span>

        </form>
        

          
    );
};
export default connect(mapStateToProps,mapDispatchToProps)(ResetPassword);
//export default (ResetPassword);
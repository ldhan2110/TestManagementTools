import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import useStyles from './styles';
import {REGISTER_REQ, RESET_REGISTER} from '../../../redux/account/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { blue } from '@material-ui/core/colors';
//import ReplayIcon from '@material-ui/icons/Replay';
//import CancelIcon from '@material-ui/icons/Cancel';

const  mapStateToProps = (state) => {
  return { account: state.account, isRegister: state.account.isRegister, errorMsg: state.account.errorMsg }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    registerReq: (payload) => dispatch({ type: REGISTER_REQ, payload }),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    resetAddRedux: () => dispatch({type: RESET_REGISTER}) 
  }
}

const RegisterPage = (props) => {

    //SET STATES
    const {isOpen, setOpenState} = props;

    const {account, registerReq,resetAddRedux, isRegister, displayMsg, errorMsg} = props;

    const [open,setOpen] = useState(isOpen);
    
    const classes = useStyles();
    const [checkError, setCheckError] = useState(false);
    const [enableCreateBtn, setEnableCreateBtn] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        fullname: 'ss',
        username: 'ss',
        password: 'ss',
        email: 'ss',
    });
    
    const [values, setValues] = useState({
        fullname: '',
        username: '',
        password: '',
        email: '',
        showPassword: false,
    });

    const [checkErrorMsg, setCheckErrorMsg] = useState(false);

    useEffect(()=>{
      if (isRegister === false){
        setLoading(false);
        displayMsg({
          content: account.errorMsg,
          type: 'error'
        });
   
        resetAddRedux();
        setEnableCreateBtn(true);
        setLoading(false);
      
      } else if (isRegister === true) {
        setLoading(false);
        displayMsg({
          content: "Register successfully!",
          type: 'success'
        });
        resetAddRedux();
        setEnableCreateBtn(true);
        setLoading(false);
        
        handleClose();
      }
    },[isRegister]);

    //LISTEN CHANGE TO "isOpen" prop
    useEffect(() => {
      setCheckErrorEmail(false);
      setCheckErrorPassword(false);
      setCheckErrorFName(false);
      setCheckErrorUsername(false);
      setOpen(isOpen);
    }, [isOpen]);

    //HANDLE CLOSE POPUP
    const handleClose = () => {
      setCheckErrorEmail(false);
      setCheckErrorPassword(false);
      setCheckErrorFName(false);
      setCheckErrorUsername(false);
        //setCheckErrorMsg(false);
        setValues({
          fullname: '',
          username: '',
          password: '',
          email: ''
        })
        setCheckError(false);
        setOpenState(false);
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

  const handleRegister = (event) => {
  
    setCheckError(true);
   
    if(values.email.trim().length === 0 ||values.email.trim().length !== values.email.length)
    setError({ ...values, email: "" });

    if(values.fullname.trim().length === 0||values.fullname.trim().length !== values.fullname.length  )
    setError({ ...values, fullname: "" });

    if(values.username.trim().length === 0 ||values.username.trim().length !== values.username.length )
    setError({ ...values, username: "" });

    if(values.password.trim().length === 0|| values.password.trim().length !== values.password.length)
    setError({ ...values, password: "" });

  

    else if(values.fullname.trim().length !== 0 && values.username.trim().length !== 0 && values.password.trim().length !== 0 && values.email.trim().length !== 0
    && values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) 
    && values.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/)){ //Password tu 8-16 ky tu, bao gom 1 Uppercase, 1 Lowercase, va 1 number /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/
      setEnableCreateBtn(false);
      setLoading(true);
      registerReq(values);
    }
  }
  const [checkErrorEmail, setCheckErrorEmail] = useState(false);
  const handleEmailError = (event) => {  
    setCheckErrorEmail(true);
  }
  const [checkErrorPassword, setCheckErrorPassword] = useState(false);
  const handlePasswordError = (event) => {  
    setCheckErrorPassword(true);
  }
  const [checkErrorFName, setCheckErrorFName] = useState(false);
  const handleFNameError = (event) => {  
    setCheckErrorFName(true);    
    if(values.fullname.trim().length === 0||values.fullname.trim().length !== values.fullname.length  )
    setError({ ...values, fullname: "" });
  }
  const [checkErrorUsername, setCheckErrorUsername] = useState(false);
  const handleUsernameError = (event) => {  
    setCheckErrorUsername(true);
    if(values.username.trim().length === 0 ||values.username.trim().length !== values.username.length )
    setError({ ...values, username: "" });
  }
  

  //RENDER
    return(
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Please enter your information to create a new account.
          </DialogContentText>

        {/*Fullname */}
           <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-fullname">Full Name</InputLabel>
          <OutlinedInput
            id="outlined-adornment-fullname"
            value={values.amount}
            error={(checkError || checkErrorFName) && error.fullname.trim().length === 0 && values.fullname.trim().length === 0 ? true : false}
            onChange={handleChange('fullname')}
            onBlur={handleFNameError}
            labelWidth={60}
            required={true}
          />
          {(checkError || checkErrorFName) && error.fullname.trim().length === 0 && values.fullname.trim().length === 0 && <FormHelperText id="component-error-text" error={true}>Full Name is required</FormHelperText>}
        </FormControl>
          
        {/*Username */}
          <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
          <OutlinedInput
            id="outlined-adornment-username"
            value={values.amount}
            error={(checkError || checkErrorUsername) && error.username.trim().length === 0 && values.username.trim().length === 0 ? true : false}
            onChange={handleChange('username')}
            onBlur={handleUsernameError}
            labelWidth={60}
            required={true}
          />
          {(checkError || checkErrorUsername) && error.username.trim().length === 0 && values.username.trim().length === 0 && <FormHelperText id="component-error-text" error={true}>Username is required</FormHelperText>}
        </FormControl>

        {/*PASSWORD */}        
          <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            //error={checkErrorMsg && error.password.trim().length === 0 && values.password.trim().length === 0 ? true : false}
            //error={checkError && error.password.trim().length === 0 && values.password.trim().length === 0 ? true : false}
                    error={(checkError || checkErrorPassword) && !error.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/) && !values.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/) ? true : false}
            onChange={handleChange('password')}
            onBlur={handlePasswordError}
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
            labelWidth={60}
          />
          
          {(checkError || checkErrorPassword) && !error.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/) && !values.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/) && <FormHelperText id="component-error-text" error={true}>Password must be 8-16 characters, at least 1 uppercase, 1 lowercase, and 1 number</FormHelperText>} 
          {/* {checkError && error.password.trim().length === 0 && values.password.trim().length === 0 && <FormHelperText id="component-error-text" error={true}>Password is required</FormHelperText>} */}
        </FormControl>

        {/*Email */}
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            value={values.amount}
            type="email"
            //error={checkError && error.email.trim().length === 0 && values.email.trim().length === 0 ? true : false}
            error={(checkError || checkErrorEmail) && !error.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && !values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)  ?  true : false}
            onChange={handleChange('email')}
            onBlur={handleEmailError}
            labelWidth={35}
            required={true}   
          />
          {(checkError || checkErrorEmail) && !error.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) 
          && !values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && 
          <FormHelperText id="component-error-text" error={true}>
            Email must be a valid email address (such as: vuilongdeokhautrang@gmail.com)
          </FormHelperText>}
          {/* {checkError && error.email.trim().length === 0 && values.email.trim().length === 0 &&  <FormHelperText id="component-error-text" error={true}>Email is required</FormHelperText>}  */}
        </FormControl>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>    
          <Button onClick={handleRegister} disabled={enableCreateBtn ? false : true } variant="contained" color="primary">
            Sign Up
            {loading && <CircularProgress size={24} style={{color: blue[500],position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}} />}
          </Button>          
        </DialogActions>
      </Dialog>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
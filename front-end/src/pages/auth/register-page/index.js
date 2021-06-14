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
        //setCheckErrorMsg(false);
        resetAddRedux();
        setEnableCreateBtn(true);
        setLoading(false);
        //console.log('register error!' + JSON.stringify(errorMsg));
      } else if (isRegister === true) {
        setLoading(false);
        displayMsg({
          content: "Register successfully!",
          type: 'success'
        });
        resetAddRedux();
        setEnableCreateBtn(true);
        setLoading(false);
        //console.log('register sucessfully!');
        handleClose();
      }
    },[isRegister]);

    //LISTEN CHANGE TO "isOpen" prop
    useEffect(() => {
      setOpen(isOpen);
    }, [isOpen]);

    //HANDLE CLOSE POPUP
    const handleClose = () => {  
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
    //console.log('values: '+JSON.stringify(values));
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
    //console.log('here: here');
    //console.log('values: '+JSON.stringify(values));
    setCheckError(true);
    //setCheckErrorMsg(true);
    if(values.email.trim().length === 0)
    setError({ ...values, email: "" });

    if(values.fullname.trim().length === 0 )
    setError({ ...values, fullname: "" });

    if(values.username.trim().length === 0)
    setError({ ...values, username: "" });

    if(values.password.trim().length === 0)
    setError({ ...values, password: "" });

    //console.log('error object: '+JSON.stringify(error));

    // if(TestplanInfo.description.trim().length == 0 || TestplanInfo.Testplanname.trim().length == 0
    //     ||TestplanInfo.description.trim().length !== TestplanInfo.description.length 
    //     || TestplanInfo.Testplanname.trim().length !== TestplanInfo.Testplanname.length){
    //     displayMsg({
    //       content: "Testplan name or description should not contain spaces or empty",
    //       type: 'error'
    //     });
    // }

    if(values.fullname.trim().length !== 0 && values.username.trim().length !== 0 && values.password.trim().length !== 0 && values.email.trim().length !== 0
    && values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) 
    && values.password.match(/^.{8,16}$/)){ //Password tu 8-32 ky tu, bao gom 1 Uppercase, 1 Lowercase, va 1 number /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/
      setEnableCreateBtn(false);
      setLoading(true);
      registerReq(values);
    }
  }

  //RENDER
    return(
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Register</DialogTitle>
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
            error={checkError && error.fullname.trim().length === 0 && values.fullname.trim().length === 0 ? true : false}
            onChange={handleChange('fullname')}
            labelWidth={60}
            required={true}
          />
          {checkError && error.fullname.trim().length === 0 && values.fullname.trim().length === 0 && <FormHelperText id="component-error-text" error={true}>Full Name is required</FormHelperText>}
        </FormControl>
          
        {/*Username */}
          <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
          <OutlinedInput
            id="outlined-adornment-username"
            value={values.amount}
            error={checkError && error.username.trim().length === 0 && values.username.trim().length === 0 ? true : false}
            onChange={handleChange('username')}
            labelWidth={60}
            required={true}
          />
          {checkError && error.username.trim().length === 0 && values.username.trim().length === 0 && <FormHelperText id="component-error-text" error={true}>Username is required</FormHelperText>}
        </FormControl>

        {/*PASSWORD */}        
          <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            //error={checkErrorMsg && error.password.trim().length === 0 && values.password.trim().length === 0 ? true : false}
            error={checkError && error.password.trim().length === 0 && values.password.trim().length === 0 ? true : false}
                    error={checkError && !error.password.match(/^.{8,16}$/) && !values.password.match(/^.{8,16}$/) ? true : false}
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
            labelWidth={60}
          />
          
          {checkError && !error.password.match(/^.{8,16}$/) && !values.password.match(/^.{8,16}$/) && <FormHelperText id="component-error-text" error={true}>Password must be 8-16 characters</FormHelperText>} 
          {checkError && error.password.trim().length === 0 && values.password.trim().length === 0 && <FormHelperText id="component-error-text" error={true}>Password is required</FormHelperText>}
        </FormControl>

        {/*Email */}
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            value={values.amount}
            type="email"
            error={checkError && error.email.trim().length === 0 && values.email.trim().length === 0 ? true : false}
            error={checkError && !error.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && !values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)  ?  true : false}
            onChange={handleChange('email')}
            labelWidth={35}
            required={true}   
          />
          {checkError && !error.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) &&!values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && <FormHelperText id="component-error-text" error={true}>Email must be a valid email address (such as: vuilongdeokhautrang@gmail.com)</FormHelperText>}
          {checkError && error.email.trim().length === 0 && values.email.trim().length === 0 &&  <FormHelperText id="component-error-text" error={true}>Email is required</FormHelperText>} 
        </FormControl>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleRegister} disabled={enableCreateBtn ? false : true } color="primary">
            Register
            {loading && <CircularProgress size={24} style={{color: blue[500],position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}} />}
          </Button>
        </DialogActions>
      </Dialog>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
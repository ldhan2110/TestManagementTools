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

    useEffect(()=>{
      if (isRegister === false){
        displayMsg({
          content: "Register failed, please try again !",
          type: 'error'
        });
        console.log('register error!' + JSON.stringify(errorMsg));
        resetAddRedux();
      } else if (isRegister == true) {
        displayMsg({
          content: "Register successfully!",
          type: 'success'
        });
        console.log('register sucessfully!');
        resetAddRedux();
        handleClose();
      }
    },[isRegister]);

    //LISTEN CHANGE TO "isOpen" prop
    useEffect(() => {
      setOpen(isOpen);
    }, [isOpen]);

    //HANDLE CLOSE POPUP
    const handleClose = () => {
        setOpenState(false);
    };


  const handleChange = (prop) => (event) => {
    //console.log('values: '+JSON.stringify(values));
    setValues({ ...values, [prop]: event.target.value });

    if(checkError == true)
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

    if(values.email === "")
    setError({ ...values, email: "" });
    //console.log('email empty');
    // if(values.email.includes('@') === false){
    //   setError({ ...values, email: "" });
    //   setValues({ ...values, email:"" });
    // }


    if(values.fullname === "")
    setError({ ...values, fullname: "" });
    //console.log('fullname empty');

    if(values.username === "")
    setError({ ...values, username: "" });

    if(values.password === "")
    setError({ ...values, password: "" });

    console.log('error object: '+JSON.stringify(error));

    // if(TestplanInfo.description.trim().length == 0 || TestplanInfo.Testplanname.trim().length == 0
    //     ||TestplanInfo.description.trim().length !== TestplanInfo.description.length 
    //     || TestplanInfo.Testplanname.trim().length !== TestplanInfo.Testplanname.length){
    //     displayMsg({
    //       content: "Testplan name or description should not contain spaces or empty",
    //       type: 'error'
    //     });
    // }

    if(values.email !== "" && values.fullname !== "" && values.username !== "" && values.password !== "")
    registerReq(values);
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
            error={error.fullname.trim().length == 0 && values.fullname.trim().length == 0 ? true : false}
            onChange={handleChange('fullname')}
            labelWidth={60}
            required={true}
          />
          {error.fullname.trim().length == 0 && values.fullname.trim().length == 0 && <FormHelperText id="component-error-text" error={true}>Full Name is required</FormHelperText>}
        </FormControl>
          
        {/*Username */}
          <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
          <OutlinedInput
            id="outlined-adornment-username"
            value={values.amount}
            error={error.username.trim().length == 0 && values.username.trim().length == 0 ? true : false}
            onChange={handleChange('username')}
            labelWidth={60}
            required={true}
          />
          {error.username.trim().length == 0 && values.username.trim().length == 0 && <FormHelperText id="component-error-text" error={true}>Username is required</FormHelperText>}
        </FormControl>

        {/*PASSWORD */}        
          <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            error={error.password.trim().length == 0 && values.password.trim().length == 0 ? true : false}
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
          {error.password.trim().length == 0 && values.password.trim().length == 0 && <FormHelperText id="component-error-text" error={true}>Password is required</FormHelperText>}
        </FormControl>

        {/*Email */}
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            value={values.amount}
            type="email"
            error={error.email.trim().length == 0 && values.email.trim().length == 0 ? true : false}
            onChange={handleChange('email')}
            labelWidth={60}
            required={true}   
          />
          {error.email.trim().length == 0 && values.email.trim().length == 0 && <FormHelperText id="component-error-text" error={true}>Email is required</FormHelperText>}
        </FormControl>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRegister} color="primary">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
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
import {REGISTER_REQ} from '../../../redux/account/constants';
import { connect } from 'react-redux';

const  mapStateToProps = (state) => {
  return { account: state.account }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    registerReq: (payload) => dispatch({ type: REGISTER_REQ, payload }),
  }
}

const RegisterPage = (props) => {

    //SET STATES
    const {isOpen, setOpenState} = props;

    const {account, registerReq} = props;

    const [open,setOpen] = useState(isOpen);
    
    const classes = useStyles();
    
    const [values, setValues] = React.useState({
        fullname: '',
        username: '',
        password: '',
        email: '',
        showPassword: false,
    });

    //LISTEN CHANGE TO "isOpen" prop
    useEffect(() => {
      setOpen(isOpen);
    }, [isOpen]);

    //HANDLE CLOSE POPUP
    const handleClose = () => {
        setOpenState(false);
    };


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegister = (event) => {
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
            onChange={handleChange('fullname')}
            labelWidth={60}
            required={true}
          />
          <FormHelperText></FormHelperText>
        </FormControl>
          
        {/*Username */}
          <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
          <OutlinedInput
            id="outlined-adornment-username"
            value={values.amount}
            onChange={handleChange('username')}
            labelWidth={60}
            required={true}
          />
          <FormHelperText></FormHelperText>
        </FormControl>

        {/*PASSWORD */}        
          <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
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
          <FormHelperText></FormHelperText>
        </FormControl>

        {/*Email */}
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            error
            value={values.amount}
            onChange={handleChange('email')}
            labelWidth={60}
            required={true}
            type="email"
          />
          <FormHelperText></FormHelperText>
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
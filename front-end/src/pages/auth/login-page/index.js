import React, {useState, useEffect} from "react";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import {LOGIN_REQ} from '../../../redux/account/constants';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import MessagePopup from '../../../components/MessageBox';

//IMPORT REGISTER
import RegisterPage from '../register-page/index';


//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { account: state.account }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    loginReq: (payload) => dispatch({ type: LOGIN_REQ, payload }),
  }
}

const LoginPage = (props) => {

    const history = useHistory();

    const classes = useStyles();

    const {account, loginReq} = props;

    const {accountInfo} = account;

    const [values, setValues] = useState({
      username: "",
      password: "",
      isKeepedLogin: false,
      showPassword: false,
    });

    const [openMsg, setOpenMsg] = useState(false);

    useEffect(()=>{
      console.log(account);
    }, [account])


    useEffect(()=>{
      if (accountInfo.isLogin){
        history.push("/projects");
      }
    }, [accountInfo, history])

    //OPEN REGISTER POPUP STATE
    const [isOpenRegister, openRegister] = useState(false);

    //CHANGE CHECKBOX
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    const showError= () =>{
      return (<FormHelperText error>Error</FormHelperText>);
    }

    //CHANGE PASSWORD
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };


    const handleClickKeepSignIn = () => {
      setValues({ ...values, isKeepedLogin: !values.isKeepedLogin });
    }

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    //HANDLE OPEN REGISTER POPUP
    const handleOpenRegister = ()=> {
      openRegister(!isOpenRegister);
    }

    //HANDLE LOGIN REQUEST BUTTON
    const handleClickLogin = (event) => {
      loginReq({email: values.username, password: values.password});
    }

    return(
    <div className={classes.root}>
    <MessagePopup open={openMsg} openMethod={setOpenMsg} type="E" content="Invalid Messaged"/>
    <RegisterPage isOpen = {isOpenRegister} setOpenState = {openRegister}/>
        <Grid container>
        <Grid item xs={7} style={{backgroundColor: 'red', height: '100vh'}}>
          <img className={classes.banner} src = "../img/logo-banner.png" alt= "banner"/>
        </Grid>
        <Grid item xs={5}>
            <form className = {classes.formLogin}>
              <div>
                <img className={classes.logo} src="../img/Logo1zz.jpg" alt = "logo-banner"/>
              </div>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-username"
                    value={values.username || ''}
                    onChange={handleChange('username')}
                    labelWidth={60}
                    required={true}
                />
              </FormControl>

        <FormControl fullWidth variant="outlined">
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

        <FormControlLabel
        control={
          <Checkbox
            onChange={handleClickKeepSignIn}
            name="isLogin"
            color="primary"
          />
        }
        label="Keep me sign in"
      />
        <div className = {classes.btnGroup}>
          <Button variant="contained" color="primary" onClick={handleClickLogin}>
            Sign In
          </Button>
          <Button variant="contained" onClick={handleOpenRegister}>
            Register
          </Button>
        </div>
        <span>
          <a href="auth/forgot-password">Forgot Password</a>
        </span>
          </form>
        </Grid>
      </Grid>
    </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
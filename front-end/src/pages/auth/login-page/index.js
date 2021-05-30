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
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import CircularProgress from '@material-ui/core/CircularProgress';
import { blue } from '@material-ui/core/colors';
import {
  Typography
} from "@material-ui/core";
import LockIcon from '@material-ui/icons/Lock';

//IMPORT REGISTER
import RegisterPage from '../register-page/index';
import { TrendingUpOutlined } from "@material-ui/icons";


//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { account: state.account }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    loginReq: (payload) => dispatch({ type: LOGIN_REQ, payload }),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
  }
}

const LoginPage = (props) => {

    const history = useHistory();

    const classes = useStyles();

    const {account, loginReq, displayMsg} = props;

    const {accountInfo} = account;

    const [values, setValues] = useState({
      username: "",
      password: "",
      isKeepedLogin: false,
      showPassword: false,
    });
    const [checkError, setCheckError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [enableCreateBtn, setEnableCreateBtn] = useState(true);
    const [error, setError] = useState({
        
    });

    const [openMsg, setOpenMsg] = useState(false);
    
    

     useEffect(()=>{
      if(account.error === true)// && account.errorMsg.errMsg == "Password is not valid")
      {
        setLoading(false);
        setError({error: "Wrong username or password"});
        setEnableCreateBtn(true);
        setLoading(false);
      }
      
      else if (account.success == true) {
        setLoading(false);
        displayMsg({
          content: "Logged in successfully!",
          type: 'success'
        });
        setEnableCreateBtn(true);
        setLoading(false);
      }
    },[account]);

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
    };

    //HANDLE LOGIN REQUEST BUTTON
    const handleClickLogin = (event) => {     
      if(values.username == "" && values.password == ""){
        setError({username: "Username is required",
                  password: "Password is required"})
      }

      

      else if(values.username == ""){ 
        setError({username: "Username is required", password: null});
      }
      else if (values.password == ""){
        setError({username: null, password: "Password is required"});
      }      
      else {
      setError({username: null, password: null, error: null});
      setEnableCreateBtn(false);
      setLoading(true);
      loginReq({username: values.username, password: values.password}); 
      }     
    };

    return(
    <div className={classes.root}>
    <MessagePopup open={openMsg} openMethod={setOpenMsg} type="E" content="Invalid Messaged"/>
    <RegisterPage isOpen = {isOpenRegister} setOpenState = {openRegister}/>
        <Grid container>
        <Grid item xs={7} style={{backgroundColor: 'red', height: '100vh'}}>
          <img className={classes.banner} src = "/img/logo-banner.png" alt= "banner"/>
        </Grid>
        <Grid item xs={5}>
            <form className = {classes.formLogin}>
              <div>
                <img className={classes.logo} src="../img/Logo1zz.png" alt = "logo-banner"/>
              </div>  

                <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                <OutlinedInput 
                    id="outlined-adornment-username"
                    value={values.username || ''}
                    onChange={handleChange('username')}
                    error={error.username ? true : false} 
                    labelWidth={60}
                    required={true}                    
                />
                
                {error && error.username && <FormHelperText id="component-error-text" error={true}>{error.username}</FormHelperText>} 
              </FormControl> 

        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            required={true}
            error={error.password ? true : false}
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
           {error && error.password && <FormHelperText id="component-error-text" error={true}>{error.password}</FormHelperText>}
        </FormControl>
        {error && error.error && <FormHelperText id="component-error-text" error={true}>{error.error}</FormHelperText>}

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
          <Button variant="contained" color="primary" disabled={enableCreateBtn == true ? false : true } startIcon={<LockIcon />} onClick={handleClickLogin}>
            Sign In
            {loading && <CircularProgress size={24} style={{color: blue[500],position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}} />}
          </Button>          
        </div>
        <div className = {classes.btnGroup}>
          <Typography component="h1" variant="subtitle1" gutterBottom>
              Don't have an account?
          </Typography>
          <Button variant="contained" startIcon={<VpnKeyIcon/>} onClick={handleOpenRegister}>
            Register now
          </Button>
        </div>
        <span>
          <a href="auth/forgot-password">Forgot your password?</a>
        </span>
          </form>
        </Grid>
      </Grid>
    </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
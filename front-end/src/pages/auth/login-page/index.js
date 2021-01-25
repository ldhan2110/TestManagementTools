import React, {useState} from "react";
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

//IMPORT REGISTER
import RegisterPage from '../register-page/index';


const LoginPage = (props) => {

    const classes = useStyles();

    const [values, setValues] = useState({
      username: '',
      password: '',
      isLogin: false,
      showPassword: false,
  });

    //OPEN REGISTER POPUP STATE
    const [isOpenRegister, openRegister] = useState(false);

    //CHANGE CHECKBOX
    const handleChange = (event) => {
    };

    //CHANGE PASSWORD
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    //HANDLE OPEN REGISTER POPUP
    const handleOpenRegister = ()=> {
      openRegister(!isOpenRegister);
    }

    return(
    <div className={classes.root}>
    <RegisterPage isOpen = {isOpenRegister} setOpenState = {openRegister}/>
        <Grid container>
        <Grid item xs={7} style={{backgroundColor: 'red', height: '100vh'}}>
          <img className={classes.banner} src = "/img/logo-banner.png" alt= "banner"/>
        </Grid>
        <Grid item xs={5}>
            <form className = {classes.formLogin}>
              <div>
                <img className={classes.logo} src="/img/logo.jpg"/>
              </div>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-username"
                    value={values.username}
                    //onChange={handleChange('username')}
                    labelWidth={60}
                    required={true}
                />
                <FormHelperText></FormHelperText>
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
            checked={values.isLogin}
            //onChange={handleChange}
            name="isLogin"
            color="primary"
          />
        }
        label="Keep me sign in"
      />
        <div className = {classes.btnGroup}>
          <Button variant="contained" color="primary">
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

export default (LoginPage);
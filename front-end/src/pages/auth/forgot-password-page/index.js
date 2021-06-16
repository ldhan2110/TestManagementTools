import React, {useState, useEffect} from "react";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import useStyles from './styles';
//import styles from "./styles";
//import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import {SEND_MAIL_RESET_PASSWORD_REQ, RESET_SEND_MAIL_RESET_PASSWORD} from '../../../redux/account/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReplayIcon from '@material-ui/icons/Replay';
import CancelIcon from '@material-ui/icons/Cancel';
import {
    FormControl,
    InputLabel,
    Typography
  } from "@material-ui/core";

  //MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
    return { isSendMail: state.account.isSendMail }
  }
  
  //MAP DISPATCH ACTIONS TO PROPS - REDUX
  const mapDispatchToProps = dispatch => {
    return {
      sendMailReq: (payload) => dispatch({ type: SEND_MAIL_RESET_PASSWORD_REQ, payload }),
      displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload,}),
      resetAddRedux: () => dispatch({type: RESET_SEND_MAIL_RESET_PASSWORD})
    }
  }

const ForgotPassword = (props) => {
    //const {classes} = props;
    const {isSendMail, sendMailReq, displayMsg, resetAddRedux} = props;
    const classes = useStyles();
    const [values, setValues] = useState({
        email: "",
        error: "", 
    });
    const [checkErrorMsg, setCheckErrorMsg] = useState(false);
    const [checkError, setCheckError] = useState(false);
    const [error, setError] = useState({
      email: 'ss',
  });

  const [enableCreateBtn, setEnableCreateBtn] = useState(true);
  const [loading, setLoading] = useState(false);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });

        if(checkError === true)
    setError({ ...error, [prop]: event.target.value });
      };

    const handleClickConfirm = (event) => {     

      setCheckError(true);
    setCheckErrorMsg(true);

    if(values.email === "")
    setError({ ...values, email: "" });

    if( values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ){
      setEnableCreateBtn(false);
      setLoading(true);
      sendMailReq(values); 
    }

      /*  if(values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
          setEnableCreateBtn(false);
          setLoading(true);
          setValues({email: values.email, error: null});           
          sendMailReq(values); 
            //console.log(values);
        } 

        /* if(values.email === "") {
          setError({ ...values, email: "" });
            console.log('email: '+ values.email);

            if(values.email !== "" )
            sendMailReq(values); 
         } 
         else if(values.email === ""){
          setValues({email: values.email, error: "* Enter your email"}); 
          //console.log(values);
        }
        else{
          setValues({email: values.email, error: "Please enter a valid email!"}); 
          //console.log(values);
        } */
    };

    const history = useHistory();
    const handleClose = () =>{
        history.goBack();
        setCheckErrorMsg(false);
    };

    try {
    useEffect(()=>{
        if (isSendMail.sucess === false){
          setLoading(false);
          displayMsg({
            content: "Unregistered email !",
            type: 'error'
          });
          setCheckErrorMsg(false);
          setEnableCreateBtn(true);
          setLoading(false);
          resetAddRedux();
          //console.log('send mail: fail');
        } else if (isSendMail.sucess === true) {
          setLoading(false);
          displayMsg({
            content: "Send mail successfully !",
            type: 'success'
          });
          setEnableCreateBtn(true);
          setLoading(false);
          //console.log('send mail: successfully!')
          resetAddRedux();
          //getAllBuildReq();
          //handleClose();
        }
      },[isSendMail.sucess]); 
    } catch (error) {
      console.log('error: '+error);
    }

    return(
    <React.Fragment>
        <div className = {classes.formContainer}>
            <Typography component="h1" variant="h1" gutterBottom className = {classes.title}>
                Forgot Password
            </Typography>
            <Typography component="h1" variant="body2" gutterBottom>
            If you have forgotten your password, you can use this form to reset your password. You will receive an email with instructions.
            </Typography>

            <FormControl  className = {classes.form} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-email"
                    // error={error.email == 0 && values.email == 0 ? true : false}
                    //error={values.error ? true : false}
                    error={checkErrorMsg && error.email.trim().length === 0 && values.email.trim().length === 0 ? true : false}
                    error={checkErrorMsg && !error.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && !values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)  ?  true : false}
                    value={values.email}
                    onChange={handleChange('email')}
                    labelWidth={40}
                    fullWidth
                    required={true}
                    type="email"
                />
                {/* {error.email.trim().length == 0 && values.email.trim().length == 0 && <FormHelperText id="component-error-text" error={true}>Email is required</FormHelperText>} */}
                {checkErrorMsg && !error.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) &&!values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && <FormHelperText id="component-error-text" error={true}>Email must be a valid email address (such as: vuilongdeokhautrang@gmail.com)</FormHelperText>}
                {checkErrorMsg && error.email.trim().length === 0 && values.email.trim().length === 0 &&  <FormHelperText id="component-error-text" error={true}>Email is required</FormHelperText>} 
                {/* {values.error !== 0 && <FormHelperText id="component-error-text" error={true}>{values.error}</FormHelperText>}*/}
            </FormControl>
            <div className = {classes.btnGroup}>
                <Button variant="contained" color="primary" disabled={enableCreateBtn ? false : true } startIcon={<ReplayIcon/>} onClick={handleClickConfirm}>
                    Reset
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </Button>
                <Button variant="contained" startIcon={<CancelIcon/>} onClick={handleClose}>
                    Cancel
                </Button>
            </div>
        </div>
    </React.Fragment>
        
    );
};

//export default (ForgotPassword);
export default connect(mapStateToProps,mapDispatchToProps)(ForgotPassword);
import React, {useState, useEffect} from "react";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import {SEND_MAIL_RESET_PASSWORD_REQ, RESET_SEND_MAIL_RESET_PASSWORD} from '../../../redux/account/constants';
import Helmet from 'react-helmet';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import CircularProgress from '@material-ui/core/CircularProgress';
import SendIcon from '@material-ui/icons/Send';
import CancelIcon from '@material-ui/icons/Cancel';
import {
    FormControl,
    InputLabel,
    Typography
  } from "@material-ui/core";

  //MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
    return {
      isSendMail: state.account.isSendMail }
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
    };

    const history = useHistory();
    const handleClose = () =>{
        history.goBack();
        setCheckErrorMsg(false);
    };

    useEffect(()=>{
        if (isSendMail?.sucess === false){
          displayMsg({
            content: "Unregistered email !",
            type: 'error'
          });
          setCheckErrorMsg(false);
          setEnableCreateBtn(true);
          setLoading(false);
          resetAddRedux();
        } else if (isSendMail?.sucess === true) {
          displayMsg({
            content: "Send mail successfully !",
            type: 'success'
          });
          setEnableCreateBtn(true);
          setLoading(false);
          resetAddRedux();
        }
      },[isSendMail?.sucess]);

    return(
    <React.Fragment>
      <Helmet title="Forgot Password" />
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
                    error={checkErrorMsg && error.email.trim().length === 0 && values.email.trim().length === 0 ? true : false}
                    error={checkErrorMsg && !error.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && !values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)  ?  true : false}
                    value={values.email}
                    onChange={handleChange('email')}
                    labelWidth={40}
                    fullWidth
                    required={true}
                    type="email"
                />
                
                {checkErrorMsg && !error.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) &&!values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && <FormHelperText id="component-error-text" error={true}>Email must be a valid email address (such as: vuilongdeokhautrang@gmail.com)</FormHelperText>}
                {checkErrorMsg && error.email.trim().length === 0 && values.email.trim().length === 0 &&  <FormHelperText id="component-error-text" error={true}>Email is required</FormHelperText>} 
            </FormControl>
            <div className = {classes.btnGroup}>
                <Button variant="contained" color="primary" disabled={enableCreateBtn ? false : true } startIcon={<SendIcon/>} onClick={handleClickConfirm}>
                    Confirm
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

export default connect(mapStateToProps,mapDispatchToProps)(ForgotPassword);
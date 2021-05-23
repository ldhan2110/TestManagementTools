import React, {useState, useEffect} from "react";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import {SEND_MAIL_RESET_PASSWORD_REQ, RESET_SEND_MAIL_RESET_PASSWORD} from '../../../redux/account/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
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

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

    const handleClickConfirm = (event) => {      
        //if(values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            //setValues({email: values.email, error: null});
            sendMailReq(values);
            console.log('email: '+ values.email);
        //}
        //else{
       //     setValues({email: values.email, error: "Invalid email!"}); 
       // }
    };

    const history = useHistory();
    const handleClose = () =>{
        history.goBack();
    };

    useEffect(()=>{
        if (isSendMail.sucess === false){
          displayMsg({
            content: isSendMail.errMsg,
            type: 'error'
          });
          //resetAddRedux();
          console.log('send mail: fail');
        } else if (isSendMail.sucess == true) {
          displayMsg({
            content: "Send mail successfully !",
            type: 'success'
          });
          console.log('send mail: successfully!')
          //resetAddRedux();
          //getAllBuildReq();
          //handleClose();
        }
      },[isSendMail.sucess]); 

    return(
    <React.Fragment>
        <div className = {classes.formContainer}>
            <Typography component="h1" variant="h1" gutterBottom className = {classes.title}>
                Forgot Password
            </Typography>

            <FormControl  className = {classes.form} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-email"
                    error={values.error? true : false}
                    value={values.email}
                    onChange={handleChange('email')}
                    labelWidth={40}
                    fullWidth
                    required={true}
                    type="email"
                />
                {values.error && <FormHelperText id="component-error-text" error={true}>{values.error}</FormHelperText>}
            </FormControl>
            <div className = {classes.btnGroup}>
                <Button variant="contained" color="primary" onClick={handleClickConfirm}>
                    Confirm
                </Button>
                <Button variant="contained" onClick={handleClose}>
                    Cancel
                </Button>
            </div>
        </div>
    </React.Fragment>
        
    );
};

//export default (ForgotPassword);
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ForgotPassword));
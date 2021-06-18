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
    return {  }
  }
  
  //MAP DISPATCH ACTIONS TO PROPS - REDUX
  const mapDispatchToProps = dispatch => {
    return {
      
    }
  }

const VerifyMember = (props) => {

    const classes = useStyles();

    return(
    <React.Fragment>
        <div className = {classes.formContainer}>
            <Typography component="h1" variant="h1" gutterBottom className = {classes.title}>
                Verify Member
            </Typography>
        </div>

            
    </React.Fragment>
        
    );
};
export default connect(mapStateToProps,mapDispatchToProps)(VerifyMember);
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
import {VERIFY_USERS_TO_PROJECT_REQ} from '../../../redux/users/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import CircularProgress from '@material-ui/core/CircularProgress';
import { blue } from '@material-ui/core/colors';
import ReplayIcon from '@material-ui/icons/Replay';
import CancelIcon from '@material-ui/icons/Cancel';
import {
    FormControl,
    InputLabel,
    Typography
  } from "@material-ui/core";

  //MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
    return { 
      insUsers: state.user.insUsers,
      project: state.project.currentSelectedProject
     };
  }
  
  //MAP DISPATCH ACTIONS TO PROPS - REDUX
  const mapDispatchToProps = dispatch => {
    return {
      verifyUserToProjectReq: (payload) => dispatch({ type: VERIFY_USERS_TO_PROJECT_REQ, payload }),
      displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload })
    }
  }

const VerifyMember = (props) => {

    const classes = useStyles();

    const {project, insUsers, verifyUserToProjectReq, displayMsg} = props;

    const [userInfo, setUserInfo] = useState({
      email: window.location.pathname.split('/')[3],
      role: 'Tester',
      projectid: window.location.pathname.split('/')[4],
      resettoken: window.location.pathname.split('/')[5]
    })

    const [enableCreateBtn, setEnableCreateBtn] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
      console.log(insUsers);
      if(insUsers.sucess === true){
        displayMsg({
          content: "Joined project successfully !",
          type: 'success'
        });
        setEnableCreateBtn(true);
      setLoading(false);
        //handleClose();
      }
      if(insUsers.sucess === false){
        displayMsg({
          content: insUsers.errMsg,
          type: 'error'
        });
        setEnableCreateBtn(true);
      setLoading(false);
      }
    },[insUsers]);

    const verifyUser = () => {
      console.log(userInfo);
      setEnableCreateBtn(false);
    setLoading(true);
      verifyUserToProjectReq(userInfo);
    };
    const verifyUserResult = () => {
      console.log(insUsers);
    };
    return(
    <React.Fragment>
        <div className = {classes.formContainer}>
            <Typography component="h1" variant="h1" gutterBottom className = {classes.title}>
                Verify Member
            </Typography>
            <Typography component="h3" variant="h3" gutterBottom style={{marginLeft: 20, marginTop:50}}>
                You have been invited to work on a project.
            </Typography>
            <Typography component="h6" variant="h6" gutterBottom style={{marginLeft: 30, marginTop: 20, marginBottom: 20}}>
                Press accept if you want to join, if not, please ignore and close this page.
            </Typography>
            <Button variant="contained" color="primary" disabled={enableCreateBtn ? false : true } onClick={verifyUser} style={{marginLeft: 30}}>Accept
            {loading && <CircularProgress size={24} style={{color: blue[500],position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}} />}
            </Button>
            <Button onClick={verifyUserResult}>Check status F12</Button>
        </div>

            
    </React.Fragment>
        
    );
};
export default connect(mapStateToProps,mapDispatchToProps)(VerifyMember);
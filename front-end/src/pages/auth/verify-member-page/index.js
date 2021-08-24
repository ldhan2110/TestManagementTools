import React, {useState, useEffect} from "react";
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import {VERIFY_USERS_TO_PROJECT_REQ} from '../../../redux/users/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import CircularProgress from '@material-ui/core/CircularProgress';
import { blue } from '@material-ui/core/colors';
import {
    Typography
  } from "@material-ui/core";
import {  GET_PROJECT_BY_ID_VERIFY_REQ, RESET_SELECT_PROJECT, SELECT_PROJECT } from "../../../redux/projects/constants";
import { LOGOUT_REQ } from "../../../redux/account/constants";

  //MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
    return { 
      insUsers: state.user.insUsers,
      project: state.project.projectName
     };
  }
  
  //MAP DISPATCH ACTIONS TO PROPS - REDUX
  const mapDispatchToProps = dispatch => {
    return {
      verifyUserToProjectReq: (payload) => dispatch({ type: VERIFY_USERS_TO_PROJECT_REQ, payload }),
      displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
      getProjectById: (payload) => dispatch({type: GET_PROJECT_BY_ID_VERIFY_REQ, payload}),
      selectProject: (value) => dispatch({type: SELECT_PROJECT, value}),
      resetSelect: () => dispatch({type: RESET_SELECT_PROJECT}),
      signOut: () => dispatch({type:  LOGOUT_REQ})
    }
  }

const VerifyMember = (props) => {

    const classes = useStyles();

    const history = useHistory();

    const {signOut,project, getProjectById, resetSelect, selectProject, insUsers, verifyUserToProjectReq, displayMsg} = props;

    const [userInfo, setUserInfo] = useState({
      email: window.location.pathname.split('/')[3],
      role: 'Tester',
      projectid: window.location.pathname.split('/')[4],
      projectname: '',
      resettoken: window.location.pathname.split('/')[5]
    })


    const [enableCreateBtn, setEnableCreateBtn] = useState(true);
    const [loading, setLoading] = useState(false);

    //RESET SELECT PROJECT
    useEffect(()=>{
      resetSelect();
      signOut();
      getProjectById({id: userInfo.projectid, token: userInfo.resettoken});
    },[]);

    useEffect(()=>{
      if (project.projectname){
        setUserInfo({
          ...userInfo,
          projectname: project.projectname
        })
      }
    },[project])

    useEffect(()=>{
    
      if(insUsers.sucess === true){
        displayMsg({
          content: "Joined project successfully !",
          type: 'success'
        });
        setEnableCreateBtn(true);
        setLoading(false);
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
    
      setEnableCreateBtn(false);
      setLoading(true);
      verifyUserToProjectReq(userInfo);
      selectProject({id: userInfo.projectid, name: userInfo.projectname, role: userInfo.role});
      if (localStorage.getItem('token') !== null){
        history.push('/projects/'+userInfo.projectid);
      } else {
        history.push('/login');
      }
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
        </div>

            
    </React.Fragment>
        
    );
};
export default connect(mapStateToProps,mapDispatchToProps)(VerifyMember);
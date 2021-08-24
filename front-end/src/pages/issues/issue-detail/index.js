import React, {useEffect, useState} from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import { useHistory } from "react-router-dom";
import {UPDATE_ISSUE_REQ, DELETE_ISSUE_REQ, RESET_UPDATE_ISSUE, RESET_DELETE_ISSUE, GET_ALL_ISSUE_REQ} from '../../../redux/issue/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
import {GET_ALL_BUILD_ACTIVE_REQ } from '../../../redux/build-release/constants';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { red } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import DatePicker from '../../../components/DatePicker';
import Link from '@material-ui/core/Link';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {
  Grid,
  Typography,
  Button,
  Divider,
  TextField,
  FormControlLabel,
  Checkbox,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Tooltip,
} from '@material-ui/core';
import members from "../../settings/members";

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { insIssue: state.issue.insIssue,  project:state.project.currentSelectedProject,
    listBuilds: state.build.listBuilds, insIssueDelete: state.issue.insIssueDelete,
    role: state.project.currentRole, listUser: state.user.listUsersOfProject }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    updateIssueReq: (payload) => dispatch({ type: UPDATE_ISSUE_REQ, payload }),
    deleteIssueReq: (payload) => dispatch({ type: DELETE_ISSUE_REQ, payload }),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    getAllBuildActiveReq: (payload) => dispatch({ type: GET_ALL_BUILD_ACTIVE_REQ, payload }),
    resetUpdateRedux: () => dispatch({type: RESET_UPDATE_ISSUE}),
    getAllIssueReq: (payload) => dispatch({ type: GET_ALL_ISSUE_REQ, payload}),
    resetDeleteRedux: () => dispatch({type: RESET_DELETE_ISSUE})
  }
}

const IssueDetailPage = (props) => {
    const {classes, updateIssueReq, insIssue, role,
           displayMsg, deleteIssueReq, insIssueDelete, resetUpdateRedux, resetDeleteRedux, getAllIssueReq, listUser} = props;
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [checkError, setCheckError] = useState(false);
    const [error, setError] = useState({
      summary: 'ss',
      description: 'ss',
    });
    const [issueInfor, setIssueInfor] = React.useState({
      id: props.match.params.summary,
      projectid: props.match.params.projectName,
      summary: props.history.location.state.summary,
      //buildname: props.history.location.state.buildname,
      description: props.history.location.state.description,
      //isActive: props.history.location.state.is_active,
      //isPublic: props.history.location.state.is_public,
      category: props.history.location.state.category,
      reporter: props.history.location.state.reporter,
      created_date: new Date(props.history.location.state.created_date),
      url: props.history.location.state.url,  
    });
    
    const [enableCreateBtn, setEnableCreateBtn] = useState(true);
    const [enableDeleteBtn, setEnableDeleteBtn] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loadingg, setLoadingg] = useState(false);
    const [openLink, setOpenLink] = useState(false);

    useEffect(()=>{
      if (insIssue.sucess === false){
        displayMsg({
          content: insIssue.errMsg,
          type: 'error'
        });
        setEnableCreateBtn(true);
        setLoading(false);
        resetUpdateRedux();
      } else if (insIssue.sucess === true) {
        displayMsg({
          content: "Update issue successfully !",
          type: 'success'
        });
        setEnableCreateBtn(true);
        setLoading(false);
        resetUpdateRedux();
        history.goBack();
      }
    },[insIssue.sucess]);

    try {
      useEffect(()=>{
        if (insIssueDelete.sucess === false){
          displayMsg({
            content: insIssueDelete.errMsg,
            type: 'error'
          });
          setEnableDeleteBtn(true);
          setLoadingg(false);
          resetDeleteRedux();
        } else if (insIssueDelete.sucess === true) {
          displayMsg({
            content: "Delete issue successfully !",
            type: 'success'
          });

          setEnableDeleteBtn(true);
          setLoadingg(false);
          resetDeleteRedux();
          history.goBack();
        }
      },[insIssueDelete.sucess]);      
    } catch (error) {
      //console.log('error: '+error);
    }

    

    const handleDelete=()=>{
      setEnableDeleteBtn(false);
    setLoadingg(true);
      deleteIssueReq(issueInfor);
      setOpen(false);
    }

    const handleUpdate = () => {
      setCheckError(true);

      if(issueInfor.description === "")
      setError({ ...issueInfor, description: "" });
  
      if(issueInfor.summary === "")
      setError({ ...issueInfor, summary: "" });

      if(issueInfor.description.trim().length === 0 || issueInfor.summary.trim().length === 0
          ||issueInfor.description.trim().length !== issueInfor.description.length 
          || issueInfor.summary.trim().length !== issueInfor.summary.length){
          displayMsg({
            content: "Summary or Descriptions should not contain spaces before and after !",
            type: 'error'
          });
      }
  
      else if(issueInfor.summary !== "" && issueInfor.description !== "") {
        setEnableCreateBtn(false);
        setLoading(true);
        updateIssueReq(issueInfor);
      }
    };
    
    const handleChange = (prop) => (event) => {
      setIssueInfor({ ...issueInfor, [prop]: event.target.value });

      if(checkError === true)
      setError({ ...error, [prop]: event.target.value });
    }
  
  
    /*const handleIsActive = () =>{
  
      if(issueInfor.isActive === true || issueInfor.isActive === 0){
        setIssueInfor({ ...issueInfor, isActive: false });
      }
      else{
        setIssueInfor({ ...issueInfor, isActive: true });
      }  };
  
    const handleIsPublic = () =>{
  
      if(issueInfor.isPublic === true || issueInfor.isPublic === 0){
        setIssueInfor({ ...issueInfor, isPublic: false });
      }
      else{
        setIssueInfor({ ...issueInfor, isPublic: true });
      }
    };*/

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleBack = () => {    
      history.goBack();
    };

    const getDate = (date) => { // mm/dd/yyyy
      return(
      ((date.getMonth() > 8) ? 
      (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)))
      + '/' +
      ((date.getDate() > 9) ?
       date.getDate() : ('0' + date.getDate())) 
      + '/' +
      date.getFullYear()
      )
    }

    return (
    <div>
        <Helmet title="Defect Details" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Defect Details {/*- {props.history.location.state.testplanname}*/}
          </Typography>
        
          
        </Grid>
        <Grid item>
        <div>
       {/*} {(role === 'Project Manager' || role === 'Test Lead') && <Button variant="contained" disabled={enableDeleteBtn ? false : true } startIcon={<DeleteIcon />} size="large" style={enableDeleteBtn ? {color: red[500] } : {}} onClick={handleOpen}>
            Delete Issue
            {loadingg && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>}*/}

          </div>
          <Grid item>
                <Dialog open={open} >
                  <DialogTitle>Confirm</DialogTitle>
                  <DialogContent>Are you sure want to delete this issue?</DialogContent>
                  <DialogActions>
                    <Button onClick={handleDelete} color="primary">Yes</Button>
                    <Button onClick={handleClose} color="primary">No</Button>
                  </DialogActions>
                </Dialog>
          </Grid>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
        <form className={classes.content}>
          <TextField id="summary" label="Defect Summary" variant="outlined"  fullWidth inputProps={{readOnly: true}}
          value={issueInfor.summary || ''} onChange={handleChange('summary')}
          error={issueInfor.summary.trim().length === 0 && error.summary.trim().length === 0 ? true : false}
          helperText={issueInfor.summary.trim().length === 0 && error.summary.trim().length === 0 ? 'Summary is required' : ' '}
          InputProps={{readOnly: true}}/>          

          {/*<div>
             <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" />}
              label="Public"
              labelPlacement="start"
              value={issueInfor.isPublic}  onChange={handleIsPublic}
              checked={issueInfor.isPublic}
            />
          </div>
          <div className = {classes.btnSpacingDes}>
            <FormControlLabel
              classes= {{label: classes.titleContent}}
              value="start"
              control={<Checkbox color="primary" />}
              label="Active"
              labelPlacement="start" 
              value={issueInfor.isActive}  onChange={handleIsActive}
              checked={issueInfor.isActive}
            />
          </div>*/}

          <TextField id="category" label="Category" variant="outlined"  fullWidth
          value={issueInfor.category || ''} onChange={handleChange('category')}
          InputProps={{readOnly: true}}/>  

          <TextField id="reporter" label="Reporter" variant="outlined"  fullWidth
          value={issueInfor.reporter || ''} onChange={handleChange('reporter')}
          InputProps={{readOnly: true}}/>

          <div className={classes.divDateLink}>
          <TextField id="created_date" label="Created Date" variant="outlined"
          readOnly={true}
          value={issueInfor.created_date ? getDate(issueInfor.created_date):""}
          InputProps={{readOnly: true}}/>

          <TextField id="url" label="Link Mantis" variant="outlined" fullWidth
            value={issueInfor.url || ''} onChange={handleChange('url')}
            InputProps={{readOnly: true, endAdornment: 
            <Tooltip title="Open link"><Link href={issueInfor.url} target="_blank" rel="noopener">
              <ExitToAppIcon />
            </Link></Tooltip>}}
            style={{marginLeft: 15}}
          />
          </div>

          

          <TextField id="descriptions" label="Descriptions" variant="outlined"  fullWidth multiline rows={5}
          value={issueInfor.description || ''} onChange={handleChange('description')}
          error={issueInfor.description.trim().length === 0 && error.description.trim().length === 0 ? true : false}
          helperText={issueInfor.description.trim().length === 0 && error.description.trim().length === 0 ? 'Descriptions is required' : ' '}
          InputProps={{readOnly: true}}/> 

          <div className = {classes.btnGroup}>
          {/*{(role === 'Project Manager' || role === 'Test Lead') && <Button variant="contained" color="primary" disabled={enableCreateBtn ? false : true } startIcon={<UpdateIcon/>} onClick={handleUpdate}>
            Update
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </Button>}*/}
          <Button variant="contained" startIcon={<ArrowBackIcon/>} onClick={handleBack}>
            Return
          </Button>
          
        </div>
        </form>
        </Grid>
      </Grid>
    </div>
    );
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(IssueDetailPage));

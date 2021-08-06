import React, {useEffect, useState} from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import {CREATE_ISSUE_REQ, RESET_CREATE_ISSUE, GET_ALL_CATEGORY_REQ} from '../../../redux/issue/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Slide from '@material-ui/core/Slide';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Snackbar from '../../../components/SnackBar';
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  //IconButton
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
//import UploadAttachment from './UploadAttachment'
import Previews from './UploadDropZone'
//import MyUploader from './RDUUploadAttachment'

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return {
    project: state.project.currentSelectedProject,
    testexec: state.testexec,
    issue: state.issue,
   }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    createIssueReq: (payload) => dispatch({ type: CREATE_ISSUE_REQ, payload }),
    getAllCategoryReq: (payload) => dispatch({ type: GET_ALL_CATEGORY_REQ, payload }),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    resetCreateIssueRedux: () => dispatch({type: RESET_CREATE_ISSUE}),
  }
}

const TransitionEffect = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewIssuePage = (props) => {

  const {isOpen, setOpen, classes} = props; 

  const {project, getAllCategoryReq, issue, testexec, createIssueReq, displayMsg, resetCreateIssueRedux} = props;

  const [open, setOpenPopup] = React.useState(isOpen); 
  const [checkError, setCheckError] = useState(false);
  const [error, setError] = useState({
    projectname: 'ss',
    description: 'ss',
  });

  useEffect(()=>{
    getAllCategoryReq(project);
  },[])

  const [issueInfo, setIssueInfo] = useState({
    projectid: project,
    summary: "",
    description: "",
    category: "",
    testexecution_id: testexec.execTest?.testExecId,
    attachment: [],
  });

  const getUrl = (arrAttches) => {
    setIssueInfo({...issueInfo, attachment: arrAttches});
  }

  const [enableCreateBtn, setEnableCreateBtn] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
      setOpenPopup(isOpen);
  },[isOpen, open])

  
  useEffect(()=>{
    if (issue.insIssue?.sucess === false){
      displayMsg({
        content: issue.insIssue.errMsg,
        type: 'error'
      });
      resetCreateIssueRedux(); 
      setEnableCreateBtn(true);
      setLoading(false);
    } else if (issue.insIssue?.sucess === true) {
      displayMsg({
        content: "Create issue successfully !",
        type: 'success'
      });
      resetCreateIssueRedux();
      setEnableCreateBtn(true);
      setLoading(false);
      handleClose();
    }
  },[issue.insIssue]);


  const handleClose = () => {
    setIssueInfo({
      projectid: project,
      summary: "",
      description: "",
      category: "",
      testexecution_id: testexec.execTest?.testExecId,
      attachment: [],
    })
    setCheckError(false);
    setOpen(false);
  };

  const handleCreate = () => {
    setCheckError(true);

    if(issueInfo.description === "")
    setError({ ...issueInfo, description: "" });

    if(issueInfo.summary === "")
    setError({ ...issueInfo, summary: "" });

    if(issueInfo.description.trim().length === 0 || issueInfo.summary.trim().length === 0
        ||issueInfo.description.trim().length !== issueInfo.description.length 
        || issueInfo.summary.trim().length !== issueInfo.summary.length){
        displayMsg({
          content: "Summary or Descriptions should not contain spaces before and after !",
          type: 'error'
        });
    }
  
    else{
      setEnableCreateBtn(false);
      setLoading(true);
      createIssueReq(issueInfo);
    }

  }

  const handleChange = (prop) => (event) => {    
    setIssueInfo({...issueInfo, [prop]: event.target.value});
    if(checkError === true)
    setError({ ...error, [prop]: event.target.value });
  };

  return (
      <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose} TransitionComponent={TransitionEffect}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h3" className={classes.title}>
              Issue Report
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <form className={classes.content}>
          <TextField id="issueName" label="Issue Summary" variant="outlined"  fullWidth required 
          inputProps={{maxLength : 250}} 
          value={issueInfo.summary || ''} onChange={handleChange('summary')} 
          error={checkError && issueInfo.summary.trim().length === 0 
            && error.summary.trim().length === 0 ? true : false}
          helperText={checkError && issueInfo.summary.trim().length === 0 
            && error.summary.trim().length === 0 ? 'Issue summary is required!' : ''}/>

          <TextField id="descriptions" label="Descriptions" variant="outlined"  fullWidth required multiline rows={5}  
          value={issueInfo.description || ''} onChange={handleChange('description')}
          error={checkError && issueInfo.description.trim().length === 0 
            && error.description.trim().length === 0 ? true : false}
          helperText={checkError && issueInfo.description.trim().length === 0 
            && error.description.trim().length === 0 ? 'Descriptions is required!' : ''}/>

          <FormControl variant="outlined" //className={classes.formControl}
          fullWidth>
            <InputLabel id="IssueCategory">Category</InputLabel>
            <Select
              labelId="testSuite"
              id="testSuite"
              value={issueInfo.category}
              onChange={handleChange('category')}
              label="Category"
            >
            <MenuItem value="" disabled></MenuItem>
              {issue.listCategory?.categories?.map((item) => (
                <MenuItem value={item.categoryname}>{item.categoryname}</MenuItem>
              ))}
            </Select>
            </FormControl>

          {/*   <MyUploader /> */}
          
          <Previews getUrl={getUrl}/>
          
          {/* <UploadAttachment /> */}
        
          <div className = {classes.btnGroup}>          
          <Button variant="contained" startIcon={<CancelIcon/>} onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" disabled={enableCreateBtn ? false : true } startIcon={<AddIcon/>} onClick={handleCreate}>
            Report Issue
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>
        </div>
        </form>
      </Dialog>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(NewIssuePage));
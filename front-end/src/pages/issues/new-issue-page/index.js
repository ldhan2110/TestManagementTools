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
  InputLabel, FormHelperText,
  //IconButton
} from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
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

  const {project, getAllCategoryReq, issue, testexec, createIssueReq, displayMsg, resetCreateIssueRedux, tc_id, listStep} = props;

  const [open, setOpenPopup] = React.useState(isOpen); 
  const [checkError, setCheckError] = useState(false);
  const [error, setError] = useState({
    projectname: 'ss',
    description: 'ss',
  });

  useEffect(()=>{
    getAllCategoryReq(project);
  },[])

  useEffect(()=>{
    setIssueInfo({...issueInfo, testcase_id: tc_id});
  },[tc_id])

  const [issueInfo, setIssueInfo] = useState({
    projectid: project,
    summary: "",
    description: "",
    category: "",
    testexecution_id: testexec.execTest?.testExecId,
    testcase_id: tc_id,
    attachment: [],
  });

  const getUrl = (arrAttches) => {
    setIssueInfo({...issueInfo, attachment: arrAttches});
  }

  const removeUnneedKeyStep = (list) => {
    let result = list.map(item => ({ 
      Step_Define: item.stepDefine, Expected_Result: item.expectResult, Actual_Result: item.note}))
    return result;
  };

  const formatListStep = (list) => {
    var str = "";
    for(var i = 0; i < list.length; i++) {
      var str1 = Object.keys(list[i]).map(key => `${key}: ${list[i][key]}`).join("\n");
      var str2 = '\n\n\n';
      var str0 = 'Step ' + (i+1) + ':' + '\n';
      if(i === list.length - 1)
        str = str.concat(str0, str1);
      else str = str.concat(str0, str1, str2);
    }
    return str;
  };

  const [enableCreateBtn, setEnableCreateBtn] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
      setOpenPopup(isOpen);
      if(isOpen === true)
        setIssueInfo({...issueInfo, description: formatListStep(removeUnneedKeyStep(listStep))});
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
        content: (typeof issue.insIssue.sucessMsg === 'number') ? "Report defect successfully, ID is " + issue.insIssue.sucessMsg : "Report defect successfully !",
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
      testcase_id: tc_id,
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

    if(issueInfo.category === "")
    setError({ ...issueInfo, category: "" });

    if(issueInfo.description.trim().length === 0 || issueInfo.summary.trim().length === 0
        || issueInfo.category === "" || issueInfo.category.length === 0
        ){
        displayMsg({
          content: "Field(s) cannot be empty or have empty spaces begining/end !",
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
      <Dialog fullWidth maxWidth="lg" scroll="paper" open={open} onClose={handleClose} TransitionComponent={TransitionEffect}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h3" className={classes.title}>
              Report Defect
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent dividers={true}>
        <form className={classes.content}>
          <TextField id="issueName" label="Defect Summary" variant="outlined"  fullWidth required 
          inputProps={{maxLength : 250}} 
          value={issueInfo.summary || ''} onChange={handleChange('summary')} 
          error={checkError && issueInfo.summary.trim().length === 0 
            && error.summary.trim().length === 0 ? true : false}
          helperText={checkError && issueInfo.summary.trim().length === 0 
            && error.summary.trim().length === 0 ? 'Issue summary is required!' : ''}/>

          <TextField id="descriptions" label="Descriptions" variant="outlined"  fullWidth required multiline rows={10}  
          value={issueInfo.description || ''} onChange={handleChange('description')}
          error={checkError && issueInfo.description.trim().length === 0 
            && error.description.trim().length === 0 ? true : false}
          helperText={checkError && issueInfo.description.trim().length === 0 
            && error.description.trim().length === 0 ? 'Descriptions is required!' : ''}/>

          <FormControl required variant="outlined" //className={classes.formControl}
          fullWidth>
            <InputLabel id="IssueCategory">Category</InputLabel>
            <Select
              labelId="testSuite"
              id="testSuite"
              value={issueInfo.category}
              onChange={handleChange('category')}
              label="Category"
              error={(error.category === "" && issueInfo.category === "") ? true : false}
            >
            <MenuItem value="" disabled></MenuItem>
              {issue?.listCategory?.map((item) => (
                <MenuItem value={item.categoryname}>{item.categoryname}</MenuItem>
              ))}
            </Select>
            {error.category === "" && issueInfo.category === "" && 
            <FormHelperText style={{color: 'red'}} >Select a category!</FormHelperText>}
            </FormControl>
          
          <Previews getUrl={getUrl} revoke={open}/>
          
        </form>
        </DialogContent>
        <DialogActions>
          <div className = {classes.btnGroup}>          
          <Button variant="contained" startIcon={<CancelIcon/>} onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary"
            disabled={enableCreateBtn ? false : true }
            startIcon={<AddIcon/>}
            onClick={handleCreate} >
              Report Defect
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>
        </div>
        </DialogActions>
      </Dialog>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(NewIssuePage));
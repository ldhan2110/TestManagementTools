import React, {useEffect, useState} from 'react';
import CheckboxTreeView from '../../../components/CheckboxTreeView/CheckboxTreeView';
import { connect } from 'react-redux';
import {GET_ALL_TESTCASE_REQ, GET_LIST_TESTCASE_SELECT_REQ, GET_ALL_TESTSUITE_REQ, GET_ALL_TESTSUITE_NO_TREE_REQ} from '../../../redux/test-case/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  AppBar, Toolbar, IconButton, Typography
} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';


//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { 
    project: state.project.currentSelectedProject,
    testcase: state.testcase,
    listtestcaseselect: state.testcase.listTestcaseSelect,
   }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    getAllTestcaseReq: (payload) => dispatch({type: GET_ALL_TESTCASE_REQ, payload}),
    getAllTestsuiteReq: (payload) => dispatch({type: GET_ALL_TESTSUITE_REQ,payload}),
    getListTestcaseSelectReq: (payload) => dispatch({type: GET_LIST_TESTCASE_SELECT_REQ, payload}),
    getAllTestsuiteNoTreeReq: (payload) => dispatch({type: GET_ALL_TESTSUITE_NO_TREE_REQ,payload})

  }
}


const SelectTestCasePopup = (props) => {
  
  const { getAllTestcaseReq, testcase, project, getListTestcaseSelectReq, selected, getAllTestsuiteReq, getAllTestsuiteNoTreeReq} = props;
  
  const {isOpen, setOpen} = props;  
  
  const [open, setOpenPopup] = React.useState(isOpen);

  const [listTestCase, setListTestCase] = useState([]);

  const convertData = (selected) => {
      var result = [];
      if (selected) {
        selected.map(item  => result.push(item.testcaseid ? item.testcaseid : item._id));
      }
      return result;
  }

  const [data,setData] = useState(convertData(selected));

  const handleClose = () =>{
      setOpen(false);
  }

  const handleSelect = (Data) =>{
    setData(Data)
}

const handleSelectTestcase = () =>{
  getListTestcaseSelectReq(data);
  setOpen(false);
}

  useEffect(()=>{
      setOpenPopup(isOpen);
  },[isOpen, open])

  useEffect(()=>{
    setListTestCase(testcase.listTestsuiteNoTree);
  },[testcase.listTestsuiteNoTree])

  useEffect(()=>{
    testcase.successNoTree = null;
    getAllTestsuiteReq(project);
    getAllTestcaseReq(project); 
    getAllTestsuiteNoTreeReq(project);
  },[])

  const theme = useTheme();


  return (
    <React.Fragment > 
      <Dialog open={open}   
        fullScreen 
         onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Select Test Case</DialogTitle>
        <AppBar>
          <Toolbar> 
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">
              Select Test Case
            </Typography>
           
          </Toolbar>
        </AppBar>
        <DialogContent dividers>
        {testcase.successNoTree === "" ? 
          <div style={{height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress />
          </div> :     
          <Grid container spacing={1} style={{height: '30vh',maxHeight: '30vh', width: '20vw', maxWidth:'20vw'}}>          
            <Grid item xs={12}>              
              <CheckboxTreeView data={testcase.listTestsuiteNoTree} parentCallback={handleSelect} selected={data}/>
            </Grid>
          </Grid>}
        </DialogContent>

        <DialogActions>
          <Button color="primary" disabled={testcase.successNoTree === ""? true:false} onClick={handleSelectTestcase}>
            Select
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default  connect(mapStateToProps, mapDispatchToProps)(SelectTestCasePopup);
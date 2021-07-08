import React, {useEffect, useState} from 'react';
import CheckboxTreeView from '../../../components/CheckboxTreeView/CheckboxTreeView';
import { connect } from 'react-redux';
import {GET_ALL_TESTCASE_REQ, GET_LIST_TESTCASE_SELECT_REQ, GET_ALL_TESTSUITE_REQ, GET_ALL_TESTSUITE_NO_TREE_REQ} from '../../../redux/test-case/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
} from '@material-ui/core'

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
    getAllTestsuiteReq(project);
    getAllTestcaseReq(project); 
    getAllTestsuiteNoTreeReq(project);
  },[])



  return (
    <React.Fragment > 
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" style={{color: 'white', background: 'blue'}}>Select Test Case</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={1} style={{height: '30vh',maxHeight: '30vh', width: '20vw', maxWidth:'20vw'}}>
            <Grid item xs={12}>
              <CheckboxTreeView data={testcase.listTestsuiteNoTree} parentCallback={handleSelect} selected={data}/>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={handleSelectTestcase}>
            Select
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default  connect(mapStateToProps, mapDispatchToProps)(SelectTestCasePopup);
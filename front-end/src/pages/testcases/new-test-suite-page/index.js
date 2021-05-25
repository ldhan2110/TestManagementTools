import React, {useEffect, useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  DialogTitle,
  Button,
  Grid
} from '@material-ui/core'
import {GET_ALL_TESTCASE_REQ, ADD_TEST_SUITE_REQ, RESET_ADD_TEST_SUITE} from '../../../redux/test-case/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { 
    insTestsuiteCreate: state.testcase.insTestsuiteCreate
   }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    getAllTestcaseReq: (payload) => dispatch({type: GET_ALL_TESTCASE_REQ, payload}),
    addTestsuiteReq: (payload) => dispatch({type: ADD_TEST_SUITE_REQ, payload}),
    resetAddRedux: () => dispatch({type: RESET_ADD_TEST_SUITE})
  }
}


const NewTestSuitePopup = (props) => {
    const {isOpen, setOpen, selected} = props;  
    const [open, setOpenPopup] = React.useState(isOpen);
    const{displayMsg, getAllTestcaseReq, addTestsuiteReq, resetAddRedux, insTestsuiteCreate} = props;
    const [checkError, setCheckError] = useState(false);
    const [error, setError] = useState({
      testsuitename: 'ss',
      description: 'ss',
    });
    const [testSuiteInfo, setTestSuite] = useState({
      testsuitename:'',
      description:'',
      priority: 'medium',
      parent: ''
    });

  useEffect(()=>{
      setOpenPopup(isOpen);
  },[isOpen, open])

  useEffect(()=>{
    setTestSuite({
      ...testSuiteInfo,
      parent: selected
    })
},[selected])


  useEffect(()=>{
     if (insTestsuiteCreate.sucess === false){
      displayMsg({
        content: insTestsuiteCreate.errMsg,
        type: 'error'
      });
      resetAddRedux();
    } else if (insTestsuiteCreate.sucess === true) {
      displayMsg({
        content: "Create test suite successfully!",
        type: 'success'
      });
      handleClose();
      console.log('here');
      getAllTestcaseReq();
      resetAddRedux();
    }
  },[insTestsuiteCreate.sucess])


  
    const handleChange = (prop) => (event) => {
      setTestSuite({ ...testSuiteInfo, [prop]: event.target.value });

      if(checkError == true)
      setError({ ...error, [prop]: event.target.value });
    };

    const handleCreate = () => {
      setCheckError(true);

      if(testSuiteInfo.description === "")
      setError({ ...testSuiteInfo, description: "" });
  
      if(testSuiteInfo.testsuitename === "")
      setError({ ...testSuiteInfo, testsuitename: "" });

      if(testSuiteInfo.description.trim().length == 0 || testSuiteInfo.testsuitename.trim().length == 0
          ||testSuiteInfo.description.trim().length !== testSuiteInfo.description.length 
          ||testSuiteInfo.testsuitename.trim().length !== testSuiteInfo.testsuitename.length){
          displayMsg({
            content: "Test Suite Name or Description should not contain spaces !",
            type: 'error'
          });
      }
  
      else if(testSuiteInfo.testsuitename !== "" && testSuiteInfo.description !== "")
       addTestsuiteReq(testSuiteInfo);
    }

    const handleClose = () =>{
      setOpen(false);
      setTestSuite({
        testsuitename:'',
        description:'',
        priority: 'medium',
        parent: '',
      }) 
    }

    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" style={{color: 'white', background: 'blue'}}>New Test Suite</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField id="name" label="Test Suite Name" variant="outlined"  fullWidth required  
              value={testSuiteInfo.testsuitename || ''} onChange={handleChange('testsuitename')} inputProps={{maxLength : 16}} 
              error={testSuiteInfo.testsuitename.trim().length == 0 && error.testsuitename.trim().length == 0? true : false}
              helperText={testSuiteInfo.testsuitename.trim().length == 0 && error.testsuitename.trim().length == 0 ? 'Test Suite Name is required' : ' '}/>
            </Grid>
            <Grid item xs={12}>
              <TextField id="descriptions" label="Description" variant="outlined" fullWidth required multiline rows={10}  
              value={testSuiteInfo.description || ''} onChange={handleChange('description')}
              error={testSuiteInfo.description.trim().length == 0 && error.description.trim().length == 0 ? true : false}
              helperText={testSuiteInfo.description.trim().length == 0 && error.description.trim().length == 0 ? 'Description is required' : ' '}/>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleCreate}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(NewTestSuitePopup);
  

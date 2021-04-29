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
import {GET_ALL_TESTCASE_REQ, ADD_TEST_SUITE_REQ} from '../../../redux/test-case/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { 
    testsuite: state.testcase.insTestsuite
   }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    getAllTestcaseReq: (payload) => dispatch({type: GET_ALL_TESTCASE_REQ, payload}),
    addTestsuiteReq: (payload) => dispatch({type: ADD_TEST_SUITE_REQ, payload})
  }
}


const NewTestSuitePopup = (props) => {
    const {isOpen, setOpen, selected} = props;  
    const [open, setOpenPopup] = React.useState(isOpen);

    const{testsuite, displayMsg, getAllTestcaseReq, addTestsuiteReq} = props;

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
     if (testsuite.sucess === false){
      displayMsg({
        content: testsuite.errMsg,
        type: 'error'
      });
    } else if (testsuite.sucess === true) {
      displayMsg({
        content: "Create test suite successfully !",
        type: 'success'
      });
      getAllTestcaseReq();
      handleClose();
    }
  },[testsuite.sucess])


  
    const handleChange = (prop) => (event) => {
      setTestSuite({ ...testSuiteInfo, [prop]: event.target.value });
    };

    const handleCreate = () => {
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
              <TextField id="name" label="Test Suite Name" variant="outlined"  fullWidth required  value={testSuiteInfo.testsuitename || ''} onChange={handleChange('testsuitename')} inputProps={{maxLength : 16}} />
            </Grid>
            <Grid item xs={12}>
              <TextField id="descriptions" label="Description" variant="outlined"  fullWidth required multiline rows={10}  value={testSuiteInfo.description || ''} onChange={handleChange('description')}/>
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
  

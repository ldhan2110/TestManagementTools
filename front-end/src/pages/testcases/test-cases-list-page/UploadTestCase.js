import React, {useState,useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import styles from "./styles";
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { withStyles } from '@material-ui/core/styles';
import {ADD_TEST_CASE_REQ, GET_ALL_TESTCASE_REQ, RESET_ADD_TEST_CASE} from '../../../redux/test-case/constants';
import XLSXParser from '../../../components/XlsxParser/XlsxParse';
import { blue } from '@material-ui/core/colors';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress
} from '@material-ui/core'


function mapStateToProps(state) {
  return {
    insTestcase: state.testcase.insTestcase,
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    getAllTestcaseReq: (payload) => dispatch({type: GET_ALL_TESTCASE_REQ, payload}),
    addTestcaseReq: (payload) => dispatch({type: ADD_TEST_CASE_REQ, payload}),
    resetAddRedux: () => dispatch({type: RESET_ADD_TEST_CASE})
  }
}

const UploadTestCase = (props) => {

  const {isOpen, setOpen, testsuite} = props;

  const {addTestcaseReq, insTestcase, displayMsg, getAllTestcaseReq, resetAddRedux  } = props;

  const [open,setOpenMethod] = useState(isOpen);

  const [files,setFile] = useState([]);

  const [result,setResult] = useState({});

  const [enableCreateBtn, setEnableCreateBtn] = useState(true);
  const [loading, setLoading] = useState(false);

  const inputFile = useRef(null) 
  
  useEffect(()=>{
    setOpenMethod(isOpen);
  },[isOpen])

  useEffect(()=>{
    if (insTestcase.sucess === false){
      setLoading(false);
      displayMsg({
        content: "Test Case name already exists in this project !",
        type: 'error'
      });
      setEnableCreateBtn(true);
      setLoading(false);
      resetAddRedux();
    } else if (insTestcase.sucess === true) {
      setLoading(false);
      displayMsg({
        content: "Upload Testcase successfully !",
        type: 'success'
      });
      setEnableCreateBtn(true);
      setLoading(false);
      getAllTestcaseReq();
      resetAddRedux();
      handleClose();
    }
  },[insTestcase.sucess]);


  const handleClose = () => {
    setOpen(false);
    //openMethod(false);
  }

  const handleClickUploadFile = () => {   
     inputFile.current.click();
  }

  const handleFileUpload = (e) => {
    XLSXParser(e, setResult);
  }

  const handleConfirm = () =>{
    var tempTC = result;
    tempTC.testsuite = testsuite;
    addTestcaseReq(tempTC);
  }

  

    return(
      <Dialog open={open} onClose={handleClose}  fullWidth={false} maxWidth={'sm'}>
        <DialogTitle>Upload Test Case</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Please input files to upload your test case. <br></br>
            For the template file, please click <a href='/template/Example.xlsx' download>here</a>
          </DialogContentText>
          <input type='file' id='file' ref={inputFile} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"  onChange={(e)=>{handleFileUpload(e)}} multiple/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} disabled={enableCreateBtn == true ? false : true } color="primary">
            Confirm
            {loading && <CircularProgress size={24} style={{color: blue[500],position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(UploadTestCase));
import React, {useState,useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import styles from "./styles";
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { withStyles } from '@material-ui/core/styles';
import {UPLOAD_, GET_ALL_TESTCASE_REQ, RESET_ADD_TEST_CASE, UPLOAD_TESTCASE_REQ, RESET_UPLOAD_TESTCASE} from '../../../redux/test-case/constants';
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
import { resetUploadTestCase } from '../../../redux/test-case/testcaseAction';


function mapStateToProps(state) {
  return {
    insTestcaseUpl: state.testcase.insTestcaseUpl,
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    getAllTestcaseReq: (payload) => dispatch({type: GET_ALL_TESTCASE_REQ, payload}),
    uplTestcaseReq: (payload) => dispatch({type: UPLOAD_TESTCASE_REQ, payload}),
    resetAddRedux: () => dispatch({type: RESET_ADD_TEST_CASE}),
    resetUploadTestCaseRedux: () => dispatch({type: RESET_UPLOAD_TESTCASE})
  }
}

const UploadTestCase = (props) => {

  const {isOpen, setOpen, testsuite} = props;

  const {uplTestcaseReq, insTestcaseUpl, displayMsg, getAllTestcaseReq, resetAddRedux, resetUploadTestCaseRedux } = props;

  const [open,setOpenMethod] = useState(isOpen);

  //const [files,setFile] = useState([]);

  const [result,setResult] = useState({});

  const [enableCreateBtn, setEnableCreateBtn] = useState(true);
  const [loading, setLoading] = useState(false);

  const inputFile = useRef(null) 
  
  useEffect(()=>{
    setOpenMethod(isOpen);
  },[isOpen])

  useEffect(()=>{
    if (insTestcaseUpl.sucess === false){
      displayMsg({
        content: insTestcaseUpl.errMsg,
        type: 'error'
      });
      setEnableCreateBtn(true);
      setLoading(false);
      resetAddRedux();
      resetUploadTestCaseRedux();
    } else if (insTestcaseUpl.sucess === true) {
      displayMsg({
        content: "Upload Test case(s) successfully !",
        type: 'success'
      });
      setEnableCreateBtn(true);
      setLoading(false);
      getAllTestcaseReq();
      resetAddRedux();
      resetUploadTestCaseRedux();
      handleClose();
    }
  },[insTestcaseUpl.sucess]);


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
    tempTC.map(item => item.testsuite = testsuite);
    uplTestcaseReq(tempTC);
    setEnableCreateBtn(false);
    setLoading(true);
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
          <Button onClick={handleConfirm} disabled={enableCreateBtn ? false : true } color="primary">
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
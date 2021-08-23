import React, { useState, useEffect } from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import EnhancedTable from '../../../components/Table/index';
import NewTestSuitePopup from '../new-test-suite-page/index';
import {TEST_SUITE_DETAIL_HEADERS} from '../../../components/Table/DefineHeader';
import { connect } from 'react-redux';
import {UPDATE_TESTSUITE_REQ, DELETE_TESTSUITE_REQ, RESET_UPDATE_TESTSUITE, RESET_DELETE_TESTSUITE, GET_ALL_TESTCASE_REQ,
  DELETE_TESTCASE_REQ, RESET_DELETE_TESTCASE} from '../../../redux/test-case/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import { red } from '@material-ui/core/colors';
import { blue } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadTestcasePopup from './UploadTestCase';
import ExportExcel from '../../../components/ExportExcel/ExportExcel';
import {
  Grid,
  Typography,
  Divider,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog,
  IconButton,
  Tooltip
} from '@material-ui/core';

import {
  Add as AddIcon,
} from "@material-ui/icons";
import { Upload } from "react-feather";
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { 
    listTestsuite: state.testcase.listTestsuite,
    project:state.project.currentSelectedProject,
    insTestsuite: state.testcase.insTestsuite,
    insTestsuiteDelete: state.testcase.insTestsuiteDelete,
    insTestcase: state.testcase.insTestcase,
    insTestcaseDelete: state.testcase.insTestcaseDelete
   }
}
//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
    updateTestsuiteReq: (payload) => dispatch({type: UPDATE_TESTSUITE_REQ, payload}),
    deleteTestsuiteReq: (payload) => dispatch({type: DELETE_TESTSUITE_REQ, payload}),
    getAllTestcaseReq: (payload) => dispatch({type: GET_ALL_TESTCASE_REQ, payload}),
    resetUpdateRedux: () => dispatch({type: RESET_UPDATE_TESTSUITE}),
    resetDeleteRedux: () => dispatch({type: RESET_DELETE_TESTSUITE}),
    deleteTestcaseReq: (payload) => dispatch({type: DELETE_TESTCASE_REQ, payload}),
    resetDeleteTCRedux: () => dispatch({type: RESET_DELETE_TESTCASE})
  }
}

const TestSuiteDetail = (props) => {
  const {node, listTestsuite, project, updateTestsuiteReq, getAllTestcaseReq, deleteTestsuiteReq, displayMsg, insTestsuite, 
    resetUpdateRedux, resetDeleteRedux, insTestsuiteDelete, 
    deleteTestcaseReq, resetDeleteTCRedux, insTestcaseDelete} = props;
  const [testSuite, setTestSuite] = useState({
    id: '',
    name: '',
    description: '',
    parent: '',
    priority: node.priority,
    children: [],
    projectid: project,
    
  });
  const [openNewTS, setOpenTS] = useState(false);
  //const [openNewTC, setOpenTC] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openTCase, setOpenTCase] = React.useState(false);
  const [openTSuite, setOpenTSuite] = React.useState(false);
  const [testcaseInfor, setTestcaseInfor] = useState({
    projectid: project,
    testcaseid: ''
  });
  const [testsuiteInfor, setTestsuiteInfor] = useState({
    projectid: project,
    _id: ''
  });

  const [checkError, setCheckError] = useState(false);
  const [error, setError] = useState({
    name: 'ss',
    description: 'ss',
  });
  const history = useHistory();
  const [enableCreateBtn, setEnableCreateBtn] = useState(true);
  const [enableDeleteBtn, setEnableDeleteBtn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingg, setLoadingg] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);

  

  useEffect(()=>{
    if (node && node.parent === undefined){
      setTestSuite({
        ...node,
        id: node.id,
        name: node.name,
        description: node.description,
        parent: "",
        priority: node.priority,
        children: node.children,
        projectid: project
      });
    }
    else if(node && node.parent !== undefined){
      setTestSuite({
        ...node,
        id: node.id,
        name: node.name,
        description: node.description,
        parent: node.parent.testsuitename,
        priority: node.priority,
        children: node.children,
        projectid: project
      });      
    }
  },[node])

  useEffect(()=>{
    if (insTestsuite.sucess === false){
      setLoading(false);
      displayMsg({
        content: insTestsuite.errMsg,
        type: 'error'
      });
      setEnableCreateBtn(true);
      setLoading(false);
      resetUpdateRedux();
    } else if (insTestsuite.sucess === true) {
      getAllTestcaseReq();
      displayMsg({
        content: "Update testsuite successfully !",
        type: 'success'
      });      
      setEnableCreateBtn(true);
      setLoading(false);
      resetUpdateRedux();
    }
  },[insTestsuite.sucess]);

  useEffect(()=>{
    if (insTestsuiteDelete.sucess === false){
      displayMsg({
        content: insTestsuiteDelete.errMsg,
        type: 'error'
      });
      setEnableDeleteBtn(true);
      setLoadingg(false);
      resetDeleteRedux();
    } else if (insTestsuiteDelete.sucess === true) {
      displayMsg({
        content: "Delete testsuite successfully !",
        type: 'success'
      });
      setEnableDeleteBtn(true);
      setLoadingg(false);
      getAllTestcaseReq();
      resetDeleteRedux();
    }
  },[insTestsuiteDelete.sucess]);

  const handleOpenTS = ()=>{
    setOpenTS(true);
  }

  const handleOpenTC = ()=>{
    history.push(window.location.pathname+"/"+encodeURIComponent(node.name)+"/new-test-case");
  }

  const handleChange = (prop) => (event) => {
    setTestSuite({ ...testSuite, [prop]: event.target.value });

    if(checkError === true)
    setError({ ...error, [prop]: event.target.value });
  };

  const handleSave = ()=>{
    setCheckError(true);

    if(testSuite.description === "")
    setError({ ...testSuite, description: "" });

    if(testSuite.name === "")
    setError({ ...testSuite, name: "" });

    if(testSuite.description.trim().length === 0 || testSuite.name.trim().length === 0
        ||testSuite.description.trim().length !== testSuite.description.length 
        || testSuite.name.trim().length !== testSuite.name.length){
        displayMsg({
          content: "Testsuite name or Descriptions should not contain spaces before and after !",
          type: 'error'
        });
    }

    else if(testSuite.testsuitename !== "" && testSuite.description !== "" ){
      if(testSuite.name !== testSuite.parent)
      setEnableCreateBtn(false);
      setLoading(true);
      updateTestsuiteReq(testSuite);
    }

  }
  //Delete testsuite button
  const handleDelete = ()=>{
      setEnableDeleteBtn(false);
      setLoadingg(true);
      deleteTestsuiteReq(testSuite);
      setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = () => {
    setOpenUpload(true);
  };

  //Delete Test Case show message
  useEffect(()=>{
    if (insTestcaseDelete.sucess === false){
      displayMsg({
        content: insTestcaseDelete.errMsg,
        type: 'error'
      });
      setEnableDeleteBtn(true);
      setLoadingg(false);
      resetDeleteTCRedux();
    } else if (insTestcaseDelete.sucess === true) {
      displayMsg({
        content: "Delete testcase successfully !",
        type: 'success'
      });
      setEnableDeleteBtn(true);
      setLoadingg(false);
      getAllTestcaseReq();
      resetDeleteTCRedux();
    }
  },[insTestcaseDelete.sucess]);

  //handle to delete TS or TC
  const handleOpenTSuite = (id, type) => {
    if(type === 'TS') {
    setTestsuiteInfor({...testsuiteInfor, _id: id});
    setOpenTSuite(true);
  }
    else if(type === 'TC')
    {
      setTestcaseInfor({...testcaseInfor, testcaseid: id});
      setOpenTCase(true);
    }
  };

  //Delete Test suite table
  const handleDeleteTSuite = () =>{
    setEnableDeleteBtn(false);
    setLoadingg(true);
    deleteTestsuiteReq(testsuiteInfor);
    setOpenTSuite(false);
  };

  //Delete Test Case table
  const handleDeleteTCase = () =>{    
    setEnableDeleteBtn(false);
    setLoadingg(true);
    deleteTestcaseReq(testcaseInfor);
    setOpenTCase(false);
  };  

  const handleCloseTSuite = () => {
    setOpenTSuite(false);
  };

  const handleCloseTCase = () => {
    setOpenTCase(false);
  };

  return(
    <React.Fragment>
      <NewTestSuitePopup isOpen={openNewTS} setOpen={setOpenTS} selected={node.type !== 'root' ? node.name : ''}/>
      <UploadTestcasePopup isOpen={openUpload} setOpen={setOpenUpload} testsuite={testSuite.name || ''}/>

      <Grid container spacing={3} >
        <Grid item xs={12}>
        <Grid container spacing={1}>
             <Grid item xs={10}>
                <Typography variant="h4" gutterBottom display="inline">
                    Test Suite Details - {testSuite.name}
                </Typography>
              </Grid>

              <Grid item  xs={2}>
                <div>
                    {testSuite.type !== "root" &&
                    <Grid container spacing={1}>
                      <Grid item>
                         {/* <IconButton onClick={handleUpload} size="small">
                        <Upload/>
                      </IconButton> */}
                      </Grid>
                      <Grid item>
                        {/* <ExportExcel dataSet={testSuite.children} type='TS'/> */}
                     </Grid>
                    </Grid>
                   }  
                </div>
              </Grid>
              <Divider/>
        </Grid>

        </Grid>
        
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}><TextField id="testSuiteName" label="Test Suite Name" variant="outlined" 
              onChange={handleChange('name')} value={testSuite.name || ''} fullWidth required inputProps={{maxLength : 100}}
              error={testSuite.name.trim().length === 0 && error.name.trim().length === 0 ? true : false}
              helperText={testSuite.name.trim().length === 0 && error.name.trim().length === 0 ? 'testsuite name is required' : ' '} /></Grid>
          

            <Grid item xs={12}><TextField id="description" label="Descriptions" variant="outlined" style={{marginTop: '-1em'}} multiline rows={3} 
              onChange={handleChange('description')} fullWidth required value={testSuite.description || ''}
              error={testSuite.description.trim().length === 0 && error.description.trim().length === 0 ? true : false}
              helperText={testSuite.description.trim().length === 0 && error.description.trim().length === 0 ? 'description is required' : ' '}/></Grid>
            <Grid item xs={12}>
                  <FormControl variant="outlined"  fullWidth style={{marginTop: '-1em'}}>
                              <InputLabel id="testSuite">Test Suite</InputLabel>
                                <Select
                                  labelId="testSuite"
                                  id="testSuite"
                                  onChange={handleChange('parent')} 
                                  value={testSuite.parent || ''}
                                  label="Test Suite"
                                  disabled={testSuite.type === "root" ? true : false}
                                >
                                  <MenuItem value=''>root</MenuItem>
                                  {listTestsuite.map((item) => (
                                    <MenuItem value={item.name}>{item.name}</MenuItem>
                                  ))}
                              </Select>
                  </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} style={{marginTop: '2vh'}}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Typography variant="h6" gutterBottom display="inline">Test cases & Test suites of {testSuite.name}</Typography>
              </Grid>

              <Grid item xs={8}> 
                {testSuite.type !== "root" ?
                <Grid container spacing={2} justify='flex-end'>
                   <Grid item>
                    {/* <Button variant="contained" color="primary" onClick={handleOpenTC} >
                      <AddIcon />Add Test Case
                    </Button> */}
                    <Tooltip title="Add test case">
                      <IconButton onClick={handleOpenTC}><NoteAddIcon style={{color: blue[500]}}/></IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    {/* <Button variant="contained" color="primary" onClick={handleOpenTS}>
                      <AddIcon />Add Test Suite
                    </Button>  */}
                    <Tooltip title="Add test suite">
                      <IconButton onClick={handleOpenTS}><CreateNewFolderIcon style={{color: blue[500]}}/></IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip title="Import test cases">
                      <IconButton style={{color: blue[500]}} onClick={handleUpload}>
                        <Upload/>
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <ExportExcel dataSet={testSuite.children} type='TS'/>
                  </Grid>
                </Grid>
                :
                <Grid container justify='flex-end'>
                  <Grid item>
                  <Tooltip title="Add test suite">
                    <Button variant="contained" color="primary" onClick={handleOpenTS}>
                      <AddIcon />Add Test Suite
                    </Button> 
                    </Tooltip>
                  </Grid>
                </Grid>
                }
              </Grid>

        
            </Grid>
            <Divider/>      
        </Grid>

        <Grid item xs={12}>
          <EnhancedTable
            rows={testSuite.children}
            headerList = {TEST_SUITE_DETAIL_HEADERS}
            //viewAction={navigateToDetailPage}
            handleDefaultDeleteAction={handleOpenTSuite}
            type='testcases'
            load={true}
          />
        </Grid>
        

        <Grid item xs={12}>
          <Grid container justify ='flex-end' spacing={1}>
            <Grid item>
              <Button variant="contained" color="primary" disabled={enableCreateBtn ? false : true } startIcon={<UpdateIcon />} fullWidth onClick={handleSave}>
                Update suite
              {loading && <CircularProgress size={24} style={{color: blue[500],position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}} />}</Button>
            </Grid>
            {node.type !== 'root' && <Grid item>
              <Button variant="contained" startIcon={<DeleteIcon />} disabled={enableDeleteBtn ? false : true } fullWidth  style={enableDeleteBtn ? { color: red[500] } : {} } onClick={handleOpen}>
                Delete suite
              {loadingg && <CircularProgress size={24} style={{color: blue[500],position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}} />}</Button>
            </Grid>}
            <Grid item>
                <Dialog open={open} >
                  <DialogTitle>Confirm</DialogTitle>
                  <DialogContent>Are you sure want to delete this test suite?</DialogContent>
                  <DialogActions>
                    <Button onClick={handleDelete} color="primary">Yes</Button>
                    <Button onClick={handleClose} color="primary">No</Button>
                  </DialogActions>
                </Dialog>
            </Grid>
            <Grid item>
                <Dialog open={openTCase} >
                  <DialogTitle>Confirm</DialogTitle>
                  <DialogContent>Are you sure want to delete this test case?</DialogContent>
                  <DialogActions>
                    <Button onClick={handleDeleteTCase} color="primary">Yes</Button>
                    <Button onClick={handleCloseTCase} color="primary">No</Button>
                  </DialogActions>
                </Dialog>
            </Grid>
            <Grid item>
                <Dialog open={openTSuite} >
                  <DialogTitle>Confirm</DialogTitle>
                  <DialogContent>Are you sure want to delete this test suite?</DialogContent>
                  <DialogActions>
                    <Button onClick={handleDeleteTSuite} color="primary">Yes</Button>
                    <Button onClick={handleCloseTSuite} color="primary">No</Button>
                  </DialogActions>
                </Dialog>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </React.Fragment>
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(TestSuiteDetail));
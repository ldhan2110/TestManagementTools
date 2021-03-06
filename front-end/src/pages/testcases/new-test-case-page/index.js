import React, { useState, useEffect } from "react";
//import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import DragList from '../../../components/DragList';
import { connect } from 'react-redux';
import {ADD_TEST_CASE_REQ, GET_ALL_TESTCASE_REQ, RESET_ADD_TEST_CASE} from '../../../redux/test-case/constants';
import Helmet from 'react-helmet';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import { blue } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Grid,
  Typography,
  Divider,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel, Input
} from '@material-ui/core';
import MarkedInput from '../../../components/markdown-input/MarkedInput';


//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { 
    insTestcase: state.testcase.insTestcase,
    listTestsuite: state.testcase.listTestsuite
   }
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

const TestCaseDetail = (props) => {
  const {addTestcaseReq, displayMsg, insTestcase, getAllTestcaseReq, listTestsuite, resetAddRedux} = props;
  const history = useHistory();
  const [checkError, setCheckError] = useState(false);
  const [error, setError] = useState({
    testcaseName: 'ss',
    description: 'ss',
  });
  const [testcase, setTestcase] = useState({
    testcaseName: '',
    description: '',
    testsuite: decodeURIComponent(props.match.params.testsuiteName),
    priority: 'medium',
    type: 'manual',
    precondition: '',
    postcondition: '',
    listStep:[]
  });
  const [listSteps, setListSteps] = useState([]);
  const [enableCreateBtn, setEnableCreateBtn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pressUpdateButton, setPressUpdateButton] = useState(false);

  useEffect(()=>{
    setTestcase({...testcase, listStep: listSteps});
  },[listSteps]);

  useEffect(()=>{
    if (insTestcase.sucess === false){
      displayMsg({
        content: insTestcase.errMsg,
        type: 'error'
      });
      setEnableCreateBtn(true);
      setLoading(false);
      resetAddRedux();
    } else if (insTestcase.sucess === true) {
      displayMsg({
        content: "Create Testcase successfully !",
        type: 'success'
      });
      setEnableCreateBtn(true);
      setLoading(false);
      history.goBack();
      getAllTestcaseReq();
      resetAddRedux();
  
    }
  },[insTestcase.sucess]);
  

  const handleChange = (prop) => (event) => {
    setTestcase({ ...testcase, [prop]: event.target.value });

    if(checkError === true)
    setError({ ...error, [prop]: event.target.value });
  };

  const handleCancel = (event) => {
    history.goBack();
  }

  const isEmpty = (currentValue) => {
    if(typeof currentValue !== "string")
      return currentValue === 0;
    else
      return currentValue.trim().length === 0;
  }
  const handleSteps = (Data) =>{
    for (let i = 0; i < Data.length; i++)
    {
        if(!Object.values(Data[i]).some(isEmpty) === false)
        {
            return true;            
        }
    }
  }
  const handleSave = () => {
    setCheckError(true);

    if(testcase.description === "")
    setError({ ...testcase, description: "" });

    if(testcase.testcaseName === "")
    setError({ ...testcase, testcaseName: "" });

    if(testcase.description.trim().length === 0 || testcase.testcaseName.trim().length === 0
        ||testcase.description.trim().length !== testcase.description.length 
        || testcase.testcaseName.trim().length !== testcase.testcaseName.length){
        displayMsg({
          content: "Test Case Name or Description should not contain spaces before and after !",
          type: 'error'
        });
    }

    else if (handleSteps(listSteps)) {
      setPressUpdateButton(true);
      displayMsg({
        content: "Steps cannot have empty field(s)",
        type: 'error'
      });
    }

    else if(testcase.testcaseName.trim().length !== 0 && testcase.description.trim().length !== 0){
      setEnableCreateBtn(false);
      setLoading(true);
      addTestcaseReq(testcase);
    }  
  }

  const updateListStep = (Data) => {
    setListSteps(Data);
  };
  
  const PreconChange = (text) => {
    setTestcase({ ...testcase, precondition: text });
  };

  const PostconChange = (text) => {
    setTestcase({ ...testcase, postcondition: text });
  };

  return(
    <React.Fragment>
      <Helmet title="New Test Case" />
      <Grid container spacing={3} >
        <Grid item xs={12}>
            <Typography variant="h4" gutterBottom display="inline">
                New Test Case
            </Typography>
            <Divider/>
        </Grid>
        
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}><TextField id="testSuiteName" label="Test Case Name" variant="outlined" 
            value={testcase.testcaseName || ''}  onChange={handleChange('testcaseName')} fullWidth required inputProps={{maxLength : 100}}
            error={testcase.testcaseName.trim().length === 0 && error.testcaseName.trim().length === 0 ? true : false}
            helperText={testcase.testcaseName.trim().length === 0 && error.testcaseName.trim().length === 0 ? 'Test Case Name is required' : ' '}/></Grid>

            <Grid item xs={12}><TextField id="description" label="Description" variant="outlined" 
            value={testcase.description || ''} onChange={handleChange('description')} fullWidth required multiline rows={3} 
            error={testcase.description.trim().length === 0 && error.description.trim().length === 0 ? true : false}
            helperText={testcase.description.trim().length === 0 && error.description.trim().length === 0 ? 'Description is required' : ' '}/></Grid>

            <Grid item xs={6}>
             <FormControl variant="outlined"  fullWidth required>
                              <InputLabel id="testSuite">Test Suite</InputLabel>
                                <Select
                                  labelId="testSuite"
                                  id="testSuite"
                                  value={testcase.testsuite}
                                  onChange={handleChange('testsuite')}
                                  label="Test Suite"
                                  disabled = {true}
                                >
                               {listTestsuite.map((item) => (
                                    <MenuItem value={item.name}>{item.name}</MenuItem>
                               ))}
                              </Select>
              </FormControl> 
                
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FormControl variant="outlined"  fullWidth>
                              <InputLabel id="Importance">Importance</InputLabel>
                                <Select
                                  labelId="Importance"
                                  id="Importance"
                                  value={testcase.priority}
                                  onChange={handleChange('priority')}
                                  label="Importance"
                                >
                               <MenuItem value=""><em>Any</em></MenuItem>
                               <MenuItem value={'low'}>Low</MenuItem>
                               <MenuItem value={'medium'}>Medium</MenuItem>
                               <MenuItem value={'high'}>High</MenuItem>
                              </Select>
                    </FormControl>
                </Grid>
                {/*<Grid item xs={6}>
                <FormControl variant="outlined"  fullWidth>
                              <InputLabel id="type">Type</InputLabel>
                                <Select
                                  labelId="type"
                                  id="type"
                                  value={testcase.type}
                                  onChange={handleChange('type')}
                                  label="Type"
                                >
                               <MenuItem value={"manual"}><em>Manual</em></MenuItem>
                               <MenuItem value={"auto"}>Auto</MenuItem>
                              </Select>
                            </FormControl>
                               </Grid>*/}
              </Grid>      
            </Grid>

            <Grid item xs={12}>
              {/* <TextField id="preCondition" label="Pre-condition" 
              value={testcase.precondition || ''} 
              onChange={handleChange('precondition')}
              variant="outlined"  fullWidth multiline rows={3} rowsMax={3}/> */}
              <Typography variant="subtitle1" gutterBottom display="inline">
                Preconditions
              </Typography>
              <MarkedInput idOfInput="precon" handleChange={PreconChange} /> 
            </Grid>
            <Grid item xs={12}>
              {/* <TextField id="postCondition" label="Post-condition" variant="outlined" value={testcase.postcondition || ''} onChange={handleChange('postcondition')} fullWidth multiline rows={3} rowsMax={3}/> */}
              <Typography variant="subtitle1" gutterBottom display="inline">
                Postconditions
              </Typography>
              <MarkedInput idOfInput="postcon" handleChange={PostconChange} /> 
              </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} style={{marginTop: '3.5vh'}}>
          <Typography variant="h6" gutterBottom display="inline">
                Steps Definition
          </Typography>
          <Divider/>
        </Grid>

        <Grid item xs={12}>
          <DragList data = {listSteps} setData={setListSteps} parentCallback={updateListStep} pressUpdateButton={pressUpdateButton}/>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify ='flex-end' spacing={1}>
            <Grid item>
              <Button variant="contained" color="primary" disabled={enableCreateBtn ? false : true } startIcon={<AddIcon/>} onClick={handleSave}>Create
              {loading && <CircularProgress size={24} style={{color: blue[500],position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" startIcon={<CancelIcon/>} onClick={handleCancel}>Cancel</Button>
            </Grid>
          </Grid>
        </Grid>
        
      </Grid>
    </React.Fragment>
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(TestCaseDetail);
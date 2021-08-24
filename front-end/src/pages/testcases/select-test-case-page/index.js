import React, {useEffect, useState, useCallback} from 'react';
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
  Grid, Popper,
  AppBar, Toolbar, IconButton, Typography, Divider,
} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import {debounce} from 'lodash'

const useStyles = makeStyles((theme) => ({
  rootofroot:{
    flexGrow: 1,
    flexDirection: 'row',    
  },
  root: {
    //flexGrow: 1,
    //borderRadius: 4, //theme.shape.borderRadius
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5),
      width: 'auto',
    },
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  search: {
    borderRadius: '4px 0px 0px 4px',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    position: 'relative',
    //borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },   
  },
  autoComplete:{
    width: '320px',
  },
  searchIcon: {
    padding: theme.spacing(0, 3),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(2, 1, 2, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1.5em + ${theme.spacing(6)}px)`,
    fontSize: '16px',
    transition: theme.transitions.create('width'),
    width: '100%',
   /* [theme.breakpoints.up('sm')]: {
      width: '22ch',
       '&:focus': {
        width: '20ch',
      }, 
    },*/
  },
  divider: {
    background: fade(theme.palette.common.white, 0.30),
  },
  margin: {
    margin: theme.spacing(0),
  },
  divSearch: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    //marginLeft: 5,
    //borderLeftStyle: '1px solid white',
    borderRadius: '0px 4px 4px 0px',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    'label + &': {
      marginTop: theme.spacing(0),
    },
  },
  input: {    
    position: 'relative',    
    border: '0px solid #ced4da',
    fontSize: '16px',
    padding: theme.spacing(2, 2, 2, 2),
    marginLeft: 0,
    width: '140px',
    color: 'white',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: '0px 4px 4px 0px',
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.1rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);


//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { 
    project: state.project.currentSelectedProject,
    testcase: state.testcase,
    listtestcaseselect: state.testcase.listTestcaseSelect
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
  const classes = useStyles();
  
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

  const [data, setData] = useState(convertData(selected));

  //const [pressSearch, setPressSearch] = useState(false);
  

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
    if(testcase.listTestsuiteNoTree)
      setListTestCase(build()[0]);
  },[testcase.listTestsuiteNoTree])

  useEffect(()=>{
    if(testcase.successNoTree === true) {
      [testcase.listTestsuiteNoTree].filter(item => iterateObject(item));
      setListTC(arr);
    }
  },[testcase.successNoTree])

  useEffect(()=>{
    testcase.successNoTree = null;
    getAllTestsuiteReq(project);
    getAllTestcaseReq(project); 
    getAllTestsuiteNoTreeReq(project);
  },[])

  const theme = useTheme();

  const [search, setSearch] = useState({
    testcasename: '',
    testsuite: '',
    priority: ''
  });

  const [listTC, setListTC] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [val, setVal] = useState("");
  let arr = [];
  function iterateObject(obj, value) {
    for(var prop in obj) {      
      if(typeof obj[prop] === "object"){
        iterateObject(obj[prop], value);
      } else {
        if(prop === 'label' && obj[prop] === value && value) {
          for(var i = 0; i < obj['children']?.length; i++){
            if(obj?.children[i]?.type === 'TC')
              arr.push(obj['children'][i].label);
          }          
        }
        else if(value === undefined)
        if(obj["type"] === "TC" && prop === "label"){
          arr.push(obj[prop]);
        }
      }
    }
  }

  const handleChangeSuite = (event) => {
    setSearch({...search, testsuite: event.target.value});
    arr = [];
    if(event.target.value !== ""){
      [testcase.listTestsuiteNoTree].filter(item => iterateObject(item, event.target.value));
      setListTC(arr);
    } else {
      [testcase.listTestsuiteNoTree].filter(item => iterateObject(item));
      setListTC(arr);
    }
  }
  const PopperMy = function (props) {
    return (<Popper {...props} style={{ width: '322px' }} placement='bottom-start' />)
  }

  //----------------------------------------------------------------------------------------

  // Format node that has no child
  const formatDeepestChild = (node) => {
    var formattedDChild = {};
      // custom node properties when Test suite empty
      var customLabel = node.type === 'TS' ? <span>{node.label}<i> (Empty)</i></span> : node.label
      var customIconLeaf = node.type === 'TS' ? <span className="rct-icon rct-icon-parent-close" /> : null
      var expandable = node.type === 'TS' ? true : false;
      //var checkbox = node.type === 'TC' ? true : false;
      var eleAssigned = node.is_assigned;
      // coloring leaf node  
      if(eleAssigned === true){
      var dChildObj = {
        value: node.value,
        isLeaf: true,
        icon: customIconLeaf,
        label: <span style={{ color: "red" }}>{customLabel}</span>,
        labelNoStyle: node.label,
        is_assigned: eleAssigned,
        //showCheckbox: checkbox,
        disabled: expandable,
      };
      formattedDChild = dChildObj;
    } else {  // no coloring
      var dChildObj = {
        value: node.value,
        isLeaf: true,
        icon: customIconLeaf,
        label: customLabel,
        labelNoStyle: node.label,
        is_assigned: eleAssigned,
        //showCheckbox: checkbox,
        disabled: expandable,
      };
      formattedDChild = dChildObj;
    }    
    return formattedDChild;
  }
  // Format node
  const formatChild = (node) => {
    var formatedChild = {};
    let arr = [];    
    // if no child
    if(node.children === undefined){
      var tempFor = formatDeepestChild(node);
      return tempFor
    }
    // if has child
    if(node.children) {
      node.children.forEach(elem =>{      
      arr.push(formatChild(elem));     
      }
    )}
      // format suite and coloring
      //let type = node.type;
      let asgn = node.is_assigned;      
      let suiteLabel =
    " (" + (node.total_testsuite_child > -1 ? node.total_testsuite_child : "") + "," 
    + node.total_testcase + "," + node.numberof_testcaseuntest + ")";
      if(asgn === true){
        let childNode = {
          value: node.value,
          label: <span><span style={{ color: "red" }}>{node.label}</span><span>{suiteLabel}</span></span>,
          labelNoStyle: node.label,
          is_assigned: asgn,
          isLeaf: true,
          parentId: node.label,        
          children: arr,
        }
        formatedChild = childNode;
      } else {
        let childNode = {
          value: node.value,
          label: node.label + suiteLabel,
          labelNoStyle: node.label,
          is_assigned: asgn,
          isLeaf: true,
          parentId: node.label,        
          children: arr,
        }
        formatedChild = childNode;
      }
    return formatedChild;
    
  }    
  // Format root node
  const formatData = () => {
    var formattedData = [];
    
      var element = testcase.listTestsuiteNoTree;
      var rootPath = element.label;
      var rootVal = element.value;
      let rootLabel = element.label +
    " (Total suite: " + (element.total_testsuite_child > -1 ? element.total_testsuite_child : "") + ", Total TC: "
    + element.total_testcase + ", Unassigned: " + element.numberof_testcaseuntest + ")";
      // if root has child
      if(element?.children?.length > 0) {
        var tempCh = [];
        // push formated child to tempCh
        element.children.forEach(ele => {          
          tempCh.push(formatChild(ele))
        });
        // format root with child        
        var obj = {
          value: rootVal,
          parentId: "",
          label: rootLabel,
          labelNoStyle: rootPath,
          children: tempCh
        }
        formattedData.push(obj);
      } else {  // root has no child
        var obj = {
          value: rootVal,
          parentId: "",
          label: rootLabel,
          labelNoStyle: rootPath,
          icon: <span className="rct-icon rct-icon-parent-close" />,
          showCheckbox: false,
          children: []
        }
        formattedData.push(obj);
      }
    return formattedData;
  }
  // Make node map to render in checkbox treeview
  const build = () => {
    var data = formatData();
    var nodeMap = {};
    data.forEach(item => {      
      nodeMap[item.value] = item;
    }); 
  
    var finalArr = [];
  
    Object.keys(nodeMap).forEach(item => {
      var parentId = nodeMap[item].parentId;
      if(parentId){
        
        nodeMap[nodeMap[item].parentId].children.push(nodeMap[item])
      }
      else{
          finalArr.push(nodeMap[item]);
      }
    });
    return finalArr;
  }
  const [tempp, setTempp] = useState("")
  const handler = useCallback(debounce(text => onChangeSearch(text), 500), []);

  const onChangeSearch = (text) => {
    setTempp(text);
  }

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

            {/* Search Test Case */}
            <div className={classes.rootofroot}> 

            <div className={classes.root}>           
            
            <div className={classes.search}>            
              <Autocomplete
                value={val}
                onChange={(event, newValue) => {
                  setVal(newValue);        
                }}
                inputValue={inputVal}
                onInputChange={(event, newInputValue) => {
                  setInputVal(newInputValue);
                  handler(newInputValue);
                }}
                selectOnFocus
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={listTC}
                renderOption={(option) => option}
                //style={{ width: '300px' }}
                className={classes.autoComplete}
                freeSolo
                autoComplete
                PopperComponent={PopperMy}
                renderInput={(params) => {
                  const {InputLabelProps,InputProps,...rest} = params;
                  return(
                  <div className={classes.divSearch}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      {...params.InputProps} {...rest}                
                      placeholder="Search test case…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }} 
                    />
                  </div>
                  )}
                }
              />      
            </div>
            <Divider orientation="vertical" flexItem classes={{root: classes.divider}} />
            <FormControl className={classes.margin}>
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={search.testsuite}
                displayEmpty
                onChange={handleChangeSuite}
                input={<BootstrapInput />}
              >
              <MenuItem value="">
                <em style={{opacity: 0.9}}>Any test suite</em>
              </MenuItem>
              {testcase.listTestsuite.map((item) => (
                <MenuItem value={item.name}>{item.name}</MenuItem>
              ))}
              </Select>
            </FormControl>
            </div>

            </div>
            {/* Search Test Case */}

          </Toolbar>
        </AppBar>
        <DialogContent dividers>
        {(testcase.successNoTree === "") ? 
          <div style={{height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress />
          </div> :     
          <Grid container spacing={1} style={{height: '30vh',maxHeight: '30vh', width: '35vw', maxWidth:'39vw', padding:7}}>          
            <Grid item xs={12}>              
              <CheckboxTreeView data={listTestCase} text={tempp} suite={search.testsuite} parentCallback={handleSelect} selected={data}/>
            </Grid>
          </Grid>}
        </DialogContent>

        <DialogActions>
          <Button color="primary" disabled={testcase.successNoTree === "" ? true : false} onClick={handleSelectTestcase}>
            Select
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default  connect(mapStateToProps, mapDispatchToProps)(SelectTestCasePopup);
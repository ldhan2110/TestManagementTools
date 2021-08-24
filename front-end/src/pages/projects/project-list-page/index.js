import React, {useEffect, useState} from "react";
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import {GET_ALL_PROJECTS_REQ, RESET_SELECT_PROJECT} from '../../../redux/projects/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
import ProjectItem from './ProjectItem';
import Pagination from '../../../components/Pagination/index';
import IconButton from '@material-ui/core/IconButton';
import NewProjectPopup from '../new-project-popup/index';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    Button,
    Grid,
    Divider,
    Typography,
    Hidden,
  } from "@material-ui/core";

import {
    Add as AddIcon
} from "@material-ui/icons";



const MAX_PER_PAGE = 6;

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
    return { project: state.project}
  }
  
  //MAP DISPATCH ACTIONS TO PROPS - REDUX
  const mapDispatchToProps = dispatch => {
    return {
      getProjectReq: (payload) => dispatch({ type: GET_ALL_PROJECTS_REQ }),
      displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
      resetSelectProject: () => dispatch({type: RESET_SELECT_PROJECT})
    }
  }

const ProjectList = (props)=>{
    const {classes} = props;

    const {project, getProjectReq, displayMsg, resetSelectProject} = props;

    const [openNewProject,setOpenNewProject] = useState(false);

    const [listProjects, setListProject] = useState([]);

    const [selectPage, setSelectPage] = useState(1);

    const handleOpenNewProjectPopup = ()=>{
        setOpenNewProject(true);
    }

    useEffect(()=>{
        project.success = "";
        getProjectReq();
        resetSelectProject();
    },[]);


    useEffect(()=>{
        if (project.error === true) {
            displayMsg({content: project.errorMsg, type: 'error'});
        }
    },[project.error]); 


    useEffect(()=> {
        if(project.success === true)
            setListProject(project.listProjects);
    },[project.success]) 

    return(
        <React.Fragment>
            <NewProjectPopup isOpen={openNewProject} setOpen={setOpenNewProject}/>
            <Helmet title="Projects" />
            <Hidden only={["sm", "xs"]}>
            <div className={classes.headerLarge} >
            <Grid
                justify="space-between"
                alignItems="center"
                container
            >
                <Grid item>
                    <Typography variant="h3" gutterBottom display="inline">
                        Projects
                    </Typography>
                    {project.success === "" &&
                        <CircularProgress size={27} 
                        style={{marginBottom: '-5px', marginLeft: 15}}
                        />}                    
                </Grid>
                <Grid item>
                    <div>
                        <Button variant="contained" color="primary" onClick={handleOpenNewProjectPopup}>
                            <AddIcon />
                            New Project
                        </Button>
                    </div>
                </Grid>
            </Grid>
            <Divider my={6}/>
            <div style={{height:"60vh"}}>
            <Grid container
                spacing={3} style={{height: "100%"}}>
                    {listProjects.slice((selectPage-1)*MAX_PER_PAGE,(selectPage-1)*MAX_PER_PAGE+MAX_PER_PAGE).map((item,index)=>{
                        return (
                        <Grid item xs={4} key = {item._id}>
                           <ProjectItem
                             id = {item._id}
                             name={item.projectname}
                             descriptions={item.description}
                             status={item.status}
                             role={item.role}
                            /> 
                        </Grid>
                    )})}
                </Grid>
                {listProjects.length !== 0 &&
                <div className={classes.paging}>
                    <Pagination totalPage={Math.ceil(project.listProjects.length/MAX_PER_PAGE)} selectedPage={selectPage} selectMethod={setSelectPage}/>
                </div>
                }</div>
            </div>
            </Hidden>

            <Hidden only={["md", "lg","xl"]}>
              <div className={classes.headerSmall} >
            <Grid
                justify="space-between"
                container
            >
                <Grid item key="header-sm">
                    <Typography variant="h3" gutterBottom display="inline">
                        Projects
                    </Typography>
                </Grid>
                <Grid item key="add-sm">
                    <div>
                      <IconButton aria-label="primary"  color="primary" onClick={handleOpenNewProjectPopup}>
                        <AddIcon />
                      </IconButton>
                    </div>
                </Grid>
                </Grid>
                <Divider my={6}/>
                <div style={{height:"60vh"}}>
                <Grid container 
                spacing={3} style={{height: "100%"}}>
                    {listProjects.slice((selectPage-1)*MAX_PER_PAGE,(selectPage-1)*MAX_PER_PAGE+MAX_PER_PAGE).map((item,index)=>{
                        return (
                        <Grid item xs={4} key = {item.projectname}>
                           <ProjectItem
                             name={item.projectname}
                             descriptions={item.description}
                             status={item.status}
                            /> 
                        </Grid>
                    )})}
                </Grid>
                {listProjects.length !== 0 &&
                <div className={classes.paging}>
                    <Pagination totalPage={Math.ceil(project.listProjects.length/MAX_PER_PAGE)} selectedPage={selectPage} selectMethod={setSelectPage}/>
                </div>
                }</div>
                </div>
            </Hidden>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProjectList));
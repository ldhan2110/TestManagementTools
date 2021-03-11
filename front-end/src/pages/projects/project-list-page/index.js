import React, {useEffect, useState} from "react";
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import {GET_ALL_PROJECTS_REQ} from '../../../redux/projects/constants';
import { connect } from 'react-redux';
import ProjectItem from './ProjectItem';
import Pagination from '../../../components/Pagination/index';
import IconButton from '@material-ui/core/IconButton';
import NewProjectPopup from '../new-project-popup/index';
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




const ListProjectData = [
    {projectName: "ALLIUM", descriptions: "The project helps owner to manage their household appliances tokerearafsanfjudflasnds", status: "Finished"},
    {projectName: "Lizard", descriptions: "The project helps owner to manage their household appliances DBSAHDSAKDHSAFHSAODASDSADSADASDSADSADSADSASADASDSb", status: "In progress"},
    {projectName: "ALLIUM", descriptions: "The project helps owner to manage their household appliancesfdsafdsafsadfsdafdsafdsafdsafdsafdsafdsafdsafdsafdsafdsafdsafdsafdsafdsafdsafdsafdsafdsafsfdsafdsafdsafdsafdasfsa", status: "Finished"},
    {projectName: "ALLIUM", descriptions: "The project helps owner to manage their household appliances", status: "Finished"},
    {projectName: "ALLIUM", descriptions: "The project helps owner to manage their household appliances", status: "Pending"},
    {projectName: "ALLIUM", descriptions: "The project helps owner to manage their household appliances", status: "Pending"},
    // {projectName: "ALLIUM", descriptions: "The project helps owner to manage their household appliances", status: "Pending"},
    // {projectName: "ALLIUM", descriptions: "The project helps owner to manage their household appliancesssssssss", status: "Pending"},
    // {projectName: "ALLIUM", descriptions: "The project helps owner to manage their household appliances tokerearafsanfjudflasnds", status: "Finished"},
    // {projectName: "Lizard", descriptions: "The project helps owner to manage their household appliances DBSAHDSAKDHSAFHSAODASDSADSADASDSADSADSADSASADASDSb", status: "In progress"},
    // {projectName: "ALLIUM", descriptions: "The project helps owner to manage their household appliancesfdsafdsafsadfsdafdsafdsafdsafdsafdsafdsafdsafdsafdsafdsafdsafdsafdsafdsafdsafdsafdsafdsafsfdsafdsafdsafdsafdasfsa", status: "Finished"},
    // {projectName: "ALLIUM", descriptions: "The project helps owner to manage their household appliances", status: "Finished"},
    // {projectName: "ALLIUM", descriptions: "The project helps owner to manage their household appliances", status: "Pending"},
    // {projectName: "ALLIUM", descriptions: "The project helps owner to manage their household appliances", status: "Pending"},
    // {projectName: "ALLIUM", descriptions: "The project helps owner to manage their household appliances", status: "Pending"},
   
];

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
    return { project: state.project }
  }
  
  //MAP DISPATCH ACTIONS TO PROPS - REDUX
  const mapDispatchToProps = dispatch => {
    return {
      getProjectReq: (payload) => dispatch({ type: GET_ALL_PROJECTS_REQ }),
    }
  }

const ProjectList = (props)=>{
    const {classes} = props;

    const {project, getProjectReq} = props;

    const [openNewProject,setOpenNewProject] = useState(false);

    const [listProjects, setListProject] = useState([]);

    const handleOpenNewProjectPopup = ()=>{
        setOpenNewProject(true);
    }

    useEffect(()=>{
        getProjectReq();
    },[]);

    useEffect(()=> {
        setListProject(project.listProjects);
    },[project.listProjects])

    return(
        <React.Fragment>
            <NewProjectPopup isOpen={openNewProject} setOpen={setOpenNewProject}/>
            <Helmet title="Projects" />
            <Hidden only={["sm", "xs"]}>
              <div className={classes.headerLarge} >
            <Grid
                justify="space-between"
                container
            >
                <Grid item>
                    <Typography variant="h3" gutterBottom display="inline">
                        Projects
                    </Typography>
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
            <Grid container 
                spacing={3}>
                    {listProjects.map((item,index)=>{
                        return (
                        <Grid item  key = {index}>
                           <ProjectItem
                             name={item.projectname}
                             descriptions={item.description}
                             status={item.status}
                            /> 
                        </Grid>
                    )})}
                </Grid>
                <div className={classes.paging}>
                    <Pagination totalPage={5}/>
                </div>
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
                <Grid container 
                spacing={3}>
                    {ListProjectData.map((item,index)=>{
                        return (
                        <Grid item key = {index}>
                           <ProjectItem
                             name={item.projectName}
                             descriptions={item.descriptions}
                             status={item.status}
                            /> 
                        </Grid>
                    )})}
                </Grid>
                <div className={classes.paging}>
                    <Pagination totalPage={5}/>
                </div>
                
                </div>
            </Hidden>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProjectList));
import React, {useState, useEffect} from "react";
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import ProjectItem from './ProjectItem';
import IconButton from '@material-ui/core/IconButton';
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
    {projectName: "ALLIUM", descriptions: "The project helps owner to manage their household appliances", status: "Pending"},
    {projectName: "ALLIUM", descriptions: "The project helps owner to manage their household appliancesssssssss", status: "Pending"},
];


const ProjectList = (props)=>{
    const {classes} = props;

    return(
        <React.Fragment>
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
                        <Button variant="contained" color="primary">
                            <AddIcon />
                            New Project
                        </Button>
                    </div>
                </Grid>
            </Grid>
            <Divider my={6}/>
            <Grid container 
                spacing={3}>
                    {ListProjectData.map((item,index)=>{
                        return (
                        <Grid item>
                           <ProjectItem
                             name={item.projectName}
                             descriptions={item.descriptions}
                             status={item.status}
                            /> 
                        </Grid>
                    )})}
                </Grid>
            </div>
            </Hidden>

            <Hidden only={["md", "lg","xl"]}>
              <div className={classes.headerSmall} >
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
                      <IconButton aria-label="primary"  color="primary">
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
                        <Grid item>
                           <ProjectItem
                             name={item.projectName}
                             descriptions={item.descriptions}
                             status={item.status}
                            /> 
                        </Grid>
                    )})}
                </Grid>
                </div>
            </Hidden>
        </React.Fragment>
    );
}

export default withStyles(styles)(ProjectList);
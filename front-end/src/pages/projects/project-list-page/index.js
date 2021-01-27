import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import styled from "styled-components";
import Helmet from 'react-helmet';
import { spacing } from "@material-ui/system";

import {
    Paper,
    Button as MuiButton,
    Grid,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
    CardActionArea
  } from "@material-ui/core";

import {
    Add as AddIcon
} from "@material-ui/icons";


const ListProjectData = [
    {projectName: "ALLIUM", descriptions: "The project helps owner to manage their household appliances", status: "Finished"},
    {projectName: "Lizard", descriptions: "The project helps owner to manage their household appliances", status: "In progress"},
    {projectName: "ALLIUM", descriptions: "The project helps owner to manage their household appliances", status: "Finished"},
    {projectName: "ALLIUM", descriptions: "The project helps owner to manage their household appliances", status: "Finished"},
    {projectName: "ALLIUM", descriptions: "The project helps owner to manage their household appliances", status: "Finished"},
];

const ProjectItem = (props) => {

    const classes = useStyles();

    const {name, descriptions, status} = props;

    return (
        <Card className={classes.item}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {descriptions}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
}

const ProjectList = (props)=>{
    const classes = useStyles();

    return(
        <React.Fragment>
            <Helmet title="Projects" />
            <div className={classes.root}>
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
            <div>
                <Grid container justify= "space-evenly">
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
            </div>
            
        </React.Fragment>
    );
}

export default (ProjectList);
import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import styled from "styled-components";
import Helmet from 'react-helmet';
import { spacing } from "@material-ui/system";

import {
    FormControl,
    Input,
    InputLabel,
    Button as MuiButton,
    Grid,
    Paper,
    Divider,
    Typography
  } from "@material-ui/core";

import {
    Add as AddIcon
  } from "@material-ui/icons";

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
        </div>
        </React.Fragment>
    );
}

export default (ProjectList);
import React from "react";
import styles from './styles';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ReadMore from 'read-more-react';
import { useHistory } from "react-router-dom";

import {
    Chip,
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
    CardActionArea
  } from "@material-ui/core";
import { SELECT_PROJECT } from "../../../redux/projects/constants";


  const MAX_LENGTH = 200;

  const IDEAL_LENGTH = 60;

  const MIN_LENGTH = 10;

  const mapDispatchToProps = dispatch => {
    return {
      // dispatching plain actions
      selectProject: (value) => dispatch({ type: SELECT_PROJECT, value }),
    }
  }

 
const ProjectItem = (props) => {

  const history = useHistory();

  const {classes} = props;

  const {id, name, descriptions, status, selectProject} = props;

  const handleOpenProject = () => {
    selectProject(id);
    history.push("/projects/"+id);
  }
  

  const renderStatus = (status) => {
    switch(status){
      case "Finished":
        return (<Chip label={status} className={classes.statusFin}/>);

      case "In progress":
        return (<Chip label={status} className={classes.statusInProgress}/>);
    
      case "pending":
        return (<Chip label={status} className={classes.statusPending}/>);

      default:
        break;
    }
  }

  return (
      <Card className={classes.item} variant="outlined">
      <CardActionArea>
        <CardContent>
          <div className = {classes.itemTitle}>
            <Typography gutterBottom variant="h5" component="h2">
            {name}
            {renderStatus(status)}
          </Typography>
          </div>
          
          <div style={{overflow: "hidden", textOverflow: "ellipsis", width: "15rem", marginTop: "10px"}}> 
          <Typography variant="body2" color="textSecondary" component={'div'}>
            <ReadMore
              min={MIN_LENGTH}
              max={MAX_LENGTH}
              ideal={IDEAL_LENGTH}
              text={descriptions}
              readMoreText="More..."
            />
          </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleOpenProject}>
          View Detail
        </Button>
      </CardActions>
    </Card>
  );
}

export default connect (null,mapDispatchToProps) (withStyles(styles)(ProjectItem));
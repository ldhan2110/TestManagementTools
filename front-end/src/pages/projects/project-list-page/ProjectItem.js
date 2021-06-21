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
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

  const MAX_LENGTH = 150;

  const IDEAL_LENGTH = 30;

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

  const {id, name, descriptions, role, status, selectProject} = props;

  const handleOpenProject = () => {
    selectProject({id: id, name: name, role: role});
    history.push("/projects/"+id);
  }
  

  const renderStatus = (status) => {
    switch(status){
      case "Completed":
        return (<Chip label={status} className={classes.statusFin}/>);

      case "In progress":
        return (<Chip label={status} className={classes.statusInProgress}/>);
    
      case "pending":
        return (<Chip label={status} className={classes.statusPending}/>);

      default:
        break;
    }
  }

  const renderRole = (role) => {
    switch(role){
      case "Project Manager":
        return (<Chip variant="outlined" size="small" icon={<FiberManualRecordIcon style={{color: '#F04747'}}/>} label={role}
        style={{fontWeight:'500', borderColor: 'rgba(240, 71, 71, 0.6)', 'font-family': 'Whitney,"Helvetica Neue",Helvetica,Arial,sans-serif'}} />);

      case "TestLead":
        return (<Chip variant="outlined" size="small" icon={<FiberManualRecordIcon style={{color: '#F57731'}}/>} label="Test Lead"
        style={{fontWeight:'500', borderColor: 'rgba(245, 119, 49, 0.6)', 'font-family': 'Whitney,"Helvetica Neue",Helvetica,Arial,sans-serif'}} />);

      case "Tester":
        return (<Chip variant="outlined" size="small" icon={<FiberManualRecordIcon style={{color: '#7289DA'}}/>} label={role}
        style={{fontWeight:'500', borderColor: 'rgba(114, 137, 218, 0.6)', 'font-family': 'Whitney,"Helvetica Neue",Helvetica,Arial,sans-serif'}} />);

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
          <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '2px'}}>
            {renderRole(role)}
          </div>
          <div style={{overflow: "hidden", textOverflow: "ellipsis", width: "17rem", marginTop: "5px"}}> 
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
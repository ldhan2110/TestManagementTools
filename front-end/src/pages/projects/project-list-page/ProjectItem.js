import React from "react";
import styles from './styles';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ReadMore from 'read-more-react';
import { useHistory } from "react-router-dom";

import {
    Chip, Paper,
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
    CardActionArea
  } from "@material-ui/core";
import { SELECT_PROJECT } from "../../../redux/projects/constants";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

  const MAX_LENGTH = 200;

  const IDEAL_LENGTH = 80;

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
        return (<Chip variant="outlined" size="small" icon={<FiberManualRecordIcon style={{color: '#F04747'}}/>}
        label="Project Manager"
        className={classes.rolePJmanager} />);

      case "TestLead":
        return (<Chip variant="outlined" size="small" icon={<FiberManualRecordIcon style={{color: '#F57731'}}/>}
        label="Test Lead"
        className={classes.roleTestLead} />);

      case "Test Lead":
        return (<Chip variant="outlined" size="small" icon={<FiberManualRecordIcon style={{color: '#F57731'}}/>}
        label="Test Lead"
        className={classes.roleTestLead} />);
  
      case "Tester":
        return (<Chip variant="outlined" size="small" icon={<FiberManualRecordIcon style={{color: '#7289DA'}}/>}
        label="Tester"
        className={classes.roleTester} />);

      default:
        break;

    }
  }

  return (
      <Card className={classes.item} variant="outlined">
      <CardActionArea>
        <CardContent>
          <div className = {classes.itemTitle}>
            <div className={classes.typoTitle}>
            {name}
            </div>
            <div style={{marginLeft: 10}}>        
            {renderStatus(status)}
            </div>     
          </div>
          <div className={classes.itemRole}>
            {renderRole(role)}
          </div>
          <div style={{overflow: "hidden", textOverflow: "ellipsis", width: "100%", marginTop: "5px"}}> 
          <Paper style={{maxHeight: 75, overflowY: 'auto'}}>
          <Typography variant="body2" color="textSecondary" component={'div'}>
            <ReadMore
              min={MIN_LENGTH}
              max={MAX_LENGTH}
              ideal={IDEAL_LENGTH}
              text={descriptions}
              readMoreText="More..."
            />
          </Typography>
          </Paper>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions style={{position: "absolute", zIndex: 1000, top: 155}}>
        <Button size="small" color="primary" onClick={handleOpenProject}>
          View Detail
        </Button>
      </CardActions>
    </Card>
  );
}

export default connect (null,mapDispatchToProps) (withStyles(styles)(ProjectItem));
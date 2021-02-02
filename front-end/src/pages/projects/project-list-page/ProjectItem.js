import React from "react";
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import ReadMore from 'read-more-react';

import {
    Chip,
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
    CardActionArea
  } from "@material-ui/core";


  const MAX_LENGTH = 200;

  const MIN_LENGTH = 20;


const ProjectItem = (props) => {

  const {classes} = props;

  const {name, descriptions, status} = props;
  

  const renderStatus = (status) => {
    switch(status){
      case "Finished":
        return (<Chip label={status} className={classes.statusFin}/>);

      case "In progress":
        return (<Chip label={status} className={classes.statusInProgress}/>);
    
      case "Pending":
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
              text={descriptions}
              readMoreText="More..."
            />
          </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          View Detail
        </Button>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(ProjectItem);

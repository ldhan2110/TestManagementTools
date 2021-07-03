import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import {connect} from 'react-redux';
import {LOGOUT_REQ} from '../../redux/account/constants';
import {ADD_NEW_NOTIFICATION_REQ, GET_ALL_NOTIFICATIONS_REQ} from '../../redux/notification/constants';
import styles from "./styles";

import {
    List, Avatar, ListItemAvatar, ListItem, ListSubheader, Popover, Paper, Typography,
    IconButton as MuiIconButton,
    Badge,
    Divider
  } from "@material-ui/core";
import { Bell } from 'react-feather';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import NotificationsIcon from '@material-ui/icons/Notifications';



const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const Indicator = styled(Badge)`
  .MuiBadge-badge {
    background: ${props => props.theme.header.indicator.background};
    color: ${props => props.theme.palette.common.white};
  }
`;



//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return {listNotifications: state.notification.listNotifications }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutReq: () => dispatch({ type: LOGOUT_REQ }),
    addNotificationReq: (payload) => dispatch({ type: ADD_NEW_NOTIFICATION_REQ, payload }),
    getAllNotificationReq: () => dispatch({ type: GET_ALL_NOTIFICATIONS_REQ}),
  }
};

const UserMenu = (props) => {

    const {getAllNotificationReq, listNotifications, classes} = props;

    const [anchorMenu, setAnchorMenu] = useState(null);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(()=>{
      getAllNotificationReq();
  },[])

  function time2TimeAgo(ts) {
    // This function computes the delta between the
    // provided timestamp and the current time, then test
    // the delta for predefined ranges.

    var d = new Date();  // Gets the current time
    //var nowTs = Math.floor(d.getTime()/1000); // getTime() returns milliseconds, and we need seconds, hence the Math.floor and division by 1000
    let ts1 = new Date(ts);
    let seconds = (d-ts1)/1000;

    // more that two days
    if (seconds > 2*24*3600) {
       return "a few days ago";
    }
    // a day
    if (seconds > 24*3600) {
       return "yesterday";
    }
    if (seconds > 7200) {
      return Math.floor(seconds/3600).toString() +" hours ago";
    }

    if (seconds > 3600) {
       return Math.floor(seconds/3600).toString() +" hour ago";
    }
    if (seconds > 1800) {
       return "Half an hour ago";
    }
    if (seconds > 60) {
       return Math.floor(seconds/60).toString() + " minutes ago";
    }
    return "Less than 1 minute ago";
}

    
    let avatar = "https://yt3.ggpht.com/ytc/AKedOLRWlzklkXv6Vk8S807dD9fHnadWzGUhguOVbxwCRA=s88-c-k-c0x00ffffff-no-rj"
  
    return (
      <React.Fragment>
        <IconButton  aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={handleClick}>
            <Indicator badgeContent={listNotifications.length}>
              <Bell style={{width:'24px', height:'24px', marginTop:'2px'}}/>
            </Indicator>
        </IconButton>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            style: {overflow: "hidden", height:'50vh', marginLeft: '10vw' ,width:'35vw',border: '1px solid #d3d4d5', backgroundColor:'rgba(255,255,255,0.95)'
            }
          }}>
        <Paper>
          <ListSubheader style={{fontSize:16}}>{"Notifications"}</ListSubheader>
        </Paper>
        <Divider />
        {listNotifications?.length > 0 ? 
         <List className={classes.listStyle} >

            {listNotifications.map((node, index) =>
            <div style={{display: 'flex'}}>
              <ListItem key={node._id} button alignItems="normal" className={classes.listItemStyle}>

                <div onClick={event =>  window.location.href=node.url} style={node.is_read ? {height:'100%', opacity:'0%'}:{height:'100%'}}>
                  <FiberManualRecordIcon className={classes.unreadNotif}/>
                </div>

                <div onClick={event =>  window.location.href=node.url} style={{height:'100%'}}>
                {avatar && <ListItemAvatar >
                  <Avatar src={avatar}>
                  </Avatar>
                </ListItemAvatar>} 
                </div>
                
                <div onClick={event =>  window.location.href=node.url} className={classes.listItemDivText}>
                  <ListItemText primary={node.description} secondary={time2TimeAgo(node.created_date)} 
                   inset={avatar ? false : true} style={{marginTop:0}} />
                </div>
              </ListItem>
             
          </div>
                            
            )}
         </List> 
         : <div className={classes.emptyList} >
           <NotificationsIcon style={{ fontSize:100, color:'grey', marginBottom: 15 }}/>
           <Typography variant='h6'>
           Your notifications are showed here
           </Typography>
           </div>}
        </Popover>
      </React.Fragment>
    );
  }

  export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(UserMenu));
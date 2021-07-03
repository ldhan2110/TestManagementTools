import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {LOGOUT_REQ} from '../../redux/account/constants';
import {ADD_NEW_NOTIFICATION_REQ, GET_ALL_NOTIFICATIONS_REQ, UPDATE_NOTIFICATION_REQ, RESET_UPDATE_NOTIFICATION} from '../../redux/notification/constants';
import styles from "./styles";

import {
    Menu,
    MenuItem, List, Avatar, ListItemAvatar, ListItem, ListSubheader, Popover, Paper, Typography,
    IconButton as MuiIconButton,
    Badge,
    Divider
  } from "@material-ui/core";
import { Bell } from 'react-feather';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { InfoRounded } from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CircularProgress from '@material-ui/core/CircularProgress';


const listNotification = [
  {
    description: "You have been assigned for a test execution in Project"
  },
  {
    description: "You have been assigned for a test execution in Project"
  }
]

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

/* const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem); */


//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return {listNotifications: state.notification.listNotifications,  
          insNotifications: state.notification.insNotifications,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutReq: () => dispatch({ type: LOGOUT_REQ }),
    addNotificationReq: (payload) => dispatch({ type: ADD_NEW_NOTIFICATION_REQ, payload }),
    getAllNotificationReq: () => dispatch({ type: GET_ALL_NOTIFICATIONS_REQ}),
    updateNotificationReq: (payload) => dispatch({ type: UPDATE_NOTIFICATION_REQ, payload}),
    resetUpdateNotification: () => dispatch({ type: RESET_UPDATE_NOTIFICATION}),
  }
};

const UserMenu = (props) => {
    const history = useHistory();

    const {getAllNotificationReq, listNotifications, updateNotificationReq, insNotifications, resetUpdateNotification, classes} = props;

    const [anchorMenu, setAnchorMenu] = useState(null);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [listNotif, setListNotif] = React.useState([]);

    const [numUnread, setNumUnread] = React.useState(0);

    const [load, setLoad] = React.useState(0);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(()=>{
      getAllNotificationReq();
    },[]);
    
    useEffect(()=>{
      setListNotif(listNotifications);  
    },[listNotifications]);

    useEffect(()=>{
      let listTemp = listNotif.filter(item => item.is_read === false);
      setLoad(load+1);
      setNumUnread(listTemp.length);
    },[listNotif]);

    useEffect(()=>{
      if(anchorEl !== null) {
        if(load < 3){
          setLoad(0);
          getAllNotificationReq();
        }
      }
      if(anchorEl === null)
        setLoad(0);

    },[anchorEl]);

  function time2TimeAgo(ts) {
    // This function computes the delta between the
    // provided timestamp and the current time, then test
    // the delta for predefined ranges.

    var d = new Date();  // Gets the current time
    //var nowTs = Math.floor(d.getTime()/1000); // getTime() returns milliseconds, and we need seconds, hence the Math.floor and division by 1000
    let ts1 = new Date(ts);
    let seconds = (d-ts1)/1000;

    // more than 2 weeks
    if (seconds > 2*7*24*3600) {
      return Math.floor(seconds/(2*7*24*3600)).toString() + " weeks ago";
   }
    // a week
    if (seconds > 7*24*3600) {
      return Math.floor(seconds/(7*24*3600)).toString() + " week ago";
   }
    // more that two days
    if (seconds > 2*24*3600) {
       return Math.floor(seconds/(2*24*3600)).toString() + " days ago";
    }
    // a day
    if (seconds > 24*3600) {
       return "yesterday";
    }
    // more than 2 hours
    if (seconds > 7200) {
      return Math.floor(seconds/3600).toString() +" hours ago";
    }
    // 1 hour
    if (seconds > 3600) {
       return Math.floor(seconds/3600).toString() +" hour ago";
    }
    // less than 1 hour
    if (seconds > 60) {
       return Math.floor(seconds/60).toString() + " minutes ago";
    }
    return "Less than 1 minute ago";
}

  const [anchorElMenu, setAnchorElMenu] = React.useState(null);
    const openMenu = Boolean(anchorElMenu);

    const handleClickMenu = (event) => {
      setAnchorElMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
      setAnchorElMenu(null);
    };

    useEffect(()=>{
      if(insNotifications?.sucess === true) {
        //getAllNotificationReq();
        resetUpdateNotification();
      }
    },[insNotifications])

    const handleClickNotif = (id, isRead) => {
      if(isRead === false) {
        setListNotif(listNotif.map(x => {
          if(x._id !== id) return x
         return {...x, is_read: true}
        }));
        updateNotificationReq({is_read: false, id: id});      
      }
    }
    
    const countUnreadNotif = () => {
      const listTemp = listNotif.filter(item => item.is_read === false)
      setNumUnread(listTemp.length);
    }

    const handleHide = () => {
      //console.log("hide");
    }
    let avatar = "https://yt3.ggpht.com/ytc/AKedOLRWlzklkXv6Vk8S807dD9fHnadWzGUhguOVbxwCRA=s88-c-k-c0x00ffffff-no-rj"
    // redirect link, dont delete
    //event =>  window.location.href=node.url
    return (
      <React.Fragment>
        <IconButton  aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={handleClick}>
            <Indicator badgeContent={numUnread}>
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
            style: {overflow: "hidden", height:'620px', width:'400px',border: '1px solid #d3d4d5', backgroundColor:'rgba(255,255,255,0.97)'
            }
          }}>
            {<div style={load < 2 ? {height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}
            :{display:'none'}}>
              <CircularProgress style={{width: '28px', height: '28px', color:'#909090'}} /></div> }
        <Paper>
          <ListSubheader style={{fontSize:16}}>{"Notifications"}</ListSubheader>
        </Paper>
        <Divider />
        {listNotif?.length > 0 ? 
         <List className={classes.listStyle} >

            {listNotif?.map((node, index) =>
            <div style={{display: 'flex'}}>
              <ListItem key={node._id} button alignItems="normal" className={classes.listItemStyle}>

                <div onClick={()=>{handleClickNotif(node._id, node.is_read)}} style={node.is_read ? {height:'100%', opacity:'0%'}:{height:'100%'}}>
                  <FiberManualRecordIcon className={classes.unreadNotif}/>
                </div>

                <div onClick={()=>{handleClickNotif(node._id, node.is_read)}} style={{height:'100%'}}>
                {avatar && <ListItemAvatar >
                  <Avatar src={avatar}>
                  </Avatar>
                </ListItemAvatar>} 
                </div>
                
                <div onClick={(event)=>{handleClickNotif(node._id, node.is_read)}} className={classes.listItemDivText}>
                  <ListItemText primary={node.description} secondary={time2TimeAgo(node.created_date)} 
                   inset={avatar ? false : true}
                   classes={node.is_read ? { primary: classes.itemTextPrimaryRead, secondary: classes.itemTextSecondaryRead} 
                            : {primary: classes.itemTextPrimary, secondary: classes.itemTextSecondary}}
                   className={classes.listItemSty}
                   //style={{marginTop:0}}
                   />
                </div>
               {/* <div onClick={()=>{handleClickNotif(node.a)}} style={{height:'100%', paddingLeft:'8px'}}><img src="https://i.ytimg.com/vi/htxEPA5YxGU/hqdefault_live.jpg" 
               className={classes.image} />
               </div> */}
            {/* <IconButton edge="end" className={classes.iconBtn}>
                  <MoreVertIcon onClick={handleClickMenu}/>
                </IconButton> */}
                
              </ListItem>
              {/* <Popover
                elevation={0}        
                open={Boolean(anchorElMenu)}
                anchorEl={anchorElMenu}
                onClose={handleCloseMenu}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  style: {border: '1px solid #d3d4d5',
                  }
                }}>
                  <List>
                    <ListItem onClick={()=>handleHide(index)} button>
                      <ListItemIcon><VisibilityOffIcon /></ListItemIcon>                     
                      <ListItemText primary={"Hide this notification"}/>
                    </ListItem>
                        <ListItem onClick={()=>handleHide(index)} button>
                      <ListItemText inset primary={"Hide this notification2"}/>
                    </ListItem>
              </List>
            </Popover> */}
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
      {/* <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        {listNotifications?.map((item, index) =>
        <StyledMenuItem>
          <ListItemIcon>
            <InfoRounded fontSize="small" />
          </ListItemIcon>
          <ListItemText key={index} value={item.description}>{item.description}</ListItemText> 
        </StyledMenuItem>)}    
      </StyledMenu> */}
      </React.Fragment>
    );
  }

  export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(UserMenu));
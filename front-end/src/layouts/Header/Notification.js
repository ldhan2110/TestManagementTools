import React, {useState, useEffect, useRef, useCallback} from 'react';
import styled from "styled-components";
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {LOGOUT_REQ} from '../../redux/account/constants';
import {ADD_NEW_NOTIFICATION_REQ, GET_ALL_NOTIFICATIONS_REQ, UPDATE_NOTIFICATION_REQ, RESET_UPDATE_NOTIFICATION} from '../../redux/notification/constants';
import styles from "./styles";
import {
    List, Avatar, ListItemAvatar, ListItem, ListSubheader, Popover, Paper, Typography,
    IconButton as MuiIconButton,
    Badge,
    Divider,
    Tooltip
  } from "@material-ui/core";
import { Bell, X } from 'react-feather';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SELECT_PROJECT } from '../../redux/projects/constants';
import { GET_ALL_TESTEXEC_REQ } from '../../redux/test-execution/constants';


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
  return {
    listNotifications: state.notification.listNotifications,  
    insNotifications: state.notification.insNotifications,
    notification: state.notification,
    project: state.project.listProjects
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutReq: () => dispatch({ type: LOGOUT_REQ }),
    addNotificationReq: (payload) => dispatch({ type: ADD_NEW_NOTIFICATION_REQ, payload }),
    getAllNotificationReq: () => dispatch({ type: GET_ALL_NOTIFICATIONS_REQ}),
    updateNotificationReq: (payload) => dispatch({ type: UPDATE_NOTIFICATION_REQ, payload}),
    resetUpdateNotification: () => dispatch({ type: RESET_UPDATE_NOTIFICATION}),
    selectProject: (value) => dispatch({type: SELECT_PROJECT, value}),
    getAllTestExecReq: () => dispatch({ type: GET_ALL_TESTEXEC_REQ}),
  }
};

const UserMenu = (props) => {
    const history = useHistory();

    const {getAllTestExecReq, getAllNotificationReq, notification, listNotifications, updateNotificationReq, selectProject, insNotifications, resetUpdateNotification, classes, project} = props;

    const [anchorMenu, setAnchorMenu] = useState(null);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [listNotif, setListNotif] = React.useState([]);

    const [numUnread, setNumUnread] = React.useState(0);

    const [load, setLoad] = React.useState(1);

    const [hasNextPage, setHasNextPage] = React.useState(false);

    const [lastObjectPosition , setLastObjectPosition ] = useState(0);

    const firstPage = 20;

    const perPage = 10;

    const [items, setItems] = useState([]);

    const loadNextPage = () => {
      setItems(currentItems => {
        setLoading(false);        
        return(
          [...currentItems, ...listNotif.slice(lastObjectPosition, lastObjectPosition + perPage)]
        )
      });
      setLastObjectPosition(currentValue => currentValue + perPage);      
      setHasNextPage(((lastObjectPosition + perPage) < listNotifications.length) ? true:false);  
    }
    
    const [loading, setLoading] = React.useState(false);
    const observer = useRef();
    const lastNotifRef = useCallback(node => {
      if (loading) return;
      if(observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries =>{
        if(entries[0].isIntersecting && hasNextPage) {
          setLoading(true);
          setTimeout(loadNextPage, 200);
        }
      })
      if(node) observer.current.observe(node);
    },[loading, hasNextPage])

    const handleClick = (event) => {
      setLastObjectPosition(firstPage);
      setHasNextPage((firstPage < listNotifications.length) ? true:false);  
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const filterProject = (id) =>{
      return project.filter(x => x._id === id);
    };

    const parseUrl2ProjectId = (url) => {
        var arr_url = url.split('/');
        return arr_url[arr_url.length-3];
    }

    useEffect(()=>{
      notification.success = "";
      getAllNotificationReq();
    },[]);
    
    useEffect(()=>{
      if(notification.success === true){
        setListNotif(listNotifications);
        setItems(listNotifications.slice(0, firstPage));
        setLastObjectPosition(currentValue => currentValue + perPage);
        setHasNextPage((lastObjectPosition < listNotifications.length) ? true:false);
      }
    },[notification]);

    useEffect(()=>{
      let listTemp = listNotifications.filter(item => item.is_read === false);
      setNumUnread(listTemp.length);
    },[notification.success]);

    useEffect(()=>{
      if(anchorEl !== null) {
        if(load < 1){
          setLoad(load + 1);          
        }
        if(load >= 1){
          notification.success = "";
          getAllNotificationReq();
        }
      }
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
      return Math.floor(seconds/(7*24*3600)).toString() + " weeks ago";
   }
    // a week
    if (seconds > 7*24*3600) {
      return Math.floor(seconds/(7*24*3600)).toString() + " week ago";
   }
    // more that two days
    if (seconds > 2*24*3600) {
       return Math.floor(seconds/(24*3600)).toString() + " days ago";
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

    
    

    useEffect(()=>{
      if(insNotifications?.sucess === true) {
        resetUpdateNotification();
      }
    },[insNotifications])

    const handleClickNotif = async (id, isRead, url) => {
      if(isRead === false) {
        // setListNotif(listNotif.map(x => {
        //   if(x._id !== id) return x
        //  return {...x, is_read: true}
        // }));
        updateNotificationReq({is_read: true, id: id});
        handleClose();
      }
      
      var projectItem = filterProject(parseUrl2ProjectId(url));
      if (projectItem.length > 0){
        selectProject({id: projectItem[0]._id, name: projectItem[0].projectname, role: projectItem[0].role});
        history.push("/projects/"+ projectItem[0]._id+"/test-execution/"+url.substr(url.lastIndexOf('/') +1));
      } else {
        history.push("/error/500");
      }
      
    }
    
    

    
    let avatar = "https://yt3.ggpht.com/ytc/AKedOLRWlzklkXv6Vk8S807dD9fHnadWzGUhguOVbxwCRA=s88-c-k-c0x00ffffff-no-rj"
    // redirect link, dont delete
    //event =>  window.location.href=node.url
    return (
      <React.Fragment>
        <Tooltip title="Notifications">
        <IconButton aria-label="Notifications" aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={handleClick}>
            <Indicator badgeContent={numUnread}>
              <Bell style={{width:'24px', height:'24px', marginTop:'2px'}}/>
            </Indicator>
        </IconButton>
        </Tooltip>
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
            {<div style={notification.success === "" ? {height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}
            :{display:'none'}}>
              <CircularProgress style={{width: '28px', height: '28px', color:'#909090'}} /></div> }
        <Paper>
          <ListSubheader style={{fontSize:16}}>{"Notifications"}</ListSubheader>
        </Paper>
        <Divider />
        {items?.length > 0 ? 
         <List className={classes.listStyle} >

            {items?.map((node, index) =>
            {if(items.length === index + 1) {return(
            <div style={{display: 'flex'}} key={node._id} ref={lastNotifRef}>
              
              <ListItem button alignItems="normal" className={classes.listItemStyle}>

                <div onClick={(event)=>{handleClickNotif(node._id, node.is_read, node.url)}} style={node.is_read ? {height:'100%', opacity:'0%'}:{height:'100%'}}>
                  <FiberManualRecordIcon className={classes.unreadNotif}/>
                </div>

                <div onClick={(event)=>{handleClickNotif(node._id, node.is_read, node.url)}} style={{height:'100%', marginTop: '5px'}}>
                {avatar && <ListItemAvatar >
                  <Avatar>
                  </Avatar>
                </ListItemAvatar>} 
                </div>
                
                <div onClick={(event)=>{handleClickNotif(node._id, node.is_read, node.url)}} className={classes.listItemDivText}>
                  <ListItemText primary={node.description} secondary={time2TimeAgo(node.created_date)} 
                   inset={avatar ? false : true}
                   classes={node.is_read ? { primary: classes.itemTextPrimaryRead, secondary: classes.itemTextSecondaryRead} 
                            : {primary: classes.itemTextPrimary, secondary: classes.itemTextSecondary}}
                   className={classes.listItemSty}
                   //style={{marginTop:0}}
                   />
                </div>
               
              </ListItem>
              
              </div>
              )} else {return(<div style={{display: 'flex'}} key={node._id}>
              <ListItem key={node._id} button alignItems="normal" className={classes.listItemStyle}>

              <div onClick={(event)=>{handleClickNotif(node._id, node.is_read, node.url)}} style={node.is_read ? {height:'100%', opacity:'0%'}:{height:'100%'}}>
                <FiberManualRecordIcon className={classes.unreadNotif}/>
              </div>

              <div onClick={(event)=>{handleClickNotif(node._id, node.is_read, node.url)}} style={{height:'100%', marginTop: '5px'}}>
              {avatar && <ListItemAvatar >
                <Avatar>
                </Avatar>
              </ListItemAvatar>} 
              </div>
              
              <div onClick={(event)=>{handleClickNotif(node._id, node.is_read, node.url)}} className={classes.listItemDivText}>
                <ListItemText primary={node.description} secondary={time2TimeAgo(node.created_date)} 
                 inset={avatar ? false : true}
                 classes={node.is_read ? { primary: classes.itemTextPrimaryRead, secondary: classes.itemTextSecondaryRead} 
                          : {primary: classes.itemTextPrimary, secondary: classes.itemTextSecondary}}
                 className={classes.listItemSty}
                 //style={{marginTop:0}}
                 />
              </div>
             
            </ListItem>
              
          </div>               
            )}})}
            {loading && <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <CircularProgress style={{width: '18px', height: '18px', color:'#909090'}} />
            </div>
            }
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
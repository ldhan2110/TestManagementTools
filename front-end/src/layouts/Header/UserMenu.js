import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {GET_CURRENT_USER_REQ} from '../../redux/users/constants';
import {LOGOUT_REQ} from '../../redux/account/constants';

import {
    Menu,
    MenuItem,
    IconButton as MuiIconButton,
    Avatar,
    Tooltip,
  } from "@material-ui/core";
import { Image, Placeholder } from 'cloudinary-react'


const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const  mapStateToProps = (state) => {
  return {
    inforProfile: state.user.inforProfile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentProfileReq: (payload) => dispatch({ type: GET_CURRENT_USER_REQ, payload}),
    logoutReq: () => dispatch({ type: LOGOUT_REQ }),
  }
};

const UserMenu = (props) => {
    const history = useHistory();

    const [anchorMenu, setAnchorMenu] = useState(null);

    const {logoutReq, getCurrentProfileReq, inforProfile} = props;
    
    const [avatarId, setAvatarId] = useState("");

    useEffect(()=>{
      getCurrentProfileReq();
    },[])

    useEffect(()=>{
      setAvatarId(inforProfile.avatar);
    },[inforProfile])

    const toggleMenu = event => {
      setAnchorMenu(event.currentTarget);
    };
  
    const closeMenu = () => {
      setAnchorMenu(null);
    };

    const handleProfileClick = () => {
      history.push("/profile");
    }

    const handleLogOut = () => {
      history.entries = [];
      history.index = -1;
      history.push(`/login`);
      logoutReq();
    }
  
    return (
      <React.Fragment>
        <Tooltip title="User menu">
        <IconButton
        aria-label="User menu"
          aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
        >
          <Avatar>
            {avatarId &&
            <Image cloudName="testcontrol" publicId={avatarId} 
                width="48" height="48" quality="auto" fetchFormat="auto" crop="fill">
                  <Placeholder type="pixelate" />
                </Image>}
          </Avatar>
        </IconButton>
        </Tooltip>
        <Menu
          id="menu-appbar"
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          anchorEl={anchorMenu}
          open={Boolean(anchorMenu)}
          onClose={closeMenu}
        >
          <MenuItem onClick={handleProfileClick}>
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogOut}>
            Sign out
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }

  export default connect(mapStateToProps,mapDispatchToProps)(UserMenu);
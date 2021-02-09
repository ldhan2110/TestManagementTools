import React, {useState} from 'react';
import styled from "styled-components";
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {LOGOUT_REQ} from '../../redux/account/constants';

import {
    Menu,
    MenuItem,
    IconButton as MuiIconButton,
    Avatar,
  } from "@material-ui/core";



const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const mapDispatchToProps = dispatch => {
  return {
    logoutReq: () => dispatch({ type: LOGOUT_REQ }),
  }
};

const UserMenu = (props) => {
    const history = useHistory();

    const [anchorMenu, setAnchorMenu] = useState(null);

    const {logoutReq} = props;


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
        <IconButton
          aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
        >
          <Avatar src=""/>
        </IconButton>
        <Menu
          id="menu-appbar"
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

  export default connect(null,mapDispatchToProps)(UserMenu);
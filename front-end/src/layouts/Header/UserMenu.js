import React, {useState} from 'react';
import styled from "styled-components";

import {
    Menu,
    MenuItem,
    AppBar as MuiAppBar,
    IconButton as MuiIconButton,
    Avatar,
  } from "@material-ui/core";



const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const UserMenu = (props) => {
    const [anchorMenu, setAnchorMenu] = useState(null);
  
    const toggleMenu = event => {
      setAnchorMenu(event.currentTarget);
    };
  
    const closeMenu = () => {
      setAnchorMenu(null);
    };
  
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
          <MenuItem onClick={closeMenu}>
            Profile
          </MenuItem>
          <MenuItem onClick={closeMenu}>
            Sign out
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }

  export default (UserMenu);
import React, {useState} from 'react';
import styled from "styled-components";
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {LOGOUT_REQ} from '../../redux/account/constants';

import {
    Menu,
    MenuItem,
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

const StyledMenu = withStyles({
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
  }))(MenuItem);

const mapDispatchToProps = dispatch => {
  return {
    logoutReq: () => dispatch({ type: LOGOUT_REQ }),
  }
};

const UserMenu = (props) => {
    const history = useHistory();

    const [anchorMenu, setAnchorMenu] = useState(null);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

  
    return (
      <React.Fragment>
        <IconButton  aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={handleClick}>
            <Indicator badgeContent={7}>
              <Bell />
            </Indicator>
        </IconButton>
        <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <InfoRounded fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="You have been assigned for a test execution in Project" /> 
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <InfoRounded fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="You have been assigned for a test execution in Project" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <InfoRounded fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="You have been assigned for a test execution in Project" />
        </StyledMenuItem>
      </StyledMenu>
      </React.Fragment>
    );
  }

  export default connect(null,mapDispatchToProps)(UserMenu);
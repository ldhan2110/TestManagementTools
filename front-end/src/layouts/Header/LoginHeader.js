import React from 'react';
import styles from './styles';
import styled from "styled-components";
import UserMenu from './UserMenu';
import SearchInput from '../../components/SearchInput';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Menu as MenuIcon } from "@material-ui/icons";
import {
    Badge,
    Grid,
    AppBar,
    Hidden,
    IconButton as MuiIconButton,
  } from "@material-ui/core";

import {
    Bell,
  } from "react-feather";  



const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px; 
    color: ${props => props.theme.palette.common.black};
  }
`;


const Indicator = styled(Badge)`
  .MuiBadge-badge {
    background: ${props => props.theme.header.indicator.background};
    color: ${props => props.theme.palette.common.white};
  }
`;

const LoginHeader = (props) => {

  const history = useHistory();

  const { onDrawerToggle,classes} = props;

  const handleLogoClick = () => {
    history.push("/");
  }

  return (
      <React.Fragment>
      <AppBar position="static">
      <Grid container alignItems="center" className={classes.loginHeader}>
         <Hidden mdUp>
         <Grid item xs = {7}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={onDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          </Hidden>
          <Hidden mdDown>
             <Grid item xs = {10}>
              <IconButton onClick={handleLogoClick}>
                <img src ="/img/Logo1zz.jpg" alt="logo"/>
              </IconButton>
          </Grid>
          </Hidden>
         
          
          <Grid item>
              <IconButton color="inherit">
            <Indicator badgeContent={7}>
              <Bell />
            </Indicator>
          </IconButton>
          </Grid>
          <Grid item>
              <UserMenu/>
          </Grid>
      </Grid>
      </AppBar>
      </React.Fragment>
  )
}

export default withStyles(styles)(LoginHeader);
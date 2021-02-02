import React from 'react';
import styles from './styles';
import styled from "styled-components";
import UserMenu from './UserMenu';
import SearchInput from '../../components/SearchInput';
import { withStyles } from '@material-ui/core/styles';
import {
    Badge,
    Grid,
    AppBar,
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
  const { classes} = props;

  return (
      <React.Fragment>
      <AppBar position="static">
      <Grid container alignItems="center" className={classes.loginHeader}>
          <Grid item xs = {9}>
              <img src ="/img/logo.jpg" alt="logo"/>
          </Grid>
      
          <Grid item>
              <SearchInput/>
          </Grid>
          
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
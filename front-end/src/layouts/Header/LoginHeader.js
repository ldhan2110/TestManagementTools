import React from 'react';
import styles from './styles';
import styled from "styled-components";
import UserMenu from './UserMenu';
import Notification from './Notification';
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





const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px; 
    color: ${props => props.theme.palette.common.black};
  }
`;

const LoginHeader = (props) => {

  const history = useHistory();

  const { onDrawerToggle,classes} = props;

  const handleLogoClick = () => {
    history.replace('/projects');
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
             {/*<img src ="/img/Logo1zz.png" alt="logo"/>*/}
              <IconButton className={classes.root} onClick={handleLogoClick}>
        <img src ="/img/Logo1zz.png" alt="logo"/>
              </IconButton> 
          </Grid>
          </Hidden> 
         
          <div className={classes.loginHeaderIcons}>
          <Grid item>
              <Notification/>
          </Grid>
          <Grid item>
              <UserMenu/>
          </Grid>
         </div>
      </Grid>
      </AppBar>
      </React.Fragment>
  )
}

export default withStyles(styles)(LoginHeader);
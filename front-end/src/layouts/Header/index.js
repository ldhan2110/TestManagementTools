import React from 'react';
import useStyles from './styles';
import Divider from '@material-ui/core/Divider';
import styled from "styled-components";
import UserMenu from './UserMenu';
import SearchInput from '../../components/SearchInput';
import {
    Badge,
    Grid,
    Hidden,
    InputBase,
    Menu,
    MenuItem,
    AppBar as MuiAppBar,
    IconButton as MuiIconButton,
    Toolbar
  } from "@material-ui/core";

import {
    Bell,
    MessageSquare,
    Search as SearchIcon,
    Power
  } from "react-feather";  

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


const LoginHeader = (props) => {
    const {onDrawerToggle} = props;

    const classes = useStyles();
    return (
        <React.Fragment>
        <Grid container alignItems="center" className={classes.loginHeader}>
            <Grid item xs = {9}>
                <img src ="/img/logo.jpg"/>
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
        </React.Fragment>
    )
}

const Header = (props) => {
    const {isLogin} = props;
    const classes = useStyles();
    
    return (
        <React.Fragment>
            {isLogin ? 
                <div className={classes.header}>
                    <img src ="/img/logo.jpg"/>
                </div>
                :
                <LoginHeader/>
            }
            <Divider/>
        </React.Fragment>
       
    );
}

export default (Header);
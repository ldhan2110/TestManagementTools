import React from "react";
import styled from "styled-components";

import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import { blue } from "@material-ui/core/colors";

import {
  Grid,
  Hidden,
  IconButton,
  List,
  ListItemText,
  Tooltip,
  ListItem as MuiListItem
} from "@material-ui/core";

const Wrapper = styled.div`
  padding: ${props => props.theme.spacing(1) / 4}px
    ${props => props.theme.spacing(4)}px;
  background: ${props => props.theme.palette.common.white};
  position: relative;
`;

const ListItem = styled(MuiListItem)`
  display: inline-block;
  width: auto;
  padding-left: ${props => props.theme.spacing(2)}px;
  padding-right: ${props => props.theme.spacing(2)}px;

  &,
  &:hover,
  &:active {
    color: #000;
  }
`;

function Footer() {
  return (
    <Wrapper>
       <Grid container spacing={0}>
        <Hidden smDown>
          <Grid container item xs={12} md={6}>
            <List>
            <Tooltip title="Back to top" component="a" href="#">
                <IconButton aria-label="Back to top">
                        <VerticalAlignTopIcon style={{color: blue[400]}}/>
                </IconButton>
                </Tooltip>

               
              {/*<ListItem component="a" href="#">
                <ListItemText primary="Help Center" />
              </ListItem>
              <ListItem component="a" href="#">
                <ListItemText primary="Privacy" />
              </ListItem>
              <ListItem component="a" href="#">
                <ListItemText primary="Terms of Service" />
  </ListItem>*/}
            </List>
          </Grid>
  </Hidden> 
        <Grid container item xs={12} md={6} justify="flex-end">
          <List>
            <ListItem>
              <ListItemText primary={`Test Control - Copyright © ${new Date().getFullYear()} `} />
            </ListItem>
          </List>
        </Grid>
       </Grid> 
    </Wrapper>
  );
}

export default Footer;

import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setTheme } from '../redux/theme/themeActions';
import {
  Drawer,
  Fab as MuiFab,
  ListItem,
  Paper as MuiPaper,
  Typography,
  Tooltip, IconButton,
} from "@material-ui/core";
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import { spacing } from "@material-ui/system";

import { Palette as PaletteIcon } from "@material-ui/icons";

const Paper = styled(MuiPaper)(spacing);

const Demo = styled(Paper)`
  cursor: pointer;
  text-align: center;
  box-shadow: none;
`;

const Fab = styled(MuiFab)`
  position: fixed;
  right: ${props => props.theme.spacing(4)}px;
  bottom: ${props => props.theme.spacing(8)}px;
  z-index: 1;
`;

const CustomIconButton = styled(IconButton)`
  position: fixed;
  right: ${props => props.theme.spacing(2.5)}px;
  bottom: ${props => props.theme.spacing(20)}px;
  z-index: 1;
`;

const Wrapper = styled.div`
  width: 240px;
  overflow-x: hidden;
`;

const Screenshot = styled.img`
  max-width: 100%;
  height: auto;
  border: 1px solid ${props => props.theme.palette.grey[300]};
  display: block;
`;

const Heading = styled(ListItem)`
  font-size: ${props => props.theme.typography.h5.fontSize};
  font-weight: ${props => props.theme.typography.fontWeightMedium};
  color: ${props => props.theme.palette.common.black};
  background: ${props => props.theme.palette.common.white};
  font-family: ${props => props.theme.typography.fontFamily};
  min-height: 56px;

  ${props => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }
`;

let Demos = function({dispatch}) {
  return (
    <Wrapper>
      <Heading>Chọn giao diện</Heading>
      <Demo my={2} mx={4} onClick={() => dispatch(setTheme(0))}>
        <Screenshot alt="Dark" src="/static/img/screenshots/dark-small.png" />
        <Typography variant="subtitle1" gutterBottom>
          Dark
        </Typography>
      </Demo>
      <Demo my={2} mx={4} onClick={() => dispatch(setTheme(1))}>
        <Screenshot
          alt="Light"
          src="/static/img/screenshots/light-small.png"
        />
        <Typography variant="subtitle1" gutterBottom>
          Light
        </Typography>
      </Demo>
      <Demo my={2} mx={4} onClick={() => dispatch(setTheme(2))}>
        <Screenshot alt="Blue" src="/static/img/screenshots/blue-small.png" />
        <Typography variant="subtitle1" gutterBottom>
          Blue
        </Typography>
      </Demo>
      <Demo my={2} mx={4} onClick={() => dispatch(setTheme(3))}>
        <Screenshot
          alt="Green"
          src="/static/img/screenshots/green-small.png"
        />
        <Typography variant="subtitle1" gutterBottom>
          Green
        </Typography>
      </Demo>
      <Demo my={2} mx={4} onClick={() => dispatch(setTheme(4))}>
        <Screenshot
          alt="Indigo"
          src="/static/img/screenshots/indigo-small.png"
        />
        <Typography variant="subtitle1" gutterBottom>
          Indigo
        </Typography>
      </Demo>
      <Demo my={2} mx={4} onClick={() => dispatch(setTheme(5))}>
        <Screenshot alt="Teal" src="/static/img/screenshots/teal-small.png" />
        <Typography variant="subtitle1" gutterBottom>
          Teal
        </Typography>
      </Demo>
    </Wrapper>
  )
}

Demos = connect()(Demos);

function Settings() {
  const [state, setState] = useState({
    isOpen: false
  });

  const toggleDrawer = open => () => {
    setState({ ...state, isOpen: open });
  };

  return (
    <React.Fragment>
      <Fab color="primary" aria-label="Edit" onClick={toggleDrawer(true)}>
        <PaletteIcon />        
      </Fab>
      {/*<CustomIconButton href="#" title="Back to top">
          <VerticalAlignTopIcon color="primary" style={{fontSize: 28}}/>
  </CustomIconButton>*/}
      <Drawer anchor="right" open={state.isOpen} onClose={toggleDrawer(false)}>
        <Demos />
      </Drawer>
    </React.Fragment>
  );
}

export default Settings;
import React from "react";
import styled from "styled-components";

import { Button as MuiButton, Tooltip } from "@material-ui/core";

import {
  Loop as LoopIcon,
} from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const Button = styled(MuiButton)(spacing);

const SmallButton = styled(Button)`
  padding: 4px;
  min-width: 0;

  svg {
    width: 0.9em;
    height: 0.9em;
  }
`;

class Actions extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleReset = (event) => {
    window.location.reload();
  }

  render() {
    return (
      <React.Fragment>
        <Tooltip title="Reload dashboard">
        <SmallButton aria-label="Reload dashboard" size="small" mr={4} onClick={this.handleReset}>
          <LoopIcon />
        </SmallButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default Actions;

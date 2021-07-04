import React from "react";
import styled from "styled-components";

import { Button as MuiButton, Menu, MenuItem, Tooltip } from "@material-ui/core";

import {
  Loop as LoopIcon,
  FilterList as FilterListIcon
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
    const { anchorEl } = this.state;
    return (
      <React.Fragment>
        <Tooltip title="Reload dashboard">
        <SmallButton aria-label="Reload dashboard" size="small" mr={4} onClick={this.handleReset}>
          <LoopIcon />
        </SmallButton>
        </Tooltip>
        {/*<SmallButton size="small" mr={2}>
          <FilterListIcon />
        </SmallButton>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Today: April 29
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Today</MenuItem>
          <MenuItem onClick={this.handleClose}>Yesterday</MenuItem>
          <MenuItem onClick={this.handleClose}>Last 7 days</MenuItem>
          <MenuItem onClick={this.handleClose}>Last 30 days</MenuItem>
          <MenuItem onClick={this.handleClose}>This month</MenuItem>
          <MenuItem onClick={this.handleClose}>Last month</MenuItem>
    </Menu>*/}
      </React.Fragment>
    );
  }
}

export default Actions;

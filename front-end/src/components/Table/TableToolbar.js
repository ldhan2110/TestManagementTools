import React from "react";
import styled from "styled-components";


import {
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Grid
} from "@material-ui/core";
import SearchInput from '../SearchInput';

import {Archive as ArchiveIcon} from "@material-ui/icons";




const Spacer = styled.div`
  flex: 1 1 100%;
`;

const ToolbarTitle = styled.div`
  min-width: "";
`;




const EnhancedTableToolbar = props => {
  const { numSelected } = props;

  return (
    <Toolbar>
      <ToolbarTitle>
        <SearchInput/>
      </ToolbarTitle>
      <Spacer />
      <div>
        {numSelected > 0 && (
              <Tooltip title="Delete">
                  <IconButton aria-label="Delete">
                      <ArchiveIcon />
                  </IconButton>
              </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

export default (EnhancedTableToolbar);
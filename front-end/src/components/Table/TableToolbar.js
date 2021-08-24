import React from "react";
import styled from "styled-components";


import {
  //IconButton,
  Toolbar,
  //Tooltip,
  //Typography,
  //Grid
} from "@material-ui/core";
import SearchInput from '../SearchInput';

//import {Archive as ArchiveIcon} from "@material-ui/icons";




const Spacer = styled.div`
  flex: 1 1 100%;
`;

const ToolbarTitle = styled.div`
  width: "100vw";
`;




const EnhancedTableToolbar = props => {
  const { numSelected, conditions, setConditions, searchMethod } = props;

  return (
    <Toolbar styles={{backgroundColor: 'red'}}>
      <ToolbarTitle>
        <SearchInput conditions={conditions} setConditions={setConditions} searchMethod={searchMethod}/>
      </ToolbarTitle>
      {/* <Spacer />
      <div>
        {numSelected > 0 && (
              <Tooltip title="Delete">
                  <IconButton aria-label="Delete">
                      <ArchiveIcon />
                  </IconButton>
              </Tooltip>
        )}
      </div> */}
    </Toolbar>
  );
};

export default (EnhancedTableToolbar);
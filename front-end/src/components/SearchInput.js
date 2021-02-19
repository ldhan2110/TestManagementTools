import React from "react";
import styled  from "styled-components";
import { darken } from "polished";
import {InputBase} from '@material-ui/core';
import {
    Search as SearchIcon
  } from "react-feather";

const Input = styled(InputBase)`
  color: inherit;
  width: 100%;

  > input {
    color: ${props => props.theme.header.search.color};
    padding-top: ${props => props.theme.spacing(2.5)}px;
    padding-right: ${props => props.theme.spacing(2.5)}px;
    padding-bottom: ${props => props.theme.spacing(2.5)}px;
    padding-left: ${props => props.theme.spacing(12)}px;
    width: 160px;
  }
`;


const SearchIconWrapper = styled.div`
  width: 50px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;


  svg {
    width: 22px;
    height: 22px; 
    color: ${props => props.theme.palette.common.black};
  }
`;

const Search = styled.div`
  border-radius: 2px;
  background-color: ${props => darken(0.2, props.theme.header.background)};
  display: none;
  position: relative;
  width: 100%;

  &:hover {
    background-color: ${props => darken(0.3, props.theme.header.background)};
  }

  ${props => props.theme.breakpoints.up("md")} {
    display: block;
  }
`;


const SearchInput = (props) => {
    return(
        <React.Fragment>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <Input placeholder="Search" />
            </Search>
        </React.Fragment>
    )
}

export default (SearchInput);
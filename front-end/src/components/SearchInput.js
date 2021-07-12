import React, {useEffect, useState} from "react";
import styled  from "styled-components";
import { darken } from "polished";
import {Button, InputBase, Select, MenuItem, FormControl, InputLabel, Grid, TextField} from '@material-ui/core';
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
    width: 100%;
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
  background-color: ${props => darken(0.1, props.theme.header.background)};
  display: none;
  position: relative;
  width: 100%;

  &:hover {
    background-color: ${props => darken(0.25, props.theme.header.background)};
  }

  ${props => props.theme.breakpoints.up("md")} {
    display: block;
  }
`;


const SearchInput = (props) => {

  const {searchMethod, conditions, setConditions, type} = props;

  const [conditionsRender, setConditionsRender] = useState([]);

  const handleChange = (prop) => (event) => {
    setConditions(prop, event.target.value);
  }


  useEffect(()=>{
    setConditionsRender(conditions);
  },[conditions]);

  const handleSearch = (event) => {
    if (searchMethod)
      searchMethod();
  }

  


    return(
        <React.Fragment>
          <div id="searchInput" style={{display: "flex", flexDirection: "row", justifyItems: "space-between", alignItems: "space-between", gap: "10px", marginTop: "10px", height: "75%"}}>
            {conditionsRender && conditionsRender.map((item,index) => {
                if (item.type === "text"){
                  return (  
                    <TextField key={index} id={item.id} label={item.label} variant="outlined"  fullWidth  onChange={handleChange(item.id)} styles={{flexGrow: 3}}/>
                  )
                } else if (item.type === "select"){
                  return(
                    <FormControl variant="outlined" style={{minWidth:'110px'}} fullWidth key={index}>
                      <InputLabel id={item.id}>{item.label}</InputLabel>
                        <Select
                          labelId={item.id}
                          id={item.id}
                          label={item.id}
                          onChange={handleChange(item.id)}
                          defaultValue={item.default}
                          styles={{flexGrow: 1}}>
                            <MenuItem key={''} value={-1}>ALL</MenuItem>
                            {item.listValues.map((menuItem,idx) => <MenuItem key={idx} value={menuItem.value}>{menuItem.label}</MenuItem>)}
                      </Select>
                    </FormControl>
                  )
                }
              })
            }
    <Button variant="contained" color="primary" disabled={type === 'member'? false : true} style={type === 'member'? {}: {opacity:'0%'}} onClick={handleSearch}>Search</Button>
          </div>
        
        </React.Fragment>
    )
}

export default (SearchInput);
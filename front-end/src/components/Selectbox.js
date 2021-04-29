import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const SelectBox = (props) =>{
    const {classes, labelTitle, listItems} = props;


    return (
        <FormControl variant="filled" style={{width:"100%"}}>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          variant = "outlined"
          displayEmpty
            fullWidth
        //   value={age}
        //   onChange={handleChange}
        >
          <MenuItem  value=""></MenuItem>
          {listItems ? listItems.map((item, index)=>{
              return (<MenuItem key={index} value={item.value}>{item.title}</MenuItem>)
          }):<MenuItem value=""></MenuItem>}
        </Select>
       </FormControl>
    );
}

export default (SelectBox);
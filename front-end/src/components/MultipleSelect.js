import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



const MultipleSelect = (props) => {
  const classes = useStyles();
  const {title, listData, select, setSelect} = props;

  const handleChange = (event) => {
    setSelect(event.target.value);
  };


  return (
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="demo-mutiple-chip-label">{title}</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={select}
          onChange={handleChange}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {listData.map((value) => (
            <MenuItem key={value._id} value={value.projectrequirementname}>
              <Checkbox checked={select.indexOf(value.projectrequirementname) > -1} />
              <ListItemText primary={value.projectrequirementname} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}

export default MultipleSelect;
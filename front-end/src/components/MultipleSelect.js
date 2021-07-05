import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];


const MultipleSelect = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const {title, listData, select, setSelect} = props;

  const covertFromName2Id = (name) => {
    var result = [];
    name.forEach(element => {
      result.push(listData.filter(x => x.projectrequirementname === element)[0]._id);
    });
    return result;
  };

  const handleChange = (event) => {
    setSelect(event.target.value);
    console.log(covertFromName2Id(event.target.value));
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
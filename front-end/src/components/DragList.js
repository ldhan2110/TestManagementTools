import React, {useEffect, useState} from "react";
import { ReactSortable, Sortable, MultiDrag, Swap } from "react-sortablejs";
import {
  FormControl,
  InputLabel,
  Select,
  Menu,
  Paper,
  MenuItem,
  Grid,
  TextField,
  List,
  ListItem,
  Button,
} from '@material-ui/core';



const DragList = (props) => {

  const {data} = props;

  const [listData, setListData] = useState(data);

  var tempArr = [];

  useEffect(()=>{
    //console.log(listData);
    setListData(data);
    console.log(data);
  },[data])

  const handleAddStep = () => {
    var tempArr = listData.slice();
    tempArr.push({id: listData.length+1, name: '', expectResult: ''});
    setListData(tempArr);
  }


  return(
      <Paper style={{maxHeight: 500, overflow: 'auto'}}>
      <List style={{maxHeight: '100%', overflow: 'auto'}}>
             <ReactSortable list={listData} setList={setListData}>
                {listData.map((item) => (
                    <ListItem key={item.id}>
                      <Grid container spacing={1}>
                        <Grid item style={{margin: 'auto 0'}}><div>{item.id}</div></Grid>
                        <Grid item xs={4}><TextField id="definition" variant="outlined" label='Definition' required  fullWidth multiline  rows={3}/></Grid>
                        <Grid item xs={4}><TextField id="expectResult"  variant="outlined" label='Expected Result' required  multiline fullWidth rows={3}/></Grid>
                        <Grid item xs={2}><FormControl variant="outlined" fullWidth>
                              <InputLabel id="type">Type</InputLabel>
                                <Select
                                  labelId="type"
                                  id="type"
                                  //value={age}
                                  //onChange={handleChange}
                                  label="Type"
                                >
                               <MenuItem value=""><em>Manual</em></MenuItem>
                               <MenuItem value={10}>Auto</MenuItem>
                              </Select>
                    </FormControl></Grid>
                      </Grid>
                    </ListItem>
                ))}
              </ReactSortable>
              <ListItem>
                <Grid container>
                  <Grid item xs = {10} style={{marginLeft: '1vw'}}>
                    <Button variant="contained" fullWidth onClick={handleAddStep}>Add step</Button>
                  </Grid>
                </Grid>
              </ListItem>
       </List>
      </Paper>
  )
}

export default DragList;


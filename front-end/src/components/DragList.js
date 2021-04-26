import React, {useEffect, useState} from "react";
import { ReactSortable, Sortable, MultiDrag, Swap } from "react-sortablejs";
import { useHistory } from "react-router-dom";
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

  const {data, setData} = props;

  const [listData, setListData] = useState(data);


  useEffect(()=>{
    var tempArr = listData.slice();
    tempArr.map((item, index) =>{ item.id = index+1});
    setListData(data);
  },[data])

  const handleAddStep = () => {
    var tempArr = listData.slice();
    tempArr.push({id: listData.length+1, stepDefine: '', expectResult: '', type: 'manual'});
    setListData(tempArr);
  }

  const handleChange =   (prop) => {
    var tempArr = listData.slice();
    var name = prop.name;
    var id = prop.id;
    var data = prop.data;
    var objIndex = tempArr.findIndex((obj => obj.id === id));
    tempArr[objIndex][name] = data;
    console.log(objIndex);
    setData(tempArr);
  };


  return(
      <Paper style={{maxHeight: 500, overflow: 'auto'}}>
      <List style={{maxHeight: '100%', overflow: 'auto'}}>
             <ReactSortable list={listData} setList={setListData}>
                {listData.map((item) => (
                    <ListItem key={item.id}>
                      <Grid container spacing={1}>
                        <Grid item style={{margin: 'auto 0'}}><div>{item.id}</div></Grid>
                        <Grid item xs={4}><TextField id={"definition"+item.id} variant="outlined" label='Definition' required  fullWidth multiline  rows={3} value={item.stepDefine} onChange={(event)=>{ handleChange({id: item.id, name: "stepDefine", data: event.target.value}) }}/></Grid>
                        <Grid item xs={4}><TextField id="expectResult"  variant="outlined" label='Expected Result' required  multiline fullWidth rows={3} value={item.expectResult} onChange={(event)=>{ handleChange({id: item.id, name: "expectResult", data: event.target.value}) }}/></Grid>
                        <Grid item xs={2}><FormControl variant="outlined" fullWidth>
                              <InputLabel id="type">Type</InputLabel>
                                <Select
                                  labelId="type"
                                  id="type"
                                  value={item.type}
                                  onChange={(event)=>{ handleChange({id: item.id, name: "type", data: event.target.value}) }}
                                  label="Type"
                                >
                               <MenuItem value={"manual"}><em>Manual</em></MenuItem>
                               <MenuItem value={"auto"}>Auto</MenuItem>
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


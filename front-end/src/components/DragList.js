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
  IconButton
} from '@material-ui/core';
import { MinusCircle } from "react-feather";
import {red} from "@material-ui/core/colors";


const DragList = (props) => {

  const {data, setData, parentCallback, pressUpdateButton} = props;

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
    setListData(tempArr);
    parentCallback(tempArr);
  };

  const removeStep = (prop) => {
    var tempArr = listData.slice();
    var id = prop.id;
    var objIndex = tempArr.findIndex((obj => obj.id === id));
    tempArr.splice(objIndex,1);
    setListData(tempArr);
    parentCallback(tempArr);
  }


  return(
      <Paper style={{maxHeight: 500, overflow: 'auto'}}>
      <List style={{maxHeight: '100%', overflow: 'auto'}}>
             <ReactSortable list={listData} setList={setListData}>
                {listData.map((item) => (
                    <ListItem key={item.id}>
                      <Grid container direction="row" justify="space-between" alignItems="flex-start">
                        <Grid item style={{margin: 'auto 0'}}><div>{item.id}</div></Grid>
                        <Grid item xs={4}>
                          <TextField id={"definition"+item.id} rows={4} 
                          variant="outlined" label='Definition' required fullWidth multiline
                          error={item.stepDefine.trim().length === 0 && pressUpdateButton ? true:false}                          
                          value={item.stepDefine} 
                          onChange={(event)=>{ handleChange({id: item.id, name: "stepDefine", data: event.target.value}) }}/>
                          </Grid>
                        <Grid item xs={4}>
                          <TextField id="expectResult"  
                          variant="outlined" label='Expected Result' required  multiline fullWidth rows={4} 
                          error={item.expectResult.trim().length === 0 && pressUpdateButton ? true:false}
                          value={item.expectResult} 
                          onChange={(event)=>{ handleChange({id: item.id, name: "expectResult", data: event.target.value}) }}/>
                          </Grid>
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
                        <Grid><IconButton onClick={(event)=>{ removeStep({id: item.id}) }}><MinusCircle/></IconButton></Grid>
                      </Grid>
                    </ListItem>
                ))}
              </ReactSortable>
              <ListItem>
                <Grid container justify="flex-end">
                  <Grid item style={{marginLeft: '1vw'}}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleAddStep}>Add step</Button>
                  </Grid>
                </Grid>
              </ListItem>
       </List>
      </Paper>
  )
}

export default DragList;


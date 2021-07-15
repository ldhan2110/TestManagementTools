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
  IconButton,
  Tooltip, Typography
} from '@material-ui/core';
import { MinusCircle } from "react-feather";
import {red} from "@material-ui/core/colors";
import MarkedInput from './markdown-input/MarkedInput'
import MarkedResult from './markdown-input/MarkedResult'


const DragList = (props) => {

  const {data, setData, parentCallback, pressUpdateButton, viewMode} = props;

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
      <Paper style={{maxHeight: 700, overflow: 'auto'}}>
      <List style={{maxHeight: '100%', overflow: 'auto'}}>
             <ReactSortable disabled={viewMode === true ? true : false} list={listData} setList={setListData}>
                {listData.map((item) => (
                    <ListItem key={item.id}>
                      <Grid container direction="row" justify="space-between" alignItems="flex-start">
                        <Grid item style={{margin: 'auto 0'}}><div>{item.id}</div></Grid>
                        <Grid item xs={5}>
                         
                          {viewMode === true ? <div>
                          <Typography variant="subtitle2" gutterBottom display="inline" >
                            Definition
                          </Typography>
                          <MarkedResult markdown={item.stepDefine} height={120} /> </div>
                          : <MarkedInput idOfInput={"definition"+item.id} setTxt={item.stepDefine} title="Definition"
                          handleChange={(text) => handleChange({id: item.id, name: "stepDefine", data: text})}/>}
                          
                          
                          </Grid>
                        <Grid item xs={5}>
                          
                          {viewMode === true ? <div>
                          <Typography variant="subtitle2" gutterBottom display="inline" >
                          Expected Result
                          </Typography> 
                          <MarkedResult markdown={item.expectResult} height={120} /> </div>:
                          <MarkedInput idOfInput="expectedResult" setTxt={item.expectResult} title={"Expected Result"}
                          handleChange={(text) => handleChange({id: item.id, name: "expectResult", data: text})}/>}

                          </Grid>
                        
                        {viewMode !== true &&
                        <Grid>
                          <Tooltip title="Delete step">
                            <IconButton onClick={(event)=>{ removeStep({id: item.id}) }}><MinusCircle style={{color: red[500]}}/></IconButton>
                          </Tooltip>
                        </Grid>}
                      </Grid>
                    </ListItem>
                ))}
              </ReactSortable>
              <ListItem>
              {viewMode !== true && <Grid container justify="flex-end">
                  <Grid item style={{marginLeft: '1vw'}}>
                  
                    <Button variant="contained" color="primary" fullWidth onClick={handleAddStep}>Add step</Button>
                  </Grid>
                </Grid>}
              </ListItem>
       </List>
      </Paper>
  )
}

export default DragList;


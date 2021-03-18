import React, {useEffect, useState} from "react";
import { ReactSortable, Sortable, MultiDrag, Swap } from "react-sortablejs";
import {
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  Paper, 
  TableRow, 
  TableContainer,
  Grid,
  TextField,
  List,
  ListItem
} from '@material-ui/core';



const DragList = (props) => {

  const {data} = props;

  const [listData, setListData] = useState([
    {id: '1', name: '123', expectResult: 'Open Google'},
    {id: '2', name: '456', expectResult: 'Open Google'},
    {id: '3', name: '789', expectResult: 'Open Google'},
  ]);


  useEffect(()=> {
    console.log(listData);
  },[listData])


  return(
    <React.Fragment>
      <List >
             <ReactSortable list={listData} setList={setListData}>
                {listData.map((item) => (
                    <ListItem key={item.id}>
                      <Grid container spacing={3}>
                        <Grid item style={{margin: 'auto 0'}}><div>{item.id}</div></Grid>
                        <Grid item xs={5}><TextField id="definition" variant="outlined" label='Definition' required  fullWidth multiline  rows={3}/></Grid>
                        <Grid item xs={5}><TextField id="expectResult"  variant="outlined" label='Expected Result' required  multiline fullWidth rows={3}/></Grid>
                      </Grid>
                    </ListItem>
                ))}
              </ReactSortable>   
       </List>
      
    </React.Fragment>
  )
}

export default DragList;


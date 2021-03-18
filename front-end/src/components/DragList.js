import React, {useEffect, useState} from "react";
import { ReactSortable, Sortable, MultiDrag, Swap } from "react-sortablejs";

const DragList = (props) => {

  const {data} = props;

  const [listData, setListData] = useState([
    {id: '1', name: '123'},
    {id: '2', name: '456'},
    {id: '3', name: '789'},
  ]);


  useEffect(()=> {
    console.log(listData);
  },[listData])


  return(
    <React.Fragment>
      <ReactSortable list={listData} setList={setListData}>
      {listData.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </ReactSortable>
    </React.Fragment>
  )
}

export default DragList;


import React, {useState, useEffect} from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const nodes = [{
    value: 'mars',
    label: 'Mars',
    children: [
        { value: 'phobos', label: 'Phobos', children:[{value: 'testdata', label: 'fada'}] },
        { value: 'deimos', label: 'Deimos' },
        { value: 'deimos', label: 'Deimos' },
        { value: 'deimos', label: 'Deimos' },
        { value: 'deimos', label: 'Deimos' },
        { value: 'deimos', label: 'Deimos' },
        { value: 'deimos', label: 'Deimos' },
        { value: 'deimos', label: 'Deimos' },
        { value: 'deimos', label: 'Deimos' },
        { value: 'deimos', label: 'Deimos' },
        { value: 'deimos', label: 'Deimos' },
        { value: 'deimos', label: 'Deimos' },
        { value: 'deimos', label: 'Deimos' },
        { value: 'deimos', label: 'Deimos' },
        { value: 'deimos', label: 'Deimos' },
        { value: 'deimos', label: 'Deimos' },
        { value: 'deimos', label: 'Deimos' },
        { value: 'deimos', label: 'Deimos' },
        { value: 'deimos', label: 'Deimos' },
        
    ],
}];

const CheckboxTreeView = (props) => {

   const {data} = props;

   const [selected,setSelect] = useState([]);

   const [expanded, setExpand] = useState([]);

   useEffect(()=>{
    console.log(data);
   },[data]);

   
    return (
            <CheckboxTree
                nodes={nodes}
                checked={selected}
                expanded={expanded}
                onCheck={checked => setSelect( checked )}
                onExpand={expanded => setExpand( expanded )}
                nativeCheckboxes={true}
            />
        );
 
}

export default  CheckboxTreeView
import React, {useState, useEffect} from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const nodes = [{
    value: 'mars',
    label: 'Mars',
    children: [
        { value: 'phobos', label: 'Phobos' },
        { value: 'deimos', label: 'Deimos' },
    ],
}];

const CheckboxTreeView = (props) => {

   const {data} = props;

   const [checked,setChecked] = useState([]);

   const [expanded, setExpand] = useState([]);

   useEffect(()=>{
    console.log('data select: '+JSON.stringify(data, null, '  '));
   },[data]);

   useEffect(()=>{
    console.log('checked: '+checked);
   },[checked]);
   
    return (
            <CheckboxTree
                nodes={[data]}
                checked={checked}
                expanded={expanded}
                onCheck={checked => setChecked( checked )}
                onExpand={expanded => setExpand( expanded )}
                nativeCheckboxes={true}
            />
        );
 
}

export default  CheckboxTreeView;
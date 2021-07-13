import React, {useState, useEffect} from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const CheckboxTreeView = (props) => {

   const {data, parentCallback, selected} = props;

   const [checked,setChecked] = useState(selected ? selected : []);

   const [expanded, setExpand] = useState([]);

   useEffect(()=>{
    parentCallback(checked);
   },[checked]);
   
    return (
            <CheckboxTree
                nodes={[data]}
                checked={checked}
                expanded={expanded}
                onCheck={checked => setChecked( checked )}
                onExpand={expanded => setExpand( expanded )}
            />
        );
 
}

export default  CheckboxTreeView;
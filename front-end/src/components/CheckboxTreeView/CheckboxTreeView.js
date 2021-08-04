import React, {useState, useEffect} from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const CheckboxTreeView = (props) => {

   const {data, parentCallback, selected, text, suite} = props;

   const [checked,setChecked] = useState(selected ? selected : []);

   const [expanded, setExpand] = useState([]);

   const [ nodesFiltered, setNodesFiltered ] = React.useState([data]);

   useEffect(()=>{
    values = [];
    filterTree();
   },[text]);

   useEffect(()=>{
    values = [];
    filterTreeSuite();
   },[suite]);

   useEffect(()=>{
    parentCallback(checked);
   },[checked]);

   useEffect(()=>{
     setNodesFiltered([data]);
    if (data){
        setExpand([data.value]);
    }
   },[data]);

    const filterTree = () => {
    // Reset nodes back to unfiltered state
        if (!text || text == "" || text.length === 0) {
    // Collapse all node when TEXT BOX empty
            //setExpand([data.value]);
            setNodesFiltered([data])
            return;
        }
        const nodesFiltered = nodes => {
            return nodes.reduce(filterNodes , [])  
        };
        setNodesFiltered(nodesFiltered([data]));
        setExpand(values1);
    }
    const filterTreeSuite = () => {
    // Reset nodes back to unfiltered state
      if (!suite || suite == "" || suite.length === 0) {
    // Collapse all node when SUITE BOX empty
          setExpand([data.value]);
          setNodesFiltered([data])
          return;
      }
      const nodesFiltered = nodes => {
          return nodes.reduce(filterNodesSuite , [])  
      };
      setNodesFiltered(nodesFiltered([data]));
    // Auto expand to filtered node (may cause lag)
      setExpand(values1);
  }
    // Filter nodes on TEXT box
    const filterNodes = (filtered, node) => {
        const children = (node.children || []).reduce(filterNodes, []);
        if (
        // Node's label matches the search string
            node.labelNoStyle.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) > -1 ||
        // Or a children has a matching node
            children.length
        ) {
            filtered.push({...node, ...children.length && {children}});
            values1 = getAllValuesFromNodes(filtered, true, node.value);
        }
        return filtered;
    }

    // Filter nodes on SUITE box
    const filterNodesSuite = (filtered, node) => {
      const children = (node.children || []).reduce(filterNodesSuite, []);
      if (
      // Node's label matches the search string
          node.labelNoStyle.toLocaleLowerCase().indexOf(suite.toLocaleLowerCase()) === 0 ||
      // Or a children has a matching node
          children.length
      ) {
          filtered.push({...node, ...children.length && {children}});
          values1 = getAllValuesFromNodes(filtered, true, node.value);
      }
      return filtered;
  }
    // Temp arrays for storing expand nodes after filter
    var values = [];
    var values1 = [];
    // Get all values up till searched nodes to expand
    const getAllValuesFromNodes = (nodes, firstLevel, val) => {      
      if (firstLevel) {
        for (let n of nodes) {
          values.push(n.value);
          if(n.value === val){ return values; }          
          if (n.children) {
            values.push(getAllValuesFromNodes(n.children, false, val));
          }
        }
      } else {
        for (let n of nodes) {
          if(n.value === val){ return values }
          values.push(n.value);
          if (n.children) {
            values.push(getAllValuesFromNodes(n.children, false, val));
          }
        }
      }
    };

   
    return (
            <CheckboxTree
                nodes={text.length !== 0 ? nodesFiltered : [data]}
                checked={checked}
                expanded={expanded}
                onCheck={checked => setChecked( checked )}
                onExpand={expanded => setExpand( expanded )}
            />
        );
 
}

export default  CheckboxTreeView;
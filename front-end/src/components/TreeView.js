import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {
  Folder,
  FolderPlus,
  FolderMinus,
  FileText
} from "react-feather";

const useStyles = makeStyles({
  root: {
    height: "89vh",
    flexGrow: 1,
    maxWidth: 400,
    overflowY: "scroll",
    overflowX: "hidden"

  },

  scrollBar: {
    height: 80,
    overflow: "scroll",
    overflowX: "hidden",
  }
});

export default function ControlledTreeView(props) {
  const classes = useStyles();
  const {data, setSelectNode} = props;
  const [listData, setListData] = React.useState(data);
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  useEffect(()=>{
    setListData(data);
  },[data])

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
    setSelectNode(nodeIds);
  };


  const renderTree = (nodes) => {
    if (nodes.type === 'TS' || nodes.type === 'root')
      return (
      <TreeItem key={nodes._id} nodeId={nodes.type === 'root' ? 'root': nodes._id} label={nodes.name}>
        {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
      </TreeItem>
    )

    else return (
      <TreeItem key={nodes._id} nodeId={nodes._id} label={nodes.name} icon={<FileText/>}/>
    )
}

  return (
    
      <TreeView
      className={classes.root}
      defaultParentIcon={<Folder/>}
      defaultCollapseIcon={<FolderMinus />}
      defaultExpandIcon={<FolderPlus  />}
      defaultExpanded={['root']}
     
      selected={selected}
      defaultEndIcon={<Folder/>}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      {renderTree(listData)}
    </TreeView>

  );
}
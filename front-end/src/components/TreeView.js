import React, {useEffect} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView'
import  MuiTreeItem from '@material-ui/lab/TreeItem';
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
    //maxWidth: 400,
    overflowY: "scroll",
    overflowX: "hidden"

  },

  scrollBar: {
    height: 80,
    overflow: "scroll",
    overflowX: "hidden",
  }
});

const TreeItem = withStyles({
  root: {
    "&.Mui-selected > .MuiTreeItem-content": {
      color: "#1a73e8",
    }
  }
})(MuiTreeItem);

const StyledTreeItem = withStyles({
  root: {
    "&.Mui-selected > .MuiTreeItem-content": {
      color: "#1a73e8",
    }
  },
  label: {
    color: "red"
  },
})(MuiTreeItem);

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
    if (nodes.type === 'TS' || nodes.type === 'root'){
      if (nodes.type === 'root')
        expanded.push(nodes._id);
      var suiteNum = nodes.total_testsuite_child > -1 ? nodes.total_testsuite_child + ", " : '';
      if (nodes.is_assigned === true) {
        return (
          <StyledTreeItem key={nodes._id} nodeId={nodes._id} label={nodes.name + " ("+ suiteNum +nodes.total_testcase+", "+nodes.numberof_testcaseuntest+")"} >
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
          </StyledTreeItem>
        );
      } else
          return (
          <TreeItem key={nodes._id} nodeId={nodes._id} label={nodes.name+" ("+ suiteNum +nodes.total_testcase+", "+nodes.numberof_testcaseuntest+")"} >
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
          </TreeItem>)
    }

    else {
      if (nodes.is_assigned === true) {
        return (
          <StyledTreeItem key={nodes._id} nodeId={nodes._id} label={nodes.name} icon={<FileText/>}/>
        );
      } else
          return (<TreeItem key={nodes._id} nodeId={nodes._id} label={nodes.name} icon={<FileText/>}/>)
      
    }
}

  return (
    
      <TreeView
      className={classes.root}
      defaultParentIcon={<Folder/>}
      defaultCollapseIcon={<FolderMinus />}
      defaultExpandIcon={<FolderPlus  />}
     
      expanded={expanded}
      selected={selected}
      defaultEndIcon={<Folder/>}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      {renderTree(listData)}
    </TreeView>

  );
}
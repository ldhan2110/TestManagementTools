import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {
  Folder,
  FolderPlus,
  FolderMinus,
  FileText
} from "react-feather";

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function ControlledTreeView() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  return (
    <TreeView
      className={classes.root}
      defaultParentIcon={<Folder/>}
      defaultCollapseIcon={<FolderMinus />}
      defaultExpandIcon={<FolderPlus  />}
      expanded={expanded}
      selected={selected}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      <TreeItem nodeId="1" label="Applications">
        <TreeItem nodeId="2" label="Calendar" icon={<FileText/>}/>
        <TreeItem nodeId="3" label="Chrome" icon={<FileText/>}/>
        <TreeItem nodeId="4" label="Webstorm" icon={<FileText/>}/>
      </TreeItem>
      <TreeItem nodeId="5" label="Documents"> 
        <TreeItem nodeId="6" label="Material-UI" icon={<FileText/>}>
          <TreeItem nodeId="7" label="src" icon={<FileText/>}>
            <TreeItem nodeId="8" label="index.js" icon={<FileText/>} />
            <TreeItem nodeId="9" label="tree-view.js" icon={<FileText/>} />
          </TreeItem>
        </TreeItem>
      </TreeItem>
      <TreeItem nodeId="10" label="Documents"/> 
    </TreeView>
  );
}
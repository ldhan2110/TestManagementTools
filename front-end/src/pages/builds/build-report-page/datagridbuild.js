import React, {useEffect, useState} from 'react';
import {  
  TextField,
  Button,
  IconButton,
  Link,  
} from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
      '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus': {
          outline: 'none',
      },
  }
});


const DataGridBuildRP = (props) => {

  const classes = useStyles();

  const { listReport, columns, footerText } = props;

  const [pageSize, setPageSize] = useState(5);

  const [load, setLoad] = useState(false);
  
  return (
    <React.Fragment > 
        <div style={{ height: 370, width: '100%' }}>
            <DataGrid
              rows={listReport}
              columns={columns} 
              pageSize={pageSize}
              //onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[]}
              disableSelectionOnClick                 
              getRowId={(e => e._id)}
              disableColumnSelector
              disableColumnMenu={true}
              //loading={(load === true) ? true : false}
              className={classes.root}
            />
        <div style={{marginTop: -36, marginLeft: 10}}>{footerText}</div>
        </div>
    </React.Fragment>
  )
}

export default (DataGridBuildRP);
import React, {useEffect, useState} from 'react';
import {  
  TextField,
  Button,
  IconButton,
  Link,  
} from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid';





const DataGridBuildRP = (props) => {

  const { listReport, columns, total, extraText } = props;

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
            />
        <div style={{marginTop: -36, marginLeft: 10}}>Total: {total} {extraText}</div>
        </div>
    </React.Fragment>
  )
}

export default (DataGridBuildRP);
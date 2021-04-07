import React from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import EnhancedTable from '../../../components/Table/index';
import Helmet from 'react-helmet';
import {BUILDS_HEADERS} from '../../../components/Table/DefineHeader';
import {
  Grid,
  Typography,
  Divider,
  Button
} from '@material-ui/core';

import {
  Add as AddIcon,
} from "@material-ui/icons";


// const NavLink = React.forwardRef((props, ref) => (
//   <RouterNavLink innerRef={ref} {...props} />
// ));

function createData(id, name, description, status, open, date) {
  return { id, name, description, status, open, date };
}

const rows = [
  createData('#1001', 'Test Plan Zero', 'Adsadsadasdsa', 0,  'Open', '2020-01-02'),
  createData('#1002', 'Test Plan Zero', 'Adsadsadas', 1,  'Open', '2020-01-02'),
  createData('#1003', 'Test Plan Zero', 'Adsadas', 1,  'Open', '2020-01-02'),
  createData('#1004', 'Test Plan Zero', 'Adsdada', 0,  'Open', '2020-01-02'),
  createData('#1005', 'Test Plan Zero', 'Adsadas', 1,  'Open', '2020-01-02'),
  createData('#1006', 'Test Plan Zero', 'Adsada', 1,  'Open', '2020-01-02'),
  createData('#1007', 'Test Plan Zero', 'Adsada', 0,  'Open', '2020-01-02'),
  createData('#1008', 'Test Plan Zero', 'Adsad', 1,  'Open', '2020-01-02'),
  createData('#1009', 'Test Plan Zero', 'Adsa', 0,  'Open', '2020-01-02'),
  createData('#1010', 'Test Plan Zero', 'Adsa', 1,  'Open', '2020-01-02'),
  createData('#1011', 'Test Plan Zero', 'Adsa', 0,  'Open', '2020-01-02'),
  createData('#1012', 'Test Plan Zero', 'Adsa', 1,  'Open', '2020-01-02'),
  createData('#1013', 'Test Plan Zero', 'Adsa', 1,   'Open','2020-01-02'),

];

const headCells = [
  { id: 'id', alignment: 'left', label: 'ID' },
  { id: 'name', alignment: 'left', label: 'Name' },
  { id: 'description', alignment: 'left', label: 'Description' },
  { id: 'status', alignment: 'left', label: 'Status' },
  { id: 'date', alignment: 'left', label: 'Create Date' },
  { id: 'actions', alignment: 'left', label: 'Actions' },
];


const BuildListPage = (props) => {
  const {classes} = props;

  const history = useHistory();

  const handleClickNewBuild = () => {
    history.push(window.location.pathname+"/new-build");
  }

  const navigateToDetailPage = (params) => {
    if (params)
      history.push(window.location.pathname+"/"+params);
  }

  return(
    <div>

      <Helmet title="Build/Release Management" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Build/Release List
          </Typography>

          {/* <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} exact to="/">
              Dashboard
            </Link>
            <Link component={NavLink} exact to="/">
              Pages
            </Link>
            <Typography>Invoices</Typography>
          </Breadcrumbs> */}
        </Grid>
        <Grid item>
          <div>
            <Button variant="contained" color="primary" onClick={handleClickNewBuild}>
              <AddIcon />
              New Build
            </Button>
          </div>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable
            rows={rows}
            headerList = {BUILDS_HEADERS}
            viewAction={navigateToDetailPage}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(BuildListPage);
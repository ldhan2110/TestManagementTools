import React from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { NavLink as RouterNavLink, Link  } from "react-router-dom";
import EnhancedTable from '../../../components/Table/index';
import Helmet from 'react-helmet';
import { spacing } from "@material-ui/system";
import {TEST_PLAN_HEADERS} from '../../../components/Table/DefineHeader';
import {
  Grid,
  Typography,
  Breadcrumbs,
  Divider,
  Button
} from '@material-ui/core';

import {
  Add as AddIcon,
} from "@material-ui/icons";


// const NavLink = React.forwardRef((props, ref) => (
//   <RouterNavLink innerRef={ref} {...props} />
// ));

function createData(id, name, description, status, date) {
  return { id, name, description, status, date };
}

const rows = [
  createData('#1001', 'Test Plan Zero', 'Adsadsadasdsa', 0,   '2020-01-02'),
  createData('#1001', 'Test Plan Zero', 'Adsadsadas', 1,   '2020-01-02'),
  createData('#1001', 'Test Plan Zero', 'Adsadas', 1,   '2020-01-02'),
  createData('#1001', 'Test Plan Zero', 'Adsdada', 0,   '2020-01-02'),
  createData('#1001', 'Test Plan Zero', 'Adsadas', 1,   '2020-01-02'),
  createData('#1001', 'Test Plan Zero', 'Adsada', 1,   '2020-01-02'),
  createData('#1001', 'Test Plan Zero', 'Adsada', 0,   '2020-01-02'),
  createData('#1001', 'Test Plan Zero', 'Adsad', 1,   '2020-01-02'),
  createData('#1001', 'Test Plan Zero', 'Adsa', 0,   '2020-01-02'),
  createData('#1001', 'Test Plan Zero', 'Adsa', 1,   '2020-01-02'),
  createData('#1001', 'Test Plan Zero', 'Adsa', 0,   '2020-01-02'),
  createData('#1001', 'Test Plan Zero', 'Adsa', 1,   '2020-01-02'),
  createData('#1001', 'Test Plan Zero', 'Adsa', 1,   '2020-01-02'),

];

const headCells = [
  { id: 'id', alignment: 'left', label: 'ID' },
  { id: 'name', alignment: 'left', label: 'Name' },
  { id: 'description', alignment: 'left', label: 'Description' },
  { id: 'status', alignment: 'left', label: 'Status' },
  { id: 'date', alignment: 'left', label: 'Create Date' },
  { id: 'actions', alignment: 'left', label: 'Actions' },
];


const TestPlanListPage = (props) => {
  const {classes} = props;

  return(
    <div>

      <Helmet title="Service Management" />

      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Test Plan List
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
            <Button variant="contained" color="primary">
              <AddIcon />
              New Test Plan
            </Button>
          </div>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable
            rows={rows}
            headerList = {TEST_PLAN_HEADERS}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(TestPlanListPage);
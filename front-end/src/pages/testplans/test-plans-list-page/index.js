import React from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { NavLink as RouterNavLink, Link  } from "react-router-dom";
import EnhancedTable from '../../../components/Table/index';
import Helmet from 'react-helmet';
import { spacing } from "@material-ui/system";
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

function createData(customer, customerEmail, customerAvatar, status, amount, id, date) {
  return { customer, customerEmail, customerAvatar, status, amount, id, date };
}

const rows = [
  createData('Anna Walley', 'anna@walley.com', 'A', 0, '$530,00', "000112", '2020-01-02'),
  createData('Doris Fritz', 'doris@fritz.com', 'D', 1, '$209,00', "000114", '2020-02-13'),
  createData('Edward Adkins', 'edward@adkins.com', 'E', 2, '$535,00', "000117", '2020-03-04'),
  createData('Edwin Baker', 'edwin@baker.com', 'E', 2, '$678,00', "000115", '2020-02-17'),
  createData('Gordon Workman', 'gordan@workman.com', 'G', 0, '$314,00', "000119", '2020-03-28'),
  createData('Jo Avery', 'jo@avery.com', 'J', 0, '$864,00', "000113", '2020-01-23'),
  createData('Leigha Hyden', 'leigha@hyden.com', 'L', 2, '$341,00', "000118", '2020-03-14'),
  createData('Maureen Gagnon', 'maureen@gagnon.com', 'M', 1, '$781,00', "000116", '2020-02-22'),
  createData('Maxine Thompson', 'maxine@thompson.com', 'M', 0, '$273,00', "000121", '2020-05-31'),
  createData('Shawn Waddell', 'shawn@waddell.com', 'S', 0, '$713,00', "000120", '2020-04-25')
];

const headCells = [
  { id: 'status', alignment: 'left', label: 'Status' },
  { id: 'customer', alignment: 'left', label: 'Customer' },
  { id: 'id', alignment: 'right', label: 'ID' },
  { id: 'amount', alignment: 'right', label: 'Amount' },
  { id: 'date', alignment: 'left', label: 'Issue Date' },
  { id: 'actions', alignment: 'right', label: 'Actions' },
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
            Services
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
              New Service
            </Button>
          </div>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable
            rows={rows}
            headerList = {headCells}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(TestPlanListPage);
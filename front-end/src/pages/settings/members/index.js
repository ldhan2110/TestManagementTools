import React, {useState} from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import EnhancedTable from '../../../components/Table/index';
import Helmet from 'react-helmet';
import {MEMBERS_HEADERS} from '../../../components/Table/DefineHeader';
import NewMemberDialog from './InviteNewMember';
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

function createData(id, name, role) {
  return { id, name, role};
}

const rows = [
  createData('#1001', 'An Le', 'Admin'),
  createData('#1001', 'Zoro', 'Test Leader'),

];


const MemberListPage = (props) => {
  const {classes} = props;

  const [openDialog,setOpenDialog] = useState(false);

  const history = useHistory();

  const handleClickNewMemberDialog = () => {
    setOpenDialog(true);
  }

  const navigateToDetailPage = (params) => {
    if (params)
      history.push(window.location.pathname+"/"+params);
  }

  return(
    <div>

      <Helmet title="Service Management" />
      <NewMemberDialog isOpen={openDialog} openMethod={setOpenDialog}/>
      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Members
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
            <Button variant="contained" color="primary" onClick={handleClickNewMemberDialog}>
              <AddIcon />
              Invite collaborator
            </Button>
          </div>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable
            rows={rows}
            headerList = {MEMBERS_HEADERS}
            viewAction={navigateToDetailPage}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(MemberListPage);
import React, {useEffect, useState} from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import EnhancedTable from '../../../components/Table/index';
import Helmet from 'react-helmet';
import {BUILDS_HEADERS} from '../../../components/Table/DefineHeader';
import {GET_ALL_BUILD_REQ} from '../../../redux/build-release/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
import {
  Grid,
  Typography,
  Divider,
  Button
} from '@material-ui/core';

import {
  Add as AddIcon,
} from "@material-ui/icons";


//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { listBuild: state.build.listBuild,
            project:state.project.currentSelectedProject
  }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {    
    getAllBuildReq: (payload) => dispatch({ type: GET_ALL_BUILD_REQ, payload}),
    //displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload })
  }
}


// const NavLink = React.forwardRef((props, ref) => (
//   <RouterNavLink innerRef={ref} {...props} />
// ));

function createData(id, buildname, descriptions, isActive, isOpen, releasedate) {
  console.log({id, buildname, descriptions, isActive, isOpen, releasedate});
  return { id, buildname, descriptions, isActive, isOpen, releasedate };
}



/* const rows = [
  createData('#1001', 'build', 'Adsadsadasdsa', 0,  'Open', '2020-01-02'),
  createData('#1002', 'build', 'Adsadsadas', 1,  'Open', '2020-01-02'),
  createData('#1003', 'build', 'Adsadas', 1,  'Open', '2020-01-02'),
  createData('#1004', 'build', 'Adsdada', 0,  'Open', '2020-01-02'),
  createData('#1005', 'build', 'Adsadas', 1,  'Open', '2020-01-02'),
  createData('#1006', 'build', 'Adsada', 1,  'Open', '2020-01-02'),
  createData('#1007', 'build', 'Adsada', 0,  'Open', '2020-01-02'),
  createData('#1008', 'build', 'Adsad', 1,  'Open', '2020-01-02'),
  createData('#1009', 'build', 'Adsa', 0,  'Open', '2020-01-02'),
  createData('#1010', 'build', 'Adsa', 1,  'Open', '2020-01-02'),
  createData('#1011', 'build', 'Adsa', 0,  'Open', '2020-01-02'),
  createData('#1012', 'build', 'Adsa', 1,  'Open', '2020-01-02'),
  createData('#1013', 'build', 'Adsa', 1,   'Open','2020-01-02'),

]; */

/* const headCells = [
  { id: 'id', alignment: 'left', label: 'ID' },
  { id: 'name', alignment: 'left', label: 'Name' },
  { id: 'description', alignment: 'left', label: 'Description' },
  { id: 'status', alignment: 'left', label: 'Status' },
  { id: 'date', alignment: 'left', label: 'Release Date' },
  { id: 'actions', alignment: 'left', label: 'Actions' },
]; */


const BuildListPage = (props) => {
  const {classes} = props;

  const {listBuild, getAllBuildReq, project} = props;
  /* const [listBuilds, setListBuild] = useState([]);
  const [selectPage, setSelectPage] = useState(1); */

  const history = useHistory();

  const handleClickNewBuild = () => {
    history.push(window.location.pathname+"/new-build");
  }

  const navigateToDetailPage = (params) => {
    if (params)
      history.push(window.location.pathname+"/"+params);
  }

   useEffect(() => {
    getAllBuildReq(project);
  },[])

  useEffect(() =>{
    // setListBuild(listBuild);
    console.log(listBuild);
  },[listBuild])

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
            rows={listBuild}
            headerList = {BUILDS_HEADERS}
            viewAction={navigateToDetailPage}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(BuildListPage));
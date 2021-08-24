import React, { useEffect, useState } from 'react'
import styled, { withTheme } from 'styled-components'
import Helmet from 'react-helmet'
import {generateColor} from '../../../utils/index';
import {
  Paper,
  Chip as MuiChip,
  Link,
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography
} from '@material-ui/core'
import {PASSED, FAILED, BLOCKED, NOT_EXECUTE} from '../../../components/Charts/Constants';
import { spacing } from '@material-ui/system'
import { connect } from 'react-redux';
import Actions from './Actions'
import DoughnutChart from '../../../components/Charts/DoughnutChart'
import {GET_BUILD_REPORT_REQ} from '../../../redux/build-release/constants'
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from "@material-ui/core/styles";
// datagrid component
import DataGridBuildRP from './datagridbuild'

import { green, orange, red } from "@material-ui/core/colors";

const Chip = styled(MuiChip)`
  ${spacing};

  background: ${props => props.active && green[500]};
  background: ${props => props.pass && green[500]};
  background: ${props => props.fail && red[500]};
  background: ${props => props.block && orange[500]};
  background: ${props => props.sent && orange[700]};
  color: ${props => (props.active || props.sent) && props.theme.palette.common.white};
  color: ${props => (props.pass || props.sent) && props.theme.palette.common.white};
  color: ${props => (props.fail || props.sent) && props.theme.palette.common.white};
  color: ${props => (props.block || props.sent) && props.theme.palette.common.white};
`


//MAP STATES TO PROPS - REDUX
function mapStateToProps(state) {
  return {
    build: state.build,
    project: state.project.currentSelectedProject,
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    getBuildReportReq: (payload) => dispatch({ type:GET_BUILD_REPORT_REQ, payload}),
  }
}

const Divider = styled(MuiDivider)(spacing)

const Typography = styled(MuiTypography)(spacing)


Date.prototype.getDayOfWeek = function(){   
  return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][ this.getDay() ];
};

function getCurrentDate() {
  const d = new Date();
  const ye = d.getFullYear();
  const mo = d.toLocaleString('default', { month: 'short' })
  const da =d.getDate();
  const dy = d.getDayOfWeek();
  return (`${dy}, ${da} ${mo} ${ye}`);

}


const  BuildReportPage = (props) => {

  const { build, getBuildReportReq, project } = props;

  const [dataBuildExecOverview, setBuildExecOverview] = useState({
    labels: ["Passed", "Failed", "Blocked", "Not Executed"],
    datasets: [
      {
        data: [],
        backgroundColor: [
          PASSED,
          FAILED,
          BLOCKED,
          NOT_EXECUTE
        ],
        borderWidth: 5
      }
    ]
  })

  const [dataBuildTCaseOverview, setBuildTCaseOverview] = useState({
    labels: ["Passed", "Failed", "Blocked", "Not Executed"],
    datasets: [
      {
        data: [],
        backgroundColor: [
          PASSED,
          FAILED,
          BLOCKED,
          NOT_EXECUTE
        ],
        borderWidth: 5
      }
    ]
  })

  const [listTester, setListTester] = useState([]);
  
  const handleListTester = (list) => {
    let result = list.map((data, i) => ({...data,
        totalexec: build.buildReport.total_testexecution_tester[i],
        totalexecuted: build.buildReport.total_testexecution_execute_tester[i]
    }));
    return result;
  }

  const [listIssue, setListIssue] = useState([]);
  const [listRequirement, setListRequirement] = useState([]);

  useEffect(()=> {
    if(build.insBuildReport?.sucess)
        build.insBuildReport.sucess = null;    
    getBuildReportReq({projectid: project, buildid: props.match.params.buildName});
  },[]) 

  useEffect(()=> {
    if(build.insBuildReport.sucess === true){
        // Exec
        setBuildExecOverview({
            labels: ["Passed", "Failed", "Blocked", "Not Executed"],
            datasets: [
              {
                data: build.buildReport.data_testexecution,
                backgroundColor: [
                  PASSED,
                  FAILED,
                  BLOCKED,
                  NOT_EXECUTE
                ],
                borderWidth: 5
              }
            ]
        });
        // TCase
        setBuildTCaseOverview({
            labels: ["Passed", "Failed", "Blocked", "Not Executed"],
            datasets: [
              {
                data: build.buildReport.data_testcase,
                backgroundColor: [
                  PASSED,
                  FAILED,
                  BLOCKED,
                  NOT_EXECUTE
                ],
                borderWidth: 5
              }
            ]
        });

        setListTester(handleListTester(build.buildReport.list_Tester_Uniq));
        setListIssue(build.buildReport.list_issue);
        setListRequirement(build.buildReport.list_requirement_uniq);
    };
      
  },[build.insBuildReport])

    // Format datagrid columns
    const columnsTester = [
        { field: 'username',
          headerName: 'Tester',
          flex: 2.2,
          renderCell: (params) => {
            if(params.id === '123')
            return(
              <div>
                <em>{params.value}</em>
              </div>
            )
            else return(
              <div>
                {params.value}
              </div>
            )
          }
        },        
        {
            field: 'totalexecuted',
            headerName: 'Executed',
            //sortable: false,
            filterable: false,
            flex: 1,
            minWidth: 90,
            renderCell: (params) => {
              if(params.id === '123')
              return(
                <div>
                  <em>{params.value}</em>
                </div>
              )
              else return(
                <div>
                  {params.value}
                </div>
              )
            }
        },
        {
          field: 'totalexec',
          headerName: 'Assigned',
          //sortable: false,
          filterable: false,
          flex: 1,
          minWidth: 90,
          renderCell: (params) => {
            if(params.id === '123')
            return(
              <div>
                <em>{params.value}</em>
              </div>
            )
            else return(
              <div>
                {params.value}
              </div>
            )
          }
        }
    ];

    const columnsIssue = [
        { field: 'issue_id', headerName: 'ID', width: 75 },        
        {
            field: 'execution_name',
            headerName: 'Test Execution',
            //sortable: false,
            filterable: false,
            flex: 0.8,
            minWidth: 180
        },
        {
          field: 'testcase_name',
          headerName: 'Test Case',
          //sortable: false,
          filterable: false,
          flex: 1,
          minWidth: 180
        },
        {
          field: 'url',
          headerName: 'Mantis Link',
          minWidth: 170,
          sortable: false,
          filterable: false,
          renderCell: (params) => (
            <Link href={params.value} target="_blank" rel="noopener">
              {/* {params.value.split('.mantishub.io')[0].slice(8)} */}
              View on MantisHub.io
            </Link>
          )
        }
    ];

    const columnsRequirement = [      
      {
          field: 'projectrequirementname',
          headerName: 'Requirement',
          flex: 1,
          minWidth: 180
      },
      {
        field: 'status',
        headerName: 'Status',
        minWidth: 120,
        filterable: false,
        renderCell: (params) => {
          if (params.value === true)
          return (
          <div>
            <Chip size="small" mr={1} mb={1} label="Completed" pass={1}/>
          </div>
          )
          else if(params.value === false)
          return(
          <div>
            <Chip size="small" mr={1} mb={1} label="Incomplete"/>
          </div>
          )
        }
      }
  ];

  return (
    <React.Fragment>
      <Helmet title="Build Report" />
      <Grid container justify="space-between" spacing={6}>
        <Grid item>
          <Typography variant="h3" display="inline">
            Build's Report
          </Typography>
          <Typography variant="body2" ml={2} display="inline">
           {/* {`${getCurrentDate()}`}*/}
          </Typography>
        </Grid>

        <Grid item>
          <Actions />
        </Grid>
      </Grid>

      <Divider my={6} />      
      <Grid container spacing={6}>
        <Grid item xs={12} lg={6}>
        {build.insBuildReport?.sucess === null ? 
          <div style={{height: 0, overflow: "hidden", paddingTop: "100%", position: "relative"}}>
            <Skeleton variant="rect" style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}/>
          </div> :
          <DoughnutChart dataset={dataBuildExecOverview} type='testexecbuildrp' overviewData={build.buildReport?.overviewdata_testexecution ? build.buildReport.overviewdata_testexecution : 0}/>}
        </Grid>

        <Grid item xs={12} lg={6}>
        {build.insBuildReport?.sucess === null ? 
          <div style={{height: 0, overflow: "hidden", paddingTop: "100%", position: "relative"}}>
            <Skeleton variant="rect" style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}/>
          </div> :
          <DoughnutChart dataset={dataBuildTCaseOverview} type='testcase' overviewData={build.buildReport?.overviewdata_testcase ? build.buildReport.overviewdata_testcase : 0}/>}
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={6}>
        {build.insBuildReport?.sucess === null ? 
          <div style={{height: 0, overflow: "hidden", paddingTop: "100%", position: "relative"}}>
            <Skeleton variant="rect" style={{position: "absolute", top: 0, left: 0, width: "100%", height: "370px"}}/>
          </div> :
          <Paper>
          <div style={{padding: 10}}>
              <Typography variant='h6'>Test executions' assignment</Typography>
          </div>
          
          <DataGridBuildRP
            listReport={listTester}
            columns={columnsTester}
            footerText={`Total: ${build.buildReport.total_Tester} testers`}
          /></Paper>}
        </Grid>

        <Grid item xs={12} lg={6}>
        {build.insBuildReport?.sucess === null ? 
          <div style={{height: 0, overflow: "hidden", paddingTop: "100%", position: "relative"}}>
            <Skeleton variant="rect" style={{position: "absolute", top: 0, left: 0, width: "100%", height: "370px"}}/>
          </div> :
          <Paper>
          <div style={{padding: 10}}>
              <Typography variant='h6'>List requirements</Typography>
          </div>
          <DataGridBuildRP
            listReport={listRequirement}
            columns={columnsRequirement}
            footerText={`Total: ${build.buildReport.total_requirement} requirements (${build.buildReport.total_requirement_pass} completed)`}
          /></Paper>}
        </Grid>

        <Grid item xs={12} lg={12}>
        {build.insBuildReport?.sucess === null ? 
          <div style={{height: 0, overflow: "hidden", paddingTop: "100%", position: "relative"}}>
            <Skeleton variant="rect" style={{position: "absolute", top: 0, left: 0, width: "100%", height: "370px"}}/>
          </div> :
          <Paper>
          <div style={{padding: 10}}>
              <Typography variant='h6'>List defects</Typography>
          </div>
          <DataGridBuildRP
            listReport={listIssue}
            columns={columnsIssue}
            total={build.buildReport.total_Issue}
            footerText={`Total: ${build.buildReport.total_Issue} defects`}
          /></Paper>}
        </Grid>
        

      </Grid>
    </React.Fragment>
  )
}

export default  connect(mapStateToProps,mapDispatchToProps)(withTheme(BuildReportPage))

import React, { useEffect, useState } from 'react'
import styled, { withTheme } from 'styled-components'
import Helmet from 'react-helmet'
import {generateColor} from '../../utils/index';
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography
} from '@material-ui/core'
import {PASSED, FAILED, BLOCKED, NOT_EXECUTE} from '../../components/Charts/Constants';
import { spacing } from '@material-ui/system'
import { connect } from 'react-redux';
import Actions from './Actions'
import DoughnutChart from '../../components/Charts/DoughnutChart'
import UnpaidTable from '../../components/Charts/UnpaidTable'
import MultiChart from '../../components/Charts/MultiChart';
import HorizontalBarChart from '../../components/Charts/HorizontalChart';
import { GET_EFFORT_REQ, GET_EXEC_OVERVIEW_REQ, GET_MULTI_CHART_REQ, GET_SIX_EXECUTION_REQ } from '../../redux/dashboard/constants';
import Skeleton from '@material-ui/lab/Skeleton';

//MAP STATES TO PROPS - REDUX
function mapStateToProps(state) {
  return {
    effortsData: state.dashboard.efforts,
    execOverviewData: state.dashboard.execOverview,
    multiChart: state.dashboard.multiChart,
    sixExecution: state.dashboard.sixExecution
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    getEffortReq: () => dispatch({ type: GET_EFFORT_REQ }),
    getExecOverviewReq: ()=>dispatch({type: GET_EXEC_OVERVIEW_REQ}),
    getMultiChartReq: () => dispatch({type: GET_MULTI_CHART_REQ}),
    getSixExecutionReq: () => dispatch({type: GET_SIX_EXECUTION_REQ})
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


const  Dashboard = (props) => {

  const {getEffortReq, effortsData, execOverviewData, getExecOverviewReq, getMultiChartReq, multiChart, getSixExecutionReq, sixExecution} = props;

  const [dataEfforts,setEfforts] = useState({
    labels: [],
    datasets: [
    {
      label: 'Efforts',
      data: [],
      backgroundColor: [
      ],
    },
  ],
  })


  const [dataExecOverview, setExecOverview] = useState({
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

  const [dataMultiChart,setDataMultiChart] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
    {
      type: 'bar',
      label: 'Test Failed',
      backgroundColor: FAILED,
      data: [],
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'bar',
      label: 'Test Passed',
      backgroundColor: PASSED,
      data: [],
    },
    {
      type: 'bar',
      label: 'Test Blocked',
      backgroundColor: BLOCKED,
      data: [],
    },
  ],
  })

  const resetDashboard = () => {
    effortsData.sucess = null;
    execOverviewData.sucess = null;
    multiChart.sucess = null;
    sixExecution.sucess = null;
  }

  useEffect(()=> {
    resetDashboard();
    getEffortReq();
    getExecOverviewReq();
    getMultiChartReq();
    getSixExecutionReq();
  },[]) 

  //EFFORT
  useEffect(()=> {
  if (effortsData.data !== null){
    setEfforts({
      labels:  effortsData.data.labels,
      datasets: [
        {
          label: 'Efforts',
          data: effortsData.data.data,
          backgroundColor: effortsData.data.data.map(()=>generateColor()),
        },
  ],
    })
  }
  },[effortsData.data])

  //EXEC OVERVIEW
  useEffect(()=> {
   if (execOverviewData.data != null) {
    setExecOverview({
      labels: ["Passed", "Failed", "Blocked", "Not Executed"],
      datasets: [
        {
          data: execOverviewData.data.data,
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
   }
  },[execOverviewData.data])

  //MULTI-CHART
  useEffect(()=>{
    if (multiChart.data != null) {
      setDataMultiChart({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
    {
      type: 'bar',
      label: 'Test Failed',
      backgroundColor: FAILED,
      data: multiChart.data.fail === null ? [] : multiChart.data.fail,
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'bar',
      label: 'Test Passed',
      backgroundColor: PASSED,
      data: multiChart.data.pass === null ? [] : multiChart.data.pass,
    },
    {
      type: 'bar',
      label: 'Test Blocked',
      backgroundColor: BLOCKED,
      data: multiChart.data.block === null ? [] : multiChart.data.block,
    },
  ],
      })
    }
  },[multiChart])


  return (
    <React.Fragment>
      <Helmet title="Dashboard" />
      <Grid container justify="space-between" spacing={6}>
        <Grid item>
          <Typography variant="h3" display="inline">
            Welcome back
          </Typography>
          <Typography variant="body2" ml={2} display="inline">
            {`${getCurrentDate()}`}
          </Typography>
        </Grid>

        <Grid item>
          <Actions />
        </Grid>
      </Grid>

      <Divider my={6} />      
      <Grid container spacing={6}>
        <Grid item xs={12} lg={6}>
          {multiChart.sucess === null ? 
            <div style={{height: 0, overflow: "hidden", paddingTop: "100%", position: "relative"}}>
              <Skeleton variant="rect" style={{position: "absolute", top: 0, left: 0, width: "100%", height: "50%"}}/>
            </div> : 
           <MultiChart datasets={dataMultiChart}/>}
        </Grid>
        <Grid item xs={12} lg={6}>
        {execOverviewData.sucess === null ? 
          <div style={{height: 0, overflow: "hidden", paddingTop: "100%", position: "relative"}}>
            <Skeleton variant="rect" style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}/>
          </div> :
          <DoughnutChart dataset={dataExecOverview} type='dashboard' overviewData={execOverviewData.data ? execOverviewData.data.overviewdata : 0}/>}
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={6}>
        {sixExecution.sucess === null ? 
          <div style={{height: 0, overflow: "hidden", paddingTop: "100%", position: "relative"}}>
            <Skeleton variant="rect" style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}/>
          </div> :
          <UnpaidTable data={sixExecution.data !== null ? sixExecution.data : []}/>} 
        </Grid>
        <Grid item xs={12} lg={6}>
        {effortsData.sucess === null ?
          <div style={{height: 0, overflow: "hidden", paddingTop: "100%", position: "relative"}}>
            <Skeleton variant="rect" style={{position: "absolute", top: 0, left: 0, width: "100%", height: "50%"}}/>
          </div> :
          <HorizontalBarChart datasets={dataEfforts}/>}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default  connect(mapStateToProps,mapDispatchToProps)(withTheme(Dashboard))

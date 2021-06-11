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
//import {rand} from '../../utils/index';

import { spacing } from '@material-ui/system'
import { connect } from 'react-redux';
import Actions from './Actions'
import DoughnutChart from '../../components/Charts/DoughnutChart'
import UnpaidTable from '../../components/Charts/UnpaidTable'
import MultiChart from '../../components/Charts/MultiChart';
import HorizontalBarChart from '../../components/Charts/HorizontalChart';
import { GET_EFFORT_REQ, GET_EXEC_OVERVIEW_REQ, GET_MULTI_CHART_REQ, GET_SIX_EXECUTION_REQ } from '../../redux/dashboard/constants';

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

// const dataMultiChart =  {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
//   datasets: [
//     // {
//     //   type: 'line',
//     //   label: 'Bugs',
//     //   borderColor: BUGS,
//     //   borderWidth: 2,
//     //   fill: false,
//     //   data: [rand(), rand(), rand(), rand(), rand(), rand()],
//     // },
//     {
//       type: 'bar',
//       label: 'Test Failed',
//       backgroundColor: FAILED,
//       data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
//       borderColor: 'white',
//       borderWidth: 2,
//     },
//     {
//       type: 'bar',
//       label: 'Test Passed',
//       backgroundColor: PASSED,
//       data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
//     },
//     {
//       type: 'bar',
//       label: 'Test Blocked',
//       backgroundColor: BLOCKED,
//       data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
//     },
//   ],
// }

// const data = {
//   labels: ["Passed", "Failed", "Blocked", "Not Executed"],
//   datasets: [
//     {
//       data: [260, 125, 164,549],
//       backgroundColor: [
//         PASSED,
//         FAILED,
//         BLOCKED,
//         NOT_EXECUTE
//       ],
//       borderWidth: 5
//     }
//   ]
// };

const  Dashboard = (props) => {

  //const {theme} = props;

  const {getEffortReq,effortsData, execOverviewData, getExecOverviewReq, getMultiChartReq, multiChart, getSixExecutionReq, sixExecution} = props;

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
    // {
    //   type: 'line',
    //   label: 'Bugs',
    //   borderColor: BUGS,
    //   borderWidth: 2,
    //   fill: false,
    //   data: [rand(), rand(), rand(), rand(), rand(), rand()],
    // },
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

  /* const [dataSixExecution,setSixExecution] = useState({
    labels: ['Name', 'Tester', 'Status', 'Test Date'],
    datasets: [
    {
      data: [],
        backgroundColor: [],
    },
  ],
  })*/

  useEffect(()=> {
    getEffortReq();
    getExecOverviewReq();
    getMultiChartReq();
    getSixExecutionReq();
  },[]) 

  /*
  useEffect(()=> {
    if (sixExecution.data !== null){
      setEfforts({
        labels:  sixExecution.data.labels,
        datasets: [
          {
          
            data: sixExecution.data.data,
            backgroundColor: sixExecution.data.data.map(()=>generateColor()),
          },
    ],
      })
    }
    },[effortsData.data]) */

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
    console.log(multiChart);
  },[multiChart])

  useEffect(()=>{
    console.log(execOverviewData.data);
  },[execOverviewData.data])

  useEffect(()=> {
    console.log(JSON.stringify(sixExecution, null, ' '))
  },[sixExecution])


  return (
    <React.Fragment>
      <Helmet title="Thống kê" />
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
           <MultiChart datasets={dataMultiChart}/>
        </Grid>
        <Grid item xs={12} lg={6}>
          <DoughnutChart dataset={dataExecOverview} overviewData={execOverviewData.data ? execOverviewData.data.overviewdata : 0}/>
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={6}>
          <UnpaidTable data={sixExecution.data}/> 
         <UnpaidTable/> 
        </Grid>
        <Grid item xs={12} lg={6}>
          <HorizontalBarChart datasets={dataEfforts}/>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default  connect(mapStateToProps,mapDispatchToProps)(withTheme(Dashboard))

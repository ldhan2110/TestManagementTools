import React from 'react'
import styled, { withTheme } from 'styled-components'
import Helmet from 'react-helmet'
import {generateColor} from '../../utils/index';
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography
} from '@material-ui/core'
import {PASSED, FAILED, BLOCKED, BUGS} from '../../components/Charts/Constants';
import {rand} from '../../utils/index';

import { spacing } from '@material-ui/system'

import Actions from './Actions'
import DoughnutChart from '../../components/Charts/DoughnutChart'
import UnpaidTable from '../../components/Charts/UnpaidTable'
import MultiChart from '../../components/Charts/MultiChart';
import HorizontalBarChart from '../../components/Charts/HorizontalChart';
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

const dataHorizontalChart = {
  labels: ['An Le', 'Kha Dang', 'Doan Phan', 'Tuc Tran', 'Bach Khoa', 'Cuong Nguyen'],
  datasets: [
    {
      label: 'Efforts',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        generateColor(),
        generateColor(),
        generateColor(),
        generateColor(),
        generateColor(),
        generateColor(),
      ],
    },
  ],
}


const dataMultiChart =  {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      type: 'line',
      label: 'Bugs',
      borderColor: BUGS,
      borderWidth: 2,
      fill: false,
      data: [rand(), rand(), rand(), rand(), rand(), rand()],
    },
    {
      type: 'bar',
      label: 'Test Failed',
      backgroundColor: FAILED,
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'bar',
      label: 'Test Passed',
      backgroundColor: PASSED,
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
    },
    {
      type: 'bar',
      label: 'Test Blocked',
      backgroundColor: BLOCKED,
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
    },
  ],
}

function Dashboard({ theme }) {
  return (
    <React.Fragment>
      <Helmet title="Thống kê" />
      <Grid container justify="space-between" spacing={6}>
        <Grid item>
          <Typography variant="h3" display="inline">
            Welcome back, Lucy
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
          <DoughnutChart />
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={6}>
          <UnpaidTable />
        </Grid>
        <Grid item xs={12} lg={6}>
          <HorizontalBarChart datasets={dataHorizontalChart}/>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default withTheme(Dashboard)

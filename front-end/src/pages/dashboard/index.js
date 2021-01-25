import React from 'react'
import styled, { withTheme } from 'styled-components'

import Helmet from 'react-helmet'

import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography
} from '@material-ui/core'

import { green, red } from '@material-ui/core/colors'

import { spacing } from '@material-ui/system'

import Actions from './Actions'
import YearlyRevenue from './YearlyRevenue'
import DoughnutChart from './DoughnutChart'
import LanguagesTable from './LanguagesTable'
import Stats from './Stats'
import UnpaidTable from './UnpaidTable'
import WorldMap from './WorldMap'
import MonthlyRevenue from './MonthlyRevenue'

const Divider = styled(MuiDivider)(spacing)

const Typography = styled(MuiTypography)(spacing)

function Spacer() {
  return <div className></div>
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
            {`Monday, 29 April ${new Date().getFullYear()}`}
          </Typography>
        </Grid>

        <Grid item>
          <Actions />
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} lg={6}>
          {/* <MonthlyRevenue /> */}
          <Grid container spacing={6}>
            <Grid item xs={12} lg={6}>
              <Stats
                title="Doanh thu"
                amount="500000000"
                chip="Tháng này"
                percentageText="+14%"
                hintText={'So với tháng trước'}
                percentagecolor={green[500]}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Stats
                title="Chi phí"
                amount="150000000"
                chip="Tháng này"
                percentageText="-4%"
                hintText={'So với tháng trước'}
                percentagecolor={red[500]}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Stats
                title="Đã thu"
                amount="450000000"
                chip="Tháng này"
                percentageText="95%"
                percentagecolor={green[500]}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Stats
                title="Còn nợ"
                amount="50000000"
                chip="Tháng này"
                percentageText="5%"
                percentagecolor={red[500]}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={6}>
          <YearlyRevenue />
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          <UnpaidTable />
        </Grid>
        <Grid item xs={12} lg={4}>
          <DoughnutChart />
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          <WorldMap />
        </Grid>
        <Grid item xs={12} lg={4}>
          <DoughnutChart />
        </Grid>
        
      </Grid>
    </React.Fragment>
  )
}

export default withTheme(Dashboard)

import React from 'react'
import styled, { withTheme } from 'styled-components'

import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardHeader,
  IconButton,
  Select,
  MenuItem,
  Box,
  Menu
} from '@material-ui/core'

import { spacing } from '@material-ui/system'

import '../../vendor/roundedBarCharts'
import { Bar } from 'react-chartjs-2'

import { MoreVertical } from 'react-feather'

import Spacer from '../../components/Spacer'

const Card = styled(MuiCard)(spacing)

const CardContent = styled(MuiCardContent)`
  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)}px;
  }
`

const ChartWrapper = styled.div`
  height: 253px;
  width: 100%;
`

const OptionMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <IconButton
        aria-label="settings"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertical />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Box>
  )
}

const BarChart = ({ theme }) => {
  const data = {
    labels: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
    datasets: [
      {
        label: 'Doanh thu',
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        hoverBackgroundColor: theme.palette.primary.main,
        hoverBorderColor: theme.palette.primary.main,
        data: [62, 67, 68, 70, 65, 65, 67, 60],
        barPercentage: 0.625,
        categoryPercentage: 0.5
      },
      {
        label: 'Chi phí',
        backgroundColor: theme.palette.grey[200],
        borderColor: theme.palette.grey[200],
        hoverBackgroundColor: theme.palette.grey[200],
        hoverBorderColor: theme.palette.grey[200],
        data: [15, 20, 12, 8, 14, 8, 9, 14],
        barPercentage: 0.625,
        categoryPercentage: 0.5
      }
    ]
  }

  const options = {
    maintainAspectRatio: false,
    cornerRadius: 2,
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false
          },
          stacked: false,
          ticks: {
            stepSize: 20,
            beginAtZero: false
          }
        }
      ],
      xAxes: [
        {
          stacked: false,
          gridLines: {
            color: 'transparent'
          }
        }
      ]
    }
  }

  const [interval, setInterval] = React.useState(3)

  const handleChange = (event) => {
    setInterval(event.target.value)
  }

  return (
    <Card mb={3}>
      <CardHeader
        action={
          <Box display="flex">
            <Select
              labelId="interval-select-label"
              id="interval-select"
              value={interval}
              onChange={handleChange}
            >
              <MenuItem value={3}>3 năm</MenuItem>
              <MenuItem value={4}>4 năm</MenuItem>
              <MenuItem value={5}>5 năm</MenuItem>
            </Select>
            {/* <Spacer />
            <OptionMenu /> */}
          </Box>
        }
        title="Doanh thu / Chi phí năm"
      ></CardHeader>
      <CardContent>
        <ChartWrapper>
          <Bar data={data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  )
}

export default withTheme(BarChart)

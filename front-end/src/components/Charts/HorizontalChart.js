import React from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import styled from 'styled-components'
import {
  Card as MuiCard,
  CardHeader,
  Paper,
} from '@material-ui/core'

import { spacing } from '@material-ui/system'

const Card = styled(MuiCard)(spacing)

const options = {
  scales: {
    xAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

const HorizontalBarChart = (props) =>{ 

  const {datasets} = props;

  return (
  <Card mb={3}>
  <CardHeader
    title="Efforts Overview"
  />

  <Paper>
    <HorizontalBar data={datasets} options={options}/>
  </Paper>
</Card>)
}

export default  HorizontalBarChart
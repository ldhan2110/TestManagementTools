import React from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import {generateColor} from '../../utils/index';
import styled from 'styled-components'
import {
  Box,
  Card as MuiCard,
  CardHeader,
  Chip as MuiChip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'

import { spacing } from '@material-ui/system'

const Card = styled(MuiCard)(spacing)

const data = {
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

const HorizontalBarChart = () => (
  <Card mb={3}>
  <CardHeader
    title="Efforts Overview"
  />

  <Paper>
    <HorizontalBar data={data}/>
  </Paper>
</Card>
)

export default  HorizontalBarChart
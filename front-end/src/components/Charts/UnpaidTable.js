import React from 'react'
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

import { red, green, blue, yellow } from '@material-ui/core/colors'

import {PASSED, FAILED, BLOCKED} from './Constants';

import { spacing } from '@material-ui/system'

import { MoreVertical } from 'react-feather'

const Card = styled(MuiCard)(spacing)

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) => props.rgbcolor};
  color: ${(props) => props.theme.palette.common.white};
`

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)}px);
`

// Data
let id = 0
function createData(source, users, date, bounce, avg) {
  id += 1
  return { id, source, users, date, bounce, avg }
}

const rows = [
  createData(
    'TCR-1055',
    'Lucy',
    '2020-12-21',
    <Chip label="Pass" rgbcolor={PASSED} />,
    '00:06:25'
  ),
  createData(
    'TCR-1075',
    'Lucky',
    '2020-12-21',
    <Chip label="Fail" rgbcolor={FAILED} />,
    '00:09:18'
  ),
  createData(
    'TCR-1066',
    'Doan Phan',
    '2020-12-21',
    <Chip label="Pass" rgbcolor={PASSED} />,
    '00:05:56'
  ),
  createData(
    'TCR-10945',
    'An Le',
    '2020-12-21',
    <Chip label="Pass" rgbcolor={PASSED} />,
    '00:06:19'
  ),
  createData(
    'TCR-1045',
    'Du Kha',
    '2020-12-21',
    <Chip label="Fail" rgbcolor={FAILED} />,
    '00:09:12'
  ),
  createData(
    'TCR-1065',
    'Lee Moon Shin',
    '2020-12-21',
    <Chip label="Block" rgbcolor={BLOCKED} />,
    '00:04:42'
  )
]

const UnpaidTable = () => (
  <Card mb={3}>
    <CardHeader
      action={
        <Box>
          <Chip label="This month" rgbcolor={blue[500]} />
          {/* <IconButton aria-label="settings">
            <MoreVertical />
          </IconButton> */}
        </Box>
      }
      title="Test Execution"
    />

    <Paper>
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Test Case ID</TableCell>
              <TableCell align="left">Tester</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Test Execution Time</TableCell>
              <TableCell align="left">Test Execution Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.source}
                </TableCell>
                <TableCell align="left">{row.users}</TableCell>
                <TableCell align="left">{row.bounce}</TableCell>
                <TableCell align="left">{row.avg}</TableCell>
                <TableCell align="left">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </Paper>
  </Card>
)

export default UnpaidTable

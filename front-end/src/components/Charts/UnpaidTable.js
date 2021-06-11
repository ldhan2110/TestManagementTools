import React from 'react'
import styled from 'styled-components'

import {
  Box,
  Card as MuiCard,
  CardHeader,
  Chip as MuiChip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'

import { red, green, blue, yellow } from '@material-ui/core/colors'

import {Pass, Fail, Block, Untest} from './Constants';

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

const UnpaidTable = () => {
  const {data} = props;
  useEffect(()=> {
    console.log(JSON.stringify(data, null, ' '))
  },[data])
  /*const rows = [
    createData(
      data[0].testexecutionname,
      data[0].tester.username,
      data[0].created_date,
      <Chip label={data[0].status.toString()} rgbcolor={"Pass"} />,
      data[0].updated_date
    ),
    createData(
      data[1].testexecutionname,
      data[1].tester.username,
      data[1].created_date,
      <Chip label={data[1].status.toString()} rgbcolor={"Pass"} />,
      data[1].updated_date
    ),
    createData(
      data[2].testexecutionname,
      data[2].tester.username,
      data[2].created_date,
      <Chip label={data[2].status.toString()} rgbcolor={"Pass"} />,
      data[2].updated_date
    ),
    createData(
      data[3].testexecutionname,
      data[3].tester.username,
      data[3].created_date,
      <Chip label={data[3].status.toString()} rgbcolor={"Pass"} />,
      data[3].updated_date
    ),
    createData(
      data[4].testexecutionname,
      data[4].tester.username,
      data[4].created_date,
      <Chip label={data[4].status.toString()} rgbcolor={"Pass"} />,
      data[4].updated_date
    ),
    createData(
      data[5].testexecutionname,
      data[5].tester.username,
      data[5].created_date,
      <Chip label={data[5].status.toString()} rgbcolor={"Pass"} />,
      data[5].updated_date
    )
  ] */
  return(
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
  </Card>)
}

export default UnpaidTable

import React, {useEffect, useState} from 'react'
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

import {  blue } from '@material-ui/core/colors'

import {PASSED, FAILED, BLOCKED, Untest} from './Constants';

import { spacing } from '@material-ui/system'


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

const UnpaidTable = (props) => {
  const {data} = props;
  const [listdata,setListData] = useState([
    {
      id: "s",
      testexecutionname: "s",
      created_date: "s",
      updated_date: "s",
      status: "s",
      tester: {
        _id: "s",
        username: "s"
      }
    }
  ]);

  useEffect(()=> {
    setListData(data);
  },[data])
  
  return(
  <Card mb={3}>
    <CardHeader
      action={
        <Box>
          {/* <Chip label="This month" rgbcolor={blue[500]} /> */}
        </Box>
      }
      title="Latest Test Execution"
    />

    <Paper>
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Test Execution Name</TableCell>
              <TableCell align="left">Tester</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Created Date</TableCell>
              <TableCell align="left">Updated Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listdata.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.testexecutionname}
                </TableCell>
                <TableCell align="left">{row.tester.username}</TableCell>
                <TableCell align="left"><Chip label={row.status} rgbcolor={
                  row.status === 'Pass' ? PASSED:'' ||
                  row.status === 'Fail' ? FAILED:'' ||
                  row.status === 'Block' ? BLOCKED:'' ||
                  row.status === 'Untest' ? Untest:''
                } /></TableCell>
                <TableCell align="left">{row.created_date}</TableCell>
                <TableCell align="left">{row.updated_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </Paper>
  </Card>)
}

export default UnpaidTable

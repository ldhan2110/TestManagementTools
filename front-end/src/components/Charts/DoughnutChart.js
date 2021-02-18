import React from "react";
import styled, { withTheme } from "styled-components";

import {green, red, yellow } from "@material-ui/core/colors";

import {PASSED, BLOCKED, FAILED, NOT_EXECUTE} from './Constants';

import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardHeader,
  IconButton,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableHead,
  TableRow as MuiTableRow,
  Typography
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import { Doughnut } from "react-chartjs-2";

import { MoreVertical } from "react-feather";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)`
  &:last-child {
    padding-bottom: ${props => props.theme.spacing(2)}px;
  }
`;

const ChartWrapper = styled.div`
  height: 168px;
  position: relative;
`;

const DoughnutInner = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -22px;
  text-align: center;
  z-index: 0;
`;

const TableRow = styled(MuiTableRow)`
  height: 42px;

  &:last-child th,
  &:last-child td {
    border-bottom: 0;
  }
`;

const TableCell = styled(MuiTableCell)`
  padding-top: 0;
  padding-bottom: 0;
`;

const GreenText = styled.span`
  color: ${() => green[400]};
  font-weight: ${props => props.theme.typography.fontWeightMedium};
`;

const RedText = styled.span`
  color: ${() => red[400]};
  font-weight: ${props => props.theme.typography.fontWeightMedium};
`;

const YellowText =  styled.span`
  color: ${() => yellow[800]};
  font-weight: ${props => props.theme.typography.fontWeightMedium};
`;

const PieChart = ({ theme }) => {
  const data = {
    labels: ["Passed", "Failed", "Blocked", "Not Executed"],
    datasets: [
      {
        data: [260, 125, 164,549],
        backgroundColor: [
          PASSED,
          FAILED,
          BLOCKED,
          NOT_EXECUTE
        ],
        borderWidth: 5
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    cutoutPercentage: 80
  };

  return (
    <Card mb={3}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertical />
          </IconButton>
        }
        title="Test Execution Overview"
      />

      <CardContent>
        <ChartWrapper>
          <DoughnutInner variant="h4">
            <Typography variant="h4">+23%</Typography>
            <Typography variant="caption">new test executed</Typography>
          </DoughnutInner>
          <Doughnut data={data} options={options} />
        </ChartWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell align="right">Number</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Pass
              </TableCell>
              <TableCell align="right">260</TableCell>
              <TableCell align="right">
                <GreenText>+35%</GreenText>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Fail
              </TableCell>
              <TableCell align="right">125</TableCell>
              <TableCell align="right">
                <RedText>+12%</RedText>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Blocked
              </TableCell>
              <TableCell align="right">164</TableCell>
              <TableCell align="right">
                <YellowText>+46%</YellowText>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default withTheme(PieChart);

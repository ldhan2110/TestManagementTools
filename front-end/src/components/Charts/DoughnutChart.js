import React from "react"; //,useEffect
import styled, { withTheme } from "styled-components";

import {
  Card as MuiCard, Box,
  Chip as MuiChip,
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

import { blue } from '@material-ui/core/colors'

import { spacing } from "@material-ui/system";

import { Doughnut } from "react-chartjs-2";

import { MoreVertical } from "react-feather";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)`
  &:last-child {
    padding-bottom: ${props => props.theme.spacing(2)}px;
  }
`;

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) => props.rgbcolor};
  color: ${(props) => props.theme.palette.common.white};
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


const PieChart = (props) => {

  const {dataset, overviewData, type} = props;

 
  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    cutoutPercentage: 80
  };

  var d = new Date();

  const tableTitle = () => {
    switch(type) {
      case 'dashboard':
        return "Test Execution Overview";

      case 'testexec':
        return "Test Execution Overview";

      case 'testexecbuildrp':
        return "Test Execution Overview";

      case 'testcase':
        return "Test Case Overview";
        
      default:
        return "Test Execution Overview";
    }
  };

  const textLabel = () => {
    switch(type) {
      case 'dashboard':
        return (
          <Typography variant="caption">new test executions</Typography>
        );
      case 'testexec':
        return (
          <Typography variant="caption">test cases</Typography>
        );
      case 'testexecbuildrp':
        return (
          <Typography variant="caption">test executions</Typography>
        );
      case 'testcase':
        return (
          <Typography variant="caption">test cases</Typography>
        );
      default:
        return (
          <Typography variant="caption">new test executions</Typography>
        );
    }
  };

  return (
    <Card mb={3}>
      <CardHeader
        action={
          <Box>
            {type === 'dashboard' && 
            <Chip label={d.toLocaleDateString('en-US', { month: 'long'})} rgbcolor={blue[500]} />}
          </Box>
          /* <IconButton aria-label="settings">
            <MoreVertical />
          </IconButton>*/
        }
        title={tableTitle()}
      />

      <CardContent>
        <ChartWrapper>
          <DoughnutInner variant="h4">
            <Typography variant="h4">{overviewData}</Typography>
            {textLabel()}
          </DoughnutInner>
          <Doughnut data={dataset} options={options} />
        </ChartWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell align="right">Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Pass
              </TableCell>
              <TableCell align="right">{dataset ? dataset.datasets[0].data[0] : 0}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Fail
              </TableCell>
              <TableCell align="right">{dataset ? dataset.datasets[0].data[1] : 0}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Blocked
              </TableCell>
              <TableCell align="right">{dataset ? dataset.datasets[0].data[2] : 0}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Not Executed
              </TableCell>
              <TableCell align="right">{dataset ? dataset.datasets[0].data[3] : 0}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default withTheme(PieChart);

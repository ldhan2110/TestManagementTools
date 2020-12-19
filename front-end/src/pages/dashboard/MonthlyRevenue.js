import React from "react";
import styled, { withTheme } from "styled-components";

import {
  Box,
  Card,
  Grid,
  CardContent as MuiCardContent,
  Chip as MuiChip,
  Typography as MuiTypography
} from "@material-ui/core";

import { green, red } from "@material-ui/core/colors";
import { spacing } from "@material-ui/system";
import { Line } from "react-chartjs-2";

const Typography = styled(MuiTypography)(spacing);

const CardContent = styled(MuiCardContent)`
  position: relative;

  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)}px;
  }
`;

const Chip = styled(MuiChip)`
  position: absolute;
  top: 16px;
  right: 16px;
  height: 20px;
  padding: 4px 0;
  font-size: 85%;
  background-color: ${(props) => props.theme.palette.secondary.main};
  color: ${(props) => props.theme.palette.common.white};
  margin-bottom: ${(props) => props.theme.spacing(4)}px;

  span {
    padding-left: ${(props) => props.theme.spacing(2)}px;
    padding-right: ${(props) => props.theme.spacing(2)}px;
  }
`;

const Percentage = styled(MuiTypography)`
  color: ${(props) => props.theme.palette.grey[600]};

  span {
    color: ${(props) => props.percentagecolor};
    padding-right: 10px;
    font-weight: ${(props) => props.theme.typography.fontWeightBold};
  }
`;

function MonthRevenue({ theme }) {
  const data = {
    labels: [
      "Th1",
      "Th2",
      "Th3",
      "Th4",
      "Th5",
      "Th6",
      "Th7",
      "Th8",
      "Th9",
      "Th10",
      "Th11",
      "Th12"
    ],
    datasets: [
      {
        label: "Doanh thu",
        backgroundColor: "transparent",
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
        hoverBackgroundColor: theme.palette.primary.main,
        hoverBorderColor: theme.palette.primary.main,
        data: [47, 67, 51, 55, 62, 65, 75, 73, 60, 76, 68, 79],
        barPercentage: 0.625,
        categoryPercentage: 0.5,
        pointRadius: 0
      },
      {
        label: "Chi phí",
        backgroundColor: "transparent",
        borderColor: theme.palette.grey[200],
        borderWidth: 2,
        hoverBackgroundColor: theme.palette.grey[200],
        hoverBorderColor: theme.palette.grey[200],
        data: [12, 8, 11, 14, 5, 7, 11, 14, 9, 7, 8, 12],
        barPercentage: 0.625,
        categoryPercentage: 0.5,
        pointRadius: 0
      }
    ]
  };

  const options = {
    maintainAspectRatio: true,
    cornerRadius: 2,
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        {
          display: true,
          gridLines: {
            display: false
          },
          ticks: {
            stepSize: 20,
            beginAtZero: false
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            color: "transparent"
            // zeroLineColor: "transparent"
          }
        }
      ]
    },
    tooltips: {
      intersect: false
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" mb={6}>
          Doanh thu / Chí phí tháng
        </Typography>
        <Typography variant="h3" mb={6}>
          <Box fontWeight="fontWeightRegular">350.000.000đ</Box>
        </Typography>
        <Typography variant="h5" mb={6}>
          <Box fontWeight="fontWeightRegular">Dự kiến: 550.000.000đ</Box>
          <Box fontWeight="fontWeightRegular">Còn nợ: 200.000.000đ</Box>
        </Typography>
        <Grid container justify="flex-end">
          <Percentage variant="subtitle1" mb={6} percentagecolor={green[500]}>
            <span>+14%</span> Since last week
          </Percentage>
        </Grid>
        <Chip label="This month" />
        <Line data={data} options={options} height={60}></Line>
      </CardContent>
    </Card>
  );
}

export default withTheme(MonthRevenue);

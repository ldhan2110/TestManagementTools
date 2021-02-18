import React, {useState,useEffect} from 'react'
import { Bar } from 'react-chartjs-2';
import {PASSED, FAILED, BLOCKED, BUGS} from './Constants';
import {rand} from '../../utils/index';


const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      type: 'line',
      label: 'Bugs',
      borderColor: BUGS,
      borderWidth: 2,
      fill: false,
      data: [rand(), rand(), rand(), rand(), rand(), rand()],
    },
    {
      type: 'bar',
      label: 'Test Failed',
      backgroundColor: FAILED,
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'bar',
      label: 'Test Passed',
      backgroundColor: PASSED,
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
    },
    {
      type: 'bar',
      label: 'Test Blocked',
      backgroundColor: BLOCKED,
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
    },
  ],
}

const MultiChart = (props) => {

  const {labelsList, dataset} = props;

  const [dataCharts,setDataCharts] = useState({
    labels: [],
    datasets: []
  });

  useEffect(()=>{
    if (labelsList && dataset){
      setDataCharts({
          labels: labelsList,
          datasets: dataset
      })
    }
  },[dataset, labelsList]);

  return (
  <React.Fragment>
    <Bar data={data} />
  </React.Fragment>)
}
  

export default MultiChart
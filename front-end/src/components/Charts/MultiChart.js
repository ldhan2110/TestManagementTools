import React from 'react'
import { Bar } from 'react-chartjs-2';



const MultiChart = (props) => {

  const {datasets} = props;


  return (
  <React.Fragment>
    <Bar data={datasets} />
  </React.Fragment>)
}
  

export default MultiChart
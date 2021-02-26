import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import Milestone from './MilestoneItem';



const MilestoneLine = (props) => {



  const { listData } = props;

  return (
    <Timeline align="alternate">
    {listData ? listData.listMilestone.map((item,index) => {
        console.log(listData.listMilestone.length-1);
        if (index !== listData.listMilestone.length-1){
          return(
            <Milestone key={index}
            status = {item.status}
            title = {item.title}
            descriptions = {item.descriptions}
            isFinal={false} />
          );
        } else return(
          <Milestone   key={index}
          status = {item.status}
          title = {item.title}
          descriptions = {item.descriptions}
          isFinal={true} />
        );
      } 
      )
      :
      <div></div>
    }
  </Timeline>

  )



}

export default MilestoneLine;
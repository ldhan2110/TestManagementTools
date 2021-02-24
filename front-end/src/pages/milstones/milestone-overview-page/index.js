import React from 'react';
import { ProgressBar } from "react-milestone";

type Milestone = {
  index: number,
  size: number,
  position: number,
  current: boolean,
  completed: boolean
};

const MileStonePage = (props) => {

   

  return (
    <ProgressBar 
      percentage={30} 
      milestoneCount={3}
      Milestone={(milestone: Milestone) => <div>I am a milestone</div>}
      CurrentMilestone={(milestone: Milestone) => <div>I am the current milestone</div>}
      CompletedMilestone={(milestone: Milestone) => <div>I am a completed milestone</div>}
      onMilestoneClick={milestoneIndex => {}} />

  );
}

export default (MileStonePage)
import React from 'react';
import Slide from '@material-ui/core/Slide';

export const TransitionEffect = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

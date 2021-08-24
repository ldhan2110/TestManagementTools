import { blue } from '@material-ui/core/colors';
const styles = {
    
    buttonProgress: {
      color: blue[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },

    content:{
        height: "100%",
        "& > *":{
          marginTop: 15
        }
    },
  };
  
  export default styles;
import { blue } from '@material-ui/core/colors';
const styles = {
    appBar: {
      position: 'relative',
    },
  
    title: {
      marginLeft: 10,
      flex: 1,
    },
  
    content:{
        height: "100%",
        "& > *":{
          marginTop: 10
        }
    },
  
    titleContent:{
      fontSize: "15px"
    },
  
    btnGroup: {
      display: 'flex',
      flexDirection: 'row',
      "& > *": {
        marginRight: 5,
        marginTop: 15,
      }
    },

    selectBox: {
      width: "100%",
      display: "flex",
      flexFlow: "column wrap",
      //justifyContent: "flex-start"
    },

    buttonProgress: {
      color: blue[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  };
  
  export default styles;
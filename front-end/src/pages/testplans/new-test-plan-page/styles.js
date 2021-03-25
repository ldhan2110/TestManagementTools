
const styles = {
    appBar: {
      position: 'relative',
    },
  
    title: {
      marginLeft: 10,
      marginRight: "20vh",
      flex: 1
    },
  
    content:{
        height: "100%",
        "& > *":{
          marginTop: 15
        }
    },
  
    titleContent:{
      fontSize: "15px"
    },
  
    btnGroup: {
      display: 'flex',
      flexDirection: 'row',
      "& > *": {
        marginRight: 5
      }
    },

    Autocomplete: {
      width: "100%",
      display: "flex",
      flexFlow: "column wrap",
      marginRight: "15vh"
      //justifyContent: "flex-start"
    },
  };
  
export default styles;
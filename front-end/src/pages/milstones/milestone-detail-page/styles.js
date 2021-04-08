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
    }
  };
  
  export default styles;
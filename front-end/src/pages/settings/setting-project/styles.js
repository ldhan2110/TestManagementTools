const styles = {
  appBar: {
    position: 'relative',
  },

  title: {
    marginLeft: 10,
    flex: 1,
  },

  content:{
      margin: "2vh auto",
      // marginLeft: "3vw",
      marginRight: "8vw",
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
};

export default styles;
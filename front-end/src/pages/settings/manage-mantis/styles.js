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
      margin: "2vh auto",
      // marginLeft: "3vw",
      marginRight: "8vw",
      height: "100%",
      "& > *":{
        marginTop: 0
      }
  },

  other:{
    // marginLeft: "3vw",
    "& > *":{
      marginTop: 0
    }
},

    onlyurl:{
    // marginLeft: "3vw",
    "& > *":{
      marginTop: 10
    }
},

btnBack:{
    display: 'flex',
    flexDirection: 'row',
     "& > *": {
        marginRight: 5,
        marginTop: 30
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
      marginTop: 0
    }
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
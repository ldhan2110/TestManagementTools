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

  buttonProgress: {
    color: blue[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  
  formControl: {
    width: '60%',
    marginTop: '15px',
    marginBottom: '15px'
  }
};

export default styles;
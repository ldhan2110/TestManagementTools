import { blue } from '@material-ui/core/colors';
const styles = {
  title: {
    opacity: '0.65'
  },

  titleImg: {
    marginTop: '-15px',
    opacity: '0.8',
    marginBottom: '0px',
  },

  root:{
    height: "100%",
    paddingTop: 7,
    padding: "0 9vw"
  },

  avatarContainer:{
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap:"10px",
  },

  form:{
    marginTop: '5px',
    width: "100%"
},

btnGroup:{
  marginTop: '-5px',
},

  avatar:{
    width: "15vw",
    margin: "15px",
    height: "auto"
  },

  content:{
    marginTop: "1.2vh"
  },

  formContent:{
    display: "flex",
    flexDirection:"column",
    gap: "10px"
  },

  nameContainer:{
    display: "flex",
    justifyItems: "space-between",
    gap:"10px"
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
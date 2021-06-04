import { blue } from '@material-ui/core/colors';
const styles = {
  title: {
    opacity: '0.65'
  },

  root:{
    height: "100%",
    padding: "0 9vw"
  },

  avatarContainer:{
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap:"10px"
  },

  avatar:{
    width: "15vw",
    margin: "15px",
    height: "auto"
  },

  content:{
    marginTop: "5vh"
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
import { makeStyles } from '@material-ui/core/styles';

export default  makeStyles ((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: 'white'
    },
    banner: {
      height: "100vh",
      maxWidth: "100%"
    },
    formLogin:{
      padding: theme.spacing(10),
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      "& > *":{
        marginTop: theme.spacing(2)
      }
    },
    btnGroup: {
      display: 'flex',
      flexDirection: 'row',
      "& > *": {
        marginRight: theme.spacing(2)
      }
    },
    logo: {
      height: "100%",
      maxWidth: "100%",
      marginLeft: "180px"
    }
  }));
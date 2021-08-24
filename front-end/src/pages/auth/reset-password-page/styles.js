import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
export default makeStyles((theme) => ({
    title: {
        opacity: '0.65'
    },

    formContainer:{
        paddingTop: theme.spacing(5),
        marginLeft: theme.spacing(45),
        marginRight: theme.spacing(100),       
    },

    form:{
        margin: theme.spacing(1),
        width: "70%"
    },

    btnGroup: {
        display: 'flex',
        flexDirection: 'row',
        "& > *": {
          marginRight: theme.spacing(2),
          marginTop: theme.spacing(2),
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
}));
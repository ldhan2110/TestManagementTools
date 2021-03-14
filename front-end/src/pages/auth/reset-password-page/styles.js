import { makeStyles } from '@material-ui/core/styles';

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
}));
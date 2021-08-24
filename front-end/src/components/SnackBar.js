import React,{useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {RESET_MESSAGE} from '../redux/message/constants';
import {connect} from 'react-redux';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { message: state.message }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    closeMessage: () => dispatch({ type: RESET_MESSAGE }),
  }
}
  
const CustomizedSnackbars =  (props) => {
    const classes = useStyles();
    const {message,closeMessage} = props;

    const [open, setOpen] = React.useState(message.isOpen);

    useEffect(()=>{
        setOpen(message.isOpen);
    },[message])
    

  
    const handleClose = (event, reason) => {
      // if (reason === 'clickaway' || reason === 'timeout') {
      //   return;
      // }
      closeMessage();
    };
  
    return (
      <div className={classes.root}>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={message.type}>
            {message.content}
          </Alert>
        </Snackbar>
      </div>
    );
  };

  export default connect(mapStateToProps,mapDispatchToProps)(CustomizedSnackbars);
  
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
footer:{
    backgroundColor: "blue",
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    width: "100vw",
    "& > *":{
        color: "white"
    }
}
}));
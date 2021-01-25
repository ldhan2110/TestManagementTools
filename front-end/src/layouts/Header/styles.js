import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((themes)=>({
    header: {
        backgroundColor: 'white',
        "& > *": {
            marginRight: '1%'
        }
    },

    loginHeader:{
        backgroundColor: 'white',
    }


}));
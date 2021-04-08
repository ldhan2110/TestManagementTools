import React, {useState, useEffect} from "react";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import { useHistory } from "react-router-dom";
import {
    FormControl,
    InputLabel,
    Typography
  } from "@material-ui/core";


const ForgotPassword = () => {
    const classes = useStyles();
    const [values, setValues] = useState({
        email: "",
        error: "",
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

    const handleClickConfirm = (event) => {      
        console.log(values); 
        if(values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            //console.log('error no'); 
            setValues({email: values.email, error: null});
            //console.log(values);
        }
        else{
            //console.log('error yes'); 
            setValues({email: values.email, error: "Invalid email!"});
            //console.log(values); 
        }
    };
    const history = useHistory();
    const handleClose = () =>{
        history.goBack();
    };
    return(
    <React.Fragment>
        <div className = {classes.formContainer}>
            <Typography component="h1" variant="h1" gutterBottom className = {classes.title}>
                Forgot Password
            </Typography>

            <FormControl  className = {classes.form} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-email"
                    error={values.error? true : false}
                    value={values.email}
                    onChange={handleChange('email')}
                    labelWidth={40}
                    fullWidth
                    required={true}
                    type="email"
                />
                {values.error && <FormHelperText id="component-error-text" error={true}>{values.error}</FormHelperText>}
            </FormControl>
            <div className = {classes.btnGroup}>
                <Button variant="contained" color="primary" onClick={handleClickConfirm}>
                    Confirm
                </Button>
                <Button variant="contained" onClick={handleClose}>
                    Cancel
                </Button>
            </div>
        </div>
    </React.Fragment>
        
    );
};

export default (ForgotPassword);
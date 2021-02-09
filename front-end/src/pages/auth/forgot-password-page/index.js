import React from "react";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import {
    FormControl,
    InputLabel,
    Typography
  } from "@material-ui/core";


const ForgotPassword = () => {
    const classes = useStyles();

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
                    error
                //    value={values.amount}
                //    onChange={handleChange('username')}
                    labelWidth={40}
                    fullWidth
                    required={true}
                    type="email"
                />
                <FormHelperText></FormHelperText>
            </FormControl>
            <div className = {classes.btnGroup}>
                <Button variant="contained" color="primary">
                    Confirm
                </Button>
                <Button variant="contained">
                    Cancel
                </Button>
            </div>
        </div>
    </React.Fragment>
        
    );
};

export default (ForgotPassword);
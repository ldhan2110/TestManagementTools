import React, {useState} from "react";
import useStyles from './styles';


const Footer = (props) => {
    const classes = useStyles();

    return(
        <div className={classes.footer}>
                <p>2020 KHTN</p>
        </div>
    );
}

export default (Footer);
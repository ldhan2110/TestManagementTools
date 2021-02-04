import React from "react";
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import { Hidden } from "@material-ui/core";

const Footer = (props) => {
    const {classes} = props;

    return(
        <React.Fragment>
        <Hidden lgDown>
            <div className={classes.footer}>
                <p>2020 KHTN</p>
            </div>
        </Hidden>
        <Hidden only={['lg','xl']}>
            <div className={classes.smallFooter}>
                <p>2020 KHTN</p>
            </div>
        </Hidden>
        </React.Fragment>
        
    );
}

export default withStyles(styles)(Footer);
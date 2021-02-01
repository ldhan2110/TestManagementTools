import React from 'react';
import styles from './styles';
import Divider from '@material-ui/core/Divider';

import { withStyles } from '@material-ui/core/styles';
import LoginHeader from './LoginHeader';

const Header = (props) => {
    const {isLogin, classes} = props;
    
    return (
        <React.Fragment>
            {isLogin ? 
                <div className={classes.header}>
                    <img src ="/img/logo.jpg" alt= 'logo'/>
                </div>
                :
                <LoginHeader/>
            }
            <Divider/>
        </React.Fragment>
       
    );
}

export default withStyles(styles)(Header);
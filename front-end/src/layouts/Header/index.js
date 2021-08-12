import React from 'react';
import styles from './styles';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import {compose} from 'redux';
import { withStyles } from '@material-ui/core/styles';
import LoginHeader from './LoginHeader';

const  mapStateToProps = (state) => {
    return { accountInfo: state.account.accountInfo }
};

const Header = (props) => {

    const {onDrawerToggle, accountInfo, classes} = props;

    const {isLogin} = accountInfo;


    return (
        <React.Fragment>
            {!isLogin ? 
                <div className={classes.header}>
                    <img src ="/img/Logo1zz.png" alt= 'logo'/>
                </div>
                :
                <LoginHeader onDrawerToggle={onDrawerToggle}/>
            }
            <Divider/>
        </React.Fragment>
       
    );
}

export default compose(connect(mapStateToProps),withStyles(styles))(Header);
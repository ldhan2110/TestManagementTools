import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { primaryLayoutRoutes, freeLayoutRoutes, emptyRoutes } from "./index";
import { connect } from 'react-redux';
import PrimaryLayout from "../layouts/Primary";
import FreeLayout from "../layouts/Free";
import Page404 from "../pages/error/Page404";
import EmptyLayout from "../layouts/Empty";

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { accountInfo: state.account.accountInfo }
}

const childRoutes = (Layout, routes, isLogin) =>
  routes.map(({ children, path, restrict, component: Component, exact }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, index) => (
        <Route
          key={index}
          path={path}
          
          render={props => (
            <Layout>
              <Component {...props} />
            </Layout>
          )}
        />
      ))
    ) : (
        // Route item without children
        <Route
          key={index}
          path={path}
          exact={exact}
          render={props => (
            localStorage.getItem('token') === null ? 
            (<Layout>
              <Component {...props} />
            </Layout>
            )
            : 
            (
              localStorage.getItem('token') ?
              <Layout>
                <Component {...props} />
              </Layout>
              :
              <Redirect to={{pathname: "/login"}}/>
            )
          )}
        />
      )
  );

const Routes = (props) => {

  const {isLogin} = props.accountInfo;


  const [currentLogin,setLogin] = useState(false);

  useEffect(()=>{
    setLogin(isLogin);
  },[isLogin]);

  return(
  <Router>
    <Switch>
      {childRoutes(PrimaryLayout, primaryLayoutRoutes,currentLogin)}
      {childRoutes(FreeLayout, freeLayoutRoutes,currentLogin)}
      {childRoutes(EmptyLayout,emptyRoutes,currentLogin)}
      <Route path="/" exact>
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      </Route>
      <Route
        render={() => (
          <FreeLayout>
            <Page404 />
          </FreeLayout>
        )}
      />
    </Switch>
  </Router>
);
        }

export default connect(mapStateToProps)(Routes);
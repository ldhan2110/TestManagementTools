import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { primaryLayoutRoutes, freeLayoutRoutes, emptyRoutes } from "./index";

import PrimaryLayout from "../layouts/Primary";
import FreeLayout from "../layouts/Free";
import Page404 from "../pages/error/Page404";
import EmptyLayout from "../layouts/Empty";

const childRoutes = (Layout, routes) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, index) => (
        <Route
          key={index}
          path={path}
          exact
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
          exact
          render={props => (
            <Layout>
              <Component {...props} />
            </Layout>
          )}
        />
      )
  );

const Routes = () => (
  <Router>
    <Switch>
      {childRoutes(PrimaryLayout, primaryLayoutRoutes)}
      {childRoutes(FreeLayout, freeLayoutRoutes)}
      {childRoutes(EmptyLayout,emptyRoutes)}
      <Route path="/" exact>
        <Redirect
          to={{
            pathname: "/dashboard"
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

export default Routes;
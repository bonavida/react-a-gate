import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
/** Components */
import Layout from 'components/Layout';
/** Config */
import routes from './config';

export const Routes = () => (
  <Switch>
    <Layout>
      {/* Routes */}
      {Array.isArray(routes) &&
        routes.map(({ id, path, exact, RouteComponent }) => {
          return (
            <Route
              key={id}
              path={path}
              exact={exact}
              component={RouteComponent}
            />
          );
        })}
      <Redirect to="/" />
    </Layout>
  </Switch>
);

import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignIn as SignInView,
  NotFound as NotFoundView,
} from './views';

import Charte from './views/Charte/Charte';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/sign-in"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <PrivateRoute path='/dashboard'>
          <RouteWithLayout
            component={DashboardView}
            exact
            layout={MainLayout}
            path="/dashboard"
          />
      </PrivateRoute>
      <PrivateRoute path='/charte'>
        <RouteWithLayout
          component={Charte}
          exact
          layout={MainLayout}
          path="/charte"
        />
      </PrivateRoute>


    /*<RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />*/
      <Redirect to="/not-found" />
    </Switch>
  );
};

// ... rest is the props of of the private route
const PrivateRoute = ({ children, ...rest }) => {
  console.log("here");
  let access = localStorage.getItem('token') !== null;
  console.log(access);
  return (
    <Route {...rest} render={(props) =>
        access ?
        children
        : <Redirect to='/'/>
      }
    />
  )
}

export default Routes;

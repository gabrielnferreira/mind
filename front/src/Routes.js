import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import Login from './components/Login/Login'
import Register from './components/Login/Register';
import Profile from './components/Dashboard/Profile';
import Users from './components/Dashboard/Users';
import NotFound from './components/NotFound'
import { isAuthenticated } from './auth/auth';
import { history } from './history';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
                )
        }
    />
)


function Routes() {
    return (
        <Router history={history}>
            <Switch>
                <Route component={Login} exact path="/login" />
                <Route component={Register} exact path="/register" />
                <PrivateRoute component={Profile} exact path="/" />
                <PrivateRoute component={Users} exact path="/users" />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}

export default Routes;

import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import NaverForm from './Pages/NaverForm';
import { isAuthenticated } from './Services/Auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);

export default function Routes() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/add-naver" component={NaverForm} />
          <PrivateRoute exact path="/edit-naver/:id" component={NaverForm} />
        </Switch>

        <Route exact path="/login" component={Login} />
      </BrowserRouter>
    </>
  );
}
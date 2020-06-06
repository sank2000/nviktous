import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ProtectedRoute from './routers/ProtectedRoute';

import NavBar from './components/nav/NavBar';
import Home from './components/app/Home';
import SignIn from './components/auth/SignIn';
import Product from './components/app/Product';

import AuthApi from "./components/auth/AuthApi";

import { hasSigned } from "./RouteAccess"

function AppRouter() {
  const [data, setData] = useState(false);

  const readSession = async () => {
    const res = await hasSigned();
    console.log(res.data);
    setData(res.data);
  }

  useEffect(() => {
    readSession();
  }, []);
  return (
    <>
      <AuthApi.Provider value={{ data, setData }}>
        <Router>
          <NavBar />
          <Switch>
            <Route path='/' exact component={Home} />
            <ProtectedRoute path='/product/:itemId' exact component={Product} />

            <Route path='/sign' exact component={SignIn} />
            <Route path='/auth/signup' exact component={SignIn} />
            <Route path='/auth/forgot' exact component={SignIn} />
          </Switch>
        </Router>
      </AuthApi.Provider>
    </>
  );
}

export default AppRouter;

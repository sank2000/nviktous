import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { useTheme } from '@material-ui/core/styles';

import ProtectedRoute from './routers/ProtectedRoute';
import NavBar from './components/nav/NavBar';
import Home from './components/app/Home';
import Sign from './components/auth/SignRoute';
import Product from './components/app/Product';
import Cart from './components/app/Cart';
import Favourite from "./components/app/Favorite";
import MyOrder from "./components/app/MyOrder";

import AuthApi from "./components/auth/AuthApi";

import { hasSigned } from "./RouteAccess"
import FlexContainer from './components/containers/FlexContainer';

import SyncLoader from "react-spinners/SyncLoader";
import Search from "./components/app/Search";

function Loading() {
  const theme = useTheme();
  return (
    <FlexContainer>
      <SyncLoader
        size={25}
        margin={10}
        color={theme.palette.primary.main}
        loading={true}
      />
    </FlexContainer>
  );
}

function AppRouter() {
  const [data, setData] = useState(false);
  const [load1, setLoad1] = useState(true);
  const [load2, setLoad2] = useState(true);

  function Main() {
    return (
      <>
        <AuthApi.Provider value={{ data, setData }}>
          <Router>
            <NavBar />
            <Switch>
              <Route path='/' exact component={Home} />
              <ProtectedRoute path='/cart' exact component={Cart} />
              <ProtectedRoute path='/favourite' exact component={Favourite} />
              <ProtectedRoute path='/myorder' exact component={MyOrder} />
              <Route path='/product/:itemId' exact component={Product} />
              <Route path='/search/:search' exact component={Search} />
              <Route path='/sign' exact component={Sign} />
            </Switch>
          </Router>
        </AuthApi.Provider>
      </>
    )
  }

  const readSession = async () => {
    const res = await hasSigned();
    console.log(res.data);
    setData(res.data);
  }

  useEffect(() => {
    readSession();
    setLoad1(false);
  }, []);

  useEffect(() => {
    if (data.auth !== undefined) {
      setLoad2(false);
    }
  }, [data])
  return (
    <>
      {load1 || load2 ? <Loading /> : <Main />}
    </>
  );
}

export default AppRouter;

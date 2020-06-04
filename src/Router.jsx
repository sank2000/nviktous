import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import ProtectedRoute from './routers/ProtectedRoute';
// import RegistrationRoute from './routers/RegistrationRoute';

import NavBar from './components/nav/NavBar';
import Home from './components/app/Home';
import SignIn from './components/auth/SignIn';

function AppRouter() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path='/' exact component={Home} />

        <Route path='/auth/signin' exact component={SignIn} />
        <Route path='/auth/signup' exact component={SignIn} />
        <Route path='/auth/forgot' exact component={SignIn} />
      </Switch>
    </Router>
  );
}

export default AppRouter;

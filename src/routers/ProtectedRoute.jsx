import React from 'react';
import { BrowserRouter as Route, Redirect } from 'react-router-dom';

import Auth from '../components/auth/Auth';

function ProtectedRoute({ component: Component, ...rest }) {
  console.log(Auth.getAuth());
  return (
    <Route
      {...rest}
      render={props =>
        Auth.getAuth() ? (
          <Component {...props} />
        ) : (
            <Redirect
              to="/auth/signin"
            />
          )
      }
    />
  );
}

export default ProtectedRoute;

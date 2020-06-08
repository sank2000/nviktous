import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthApi from '../components/auth/AuthApi';

function ProtectedRoute({ component: Component, ...rest }) {

  const AthApi = React.useContext(AuthApi);
  return (
    <Route
      {...rest}
      render={(props) =>
        AthApi.data.auth ? <Component {...props} /> : <Redirect to="/sign" />
      }
    />
  );
}

export default ProtectedRoute;

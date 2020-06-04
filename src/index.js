import React from 'react';
import ReactDOM from 'react-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal';

import Router from './Router';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
  palette: {
    primary: { main: cyan.A700, },
    secondary: { main: teal.A700 },
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();

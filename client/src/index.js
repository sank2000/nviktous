import React from 'react';
import ReactDOM from 'react-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import lightBlue from '@material-ui/core/colors/lightBlue';
import teal from '@material-ui/core/colors/teal';

import Router from './Router';

const theme = createMuiTheme({
  palette: {
    primary: { main: lightBlue[800], },
    secondary: { main: teal.A700 },
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router />
  </ThemeProvider>,
  document.getElementById('root')
);


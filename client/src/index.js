import React from 'react';
import ReactDOM from 'react-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


import Router from './Router';

const theme = createMuiTheme({
  palette: {
    primary: { main: "#FF7315" },
    secondary: { main: "#C73E1D" },
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router />
  </ThemeProvider>,
  document.getElementById('root')
);


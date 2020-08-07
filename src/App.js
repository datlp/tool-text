import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MomentUtils from '@date-io/moment';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { renderRoutes } from 'react-router-config';

import theme from './theme';
import routes from './routes';
import './mixins/chartjs';
import './mixins/moment';
import './mixins/validate';
import './mixins/prismjs';
import './assets/scss/index.scss';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default App;

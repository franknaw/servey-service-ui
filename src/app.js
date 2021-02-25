import React from 'react'
import ReactDOM from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Router} from 'react-router'
import {Provider} from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {store, history} from './store'
import routes from './routes'

import './styles/main.scss';

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Router
        history={history}
        routes={routes}
      />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);



import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Survey from './components/survey/Survey'
import Admin from './components/admin/Admin'
import Metrics from './components/analytics/Metrics'

const routes = (
  <Route>
    <IndexRoute component={Survey}/>
    <Route path='admin' component={Admin}/>
    <Route path='analytics' component={Metrics}/>
    <Route path='*' component={Admin}/>
  </Route>
);

export default routes

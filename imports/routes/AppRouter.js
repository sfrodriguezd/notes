import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import { Session } from 'meteor/session';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Signup from './../ui/Signup';
import Dashboard from '../ui/Dashboard';
import Login from '../ui/Login';
import NotFound from '../ui/NotFound';

export const history = createHistory();

// const onEnterNotePage = (nextState) => {
//   Session.set('selectedNoteId', nextState.params.id)
// };
// const onLeaveNotePage = () => {
//   Session.set('selectedNoteId', undefined);
// };
// export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
//   const isUnauthenticatedPage = currentPagePrivacy === 'unauth';
//   const isAuthenticatedPage = currentPagePrivacy === 'auth';

//   if (isAuthenticated && isUnauthenticatedPage) {
//     browserHistory.replace('/dashboard')
//   } else if (!isAuthenticated && isAuthenticatedPage) {
//     browserHistory.replace('/')
//   };
// };
// export const globalOnChange = (prevState, nextState) => {
//   globalOnEnter(nextState);
// }
// export const globalOnEnter = (nextState) => {
//   const lastRoute = nextState.routes[nextState.routes.length - 1];
//   Session.set('currentPagePrivacy', lastRoute.privacy)
// }
export class AppRouter extends React.Component {
  render() {
    return(
      <Router history={history}>
        <Switch>
          <PublicRoute path="/" component={Login} exact={true} />
          <PublicRoute path="/signup" component={Signup} />
          <PrivateRoute path="/dashboard" component={Dashboard} exact={true} />
          <PrivateRoute path="/dashboard/:id" component={Dashboard} />
          <Route path="*" component={NotFound}/>
        </Switch>
      </Router>
  
    );
  }
}

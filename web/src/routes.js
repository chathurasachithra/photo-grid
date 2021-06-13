import { NotificationContainer } from 'react-notifications';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import history from './lib/history';
import withTracker from './lib/withPageTracker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PublicLayout from './containers/layout/PublicLayout';
import Home from './containers/home/Home';
import CreateGrid from './containers/grid-creater/Grid';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <PublicLayout
        {...props}
        routes={rest}
        title={rest.title}
        sub={rest.sub}
        transparentBackground={rest.transparentBackground}
        hoverColor={rest.hoverColor}
      >
        <Component {...props} />
        <NotificationContainer />
      </PublicLayout>
    )}
  />
);

const AppRoutes = mainProps => {
  return (
    <Router history={history}>
      <Switch>
        <PublicRoute exact path="/" component={withTracker(Home)} />
        <PublicRoute exact path="/create-new-grid" component={withTracker(CreateGrid)} />
        <Redirect from="/" to="/404" />
      </Switch>
    </Router>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes);

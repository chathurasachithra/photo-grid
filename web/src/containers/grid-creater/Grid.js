import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomeContainer from './GridContainer';
import './Grid.scss';

const Home = props => {
  return (
    <div className="app mb-3">
      <HomeContainer {...props} />
    </div>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {},
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

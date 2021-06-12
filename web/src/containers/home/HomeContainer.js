import React from 'react';
import Grid from './Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getGrid,
} from '../../store/actions';

const HomeContainer = props => {
  return (
    <div>
      <Grid
        header="Its your grid!"
        getGridImages={props.getGrid}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  images: state.images
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getGrid
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

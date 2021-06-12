import React from 'react';
import Images from './Images';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getImages,
  postGrid
} from '../../store/actions';

const GridContainer = props => {
  return (
    <div>
      <Images
        header="Photo grid creater"
        getImages={props.getImages}
        postGrid={props.postGrid}
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
      getImages,
      postGrid
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GridContainer);

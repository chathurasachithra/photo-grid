import axios from 'axios';
import {
  GET_IMAGES_LOADING,
  SET_IMAGES,
  GRID_LOADING,
  GET_GRID_LOADING,
  SET_GRID

} from './actions.js';

export const getImages = req => {
  return async dispatch => {
    try {
      dispatch({ type: GET_IMAGES_LOADING, payload: true });
      const response = await axios({
        method: 'get',
        url: `/images`,
        params: req,
      });
      const data = response?.data?.data || {};
      dispatch({ type: SET_IMAGES, payload: data });
      dispatch({ type: GET_IMAGES_LOADING, payload: false });
      return data;
    } catch (error) {
      dispatch({ type: GET_IMAGES_LOADING, payload: false });
    }
  };
};

export const getGrid = req => {
  return async dispatch => {
    try {
      dispatch({ type: GET_GRID_LOADING, payload: true });
      const response = await axios({
        method: 'get',
        url: `/grid`,
        params: req,
      });
      const data = response?.data?.data || {};
      dispatch({ type: SET_GRID, payload: data });
      dispatch({ type: GET_GRID_LOADING, payload: false });
      return data;
    } catch (error) {
      dispatch({ type: GET_GRID_LOADING, payload: false });
    }
  };
};

export const postGrid = req => {
  return async dispatch => {
    try {
      dispatch({ type: GRID_LOADING, payload: true });
      const res = await axios({
        method: 'post',
        url: '/grid',
        data: { images: req },
      });
      const data = res?.data;
      return data;
    } catch (error) {
      dispatch({ type: GRID_LOADING, payload: false });
      const errorObject = error?.response?.data;
      return errorObject;
    }
  };
};
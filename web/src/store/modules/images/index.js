import {
  GET_IMAGES_LOADING,
  SET_IMAGES,
  GRID_LOADING,
  SET_GRID,
  GET_GRID_LOADING
} from './actions.js';

const initialState = {
  images: {},
  grid: {},
  getImagesLoading: false,
  gridLoading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGES:
      return {
        ...state,
        images: action.payload || {},
      };
    case GET_IMAGES_LOADING:
      return { ...state, getImagesLoading: action.payload };
    case SET_GRID:
      return {
        ...state,
        grid: action.payload || {},
      };
    case GET_GRID_LOADING:
      return { ...state, getGridLoading: action.payload };
    case GRID_LOADING:
        return { ...state, gridLoading: action.payload };
    default:
      return state;
  }
};

export * from './images';
export default reducer;

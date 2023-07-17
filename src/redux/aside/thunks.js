import { asideOn, asideOff } from './actions';

export const asideOnThunk = () => (dispatch) => {
  dispatch(asideOn());
};

export const asideOffThunk = () => (dispatch) => {
  dispatch(asideOff());
};

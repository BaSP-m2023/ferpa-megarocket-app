import * as types from './constants';

export const asideOn = () => {
  return {
    type: types.ASIDE_ON
  };
};

export const asideOff = () => {
  return {
    type: types.ASIDE_OFF
  };
};

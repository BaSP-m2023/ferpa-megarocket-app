import * as typeConstants from './constants';

const INITIAL_STATE = {
  isOn: false
};

const asideReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typeConstants.ASIDE_ON: {
      return { ...state, isOn: true };
    }
    case typeConstants.ASIDE_OFF: {
      return { ...state, isOn: false };
    }
    default: {
      return state;
    }
  }
};

export default asideReducer;

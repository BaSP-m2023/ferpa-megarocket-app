import * as trainersConstant from './constants';

export const getTrainersPending = () => {
  return {
    type: trainersConstant.GET_TRAINERS_PENDING
  };
};

export const getTrainersSuccess = (trainers) => {
  return {
    type: trainersConstant.GET_TRAINERS_SUCCESS,
    payload: trainers
  };
};

export const getTrainersError = (error) => {
  return {
    type: trainersConstant.GET_TRAINERS_ERROR,
    payload: error
  };
};

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
export const deleteTrainersPending = () => {
  return {
    type: trainersConstant.DELETE_TRAINERS_PENDING
  };
};
export const deleteTrainersSuccess = (id) => {
  return {
    type: trainersConstant.DELETE_TRAINERS_SUCCESS,
    payload: id
  };
};
export const deleteTrainersError = (error) => {
  return {
    type: trainersConstant.DELETE_TRAINERS_ERROR,
    payload: error
  };
};
export const addTrainersPending = () => ({
  type: trainersConstant.ADD_TRAINERS_PENDING
});

export const addTrainersSuccess = (trainer) => ({
  type: trainersConstant.ADD_TRAINERS_SUCCESS,
  payload: trainer
});

export const addTrainersError = (error) => ({
  type: trainersConstant.ADD_TRAINERS_ERROR,
  payload: error
});

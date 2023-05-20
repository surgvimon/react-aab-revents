import { asyncActError, asyncActionFinish, asyncActionStart } from "../../app/async/asyncReducer";
import { delay } from "../../app/common/utill/utill";

const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export function increment(amount){
  return async function(dispatch){
    dispatch(asyncActionStart());
    try {
      await delay(1000);
      dispatch({
        type: INCREMENT_COUNTER,
        payload: amount
      });
       dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActError(error))
    } 
    
  }
}

export function decrement(amount){
  return async function(dispatch){
    dispatch(asyncActionStart());
    try {
      await delay(1000);
      dispatch({
        type: DECREMENT_COUNTER,
        payload: amount
      });
       dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActError(error))
    } 
    
  }
}


const initialState = {
    data: 24
}

export default function testReducer(state = initialState, {type, payload}) {
  switch(type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        data: state.data + payload,
      };
    case DECREMENT_COUNTER:
      return {
        ...state,
        data: state.data - payload,
      }
    default:
      return state;
  }
  
}

import { FETCH_WEATHER } from '../actions/index'
import { REMOVE_CITY } from '../actions/index'

export default function(state=[], action) {
  switch(action.type) {
    case FETCH_WEATHER:
      return [ action.payload.data, ...state ];
    case REMOVE_CITY:
      return state.filter((currElement) => {
        if(currElement.city.name !== action.payload) {
          return currElement;
        }
      });
  }
  return state;
}
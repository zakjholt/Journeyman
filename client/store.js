import { createStore } from 'redux';

// initial store
const initialState = {
  tripRoute: []
}

function storeReducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD_CITY':
      return Object.assign({}, state, {
        tripRoute: state.tripRoute.push(action.cityObject)
      })
    default:
      return state
  }
}

const store = createStore (storeReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store

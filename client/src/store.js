import { createStore } from 'redux';

const initialState = {
  route: [
    'city1', 'city2'
  ]
}
function storeReducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD_CITY':
      return Object.assign({}, state, {
        route: state.route.concat(action.cityName)
      })
    default:
      return state;
  }
}

const store = createStore (storeReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store

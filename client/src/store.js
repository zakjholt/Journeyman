import { createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';

const initialState = {
  route: [
  ]
}
function storeReducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD_CITY':
      return Object.assign({}, state, {
        route: state.route.concat(action.cityObject)
      })
    case 'DELETE_CITY':
      let index = action.index
      return Object.assign({}, state, {route: state.route.filter((item) => state.route.indexOf(item) !== index)})
    default:
      return state;
  }
}

const store = createStore(storeReducer, autoRehydrate(), undefined, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
persistStore(store);
export default store;

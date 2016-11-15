import {createStore} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';

const initialState = {
    route: [],
    favoritePlaces: []
}
function storeReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_CITY':
            return Object.assign({}, state, {
                route: state.route.concat(action.cityObject)
            })
        case 'DELETE_CITY':
            let index = action.index
            return Object.assign({}, state, {
                route: state.route.filter((item) => state.route.indexOf(item) !== index)
            })
        case 'SET_TRIP':
            return Object.assign({}, state, {route: action.route})
        case 'TOGGLE_FAVORITE':
            let newPlaces;
            let existing = false;
            state.favoritePlaces.forEach((place) => {if (place.id === action.place.id) {
              existing = true;
            }})
            if (!existing) {
              newPlaces = state.favoritePlaces.concat(action.place)
            } else {
              newPlaces = state.favoritePlaces.filter((place) => place.id !== action.place.id)
            }
            return Object.assign({}, state, {
                favoritePlaces: newPlaces
            })
        // case 'MOVE_ITEM_UP':
        //   let tempRoute =
        //   return Object.assign({}, state, {
        //     route: []
        //   })
        // case 'MOVE_ITEM_DOWN':
        case 'LOGOUT':
            return Object.assign({route: []})
        default:
            return state;
    }
}

const store = createStore(storeReducer, autoRehydrate(), undefined, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
persistStore(store);
export default store;

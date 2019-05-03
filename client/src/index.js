import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//Redux
import {Provider, connect} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';


//Mina actions är objekt som har en type och ibland data(payload).
//Dessa tre funktioner returnerar actions.
function fetchDataRequest(){
  return {
    type: "FETCH_REQUEST"
  }
}

function fetchDataSuccess(payload) {
  return {
    type: "FETCH_SUCCESS",
    data: payload
  }
}

function fetchDataError() {
  return {
    type: "FETCH_ERROR"
  }
}

//Reducern är typ som setState. state är store
const reducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return {...state, error: false, loading: true};
    case "FETCH_SUCCESS":
    console.log("updated store with data");
      return {...state, loading: false, products: action.data};
    case "FETCH_ERROR":
      return {...state, error: true, loading: false};
    default:
      return state;
  }
}

//Thunk dispatch, fungerar som setState / store.
function fetchDataWithRedux() {
	return (dispatch) => {
  	dispatch(fetchDataRequest());
    return fetch("http://localhost:3001/products", {method: 'GET', mode: 'cors'})
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      } else {
        dispatch(fetchDataError())
      }
    })
    .then(response => {
      dispatch(fetchDataSuccess(response))
    })
  }
}

// function loggin() {
//   return (dispatch) => {
//     dispatch({type: "LOGGED_IN"})
//   }
// }


//här skapas store
const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

//För att app inte vill ha någon data
// const mapStateToProps = state => {data: state.data}

const mapDispatchToProps = {
  fetchDataWithRedux
}

//om man inte skickar med några parametrar till connect så får man allt.
let Container = connect(null, mapDispatchToProps)(App)

ReactDOM.render(
    <Provider store={store}>
        <Container/>
    </Provider>,
    document.getElementById('root')
);

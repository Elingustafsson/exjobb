import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {hostname} from './config.js'
import 'whatwg-fetch'
import 'promise-polyfill/src/polyfill';
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

function loginSuccess(payload) {
  return {
    type: "LOGIN_SUCCESS",
    currentUser: payload
  }
}

function addToCart(payload) {
  return {
    type: "ADD_ITEM",
    itemId: payload
  }
}

function removeFromCart(id) {
  console.log("remove from cart");
  return {
    type: "REMOVE_ITEM",
    itemId: id
  }
}

function removeAmountFromCart(id) {
  return {
    type: "REMOVE_AMOUNT",
    itemId: id
  }
}

function setProductType(type) {
  return {
    type: "SET_TYPE",
    productType: type
  }
}

function searchResult(searchString) {
  return {
    type: "SEARCH_RESULT",
    searchField: searchString
  }
}

//Reducern är typ som setState. state är store
const reducer = (state = {cart: [], selectedProductType: "/*"}, action) => {
  console.log(action);
  switch (action.type) {
    case "FETCH_REQUEST":
      console.log("loading");
      return {...state, error: false, loading: true};
    case "FETCH_SUCCESS":
    console.log("updated store with data");
      return {...state, loading: false, products: action.data};
    case "FETCH_ERROR":
      return {...state, error: true, loading: false};
    case "LOGIN_SUCCESS":
    console.log("update store with username and cart");
      return {...state, username: action.currentUser.username, cart: action.currentUser.cart};
    case "ADD_ITEM":
    console.log("lägg till vara");
    if (state.username) {
      window.fetch(`${hostname}/addToCart`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: 'post',
        body: JSON.stringify({username: state.username, itemId: action.itemId}),
        mode: 'cors',
      })
    }
    let cartAdd = Object.assign([], state.cart)
    let index = state.cart.findIndex( item => item.id === action.itemId)
    if (index !== -1) {
      cartAdd[index].amount++

      return {...state, cart: cartAdd}
    } else {
      return {...state, cart: [...state.cart, {id: action.itemId, amount: 1}]}
    }

    case "REMOVE_ITEM":
    console.log("Remove item");
      let cart = Object.assign([], state.cart)
      let idx = cart.findIndex(item => item.id === action.itemId)
      cart.splice(idx, 1)

      if (state.username) {
        window.fetch(`${hostname}/removeFromCart`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: 'post',
          body: JSON.stringify({username: state.username, itemIdx: idx}),
          mode: 'cors',
        })
      }
      return {...state, cart: cart}

    case "REMOVE_AMOUNT":
    console.log("Remove amount");
    let cartRemove = Object.assign([], state.cart)
    let idxRemove = cartRemove.findIndex(item => item.id === action.itemId)
    if (cartRemove[idxRemove].amount > 1) {
      cartRemove[idxRemove].amount--
    } else {
      cartRemove.splice(idxRemove, 1)
    }
    if (state.username) {
      window.fetch(`${hostname}/replaceCart`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: 'post',
        body: JSON.stringify({username: state.username, cart: cartRemove}),
        mode: 'cors',
      })
    }
    return {...state, cart: cartRemove}

    case "SET_TYPE":
      return {...state, selectedProductType: action.productType}
    case "SEARCH_RESULT":
      return {...state, searchField: action.searchField }
    default:
      return state;
  }
}

//Thunk dispatch, fungerar som setState / store.
export function fetchDataWithRedux() {
	return (dispatch) => {
  	dispatch(fetchDataRequest());
    return window.fetch(`${hostname}/products`, {method: 'GET', mode: 'cors'})
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

export function loginWithRedux(payload) {
  return (dispatch) => {
    dispatch(loginSuccess(payload))
  }
}

export function addItemWithRedux(payload) {
  return (dispatch) => {
    dispatch(addToCart(payload))
  }
}

export function removeItemWithRedux(id) {
  return (dispatch) => {
    dispatch(removeFromCart(id))
  }
}

export function removeAmountWithRedux(id) {
  return (dispatch) => {
    dispatch(removeAmountFromCart(id))
  }
}

export function setTypeWithRedux(type) {
  return (dispatch) => {
    dispatch(setProductType(type))
  }
}

export function searchWithRedux(searchString) {
  return (dispatch) => {
    dispatch(searchResult(searchString))
  }
}


//här skapas store
const store = createStore (
  reducer,
  applyMiddleware(thunk)
)

//För att app inte vill ha någon data
// const mapStateToProps = state => {data: state.data}

const mapDispatchToProps = {
  fetchDataWithRedux,
}

//om man inte skickar med några parametrar till connect så får man allt.
let Container = connect(null, mapDispatchToProps)(App)

ReactDOM.render(
    <Provider store={store}>
      <Container/>
    </Provider>,
    document.getElementById('root')
);

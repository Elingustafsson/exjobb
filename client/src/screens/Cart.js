import React, { Component } from 'react';
import {connect} from 'react-redux';
import {hostname} from '../config.js'

import {removeItemWithRedux, addItemWithRedux, removeAmountWithRedux} from '../index.js'


class Cart extends Component {

  removeFromCart(id){
    this.props.removeItemWithRedux(id)
  }

  addAmount(id) {
    this.props.addItemWithRedux(id)
  }

  removeAmount(id) {
    this.props.removeAmountWithRedux(id)
  }



  render() {
    console.log(this.props.cart);
    const cart = this.props.cart.map(item => {
      console.log(this.props);
      let product = this.props.products.find(product => product.id === item.id)
      return (
        <div className="itemSum" key={item.id}>
          <img className="productImg" alt="bild" src={`${hostname}${product.img}`}></img>
          <div className="itemInfo">
            <p>Produkt namn: {product.name}</p>
            <p>Pris: {product.price}kr</p>
            <p>Antal: <span onClick={() => this.addAmount(item.id)}>+</span>{item.amount}<span onClick={() => this.removeAmount(item.id)}>-</span></p>
            <button onClick={() => this.removeFromCart(item.id)}>Ta bort vara</button>
          </div>
        </div>
      )
    })

    return (
      <>
      <div className="cartBody">
        <div className="itemsSummary">
          {cart}
        </div>
        <div className="cartSummary">
          <p>Beställningsöversikt</p>
        </div>
      </div>
      </>
    );
  }
}

const mapStateToProps = state => ({cart: state.cart, products: state.products})
const mapDispatchToProps = {removeItemWithRedux, addItemWithRedux, removeAmountWithRedux}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

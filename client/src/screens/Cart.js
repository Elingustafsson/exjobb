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

    const selectedProducts = this.props.cart.map(item => {
      let product = this.props.products.find(product => product.id === item.id)
      product.amount = item.amount;
      return product
    })
    console.log(selectedProducts);

    const cart = selectedProducts.map(product => {
      return (
        <div className="itemSum" key={product.id}>
          <img className="productImg" alt="bild" src={`${hostname}${product.img}`}></img>
          <div className="itemInfo">
            <p>Produkt namn: {product.name}</p>
            <p>Pris: {product.price}kr</p>
            <p>Antal: <span onClick={() => this.addAmount(product.id)}>+</span>{product.amount}<span onClick={() => this.removeAmount(product.id)}>-</span></p>
            <button onClick={() => this.removeFromCart(product.id)}>Ta bort vara</button>
          </div>
        </div>
      )
    })


    const totalPrice = selectedProducts.reduce((acc, current)=>(acc + current.price * current.amount), 0)

    const oversight = selectedProducts.map(product => {
      return (
        <>
        <p>{product.name} {product.price * product.amount}</p>
        <p></p>
        </>
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
          {oversight}
          <p>{totalPrice}</p>
        </div>
      </div>
      </>
    );
  }
}

const mapStateToProps = state => ({cart: state.cart, products: state.products})
const mapDispatchToProps = {removeItemWithRedux, addItemWithRedux, removeAmountWithRedux}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

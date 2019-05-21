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
            <p>{product.name}</p>
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
          <tr key={product.id}>
            <td><div className="customTd">{product.name}</div></td>
            <td className="tdCenter">{product.amount}</td>
            <td>{product.price * product.amount} kr</td>
          </tr>
      )
    })
    return (
      <>
      <div className="cartBody">
        <div className="itemsSummary">
          {cart}
        </div>
        <div className="cartSummary">
          <h1>Beställningsöversikt</h1>
          <table>
            <thead>
              <tr>
                <th>Produkt</th>
                <th>Antal</th>
                <th>Pris</th>
              </tr>
            </thead>
            <tbody>
              {oversight}
              <tr>
                <td colSpan="3">
                  <hr />
                </td>
              </tr>
              <tr>
                <td colSpan="2"><b>Totalt</b></td>
                <td><b>{totalPrice} kr</b></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </>
    );
  }
}

const mapStateToProps = state => ({cart: state.cart, products: state.products})
const mapDispatchToProps = {removeItemWithRedux, addItemWithRedux, removeAmountWithRedux}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

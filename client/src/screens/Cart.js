import React, { Component } from 'react';
import {connect} from 'react-redux';


class Cart extends Component {

  render() {
    // let cart = this.props.cart
    //   for (var i = 0; i < cart.length; i++) {
    //     let id = cart[i]
    //     cart[i] = this.props.products.find(product => product.id === id)
    //   }
    // console.log(cart);

    const cart = this.props.cart.map(id => {
      console.log(this.props);
      let product = this.props.products.find(product => product.id === id)
      return (
        <div className="itemSum" key={id}>
          <img className="productImg" alt="bild" src={'http://localhost:3001' + product.img}></img>
          <div className="itemInfo">
            <p>Produkt namn: {product.name}</p>
            <p>Pris: {product.price}</p>
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

export default connect(mapStateToProps)(Cart);

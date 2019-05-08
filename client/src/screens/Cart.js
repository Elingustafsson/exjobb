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
      let product = this.props.products.find(product => product.id === id)
      return (
        <div key={id}>
          <p>{product.name}</p>
          <p>{product.price}</p>
        </div>
      )
    })
    console.log(this.props.cart);
    console.log(cart);

    return (
      <div>
        {cart}
        <p>Varukorgen</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({cart: state.cart, products: state.products})

export default connect(mapStateToProps)(Cart);

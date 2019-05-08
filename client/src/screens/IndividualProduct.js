import React, { Component } from 'react';
import {connect} from 'react-redux';

import {addItemWithRedux} from '../index.js'

class IndividualProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    console.log(props);
  }


  addItem(id) {
    this.props.addItemWithRedux(id)
  }

  render() {
    if (!this.props.products) {
      return null
      //Loading screen/gif..
    }

    const product = this.props.products.find( product => product.id === Number(this.props.match.params.id))

    return (
      <div>
        {console.log(product)}
        <p>{product.name}</p>
        <p>Pris: {product.price}</p>
        <p>Beskrivning: {product.description}</p>
        <img className="productImg" alt="product" src={'http://localhost:3001' + product.img}></img>
        <button onClick={() => this.addItem(product.id)}>add</button>
      </div>
    );
  }
}


const mapStateToProps = state => ({products: state.products, loading: state.loading, error: state.error})
const mapDispatchToProps = {addItemWithRedux}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualProduct);

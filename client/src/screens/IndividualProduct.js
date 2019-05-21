import React, { Component } from 'react';
import {connect} from 'react-redux';

import {addItemWithRedux} from '../index.js'
import {hostname} from '../config.js'


class IndividualProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmation: false
    }
  }

  addItem(id) {
    this.props.addItemWithRedux(id)
    this.setState({
      confirmation: true
    })
    setTimeout(() => this.setState({
      confirmation: false
    }), 4000)
  }

  render() {
    if (!this.props.products) {
      return null
      //Loading screen/gif..
    }

    const product = this.props.products.find( product => product.id === Number(this.props.match.params.id))

    return (
      <>
      <div className={this.state.confirmation ? "confirmation animation" : "confirmation"}>Produkt tillagd!</div>
      <div className="invBody">
        <div className="invImg">
          <img className="productImg" alt="product" src={`${hostname}${product.img}`}></img>
        </div>
        <div className="invDescription">
          <h1>{product.name}</h1>
          <p>Pris: <b>{product.price} kr</b></p>
          <p>Beskrivning: {product.description}</p>
          <button className="addButton" onClick={() => this.addItem(product.id)}>Lägg till produkt</button>
        </div>
      </div>
      </>
    );
  }
}


const mapStateToProps = state => ({products: state.products, loading: state.loading, error: state.error})
const mapDispatchToProps = {addItemWithRedux}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualProduct);

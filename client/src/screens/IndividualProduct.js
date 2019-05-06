import React, { Component } from 'react';
import {connect} from 'react-redux';


class IndividualProduct extends Component {
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
      </div>
    );
  }
}


const mapStateToProps = state => ({products: state.products, loading: state.loading, error: state.error})

export default connect(mapStateToProps)(IndividualProduct);

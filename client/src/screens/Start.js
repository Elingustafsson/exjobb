import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import {hostname} from '../config.js'

class Start extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    if (!this.props.products) {
      return null
    }

    return (
      <div className="bodyMain">
         <div className="outerDiv">
          {
            this.props.products.filter(product => product.type.match(this.props.selectedProductType)).filter(product => (product.name.match(this.props.searchField) || product.category.match(this.props.searchField) || product.type.match(this.props.searchField))).map((product, index) => {
              return <div
                className="itemsDiv"
                key={index}>
                <Link
                  to={'/individualproduct/' + product.id}>
                  <img
                    className="productImg1"
                    alt="product"
                    src={`${hostname}${product.img}`}>
                  </img>
                  <p className="itemsText">{product.name}</p>
                </Link>
              </div>
            })
          }
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({products: state.products, searchField: state.searchField, selectedProductType: state.selectedProductType, loading: state.loading, error: state.error})

export default connect(mapStateToProps)(Start);

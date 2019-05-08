import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';


class Start extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    console.log(props);
  }


  render() {
    if (!this.props.products) {
      return null
    }

    return (
      <div className="bodyMain">
        <div>
          <p>Start</p>
        </div>
         <div className="outerDiv">
          {
            this.props.products.map((product, index) => {
              return <div
                className="itemsDiv"
                key={index}>
                <Link
                  to={'/individualproduct/' + product.id}>
                  Namn: {product.name}
                  <img
                    className="productImg1"
                    alt="product"
                    src={'http://localhost:3001' + product.img}>
                  </img>
                </Link>
              </div>
            })
          }
        </div>
      </div>
    );
  }
}



const mapStateToProps = state => ({products: state.products, loading: state.loading, error: state.error})

export default connect(mapStateToProps)(Start);

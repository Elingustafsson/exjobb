import React, { Component } from 'react';
import {connect} from 'react-redux';

import {setTypeWithRedux} from '../index.js'

class DropDown extends Component {

  setCategory(type) {
    console.log(type);
    this.props.setTypeWithRedux(type)
  }

  render() {
    return (
      <div className="DropDown">
      <div>
        <h1>Kläder</h1>
        <ul>
          <li onClick={() => this.setCategory('shirts')}>Tröjor</li>
          <li onClick={() => this.setCategory('pants')}>Byxor</li>
          <li onClick={() => this.setCategory('shoes')}>Skor</li>
          <li onClick={() => this.setCategory('jackets')}>Jackor</li>
        </ul>
        </div>
        <div>
          <h1>Accessoarer</h1>
          <ul>
            <li onClick={() => this.setCategory('jewelry')}>Smycken</li>
            <li onClick={() => this.setCategory('bags')}>Väskor</li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setTypeWithRedux
}

export default connect(null, mapDispatchToProps)(DropDown);

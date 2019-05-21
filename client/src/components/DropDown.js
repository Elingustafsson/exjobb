import React, { Component } from 'react';
import {connect} from 'react-redux';

import {setTypeWithRedux} from '../index.js'

class DropDown extends Component {
  constructor(props){
    super()
    this.state = {
      activLi: ""
    }
  }

  setCategory(e, type) {
    console.log(e, type);
    this.props.setTypeWithRedux(type)
    this.setState({
      activLi: type
    })
  }

  render() {
    const filters = [{eng: "shirts", swe: "Tröjor"}, {eng: "pants", swe: "Byxor"}, {eng: "shoes", swe: "Skor"}, {eng: "jackets", swe: "Jackor"}].map((category, i)=> (
      <li key={i} className={this.state.activLi === category.eng ? 'activeTest' : ''} onClick={(e) => this.setCategory(e, category.eng)}>{category.swe}</li>
    ))

    return (
      <div className="DropDown">
        <div className="DropDownItems">
          <h1>Kläder</h1>
          <ul className="DropDownItems">
            {filters}
          </ul>
        </div>
        <div className="DropDownItems">
          <h1>Accessoarer</h1>
          <ul className="DropDownItems">
            <li className={this.state.activLi === 'jewelry' ? 'activeTest' : ''} onClick={(e) => this.setCategory(e, 'jewelry')}>Smycken</li>
            <li className={this.state.activLi === 'bags' ? 'activeTest' : ''} onClick={(e) => this.setCategory(e, 'bags')}>Väskor</li>
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

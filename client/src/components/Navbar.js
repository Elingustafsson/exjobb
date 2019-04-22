import React, { Component } from 'react';
import '../../src/index.css';
import { Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSearch, faShoppingBag, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import images from '../images/images';
import DropDown from './DropDown'

let {loggo} = images

library.add(faUser, faSearch, faShoppingBag, faChevronDown)

export default class Navbar extends Component {
  constructor(props){
    super()
    this.state={
      isHidden: true,
    }
  }

  toggleNav() {
    this.setState({
      isHidden: !this.state.isHidden,
    })
  }

  render() {
    return (
      <div>
        <div className="header">
          <ul className="headerMenu">
            <li onClick={this.toggleNav.bind(this)}>Kategorier <FontAwesomeIcon icon="chevron-down" /></li>
            <li><Link to='/sale'>REA</Link></li>
          </ul>
          <Link  to='/'>
            <img className="navLoggo" src={loggo} alt="loggo"/>
          </Link>
          <ul className="headerItems">
            <li><FontAwesomeIcon icon="search" /></li>
            <li><Link to='/login'><FontAwesomeIcon icon="user" /></Link></li>
            <li><Link to='/cart'><FontAwesomeIcon icon="shopping-bag" /></Link></li>
          </ul>
        </div>
      <div>
        {
          !this.state.isHidden && (
            <DropDown />
          )
        }
      </div>
    </div>
    );
  }
}

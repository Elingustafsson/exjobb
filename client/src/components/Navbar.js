import React, { Component } from 'react';
import '../../src/index.css';
import { Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faShoppingBag, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import images from '../images/images';
import DropDown from './DropDown';
import {connect} from 'react-redux';

import {setTypeWithRedux} from '../index.js'
import {searchWithRedux} from '../index.js'



let {loggo} = images

library.add(faUser, faSearch, faShoppingBag, faChevronDown)

class Navbar extends Component {
  constructor(props){
    super()
    this.state={
      isHidden: true,
      loggoCollapsed: true,
      searchClicked: false
    }
    this.lastScroll = window.pageYOffset;
    this.handleScroll = this.handleScroll.bind(this)
  }

  toggleNav() {
    this.setState({
      isHidden: !this.state.isHidden,
    })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  logout(){
    window.location.reload()
  }

  handleScroll() {
    if (this.locked) {
      return;
    }
    if (this.lastScroll < window.pageYOffset && this.state.loggoCollapsed) {
      this.locked = true
      setTimeout(() => {this.locked = false},1000)
      this.setState({
        loggoCollapsed: !this.state.loggoCollapsed
      })
    } else if (this.lastScroll > window.pageYOffset && !this.state.loggoCollapsed) {
      this.locked = true
      setTimeout(() => {this.locked = false},1000)
      this.setState({
        loggoCollapsed: !this.state.loggoCollapsed
      })
    }
    this.lastScroll = window.pageYOffset;
  }

  setCategory(type) {
    console.log(type);
    this.props.setTypeWithRedux(type)
  }

  searchClick() {
    if (!this.state.searchClicked) {
      this.setState({
        searchClicked: true
      })
    } else {
      this.setState({
        searchClicked: false
      })
    }
  }

  searchField(searchString) {
    this.props.searchWithRedux(searchString)
  }

  render() {
    return (
      <div className="sticky">
        <div className="header">
          <ul className="headerMenu">
            <li onClick={this.toggleNav.bind(this)}>Kategorier <FontAwesomeIcon icon="chevron-down" /></li>
          </ul>
            <Link  to='/'>
              <img className={ this.state.loggoCollapsed ? "transitionUp navLoggo" : "transitionDown navLoggo"}
              src={loggo}
              onClick={() => this.setCategory('/*')}
              alt="loggo"/>
            </Link>
          <ul className="headerItems">
          {
            this.state.searchClicked && (
              <input onKeyDown={(e) => this.searchField(e.target.value)}></input>
            )
          }
            <li onClick={() => this.searchClick()}><FontAwesomeIcon icon="search" /></li>
            <li><Link to='/cart'><FontAwesomeIcon icon="shopping-bag" /></Link>{this.props.productAmount}</li>
            {
              this.props.user ? (
                <>
                  <li><Link to='/profile'><FontAwesomeIcon icon="user" /></Link></li>
                  <li onClick={this.logout}>Logga ut</li>
                </>
              ) : (
                <li><Link to='/login'>Login</Link></li>
              )
            }
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


const mapStateToProps = state => ({user: state.username, productAmount: state.cart.reduce((acc, currentVal) => (acc + currentVal.amount ),0)})

const mapDispatchToProps = {
  setTypeWithRedux,
  searchWithRedux
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

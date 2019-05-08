import React, { Component } from 'react';
import '../../src/index.css';
import { Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faShoppingBag, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import images from '../images/images';
import DropDown from './DropDown';
import {connect} from 'react-redux';


let {loggo} = images

library.add(faUser, faSearch, faShoppingBag, faChevronDown)

class Navbar extends Component {
  constructor(props){
    super()
    this.state={
      isHidden: true,
      loggoCollapsed: true
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

  render() {
    console.log(this.props.cart);
    return (
      <div className="sticky">
        <div className="header">
          <ul className="headerMenu">
            <li onClick={this.toggleNav.bind(this)}>Kategorier <FontAwesomeIcon icon="chevron-down" /></li>
            <li><Link to='/sale'>REA</Link></li>
          </ul>
            <Link  to='/'>
              <img className={ this.state.loggoCollapsed ? "transitionUp navLoggo" : "transitionDown navLoggo"} src={loggo} alt="loggo"/>
            </Link>
          <ul className="headerItems">
            <li><FontAwesomeIcon icon="search" /></li>
            <li><Link to='/cart'><FontAwesomeIcon icon="shopping-bag" /></Link></li>
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

const mapStateToProps = state => ({user: state.username, cart: state.cart})

export default connect(mapStateToProps)(Navbar);

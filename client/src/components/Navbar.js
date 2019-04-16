import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to='/'>Start</Link></li>
          <li><Link to='/login'>Logga in</Link></li>
          <li><Link to='/cart'>Varukorg</Link></li>
        </ul>
      </div>
    );
  }
}

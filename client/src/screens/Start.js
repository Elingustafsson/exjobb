import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Start extends Component {
  render() {
    return (
      <div>
        <p>Start</p>
        <ul>
          <li><Link to='/individualproduct'>Klickad produkt</Link></li>
        </ul>
      </div>
    );
  }
}

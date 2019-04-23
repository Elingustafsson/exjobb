import React, { Component } from 'react';

export default class DropDown extends Component {
  render() {
    return (
      <div className="DropDown">
      <div>
        <h1>Kläder</h1>
        <ul>
          <li>Tröjor</li>
          <li>Byxor</li>
          <li>Skor</li>
          <li>Jackor</li>
        </ul>
        </div>
        <div>
          <h1>Accessoarer</h1>
          <ul>
            <li>Amycken</li>
            <li>Väskor</li>
          </ul>
        </div>
      </div>
    );
  }
}

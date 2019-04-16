import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Start extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      error: ""
    }
  }

  componentDidMount(){
    fetch('http://localhost:3001/products', {
      method: 'GET',
      mode: 'cors'
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      this.setState({
        data: response
      })
    })
    .catch(err => {
      this.setState({
        error: "Failed to fetch"
      })
    })
  }

  render() {
    console.log(this.state);
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

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
    fetch('http://localhost:3001/placeHolder', {
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
      <div className="bodyMain">
        <div>
          <p>Start</p>
        </div>
        <div className="outerDiv">
          {
            (this.state.data) && (
              this.state.data.map(function(item, i){
                console.log('test');
                return <div className="itemsDiv" key={i}><Link to='/individualproduct'>Klickad produkt</Link></div>
              })
            )
          }
        </div>
      </div>
    );
  }
}

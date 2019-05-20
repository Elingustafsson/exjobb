import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import {hostname} from '../config.js'
import 'whatwg-fetch'
import 'promise-polyfill/src/polyfill';


export default class CreateAccount extends Component {
  constructor(props){
    super()
    this.state = {

    }
  }

  createAccount(e) {
    e.preventDefault()
    let userData = {
      username: e.target[0].value,
      password: e.target[1].value
    }
    console.log(userData);

    window.fetch(`${hostname}/register`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: 'post',
      body: JSON.stringify(userData),
      mode: 'cors',
    })
    .then(response => {
      if (response.status === 409) {
        this.setState({
          error: "Användarnamnet finns redan"
        })
        console.log(this.state);
      } else if (response.status === 201) {
        this.setState({
          error: null,
          redirect: true
        })
        console.log(this.state);
      } else {
        throw new Error('Something bad happen')
      }
    })
    .catch(error => this.setState({
      error: "Servern är nere, prova igen senare"
    }))
  }


  render() {
    if (this.state.redirect) {
        return <Redirect to="/login" />
      //skrit ut att det gick, ca 1sec senare redirect.
    }
    return (
      <div className="loginParent">


          <div className="authBox">
            <p>Skapa konto</p>
            <form className="authForm" method="post" onSubmit={ e => this.createAccount(e)}>
              <input required type="text" placeholder="Username" name="userName"/>
              <input required type="Password" placeholder="Password" name="Password"/>
              <input type="submit" value="Submit" />
            </form>
          </div>
          { this.state.error && (
              <div>
                <p>{this.state.error}</p>
              </div>
            )
          }

      </div>
    );
  }
}

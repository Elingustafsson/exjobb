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
            <h1>Skapa konto</h1>
            <form className="authForm" method="post" onSubmit={ e => this.createAccount(e)}>
              <input className="authInput" required type="text" placeholder="Användarnamn" name="userName"/>
              <input className="authInput" required type="Password" placeholder="Lösenord" name="Password"/>
              <input className="authButton" type="submit" value="Skapa konto" />
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

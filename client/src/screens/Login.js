import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import 'whatwg-fetch'
import 'promise-polyfill/src/polyfill';

//Funktioner
import {loginWithRedux} from '../index.js'

import {hostname} from '../config.js'


class Login extends Component {
  constructor(props){
    super()
    this.state = {

    }
  }

  login(e) {
    e.preventDefault()
    let userLogin = {
      username: e.target[0].value,
      password: e.target[1].value
    }

    window.fetch(`${hostname}/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: 'post',
      body: JSON.stringify(userLogin),
      mode: 'cors',
    })
    .then(response => {
      if (response.status === 200) {
        this.setState({
          loggedIn: true
        })
        return response.json()
      } else if (response.status === 400) {
        this.setState({
          error: "Fel användarnamn eller lösenord"
        })
      } else {
        throw new Error('Something bad happen')
      }
    })
    .then(response => {
      this.props.loginWithRedux(response)
    })
    .catch(error => this.setState({
      error: "Servern är nere, prova igen senare"
    }))
  }


  render() {
    if (this.state.loggedIn) {
        return <Redirect to="/" />
      //skrit ut att det gick, ca 1sec senare redirect.
    }
    return (
      <div className="loginParent">
        <div className="authBox">
          <h1>Login</h1>
          <form className="authForm" method="post" onSubmit={e => this.login(e)}>
              <input className="authInput" type="text" name="userName" placeholder="Användarnamn"/>
              <input className="authInput" type="Password" name="Password" placeholder="Lösenord"/>
            <input className="authButton" type="submit" value="Logga in" />
          </form>
        </div>

        { this.state.error && (
            <div>
              <p>{this.state.error}</p>
            </div>
          )
        }
        <div className="createAcc">
          <p>Har du inget konto?</p>
          <p> Du kan du enkelt skapa ett genom att trycka på länken "Skapa konto" nedan</p>
          <p><Link to='/createaccount'>Skapa konto</Link></p>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = {
  loginWithRedux
}

export default connect(null, mapDispatchToProps)(Login);

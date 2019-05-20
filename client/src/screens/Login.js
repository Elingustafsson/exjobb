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
    console.log(props);
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
          <p>Login</p>
          <form className="authForm" method="post" onSubmit={e => this.login(e)}>
              <input type="text" name="userName" placeholder="Username"/>
              <input type="Password" name="Password" placeholder="Password"/>
            <input type="submit" value="Submit" />
          </form>
        </div>

        { this.state.error && (
            <div>
              <p>{this.state.error}</p>
            </div>
          )
        }

        <ul>
          <li><Link to='/createaccount'>Skapa konto</Link></li>
        </ul>
      </div>
    );
  }
}


const mapDispatchToProps = {
  loginWithRedux
}

export default connect(null, mapDispatchToProps)(Login);

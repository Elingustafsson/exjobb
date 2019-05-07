import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";


const url = 'http://localhost:3001'

export default class Login extends Component {
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

    fetch(url + '/login', {
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
      console.log(response.cart);
      //till redux
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
      <div>
        <p>Login</p>

        <div>
          <form method="post" onSubmit={e => this.login(e)}>
            <label>Username:
              <input type="text" name="userName"/>
            </label>
            <label>Password:
              <input type="Password" name="Password"/>
            </label>
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

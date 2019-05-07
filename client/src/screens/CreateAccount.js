import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

const url = 'http://localhost:3001'

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

    fetch(url + '/register', {
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
      <div>
        <p>Skapa konto</p>

          <div>
            <form method="post" onSubmit={ e => this.createAccount(e)}>
              <label>Username:
                <input required type="text" name="userName"/>
              </label>
              <label>Password:
                <input required type="Password" name="Password"/>
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
          { this.state.error && (
            <div>
              <p>{this.state.error}</p>
            </div>
          )}

      </div>
    );
  }
}

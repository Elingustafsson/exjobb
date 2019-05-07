import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Login extends Component {
  render() {
    return (
      <div>
        <p>Login</p>

        <div>
          <form>
            <label>Username:
              <input type="text" name="userName"/>
            </label>
            <label>Password:
              <input type="Password" name="Password"/>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>

        <ul>
          <li><Link to='/createaccount'>Skapa konto</Link></li>
        </ul>
      </div>
    );
  }
}

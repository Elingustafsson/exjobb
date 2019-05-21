import React, { Component } from 'react';
import {hostname} from '../config.js'
import {connect} from 'react-redux';
import 'whatwg-fetch'
import 'promise-polyfill/src/polyfill';
import { Redirect } from "react-router-dom";

class Profile extends Component {

  constructor(props) {
    super()
    this.state = {

    }
  }
  componentDidMount() {
    if(!this.props.username) {
      return
    }
    window.fetch(`${hostname}/personalInfo/${this.props.username}`, {
      method: 'get',
      mode: 'cors',
    })
    .then(res=>res.json())
    .then(res => {
      this.setState({
        personalInfo: res
      })
    })
  }

  sendPersonalInfo(e) {
    e.preventDefault()
    var data = {username: this.props.username}
    Object.keys(this.state.personalInfo).forEach(key => {
      data[key] = e.elements.namedItem(key).value
    })

    window.fetch(`${hostname}/personalInfo/`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: 'post',
      body: JSON.stringify(data),
      mode: 'cors',
    })
  }

  render() {
    if(!this.props.username) {
      return <Redirect to="/"/>
    }
    if(!this.state.personalInfo) {
      return null
    }
    console.log(this.state.personalInfo)
    const labels = {phone: "Telefonnummer", address: "Adress", city: "Stad", country: "Land", postalno: "Postnummer", firstname: "Förnamn", lastname: "Efternamn"}

    const inputs = Object.keys(this.state.personalInfo).map((key,i) => (
      <>
        <label htmlFor={key}>{labels[key]}</label>
        <input name={key} id={key} defaultValue={this.state.personalInfo[key]}></input>
      </>
    ))
    return (
      <>
      <div className="bodyProfile">
      <h1>Här kan du fylla i dina kontakuppgifter</h1>
        <form className="formProfile" onSubmit={(e) => this.sendPersonalInfo(e)}>
        <div className="formFlex">
        {inputs}
        </div>
        <button type="submit">Spara</button>
        </form>
      </div>
      </>
    );
  }
}

const mapStateToProps = state => ({username: state.username})
export default connect(mapStateToProps)(Profile)

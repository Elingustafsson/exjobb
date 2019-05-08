import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Start from './screens/Start';
import Login from './screens/Login';
import CreateAccount from './screens/CreateAccount';
import Cart from './screens/Cart';
import IndividualProduct from './screens/IndividualProduct';
import Sale from './screens/Sale';
import Profile from './screens/Profile';

import { BrowserRouter, Route } from "react-router-dom";


export default class App extends Component {
  constructor(props) {
    super()
    console.log(props);
  }

  componentDidMount(){
    this.props.fetchDataWithRedux()
  }

  render() {
    return (
      <BrowserRouter>
        <>
          <Route path="/" component={Navbar}/>
          <Route exact path="/" component={Start} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/createaccount" component={CreateAccount} />
          <Route exact path="/individualproduct/:id" component={IndividualProduct} />
          <Route exact path="/sale" component={Sale} />
          <Route exact path="/cart" component={() => <Cart />} />
        </>
      </BrowserRouter>
    );
  }
}

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import PrivateRoute from "./components/PrivateRoute";
import "./styles.scss";

class App extends React.Component {
  constructor() {
    super();
    this.state = { credentials: {} };
  }

  render() {
    return (
      <Router>
        <div id="myApp" className="app">
          <div className="App">
            <div className="nav">
              <Link to="/login">
                <h3>Login</h3>
              </Link>
            </div>
            <div >
              <Switch>
                <Route path="/login" component={Login} />
                <PrivateRoute
                  exact
                  path="/bubble-page"
                  component={BubblePage}
                />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}


export default App;
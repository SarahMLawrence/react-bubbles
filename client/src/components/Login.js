//==========//
//  IMPORTS //
//==========//
import React from "react";
import { AxiosWithAuth } from "../util/AxiosWithAuth";
import { withRouter } from "react-router-dom";

//==================//
//  CLASS COMPONENT //
//==================//
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      credentials: {
        username: "",
        password: "",
      },
    };
  }

  handleChange = (e) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.credentials);
  };

  login = (e) => {
    e.preventDefault();
    AxiosWithAuth()
      .post("/api/login", this.state.credentials)
      .then((res) => {
        window.localStorage.setItem("token", res.data.payload);
  
        this.props.history.push("/bubble-page");
      })
      .catch((err) => {
        console.log("The error is ", err);
        alert("INVALID: You cannot sign in ");
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
            autocomplete= "off"
          />
          <input
            type="text"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
            autocomplete= "off"
          />

          <button onClick={this.login}>Log In</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);

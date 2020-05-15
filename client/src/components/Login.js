//==========//
//  IMPORTS //
//==========//
import React from "react";
import axiosWithAuth from '../util/axiosWithAuth';

class Login extends React.Component {
  constructor(){
    super();
    this.state ={
      credentials: {
        username: "",
        password:"",
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
    axiosWithAuth()
    .post('/api/login', this.state.credentials)
    .then((res) => {
      window.localStorage.setItem('token', res.data.payload);
      // this.props.history.push()
    })
    .catch((err) => {
      console.log('The error is ', err);
      alert('INVALID: You cannot sign in ');

    });
  }

  render(){
    return (
      <div>
        <form onSubmit={this.login}>
          <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={this.handleChange}
          />
          <input
          type="text"
          name="password"
          placeholder="Password"
          onChange={this.handleChange}
          />

          <button>Log In</button>
        </form>
      </div>
    )
  }
}


export default Login;
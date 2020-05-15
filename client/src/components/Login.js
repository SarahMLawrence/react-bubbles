import React from "react";

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

  render(){
    return (
      <div>
        <form>
          <input
          type="text"
          name="username"
          placeholder="Username"
          />
          <input
          type="text"
          name="password"
          placeholder="Password"
          />
        </form>
      </div>
    )
  }
}


export default Login;
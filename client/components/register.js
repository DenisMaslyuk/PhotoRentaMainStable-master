import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e){
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  onSubmit(e){
    e.preventDefault();

    const { username, password } = this.state;
    console.log(username, password)
    axios.post('http://localhost:3333/api/register/', { username, password })
      .then((result) => {
        this.props.history.push("/login")
      });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div class="container">
        <form class="form-signin" onSubmit={this.onSubmit}>
          <h2>Register</h2>
          <label for="inputEmail">Email address</label>
          <input type="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" placeholder="Email address" name="username"  onChange={this.onChange} required/>
          <label for="inputPassword">Password</label>
          <input type="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" placeholder="Password" name="password" onChange={this.onChange} required/>
          <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Create;

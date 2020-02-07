import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login:"",
      profileName:"",
      profileSecondName:"",
      passport:"",
      urlIamgePassport:""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    axios
      .get(`http://localhost:3333/api/profile`)
      .then(post => {
        this.setState({
          login: post.data.login,
          profileName: post.data.profileName,
          profileSecondName:post.data.profileSecondName,
          passport:post.data.passport,
          urlIamgePassport:post.data.urlIamgePassport
        });
      });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      login:this.state.login,
      profileName:this.state.profileName,
      profileSecondName:this.state.profileSecondName,
      passport:this.state.passport,
      urlIamgePassport:this.state.urlIamgePassport
    };
    axios.post("http://localhost:3333/api/profiles/", data).then(post => {
      alert("Post Successfully Created!");
      document.getElementById("profile").reset();
      this.props.history.push("/");
    });
  }

  render() {
    return (
      <div className="m-8">
        <h1>Profile</h1>
        <form onSubmit={this.onSubmit} id="profile">
          <div className="m-8">
            <label
              htmlFor="profileName"
              className="block text-grey-darker text-sm font-bold mb-2"
            >
              Имя:
            </label>
            <input
              type="text"
              name="profileName"
              onChange={this.onChange}
              value={this.state.profileName}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="m-8">
            <label
              htmlFor="profileSecondName"
              className="block text-grey-darker text-sm font-bold mb-2"
            >
              Фамилия:
            </label>
            <input
              type="text"
              name="profileSecondName"
              onChange={this.onChange}
              value={this.state.profileSecondName}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="m-8">
            <label
              htmlFor="passport"
              className="block text-grey-darker text-sm font-bold mb-2"
            >
              Серия и номер паспорта:
            </label>
            <input
              type="text"
              name="passport"
              onChange={this.onChange}
              value={this.state.passport}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          

          <div className="flex justify-center">
            <input
              className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
              type="submit"
              value="Save"
            />
            <Link
              className="bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded"
              to="/"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(Profile);

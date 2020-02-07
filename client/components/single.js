import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";

class Single extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    axios
      .get(`http://localhost:3333/api/product/${this.props.match.params.id}`)
      .then(product => {
        this.setState({
          product: product.data
        });
      });
  }

  onDelete(e) {
    e.preventDefault();
    axios
      .post(`http://localhost:3333/api/posts/${this.props.match.params.id}`)
      .then(post => {
        alert("Post Successfully Deleted!");
        this.props.history.push("/");
      });
  }

  render() {
    return (
      <div className="container m-8">
        <h1>{this.state.product.productName}</h1>
        <h3>Категория:{this.state.product.category}</h3>
        <h3>Описание</h3>
        <h4>{this.state.product.description}</h4>
        <h3>Цена:{this.state.product.price}</h3>
        <h3>Количество:{this.state.product.availability}</h3>
        <br />
        <div dangerouslySetInnerHTML={{ __html: this.state.product.content }} />
        <br />
        <div className="flex justify-end">
          <small>
            <Link
              to={`/edit/${this.state.product._id}`}
              className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </Link>
            <button
              onClick={e => this.onDelete(e)}
              className="bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </small>
        </div>
        
        
      </div>
    );
  }
}
export default withRouter(Single);
